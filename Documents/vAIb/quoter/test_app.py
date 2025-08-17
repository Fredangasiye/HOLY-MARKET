#!/usr/bin/env python3
"""
Test script for QuoteRight ZA application
"""

import requests
import json
import time
import sys

BASE_URL = "http://localhost:8000"

def test_backend_health():
    """Test if backend is running"""
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("✅ Backend is running")
            return True
        else:
            print(f"❌ Backend returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Backend is not running")
        return False

def test_api_endpoints():
    """Test API endpoints"""
    print("\n🔍 Testing API endpoints...")
    
    # Test industries endpoint
    try:
        response = requests.get(f"{BASE_URL}/ai/industries")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Industries endpoint: {len(data['industries'])} industries found")
        else:
            print(f"❌ Industries endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Industries endpoint error: {e}")
    
    # Test locations endpoint
    try:
        response = requests.get(f"{BASE_URL}/ai/locations")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Locations endpoint: {len(data['locations'])} locations found")
        else:
            print(f"❌ Locations endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Locations endpoint error: {e}")

def test_ai_pricing():
    """Test AI pricing prediction"""
    print("\n🤖 Testing AI pricing prediction...")
    
    test_features = {
        "industry": "graphic_design",
        "location": "gauteng",
        "experience_level": "mid",
        "complexity": "standard",
        "duration_hours": 8,
        "job_title": "Logo Design"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/ai/predict", json=test_features)
        if response.status_code == 401:
            print("✅ AI pricing endpoint requires authentication (expected)")
        elif response.status_code == 200:
            data = response.json()
            print(f"✅ AI pricing prediction: R{data['min_price']} - R{data['max_price']}")
            print(f"   Confidence: {data['confidence']:.1%}")
            print(f"   Rationale: {data['rationale']}")
        else:
            print(f"❌ AI pricing endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ AI pricing endpoint error: {e}")

def test_user_registration():
    """Test user registration"""
    print("\n👤 Testing user registration...")
    
    test_user = {
        "email": "test@example.com",
        "password": "testpassword123",
        "business_name": "Test Business",
        "industry": "graphic_design",
        "experience_level": "mid"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=test_user)
        if response.status_code == 200:
            data = response.json()
            print("✅ User registration successful")
            print(f"   Token: {data['access_token'][:20]}...")
            return data['access_token']
        elif response.status_code == 400:
            print("ℹ️  User already exists (expected for repeated tests)")
            return None
        else:
            print(f"❌ User registration failed: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ User registration error: {e}")
        return None

def test_authenticated_endpoints(token):
    """Test endpoints that require authentication"""
    if not token:
        print("⚠️  Skipping authenticated tests (no token)")
        return
    
    print("\n🔐 Testing authenticated endpoints...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test AI pricing with authentication
    test_features = {
        "industry": "graphic_design",
        "location": "gauteng",
        "experience_level": "mid",
        "complexity": "standard",
        "duration_hours": 8,
        "job_title": "Logo Design"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/ai/predict", json=test_features, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Authenticated AI pricing: R{data['min_price']} - R{data['max_price']}")
        else:
            print(f"❌ Authenticated AI pricing failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Authenticated AI pricing error: {e}")
    
    # Test user info
    try:
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ User info: {data['business_name']} ({data['email']})")
        else:
            print(f"❌ User info failed: {response.status_code}")
    except Exception as e:
        print(f"❌ User info error: {e}")

def main():
    """Main test function"""
    print("🧪 QuoteRight ZA Application Test")
    print("=" * 40)
    
    # Test backend health
    if not test_backend_health():
        print("\n❌ Backend is not running. Please start the backend server first.")
        print("   Run: cd quoteright-za/backend && python main.py")
        sys.exit(1)
    
    # Test API endpoints
    test_api_endpoints()
    
    # Test AI pricing (unauthenticated)
    test_ai_pricing()
    
    # Test user registration
    token = test_user_registration()
    
    # Test authenticated endpoints
    test_authenticated_endpoints(token)
    
    print("\n" + "=" * 40)
    print("🎉 Test completed!")
    print("\n📱 Frontend should be available at: http://localhost:3000")
    print("🔧 Backend API should be available at: http://localhost:8000")
    print("📚 API documentation at: http://localhost:8000/docs")

if __name__ == "__main__":
    main() 