from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    business_name: str
    industry: str
    experience_level: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    logo_url: Optional[str] = None
    subscription_tier: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Client schemas
class ClientBase(BaseModel):
    name: str
    company: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Quote schemas
class QuoteFeatures(BaseModel):
    industry: str
    location: str
    experience_level: str
    complexity: str = "standard"
    duration_hours: float
    job_title: str
    additional_features: Optional[Dict[str, Any]] = None

class QuoteItem(BaseModel):
    description: str
    quantity: float
    unit_price: float
    total: float

class QuoteCreate(BaseModel):
    features: QuoteFeatures
    client_id: Optional[int] = None
    client_info: Optional[ClientBase] = None
    items: List[QuoteItem]
    terms: Optional[str] = None
    validity_days: int = 30

class QuoteResponse(BaseModel):
    id: int
    user_id: int
    client_id: Optional[int]
    industry: str
    job_title: str
    location: str
    duration: str
    experience_level: str
    ai_recommendation_min: float
    ai_recommendation_max: float
    final_price: float
    status: str
    quote_data: str
    pdf_url: Optional[str]
    created_at: datetime
    expires_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class PricingRecommendation(BaseModel):
    min_price: float
    max_price: float
    confidence: float
    rationale: str

# AI Model schemas
class TrainingData(BaseModel):
    industry: str
    location: str
    experience_level: str
    complexity: str
    duration_hours: float
    final_price: float

# Response schemas
class SuccessResponse(BaseModel):
    message: str
    data: Optional[Any] = None

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None 