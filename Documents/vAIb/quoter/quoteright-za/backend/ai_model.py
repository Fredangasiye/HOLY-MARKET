import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle
import json
from typing import Dict, List, Tuple
import os
from config import settings

class PricingModel:
    def __init__(self):
        self.model = None
        self.label_encoders = {}
        self.base_prices = {
            'graphic_design': {'junior': 150, 'mid': 250, 'senior': 400},
            'web_development': {'junior': 200, 'mid': 350, 'senior': 600},
            'copywriting': {'junior': 100, 'mid': 180, 'senior': 300},
            'photography': {'junior': 120, 'mid': 200, 'senior': 350},
            'plumbing': {'junior': 180, 'mid': 250, 'senior': 400},
            'electrical': {'junior': 200, 'mid': 300, 'senior': 500},
            'consulting': {'junior': 300, 'mid': 500, 'senior': 800},
            'marketing': {'junior': 120, 'mid': 200, 'senior': 350}
        }
        
        self.location_multipliers = {
            'gauteng': 1.2,
            'western_cape': 1.1,
            'kwazulu_natal': 1.0,
            'eastern_cape': 0.9,
            'free_state': 0.85,
            'mpumalanga': 0.8,
            'limpopo': 0.8,
            'north_west': 0.85,
            'northern_cape': 0.8
        }
        
        self.complexity_multipliers = {
            'simple': 0.8,
            'standard': 1.0,
            'complex': 1.5,
            'expert': 2.0
        }
        
        self.load_model()
    
    def load_model(self):
        """Load trained model if exists"""
        if os.path.exists(settings.MODEL_PATH):
            try:
                with open(settings.MODEL_PATH, 'rb') as f:
                    model_data = pickle.load(f)
                    self.model = model_data['model']
                    self.label_encoders = model_data['encoders']
                print("Loaded existing model")
            except:
                print("Failed to load model, using rule-based fallback")
        else:
            print("No existing model found, using rule-based pricing")
    
    def save_model(self):
        """Save trained model"""
        os.makedirs(os.path.dirname(settings.MODEL_PATH), exist_ok=True)
        model_data = {
            'model': self.model,
            'encoders': self.label_encoders
        }
        with open(settings.MODEL_PATH, 'wb') as f:
            pickle.dump(model_data, f)
    
    def rule_based_pricing(self, industry: str, location: str, experience_level: str, 
                          complexity: str, duration_hours: float) -> Tuple[float, float]:
        """Rule-based pricing as fallback"""
        base_price = self.base_prices.get(industry, {}).get(experience_level, 200)
        location_mult = self.location_multipliers.get(location.lower(), 1.0)
        complexity_mult = self.complexity_multipliers.get(complexity, 1.0)
        
        # Calculate base price
        adjusted_price = base_price * location_mult * complexity_mult * duration_hours
        
        # Add confidence interval
        min_price = adjusted_price * 0.8
        max_price = adjusted_price * 1.2
        
        return min_price, max_price
    
    def predict_price(self, features: Dict) -> Dict:
        """Predict pricing recommendation"""
        industry = features.get('industry', 'graphic_design')
        location = features.get('location', 'gauteng')
        experience_level = features.get('experience_level', 'mid')
        complexity = features.get('complexity', 'standard')
        duration_hours = features.get('duration_hours', 8.0)
        
        # Use ML model if available, otherwise rule-based
        if self.model is not None:
            try:
                # Prepare features for ML model
                encoded_features = self._encode_features(features)
                prediction = self.model.predict([encoded_features])[0]
                
                # Calculate confidence interval
                min_price = prediction * 0.85
                max_price = prediction * 1.15
                
                confidence = 0.85
            except:
                min_price, max_price = self.rule_based_pricing(
                    industry, location, experience_level, complexity, duration_hours
                )
                confidence = 0.7
        else:
            min_price, max_price = self.rule_based_pricing(
                industry, location, experience_level, complexity, duration_hours
            )
            confidence = 0.7
        
        return {
            'min_price': round(min_price, 2),
            'max_price': round(max_price, 2),
            'confidence': confidence,
            'rationale': f"Based on {experience_level} level {industry} work in {location} with {complexity} complexity"
        }
    
    def _encode_features(self, features: Dict) -> List:
        """Encode features for ML model"""
        encoded = []
        
        # Encode categorical features
        for feature, value in features.items():
            if feature in self.label_encoders:
                encoded.append(self.label_encoders[feature].transform([value])[0])
            else:
                encoded.append(value)
        
        return encoded
    
    def train_model(self, training_data: List[Dict]):
        """Train ML model with new data"""
        if not training_data:
            return
        
        # Prepare training data
        X = []
        y = []
        
        for item in training_data:
            features = [
                item.get('industry', ''),
                item.get('location', ''),
                item.get('experience_level', ''),
                item.get('complexity', ''),
                item.get('duration_hours', 0)
            ]
            X.append(features)
            y.append(item.get('final_price', 0))
        
        # Encode categorical features
        X_df = pd.DataFrame(X, columns=['industry', 'location', 'experience_level', 'complexity', 'duration_hours'])
        
        for col in ['industry', 'location', 'experience_level', 'complexity']:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
                X_df[col] = self.label_encoders[col].fit_transform(X_df[col])
            else:
                X_df[col] = self.label_encoders[col].transform(X_df[col])
        
        # Train model
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.model.fit(X_df.values, y)
        
        # Save model
        self.save_model()
        print("Model trained and saved successfully")

# Global model instance
pricing_model = PricingModel() 