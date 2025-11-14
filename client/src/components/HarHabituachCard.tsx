import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mountain } from "lucide-react";

export default function HarHabituachCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
      <div className="flex items-start gap-4">
        <Mountain className="w-12 h-12 text-blue-600" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            הר הביטוח - סדר בתיק הביטוחי
          </h3>
          <p className="text-gray-700 mb-4">
            אתר ממשלתי **חינמי** שמראה לכם את כל הביטוחים שלכם במקום אחד ועוזר למצוא ביטוחים מיותרים שאתם משלמים עליהם בלי לדעת.
          </p>
          
          <div className="bg-white/70 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">מה האתר עושה?</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✅ מאגד את כל הפוליסות מכל חברות הביטוח</li>
              <li>✅ מזהה כפל ביטוח (בזבוז כסף!)</li>
              <li>✅ מציג את המחירים שאתם משלמים</li>
              <li>✅ עוזר להשוות ולחסוך כסף</li>
            </ul>
          </div>

          <a 
            href="https://harb.cma.gov.il/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="w-full sm:w-auto">
              <ExternalLink className="ml-2 h-4 w-4" />
              כניסה להר הביטוח (חינם!)
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
