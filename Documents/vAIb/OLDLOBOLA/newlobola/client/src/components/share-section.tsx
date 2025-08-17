import { useState } from "react";
import { Share2, MessageCircle, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { CalculationResult } from "shared/schema";

interface ShareSectionProps {
  results: CalculationResult;
}

export default function ShareSection({ results }: ShareSectionProps) {
  const { toast } = useToast();

  const shareWhatsApp = () => {
    const message = `Ubuntu Lobola Guide Results: ${results.amount}\n\nCalculated using respectful cultural guidance. Learn more at ${window.location.origin}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareGeneral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ubuntu Lobola Guide Results',
          text: 'Check out my cultural guidance results from Ubuntu Lobola Guide',
          url: window.location.href
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "The link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Copy Failed",
          description: "Unable to copy link to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Share2 className="text-warm-orange mr-3" />
        Share Results
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={shareWhatsApp}
          className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">WhatsApp</span>
        </Button>
        <Button 
          onClick={shareGeneral}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Link className="h-4 w-4" />
          <span className="text-sm">Copy Link</span>
        </Button>
      </div>
    </div>
  );
}
