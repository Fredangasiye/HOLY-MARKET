from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from config import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    business_name = Column(String)
    logo_url = Column(String, nullable=True)
    industry = Column(String)
    experience_level = Column(String)
    subscription_tier = Column(String, default="free")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    quotes = relationship("Quote", back_populates="user")
    clients = relationship("Client", back_populates="user")

class Client(Base):
    __tablename__ = "clients"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    company = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="clients")
    quotes = relationship("Quote", back_populates="client")

class Quote(Base):
    __tablename__ = "quotes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)
    industry = Column(String)
    job_title = Column(String)
    location = Column(String)
    duration = Column(String)
    experience_level = Column(String)
    ai_recommendation_min = Column(Float)
    ai_recommendation_max = Column(Float)
    final_price = Column(Float)
    status = Column(String, default="draft")  # draft, sent, accepted, declined
    quote_data = Column(Text)  # JSON string of quote details
    pdf_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="quotes")
    client = relationship("Client", back_populates="quotes")

class PricingData(Base):
    __tablename__ = "pricing_data"
    
    id = Column(Integer, primary_key=True, index=True)
    industry = Column(String)
    location = Column(String)
    experience_level = Column(String)
    job_type = Column(String)
    avg_price = Column(Float)
    min_price = Column(Float)
    max_price = Column(Float)
    sample_size = Column(Integer)
    last_updated = Column(DateTime, default=datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
Base.metadata.create_all(bind=engine) 