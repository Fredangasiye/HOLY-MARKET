#!/usr/bin/env python3

from database import engine, User, SessionLocal
from sqlalchemy import text

def test_database():
    print("Testing database connection...")
    
    # Test basic connection
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Database connection successful")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return
    
    # Test table creation
    try:
        from database import Base
        Base.metadata.create_all(bind=engine)
        print("✅ Tables created successfully")
    except Exception as e:
        print(f"❌ Table creation failed: {e}")
        return
    
    # Test user creation
    try:
        db = SessionLocal()
        test_user = User(
            email="test@example.com",
            hashed_password="test_hash",
            business_name="Test Business",
            industry="graphic_design",
            experience_level="mid"
        )
        db.add(test_user)
        db.commit()
        print("✅ User creation successful")
        
        # Clean up
        db.delete(test_user)
        db.commit()
        print("✅ Test user cleaned up")
        
    except Exception as e:
        print(f"❌ User creation failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    test_database() 