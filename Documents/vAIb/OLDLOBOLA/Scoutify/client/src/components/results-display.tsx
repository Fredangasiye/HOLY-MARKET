import { TrendingUp, Cow } from "lucide-react";
import type { CalculationResult } from "shared/schema";
import { getSimpleTranslation, type Language } from "../lib/simple-translations";
import CulturalWisdom from "./cultural-wisdom"; // The new component

// Add culturalGroup to the props here
interface ResultsDisplayProps {
  results: CalculationResult;
  culturalGroup: string; 
  currentLanguage?: Language;
}

export default function ResultsDisplay({ results, culturalGroup, currentLanguage = 'en' }: ResultsDisplayProps) {
  if (!results) return null;
  const t = getSimpleTranslation(currentLanguage);

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 mt-8 animate-in fade-in-50">
      {/* ... Main Result and Cattle Equivalent sections remain the same ... */}
      
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="text-primary mr-3" />
        {t.culturalGuidanceResults}
      </h2>
      <div className="text-center mb-6">
        <div className="text-sm font-medium text-muted-foreground">{t.suggestedRange}</div>
        <div className="text-4xl font-bold text-primary my-1">{results.amount}</div>
        <div className="text-sm text-muted-foreground">{t.basedOnTraditions}</div>
      </div>
      <div className="mt-4 pt-4 border-t-2 text-center mb-6">
        <div className="flex items-center justify-center font-semibold text-muted-foreground">
          <span role="img" aria-label="cow" className="mr-2">🐄</span>
          <span>{t.cattleEquivalent}</span>
        </div>
        <div className="text-2xl font-bold mt-1">{results.cowEquivalent.displayText}</div>
        <div className="text-xs text-muted-foreground">
          {t.marketPrice} R{results.cowEquivalent.pricePerCow.toLocaleString()} {t.perCow}
        </div>
      </div>
      
      {/* Breakdown Section */}
      <div className="space-y-4 border-t-2 pt-6">
        <h3 className="font-semibold text-lg pb-2 text-center">{t.calculationBreakdown}</h3>
        {/* ... breakdown rows ... */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>{t.baseAmount}</span><span className="font-medium">R{results.breakdown.base.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>{t.educationBonus}</span><span className="font-medium">R{results.breakdown.education.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>{t.careerConsideration}</span><span className="font-medium">R{results.breakdown.career.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>{t.locationFactor}</span><span className="font-medium">R{results.breakdown.location.toLocaleString()}</span></div>
        </div>
      </div>
      
      {/* ADD THE NEW STATIC WISDOM COMPONENT HERE */}
      <CulturalWisdom culturalGroup={culturalGroup} />
    </div>
  );
}