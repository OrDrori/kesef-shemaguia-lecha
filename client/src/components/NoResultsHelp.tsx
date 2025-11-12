import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, ExternalLink } from "lucide-react";

export default function NoResultsHelp() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/972533030931?text=שלום, לא מצאתי תוכניות רלוונטיות באתר ואשמח לעזרה', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:0533030931';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <div className="text-center">
        <div className="text-5xl mb-4">🤝</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          לא מצאתם תוכניות מתאימות?
        </h3>
        <p className="text-gray-700 mb-6">
          אנחנו כאן לעזור! יכול להיות שיש עוד תוכניות שמתאימות לכם שלא הופיעו כאן.
        </p>

        <div className="space-y-3">
          <Button 
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="ml-2 h-4 w-4" />
            שלחו לנו הודעה בוואטסאפ
          </Button>

          <Button 
            onClick={handleCall}
            variant="outline"
            className="w-full"
          >
            <Phone className="ml-2 h-4 w-4" />
            התקשרו אלינו: 053-303-0931
          </Button>

          <div className="pt-4 border-t border-amber-200">
            <p className="text-sm text-gray-600 mb-3">
              עוד דרכים לקבל עזרה:
            </p>
            <a 
              href="https://www.kolzchut.org.il/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="ml-1 h-3 w-3" />
              כל-זכות - מדריך זכויות מקיף
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
