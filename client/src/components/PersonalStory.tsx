import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';

export default function PersonalStory() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 md:p-8">
      <h2 id="personal-story-heading" className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
        <Heart className="w-8 h-8 text-secondary fill-secondary" aria-hidden="true" />
        למה בניתי את זה?
      </h2>

      {/* תמיד מוצג - הנקודות הפוגעות */}
      <div className="space-y-4 text-lg leading-relaxed">
        <p className="font-semibold text-gray-800">
          שלום, אני אור דרורי.
        </p>
        
        <p className="text-gray-700">
          <strong>הייתי שם.</strong> יודע מה זה להתעורר בלילה ולא לדעת איך לשלם חשבונות. 
          יודע מה זה להרגיש שהעולם לא מבין אותך, ושאף אחד לא באמת רואה את הקושי שלך.
        </p>

        <p className="text-gray-700">
          <strong>ראיתי אנשים טובים</strong> - אנשים שעובדים קשה, שמנסים, שלא מוותרים - 
          אבל הבירוקרטיה מנצחת אותם. כל טופס, כל קישור שבור, כל מילה מסובכת... 
          זה עוד סיבה לוותר.
        </p>

        <p className="text-gray-700 font-semibold">
          <strong>אז בניתי את זה.</strong> לא בשבילי - בשבילך.
        </p>

        {isExpanded && (
          <div id="personal-story-full" className="space-y-4 mt-4 pt-4 border-t-2 border-green-200">
            <p className="text-gray-700">
              אני לא מבטיח לך כלום. לא כל תוכנית תתאים לך, ולא תמיד תקבל את מה שאתה צריך. 
              אבל אני <strong>מבטיח לך</strong> שאני אנסה. שאני אמשיך לחפש. שאני לא אעזוב אותך.
            </p>

            <p className="text-gray-700">
              הכלי הזה הוא רק ההתחלה. אני בונה קהילה - מקום שבו אנשים שהיו "שם" 
              עוזרים לאנשים שנמצאים "שם" עכשיו. מקום שבו אף אחד לא לבד.
            </p>

            <p className="text-gray-700">
              <strong>זה בחינם לגמרי. תמיד.</strong> אני לא רוצה את הכסף שלך. 
              אני רוצה שתקבל את הכסף <em>שמגיע לך</em>.
            </p>

            <div className="bg-white rounded-lg p-4 mt-4">
              <ul className="text-sm text-gray-600 space-y-2" role="list">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0" aria-hidden="true" />
                  <span>אנחנו לא שומרים מידע אישי</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0" aria-hidden="true" />
                  <span>אנחנו לא מוכרים כלום</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0" aria-hidden="true" />
                  <span>אנחנו לא מקבל עמלה</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 italic">
              זה פשוט החסד שלי. זה מה שאני מאמין בו.
            </p>

            <p className="text-gray-700 font-semibold text-center mt-6 flex items-center justify-center gap-2">
              אז בוא נתחיל. ביחד.
              <Heart className="w-5 h-5 text-secondary fill-secondary" aria-hidden="true" />
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-green-700 hover:text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-expanded={isExpanded}
            aria-controls="personal-story-full"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="ml-2 h-5 w-5" />
                הצג פחות
              </>
            ) : (
              <>
                <ChevronDown className="ml-2 h-5 w-5" />
                קרא עוד - הסיפור המלא
              </>
            )}
          </Button>
        </div>

        {/* Call to action */}
        {!isExpanded && (
          <div className="text-center mt-6 pt-6 border-t-2 border-green-200">
            <p className="text-gray-700 font-semibold mb-4">
              מוכן לראות מה מגיע לך?
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xl px-8 py-6 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => window.location.href = '/questionnaire'}
              aria-label="התחל שאלון לבדיקת זכאות"
            >
              <ArrowLeft className="w-5 h-5 ml-2" aria-hidden="true" />
              בוא נתחיל
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
