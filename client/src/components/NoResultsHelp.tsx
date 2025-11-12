import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, HelpCircle } from "lucide-react";

export default function NoResultsHelp() {
  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <div className="text-center">
        <div className="text-5xl mb-4">🤝</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          לא מצאתם תוכניות מתאימות?
        </h3>
        <p className="text-gray-700 mb-6">
          יכול להיות שיש עוד תוכניות שמתאימות לכם. הנה כמה משאבים נוספים שיכולים לעזור:
        </p>

        <div className="space-y-3">
          <a 
            href="https://www.kolzchut.org.il/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="ml-2 h-4 w-4" />
              כל-זכות - מדריך זכויות מקיף
            </Button>
          </a>

          <a 
            href="https://www.gov.il/he/service/social_rights_information" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              <Search className="ml-2 h-4 w-4" />
              אתר Gov.il - זכויות סוציאליות
            </Button>
          </a>

          <a 
            href="https://www.btl.gov.il/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              <HelpCircle className="ml-2 h-4 w-4" />
              ביטוח לאומי - בדיקת זכאות
            </Button>
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-200">
          <p className="text-sm text-gray-600">
            💡 <strong>טיפ:</strong> נסו לחפש בגוגל "זכויות סוציאליות" + המצב שלכם (למשל: "זכויות סוציאליות משפחה חד הורית")
          </p>
        </div>
      </div>
    </Card>
  );
}
