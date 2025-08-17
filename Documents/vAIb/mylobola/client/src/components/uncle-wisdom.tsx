import { useState } from "react";
import { MessageCircle, Heart, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSimpleTranslation, type Language } from "@/lib/simple-translations";

interface UncleWisdomProps {
  culturalGroup?: string;
  currentLanguage?: Language;
}

interface WisdomMessage {
  id: string;
  category: "tradition" | "relationships" | "negotiation" | "respect";
  title: string;
  message: string;
  culturalContext: string;
  icon: typeof Heart;
  color: string;
}

const wisdomMessages: Record<string, WisdomMessage[]> = {
  zulu: [
    {
      id: "zulu-1",
      category: "tradition",
      title: "Ubuntu Philosophy",
      message: "Remember, umuntu ngumuntu ngabantu - a person is a person through other people. Lobola is not a transaction, but a joining of families.",
      culturalContext: "This reflects the Zulu understanding that marriage unites communities, not just individuals.",
      icon: Users,
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: "zulu-2", 
      category: "respect",
      title: "Respect for Elders",
      message: "Always approach the bride's father and uncles with respect. Say 'Sawubona baba' and listen more than you speak.",
      culturalContext: "In Zulu culture, proper protocols must be followed when discussing lobola with elders.",
      icon: Heart,
      color: "bg-green-50 border-green-200"
    },
    {
      id: "zulu-3",
      category: "negotiation",
      title: "Patience in Negotiations",
      message: "Do not rush the process. Good things take time, like brewing traditional beer. Let discussions flow naturally.",
      culturalContext: "Zulu negotiations are relationship-building exercises that strengthen family bonds.",
      icon: Lightbulb,
      color: "bg-yellow-50 border-yellow-200"
    }
  ],
  xhosa: [
    {
      id: "xhosa-1",
      category: "tradition",
      title: "Ukuthwala Tradition",
      message: "Lobola shows that you value the bride and her family. It's about showing serious intentions, not buying a person.",
      culturalContext: "Xhosa culture emphasizes the symbolic nature of lobola as respect and commitment.",
      icon: Heart,
      color: "bg-red-50 border-red-200"
    },
    {
      id: "xhosa-2",
      category: "relationships",
      title: "Family Unity",
      message: "Remember, you're not just marrying her - you're joining her family. Build relationships with her siblings and cousins too.",
      culturalContext: "Xhosa marriages create extended family networks that last generations.",
      icon: Users,
      color: "bg-purple-50 border-purple-200"
    },
    {
      id: "xhosa-3",
      category: "negotiation",
      title: "Respectful Communication",
      message: "Speak with humility. Say 'Ndicela ukuthetha nawe tata' (May I speak with you, father) before beginning discussions.",
      culturalContext: "Proper address and respect are fundamental in Xhosa lobola discussions.",
      icon: MessageCircle,
      color: "bg-blue-50 border-blue-200"
    }
  ],
  pedi: [
    {
      id: "pedi-1",
      category: "tradition",
      title: "Ancestral Blessings",
      message: "Remember to honor your ancestors throughout this process. They guide your decisions and bless your union.",
      culturalContext: "Pedi culture emphasizes ancestral approval in marriage arrangements.",
      icon: Heart,
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      id: "pedi-2",
      category: "respect",
      title: "Proper Protocols",
      message: "Always bring your uncles to speak on your behalf. A young man does not negotiate his own lobola directly.",
      culturalContext: "Pedi tradition requires male elders to represent the groom in negotiations.",
      icon: Users,
      color: "bg-green-50 border-green-200"
    }
  ],
  tswana: [
    {
      id: "tswana-1",
      category: "tradition",
      title: "Bogadi Meaning",
      message: "Bogadi is about showing gratitude to the bride's family for raising such a wonderful daughter.",
      culturalContext: "Tswana culture views bogadi as appreciation and respect for the bride's upbringing.",
      icon: Heart,
      color: "bg-pink-50 border-pink-200"
    },
    {
      id: "tswana-2",
      category: "relationships",
      title: "Community Support",
      message: "Involve your community in supporting your marriage. A strong marriage needs community backing.",
      culturalContext: "Tswana marriages are community celebrations supported by extended networks.",
      icon: Users,
      color: "bg-orange-50 border-orange-200"
    }
  ],
  sotho: [
    {
      id: "sotho-1",
      category: "tradition",
      title: "Bohali Tradition",
      message: "Bohali represents your commitment and ability to care for your wife and future children.",
      culturalContext: "Sotho culture sees bohali as demonstration of responsibility and readiness for marriage.",
      icon: Heart,
      color: "bg-teal-50 border-teal-200"
    },
    {
      id: "sotho-2",
      category: "negotiation",
      title: "Fair Discussions",
      message: "Be honest about your means. A fair bohali that you can afford is better than overpromising.",
      culturalContext: "Sotho elders value honesty and realistic commitments in bohali negotiations.",
      icon: Lightbulb,
      color: "bg-amber-50 border-amber-200"
    }
  ]
};

const generalWisdom: WisdomMessage[] = [
  {
    id: "general-1",
    category: "respect",
    title: "Listen to Your Elders",
    message: "Your parents and uncles have wisdom from experience. Their guidance comes from love and knowledge of traditions.",
    culturalContext: "Across all South African cultures, elder wisdom is highly valued in marriage matters.",
    icon: Users,
    color: "bg-gray-50 border-gray-200"
  },
  {
    id: "general-2",
    category: "relationships",
    title: "Communication is Key",
    message: "Keep talking with your partner throughout this process. Make sure you're both comfortable with the arrangements.",
    culturalContext: "Modern relationships require open communication while honoring cultural traditions.",
    icon: MessageCircle,
    color: "bg-blue-50 border-blue-200"
  },
  {
    id: "general-3",
    category: "tradition",
    title: "Honor Both Families",
    message: "Remember that this process should bring families together, not drive them apart. Seek understanding and compromise.",
    culturalContext: "The goal of lobola is family unity and mutual respect across cultures.",
    icon: Heart,
    color: "bg-rose-50 border-rose-200"
  }
];

export default function UncleWisdom({ culturalGroup = "", currentLanguage = "en" }: UncleWisdomProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showWisdom, setShowWisdom] = useState(false);
  const t = getSimpleTranslation(currentLanguage);

  const getWisdomMessages = () => {
    const culturalMessages = wisdomMessages[culturalGroup] || [];
    return [...culturalMessages, ...generalWisdom];
  };

  const messages = getWisdomMessages();
  const currentMessage = messages[currentMessageIndex];

  const nextMessage = () => {
    setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentMessageIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      tradition: "Traditional Wisdom",
      relationships: "Relationship Advice", 
      negotiation: "Negotiation Tips",
      respect: "Cultural Respect"
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      tradition: "bg-forest-green text-white",
      relationships: "bg-warm-orange text-white",
      negotiation: "bg-golden-yellow text-gray-800",
      respect: "bg-purple-600 text-white"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500 text-white";
  };

  if (!showWisdom) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-forest-green">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-forest-green/10 p-3 rounded-full">
              <MessageCircle className="text-forest-green w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Uncle Wisdom Mode</h3>
              <p className="text-sm text-gray-600">Get traditional advice and cultural insights</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowWisdom(true)}
            className="bg-forest-green hover:bg-forest-green/90 text-white"
          >
            Get Wisdom
          </Button>
        </div>
      </div>
    );
  }

  if (!currentMessage) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">No wisdom messages available. Please select a cultural group first.</p>
      </div>
    );
  }

  const IconComponent = currentMessage.icon;

  return (
    <Card className="bg-white shadow-lg border-l-4 border-forest-green">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-forest-green/10 p-2 rounded-full">
              <MessageCircle className="text-forest-green w-5 h-5" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">Uncle Wisdom</CardTitle>
          </div>
          <Badge className={getCategoryColor(currentMessage.category)}>
            {getCategoryLabel(currentMessage.category)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg border-2 ${currentMessage.color}`}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <IconComponent className="w-5 h-5 text-gray-600" />
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">{currentMessage.title}</h4>
              <p className="text-gray-700 leading-relaxed">{currentMessage.message}</p>
              <div className="bg-white/50 p-3 rounded border-l-2 border-gray-300">
                <p className="text-xs text-gray-600 italic">
                  <strong>Cultural Context:</strong> {currentMessage.culturalContext}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            <Button 
              onClick={prevMessage}
              variant="outline" 
              size="sm"
              disabled={messages.length <= 1}
            >
              Previous
            </Button>
            <Button 
              onClick={nextMessage}
              variant="outline" 
              size="sm"
              disabled={messages.length <= 1}
            >
              Next Wisdom
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">
              {currentMessageIndex + 1} of {messages.length}
            </span>
            <Button 
              onClick={() => setShowWisdom(false)}
              variant="ghost" 
              size="sm"
              className="text-gray-500"
            >
              Close
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}