import json
from typing import Dict, List, Tuple
import os
from config import settings

class PricingModel:
    def __init__(self):
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
        
        self.load_training_data()
    
    def load_training_data(self):
        """Load training data if exists"""
        self.training_data = []
        if os.path.exists(settings.DATA_PATH + '/training_data.json'):
            try:
                with open(settings.DATA_PATH + '/training_data.json', 'r') as f:
                    self.training_data = json.load(f)
                print(f"Loaded {len(self.training_data)} training examples")
            except:
                print("Failed to load training data")
        else:
            print("No training data found")
    
    def save_training_data(self):
        """Save training data"""
        os.makedirs(settings.DATA_PATH, exist_ok=True)
        with open(settings.DATA_PATH + '/training_data.json', 'w') as f:
            json.dump(self.training_data, f, indent=2)
    
    def rule_based_pricing(self, industry: str, location: str, experience_level: str, 
                          complexity: str, duration_hours: float) -> Tuple[float, float]:
        """Rule-based pricing with market data integration"""
        base_price = self.base_prices.get(industry, {}).get(experience_level, 200)
        location_mult = self.location_multipliers.get(location.lower(), 1.0)
        complexity_mult = self.complexity_multipliers.get(complexity, 1.0)
        
        # Calculate base price
        adjusted_price = base_price * location_mult * complexity_mult * duration_hours
        
        # Add confidence interval based on data availability
        confidence_range = 0.2 if self.training_data else 0.3
        min_price = adjusted_price * (1 - confidence_range)
        max_price = adjusted_price * (1 + confidence_range)
        
        return min_price, max_price
    
    def predict_price(self, features: Dict) -> Dict:
        """Predict pricing recommendation"""
        industry = features.get('industry', 'graphic_design')
        location = features.get('location', 'gauteng')
        experience_level = features.get('experience_level', 'mid')
        complexity = features.get('complexity', 'standard')
        duration_hours = features.get('duration_hours', 8.0)
        
        # Use rule-based pricing with market data integration
        min_price, max_price = self.rule_based_pricing(
            industry, location, experience_level, complexity, duration_hours
        )
        
        # Calculate confidence based on available data
        confidence = min(0.9, 0.7 + (len(self.training_data) * 0.01))
        
        return {
            'min_price': round(min_price, 2),
            'max_price': round(max_price, 2),
            'confidence': round(confidence, 2),
            'rationale': f"Based on {experience_level} level {industry} work in {location} with {complexity} complexity"
        }
    
    def train_model(self, training_data: List[Dict]):
        """Add new training data to improve pricing accuracy"""
        if not training_data:
            return
        
        # Add new data to training set
        for item in training_data:
            self.training_data.append(item)
        
        # Save updated training data
        self.save_training_data()
        
        # Update base prices based on new data (simple averaging)
        self._update_base_prices()
        
        print(f"Added {len(training_data)} new training examples. Total: {len(self.training_data)}")
    
    def _update_base_prices(self):
        """Update base prices based on training data"""
        if not self.training_data:
            return
        
        # Group by industry and experience level
        price_data = {}
        for item in self.training_data:
            industry = item.get('industry', 'graphic_design')
            exp_level = item.get('experience_level', 'mid')
            price = item.get('final_price', 0)
            duration = item.get('duration_hours', 8.0)
            
            if duration > 0:
                hourly_rate = price / duration
                key = (industry, exp_level)
                if key not in price_data:
                    price_data[key] = []
                price_data[key].append(hourly_rate)
        
        # Update base prices with averages
        for (industry, exp_level), rates in price_data.items():
            if len(rates) >= 3:  # Only update if we have enough data
                avg_rate = sum(rates) / len(rates)
                if industry in self.base_prices:
                    self.base_prices[industry][exp_level] = round(avg_rate, 2)

# Global model instance
pricing_model = PricingModel() 