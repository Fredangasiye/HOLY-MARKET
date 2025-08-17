import { TrendingUp, Beef } from "lucide-react";
import type { CalculationResult } from "@shared/schema";
import { getSimpleTranslation, type Language } from "@/lib/simple-translations";

interface ResultsDisplayProps {
  results: CalculationResult;
  currentLanguage?: Language;
}

export default function ResultsDisplay({ results, currentLanguage = 'en' }: ResultsDisplayProps) {
  const t = getSimpleTranslation(currentLanguage);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="text-forest-green mr-3" />
        {t.culturalGuidanceResults}
      </h2>
      
      {/* Main Result */}
      <div className="bg-gradient-to-r from-forest-green to-green-600 text-white rounded-lg p-6 mb-6 text-center">
        <div className="text-sm font-medium mb-2">{t.suggestedRange}</div>
        <div className="text-4xl font-bold mb-2">{results.amount}</div>
        <div className="text-sm opacity-90">{t.basedOnTraditions}</div>
        
        {/* Cow Equivalent - now under the price */}
        <div className="mt-4 pt-4 border-t border-white/30">
          <div className="flex items-center justify-center mb-2">
            <Beef className="mr-2 h-4 w-4" />
            <div className="text-xs font-medium">Traditional Cattle Equivalent</div>
          </div>
          <div className="text-lg font-semibold">{results.cowEquivalent.displayText}</div>
          <div className="text-xs opacity-80">
            {t.marketPrice} R{results.cowEquivalent.pricePerCow.toLocaleString()} {t.perCow}
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 mt-1">
        <h3 className="font-semibold text-gray-800">{t.calculationBreakdown}</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-3 bg-forest-green/10 rounded-lg">
            <span className="text-gray-700 font-medium">{t.baseAmount}</span>
            <span className="font-bold text-lg text-forest-green">R{results.breakdown.base.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{t.educationBonus}</span>
              <span className="font-medium">R{results.breakdown.education.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t.careerConsideration}</span>
              <span className="font-medium">R{results.breakdown.career.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t.locationFactor}</span>
              <span className="font-medium">R{results.breakdown.location.toLocaleString()}</span>
            </div>
            <div className="flex justify-between col-span-full mt-3 pt-3 border-t-2 border-golden-yellow bg-golden-yellow/10 rounded-lg p-3">
              <span className="text-gray-800 font-semibold">{t.cattleEquivalent}</span>
              <span className="font-bold text-lg text-forest-green">{results.cowEquivalent.displayText}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
