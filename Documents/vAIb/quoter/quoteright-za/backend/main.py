from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import json
from datetime import datetime, timedelta, UTC

from database import get_db, User as DBUser, Client as DBClient, Quote as DBQuote, PricingData
from schemas import (
    UserCreate, UserLogin, User, Token, ClientCreate, Client, 
    QuoteFeatures, QuoteCreate, QuoteResponse, PricingRecommendation, 
    TrainingData
)
from auth import get_password_hash, verify_password, create_access_token, get_current_user_email
from ai_model import pricing_model
from pdf_generator import pdf_generator
from config import settings

app = FastAPI(
    title="QuoteRight ZA API",
    description="AI-Powered Quoting Platform for SA Freelancers",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Dependency to get current user
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    email = get_current_user_email(credentials.credentials)
    user = db.query(DBUser).filter(DBUser.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/")
async def root():
    return {"message": "QuoteRight ZA API - AI-Powered Quoting Platform"}

# Authentication endpoints
@app.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(DBUser).filter(DBUser.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    db_user = DBUser(
        email=user_data.email,
        hashed_password=hashed_password,
        business_name=user_data.business_name,
        industry=user_data.industry,
        experience_level=user_data.experience_level
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_data.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/auth/login", response_model=Token)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(DBUser).filter(DBUser.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=User)
async def get_current_user_info(current_user: DBUser = Depends(get_current_user)):
    return current_user

# AI Pricing endpoints
@app.post("/ai/predict", response_model=PricingRecommendation)
async def predict_pricing(features: QuoteFeatures, current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    # Check subscription limits for free tier
    if current_user.subscription_tier == "free":
        quote_count = db.query(DBQuote).filter(DBQuote.user_id == current_user.id).count()
        if quote_count >= 2:
            raise HTTPException(status_code=403, detail="Free tier limit reached. Upgrade to Pro for unlimited quotes.")
    
    # Get AI prediction
    prediction = pricing_model.predict_price(features.dict())
    return PricingRecommendation(**prediction)

@app.get("/ai/industries")
async def get_industries():
    return {
        "industries": [
            {"id": "graphic_design", "name": "Graphic Design"},
            {"id": "web_development", "name": "Web Development"},
            {"id": "copywriting", "name": "Copywriting"},
            {"id": "photography", "name": "Photography"},
            {"id": "plumbing", "name": "Plumbing"},
            {"id": "electrical", "name": "Electrical"},
            {"id": "consulting", "name": "Consulting"},
            {"id": "marketing", "name": "Marketing"}
        ]
    }

@app.get("/ai/locations")
async def get_locations():
    return {
        "locations": [
            {"id": "gauteng", "name": "Gauteng"},
            {"id": "western_cape", "name": "Western Cape"},
            {"id": "kwazulu_natal", "name": "KwaZulu-Natal"},
            {"id": "eastern_cape", "name": "Eastern Cape"},
            {"id": "free_state", "name": "Free State"},
            {"id": "mpumalanga", "name": "Mpumalanga"},
            {"id": "limpopo", "name": "Limpopo"},
            {"id": "north_west", "name": "North West"},
            {"id": "northern_cape", "name": "Northern Cape"}
        ]
    }

# Client endpoints
@app.post("/clients", response_model=Client)
async def create_client(client_data: ClientCreate, current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    db_client = DBClient(**client_data.dict(), user_id=current_user.id)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@app.get("/clients", response_model=List[Client])
async def get_clients(current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    clients = db.query(DBClient).filter(DBClient.user_id == current_user.id).all()
    return clients

@app.get("/clients/{client_id}", response_model=Client)
async def get_client(client_id: int, current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    client = db.query(DBClient).filter(DBClient.id == client_id, DBClient.user_id == current_user.id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

# Quote endpoints
@app.post("/quotes", response_model=QuoteResponse)
async def create_quote(quote_data: QuoteCreate, current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    # Get AI pricing recommendation
    features = quote_data.features.model_dump()
    prediction = pricing_model.predict_price(features)
    
    # Calculate final price from items
    final_price = sum(item.total for item in quote_data.items)
    
    # Create or get client
    client_id = quote_data.client_id
    if quote_data.client_info and not client_id:
        db_client = DBClient(**quote_data.client_info.dict(), user_id=current_user.id)
        db.add(db_client)
        db.commit()
        db.refresh(db_client)
        client_id = db_client.id
    
    # Create quote
    db_quote = DBQuote(
        user_id=current_user.id,
        client_id=client_id,
        industry=quote_data.features.industry,
        job_title=quote_data.features.job_title,
        location=quote_data.features.location,
        duration=f"{quote_data.features.duration_hours} hours",
        experience_level=quote_data.features.experience_level,
        ai_recommendation_min=prediction['min_price'],
        ai_recommendation_max=prediction['max_price'],
        final_price=final_price,
        quote_data=json.dumps({
            "features": quote_data.features.model_dump(),
            "items": [item.model_dump() for item in quote_data.items],
            "terms": quote_data.terms,
            "validity_days": quote_data.validity_days
        }),
        expires_at=datetime.now(UTC) + timedelta(days=quote_data.validity_days)
    )
    
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    
    # Generate PDF (temporarily disabled for debugging)
    # quote_dict = {
    #     "id": db_quote.id,
    #     "job_title": db_quote.job_title,
    #     "industry": db_quote.industry,
    #     "location": db_quote.location,
    #     "items": [item.model_dump() for item in quote_data.items],
    #     "terms": quote_data.terms,
    #     "validity_days": quote_data.validity_days,
    #     "client_info": quote_data.client_info.model_dump() if quote_data.client_info else {}
    # }
    # 
    # user_dict = {
    #     "business_name": current_user.business_name,
    #     "logo_url": current_user.logo_url
    # }
    # 
    # pdf_path = pdf_generator.save_quote_html(quote_dict, user_dict, db_quote.id)
    # db_quote.pdf_url = pdf_path
    # db.commit()
    
    # For now, just return the quote without PDF generation
    db_quote.pdf_url = None
    
    return db_quote

@app.get("/quotes", response_model=List[QuoteResponse])
async def get_quotes(current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    quotes = db.query(DBQuote).filter(DBQuote.user_id == current_user.id).all()
    return quotes

@app.get("/quotes/{quote_id}", response_model=QuoteResponse)
async def get_quote(quote_id: int, current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    quote = db.query(DBQuote).filter(DBQuote.id == quote_id, DBQuote.user_id == current_user.id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    return quote

@app.put("/quotes/{quote_id}/status")
async def update_quote_status(quote_id: int, status: str, current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    quote = db.query(DBQuote).filter(DBQuote.id == quote_id, DBQuote.user_id == current_user.id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    quote.status = status
    db.commit()
    return {"message": "Quote status updated successfully"}

# PDF endpoints
@app.get("/quotes/{quote_id}/pdf")
async def get_quote_pdf(quote_id: int, current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    quote = db.query(DBQuote).filter(DBQuote.id == quote_id, DBQuote.user_id == current_user.id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
    
    if not quote.pdf_url:
        raise HTTPException(status_code=404, detail="PDF not generated")
    
    return {"pdf_url": quote.pdf_url}

# Admin endpoints (for model training)
@app.post("/admin/train-model")
async def train_model(training_data: List[TrainingData], db: Session = Depends(get_db)):
    # Convert to format expected by model
    data = [item.model_dump() for item in training_data]
    pricing_model.train_model(data)
    return {"message": "Model trained successfully"}

@app.get("/admin/stats")
async def get_stats(current_user: DBUser = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.subscription_tier != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    total_quotes = db.query(DBQuote).count()
    total_users = db.query(DBUser).count()
    total_clients = db.query(DBClient).count()
    
    return {
        "total_quotes": total_quotes,
        "total_users": total_users,
        "total_clients": total_clients
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 