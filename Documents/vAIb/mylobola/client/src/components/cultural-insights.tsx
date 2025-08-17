import { Lightbulb } from "lucide-react";

interface CulturalInsightsProps {
  insights: {
    title: string;
    description: string;
    culturalNotes: string[];
    negotiationTips: string[];
  };
}

export default function CulturalInsights({ insights }: CulturalInsightsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Lightbulb className="text-warm-orange mr-3" />
        Cultural Insights
      </h2>
      <div className="space-y-4">
        <div className="border-l-4 border-warm-orange pl-4">
          <h4 className="font-semibold text-gray-800 mb-2">{insights.title}</h4>
          <p className="text-gray-600 text-sm">{insights.description}</p>
        </div>
        
        {insights.culturalNotes.length > 0 && (
          <div className="bg-cream p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Cultural Notes:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {insights.culturalNotes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
        )}
        
        {insights.negotiationTips.length > 0 && (
          <div className="bg-cream p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Negotiation Guidelines:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {insights.negotiationTips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
