import { Info } from "lucide-react";
import { getSimpleTranslation, type Language } from "../lib/simple-translations";

interface NonBlackGuidanceProps {
  currentLanguage: Language;
}

export default function NonBlackGuidance({ currentLanguage }: NonBlackGuidanceProps) {
  const t = getSimpleTranslation(currentLanguage);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Info className="text-gold mr-3" />
        {t.nonBlackGuidanceTitle}
      </h2>
      
      <p className="text-gray-600 mb-4">
        {t.nonBlackGuidanceContent}
      </p>
      
      <ul className="space-y-3">
        {t.nonBlackTips.map((tip: string, index: number) => (
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 bg-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}