import { Info } from "lucide-react";

export default function CulturalDisclaimer() {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-warm-orange p-6 mb-8">
      <div className="flex items-start space-x-3">
        <Info className="text-warm-orange text-xl mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Cultural Sensitivity Notice</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            This tool is designed to provide educational guidance about lobola traditions across South African cultures. 
            It should not replace family discussions or cultural elders' advice. Every family and situation is unique, 
            and this calculator serves as a starting point for respectful dialogue.
          </p>
        </div>
      </div>
    </div>
  );
}
