# QuoteRight ZA - AI-Powered Quoting Platform

An intelligent web application designed to help South African freelancers and small businesses price their services accurately using AI-powered market data and generate professional quotes.

## 🚀 Features

### Core Features
- **AI-Powered Pricing**: Get intelligent pricing recommendations based on industry, location, experience level, and job complexity
- **Quote Generation Wizard**: Step-by-step guided quote creation process
- **Professional PDF Export**: Generate branded, professional quote documents
- **User Authentication**: Secure login and registration system
- **Client Management**: Store and manage client information
- **Quote Dashboard**: Track and manage all your quotes in one place

### AI Capabilities
- Rule-based pricing with market data integration
- Machine learning model for improved accuracy
- Location-based pricing adjustments for SA provinces
- Experience level and complexity multipliers
- Confidence intervals for pricing recommendations

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **SQLite**: Development database (PostgreSQL for production)
- **JWT**: Authentication tokens
- **Scikit-learn**: Machine learning for pricing predictions
- **Jinja2**: HTML template engine for PDF generation

### Frontend
- **React**: Modern JavaScript framework
- **TypeScript**: Type-safe development
- **Material-UI**: Professional UI components
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server:**
   ```bash
   python main.py
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 🎯 Quick Start

1. **Start both servers** (backend and frontend)
2. **Open your browser** to `http://localhost:3000`
3. **Register a new account** with your business details
4. **Create your first quote** using the AI-powered wizard
5. **Download the generated PDF** quote

## 📋 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### AI Pricing
- `POST /ai/predict` - Get pricing recommendation
- `GET /ai/industries` - List available industries
- `GET /ai/locations` - List SA provinces

### Quotes
- `POST /quotes` - Create new quote
- `GET /quotes` - List user quotes
- `GET /quotes/{id}` - Get specific quote
- `PUT /quotes/{id}/status` - Update quote status
- `GET /quotes/{id}/pdf` - Download quote PDF

### Clients
- `POST /clients` - Create new client
- `GET /clients` - List user clients
- `GET /clients/{id}` - Get specific client

## 🏗️ Project Structure

```
quoteright-za/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database models
│   ├── auth.py              # Authentication utilities
│   ├── ai_model.py          # AI pricing model
│   ├── pdf_generator.py     # PDF generation
│   ├── schemas.py           # Pydantic schemas
│   ├── requirements.txt     # Python dependencies
│   ├── uploads/             # Generated files
│   ├── templates/           # HTML templates
│   └── models/              # AI model files
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── package.json         # Node dependencies
│   └── public/              # Static files
├── docs/                    # Documentation
└── README.md               # This file
```

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory:

```env
DATABASE_URL=sqlite:///./quoteright.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
MODEL_PATH=./models/pricing_model.pkl
DATA_PATH=./data/
UPLOAD_DIR=./uploads/
```

### Frontend Environment Variables
Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Use a production WSGI server (Gunicorn)
4. Set up reverse proxy (Nginx)

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your web server
3. Configure API URL for production

## 📊 AI Model Training

The AI model can be improved by:

1. **Collecting more data** from job boards and freelance platforms
2. **User feedback** on accepted/rejected quotes
3. **Market research** for industry-specific pricing
4. **Retraining the model** with new data

To retrain the model:
```bash
curl -X POST http://localhost:8000/admin/train-model \
  -H "Content-Type: application/json" \
  -d '[{"industry": "graphic_design", "location": "gauteng", "experience_level": "mid", "complexity": "standard", "duration_hours": 8, "final_price": 2000}]'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@quoteright-za.com
- Documentation: [docs.quoteright-za.com](https://docs.quoteright-za.com)

## 🎯 Roadmap

### Phase 2 Features
- [ ] Payment integration (Paystack)
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Mobile app
- [ ] API integrations (accounting software)

### Phase 3 Features
- [ ] Advanced AI features
- [ ] Community pricing insights
- [ ] White-label solutions
- [ ] Enterprise features

---

**Built with ❤️ for South African freelancers and small businesses** 