import { calculations, type Calculation, type InsertCalculation } from "@shared/schema";

export interface IStorage {
  createCalculation(calculation: InsertCalculation): Promise<Calculation>;
  getCalculationStats(): Promise<{
    totalCalculations: number;
    popularCulturalGroups: Array<{ group: string; count: number }>;
    averageEducationLevel: string;
  }>;
}

export class MemStorage implements IStorage {
  private calculations: Map<number, Calculation>;
  private currentId: number;

  constructor() {
    this.calculations = new Map();
    this.currentId = 1;
  }

  async createCalculation(insertCalculation: InsertCalculation): Promise<Calculation> {
    const id = this.currentId++;
    const calculation: Calculation = {
      ...insertCalculation,
      id,
      createdAt: new Date().toISOString(),
      familyType: insertCalculation.familyType || null,
      location: insertCalculation.location || null,
      income: insertCalculation.income || null,
      age: insertCalculation.age || null,
      socialStanding: insertCalculation.socialStanding || null,
      numberOfChildren: insertCalculation.numberOfChildren || null,
      virginityStatus: insertCalculation.virginityStatus || null,
    };
    this.calculations.set(id, calculation);
    return calculation;
  }

  async getCalculationStats(): Promise<{
    totalCalculations: number;
    popularCulturalGroups: Array<{ group: string; count: number }>;
    averageEducationLevel: string;
  }> {
    const allCalculations = Array.from(this.calculations.values());
    
    // Count cultural groups
    const culturalGroupCounts = new Map<string, number>();
    const educationLevels = new Map<string, number>();
    
    allCalculations.forEach(calc => {
      // Count cultural groups
      const currentCount = culturalGroupCounts.get(calc.culturalGroup) || 0;
      culturalGroupCounts.set(calc.culturalGroup, currentCount + 1);
      
      // Count education levels
      const currentEducationCount = educationLevels.get(calc.education) || 0;
      educationLevels.set(calc.education, currentEducationCount + 1);
    });
    
    // Get popular cultural groups
    const popularCulturalGroups = Array.from(culturalGroupCounts.entries())
      .map(([group, count]) => ({ group, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Get most common education level
    const mostCommonEducation = Array.from(educationLevels.entries())
      .sort((a, b) => b[1] - a[1])[0];
    
    return {
      totalCalculations: allCalculations.length,
      popularCulturalGroups,
      averageEducationLevel: mostCommonEducation ? mostCommonEducation[0] : 'Not available',
    };
  }
}

export const storage = new MemStorage();
