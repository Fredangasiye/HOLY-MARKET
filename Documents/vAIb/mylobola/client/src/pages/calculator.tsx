import { useState } from "react";
import CulturalDisclaimer from "../components/cultural-disclaimer";
import CalculatorForm from "../components/calculator-form";
import ResultsDisplay from "../components/results-display";
import ShareSection from "../components/share-section";
import UncleWisdom from "../components/uncle-wisdom";
import { Toaster } from "@/components/ui/toaster";

function NonBlackGuidance() { return null; }

export default function Calculator() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedCulturalGroup, setSelectedCulturalGroup] = useState('');

  const handleCalculationComplete = (calculationResults) => {
    setResults(calculationResults);
    setShowResults(true);
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <CulturalDisclaimer />
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
        <div className="space-y-6 lg:order-none order-2">
          <CalculatorForm 
            onCalculationComplete={handleCalculationComplete}
            onCulturalGroupChange={setSelectedCulturalGroup}
          />
        </div>
        <div className="lg:order-none order-1">
          <UncleWisdom />
        </div>
      </div>
      <div className="space-y-6 mt-8" id="results-section">
        {showResults && results && (
          <>
            <ResultsDisplay results={results} culturalGroup={selectedCulturalGroup} />
            <ShareSection results={results} />
          </>
        )}
      </div>
      <div className="mt-12 space-y-8">
        <NonBlackGuidance />
      </div>
      <Toaster />
    </>
  );
}