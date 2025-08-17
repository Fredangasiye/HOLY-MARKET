// client/src/components/cultural-insights.tsx
import { Lightbulb } from "lucide-react";

const allWisdom = {
  zulu: [
    "In Zulu culture, lobola represents respect and appreciation for the bride's family.",
    "Negotiations often involve cattle, with each cow representing value and respect.",
    "The process strengthens relationships between the two families.",
    "Umabo ceremony often follows the lobola negotiations.",
    "Approach discussions with humility; it is about building bridges.",
  ],
  xhosa: [
    "Xhosa lobola practices emphasize the importance of family unity.",
    "Lobola is viewed as compensation to the bride's family for her upbringing.",
    "Community elders play important advisory roles; listen to them.",
    "The negotiations are seen as a way to bring two families together in harmony.",
    "Maintain open and honest communication throughout the process.",
  ],
  // Add other cultural groups here...
  pedi: [ /* Add 5 Pedi wisdom points here */ ],
  tswana: [ /* Add 5 Tswana wisdom points here */ ],
  sotho: [ /* Add 5 Sotho wisdom points here */ ],
  default: [
    "Lobola is not a purchase, but a bridge between families.",
    "Approach with deep respect and humility for African traditions.",
    "Listen more than you speak to understand expectations.",
    "Consider involving a cultural mediator or elder for guidance.",
    "Your actions today build the foundation for a lifetime of family relationships.",
  ]
};

export default function CulturalInsights({ insights }) {
  // We'll get the cultural group from the insights object
  const culturalGroup = insights?.group || 'default';
  const wisdomList = allWisdom[culturalGroup.toLowerCase()] || allWisdom.default;
  const groupName = culturalGroup.charAt(0).toUpperCase() + culturalGroup.slice(1);

  return (
    <div className="mt-6 pt-6 border-t-2">
      <h3 className="font-semibold text-lg pb-2 text-center flex items-center justify-center gap-2">
        <Lightbulb className="w-5 h-5" />
        Traditional Wisdom for the {groupName} Group
      </h3>
      <ul className="space-y-2 list-disc list-inside text-muted-foreground text-sm">
        {wisdomList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}