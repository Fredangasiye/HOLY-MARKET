# 🚀 QuoteRight ZA - Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Option 1: Automated Startup (Recommended)

**macOS/Linux:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

### Option 2: Manual Startup

**1. Start Backend:**
```bash
cd quoteright-za/backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

**2. Start Frontend (new terminal):**
```bash
cd quoteright-za/frontend
npm install
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎯 First Steps

1. **Register an account** with your business details
2. **Create your first quote** using the AI-powered wizard
3. **Get AI pricing recommendations** based on SA market data
4. **Generate professional PDF quotes** instantly

## 🧪 Test the Application

Run the test script to verify everything is working:
```bash
python test_app.py
```

## 🔧 Key Features

### AI-Powered Pricing
- Industry-specific pricing recommendations
- Location-based adjustments for SA provinces
- Experience level and complexity multipliers
- Confidence intervals for pricing accuracy

### Quote Generation
- Step-by-step guided wizard
- Professional PDF export
- Client management
- Quote tracking and analytics

### User Management
- Secure authentication with JWT
- Business profile management
- Subscription tier system (Free/Pro/Business)

## 📱 Supported Industries

- Graphic Design
- Web Development
- Copywriting
- Photography
- Plumbing
- Electrical
- Consulting
- Marketing

## 🗺️ Supported Locations

All South African provinces:
- Gauteng
- Western Cape
- KwaZulu-Natal
- Eastern Cape
- Free State
- Mpumalanga
- Limpopo
- North West
- Northern Cape

## 🛠️ Technology Stack

- **Backend**: FastAPI, SQLAlchemy, Scikit-learn
- **Frontend**: React, TypeScript, Material-UI
- **Database**: SQLite (development), PostgreSQL (production)
- **AI**: Machine learning with rule-based fallback

## 🚨 Troubleshooting

### Backend Issues
- Check if Python 3.8+ is installed
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Check if port 8000 is available

### Frontend Issues
- Check if Node.js 16+ is installed
- Verify all dependencies are installed: `npm install`
- Check if port 3000 is available

### Database Issues
- The SQLite database is created automatically
- Check file permissions in the backend directory

## 📞 Support

If you encounter any issues:
1. Check the console output for error messages
2. Run the test script: `python test_app.py`
3. Review the full README.md for detailed documentation

---

**Ready to start quoting smarter? Open http://localhost:3000 and create your first AI-powered quote! 🎉** 