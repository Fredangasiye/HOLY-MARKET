import { useState } from "react";
import { MessageCircle, Heart, Lightbulb, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- YOUR ORIGINAL, DETAILED WISDOM DATA ---
const wisdomMessages = {
  zulu: [
    { id: "zulu-1", category: "tradition", title: "Ubuntu Philosophy", message: "Remember, umuntu ngumuntu ngabantu - a person is a person through other people. Lobola is not a transaction, but a joining of families.", icon: Users },
    { id: "zulu-2", category: "respect", title: "Respect for Elders", message: "Always approach the bride's father and uncles with respect. Say 'Sawubona baba' and listen more than you speak.", icon: Heart },
    { id: "zulu-3", category: "negotiation", title: "Patience in Negotiations", message: "Do not rush the process. Good things take time, like brewing traditional beer. Let discussions flow naturally.", icon: Lightbulb }
  ],
  xhosa: [
    { id: "xhosa-1", category: "tradition", title: "Ukuthwala Tradition", message: "Lobola shows that you value the bride and her family. It's about showing serious intentions, not buying a person.", icon: Heart },
    { id: "xhosa-2", category: "relationships", title: "Family Unity", message: "Remember, you're not just marrying her - you're joining her family. Build relationships with her siblings and cousins too.", icon: Users },
    { id: "xhosa-3", category: "negotiation", title: "Respectful Communication", message: "Speak with humility. Say 'Ndicela ukuthetha nawe tata' (May I speak with you, father) before beginning discussions.", icon: MessageCircle }
  ],
  // ... Add your other cultural groups here, following the same format ...
  default: [
    { id: "general-1", category: "respect", title: "Listen to Your Elders", message: "Your parents and uncles have wisdom from experience. Their guidance comes from love and knowledge of traditions.", icon: Users },
    { id: "general-2", category: "relationships", title: "Communication is Key", message: "Keep talking with your partner throughout this process. Make sure you're both comfortable with the arrangements.", icon: MessageCircle },
    { id: "general-3", category: "tradition", title: "Honor Both Families", message: "Remember that this process should bring families together, not drive them apart. Seek understanding and compromise.", icon: Heart }
  ]
};
// --- END OF YOUR DATA ---

export default function CulturalWisdom({ insights }) {
  // Safely get the selected cultural group, defaulting if necessary
  const culturalGroup = (insights && insights.group) ? insights.group.toLowerCase() : 'default';
  const wisdomList = wisdomMessages[culturalGroup] || wisdomMessages.default;

  // Use state to show one piece of wisdom at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextWisdom = () => {
    // Cycle through the wisdom messages for the selected group
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wisdomList.length);
  };

  const currentWisdom = wisdomList[currentIndex];
  const IconComponent = currentWisdom.icon;

  return (
    <Card className="mt-8 bg-secondary border-secondary-foreground/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          Words of Wisdom
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-background min-h-[120px]">
          <IconComponent className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-lg">{currentWisdom.title}</p>
            <p className="text-muted-foreground italic">"{currentWisdom.message}"</p>
            <Badge variant="outline" className="mt-2">{currentWisdom.category}</Badge>
          </div>
        </div>
        {wisdomList.length > 1 && (
          <button onClick={showNextWisdom} className="mt-4 w-full text-sm text-primary hover:underline">
            Show More Wisdom
          </button>
        )}
      </CardContent>
    </Card>
  );
}