import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Home, Users, Phone } from "lucide-react";

export default function DesignComparison() {
  const variations = [
    {
      id: 1,
      name: "רך וממוקד",
      description: "צבעים פסטליים, spacing מקסימלי, מרגיע ותומך",
      colors: {
        primary: "hsl(200, 80%, 85%)",
        secondary: "hsl(340, 60%, 90%)",
        accent: "hsl(160, 50%, 85%)",
        background: "hsl(0, 0%, 98%)",
      }
    },
    {
      id: 2,
      name: "ממשלתי נקי",
      description: "בהשראת Gov.il - מקצועי, נקי, אמין",
      colors: {
        primary: "hsl(210, 100%, 45%)",
        secondary: "hsl(210, 15%, 92%)",
        accent: "hsl(200, 80%, 50%)",
        background: "hsl(210, 20%, 98%)",
      }
    },
    {
      id: 3,
      name: "חם ותומך",
      description: "צבעים חמים, ידידותי ומזמין",
      colors: {
        primary: "hsl(25, 90%, 60%)",
        secondary: "hsl(45, 85%, 75%)",
        accent: "hsl(15, 80%, 65%)",
        background: "hsl(30, 40%, 98%)",
      }
    },
    {
      id: 4,
      name: "מינימליסטי",
      description: "רק מה שצריך - נקי, פשוט, ללא הסחות דעת",
      colors: {
        primary: "hsl(0, 0%, 20%)",
        secondary: "hsl(0, 0%, 96%)",
        accent: "hsl(0, 0%, 30%)",
        background: "hsl(0, 0%, 100%)",
      }
    },
    {
      id: 5,
      name: "נגיש מקסימלי",
      description: "ניגודיות גבוהה, פונטים ענקיים, קריאות מקסימלית",
      colors: {
        primary: "hsl(220, 100%, 35%)",
        secondary: "hsl(0, 0%, 95%)",
        accent: "hsl(140, 100%, 30%)",
        background: "hsl(0, 0%, 100%)",
      }
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">השוואת סגנונות עיצוב</h1>
          <p className="text-xl text-muted-foreground">
            5 וריאציות שונות - מותאמות לקהל היעד (החלשים ביותר בחברה)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {variations.map((variation) => (
            <div key={variation.id} className="space-y-4">
              {/* Header */}
              <Card className="p-6 bg-white">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    וריאציה {variation.id}
                  </div>
                  <div className="text-lg font-semibold mb-2">
                    {variation.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {variation.description}
                  </div>
                </div>
              </Card>

              {/* Color Palette */}
              <Card className="p-4 bg-white">
                <div className="text-sm font-semibold mb-3 text-center">פלטת צבעים</div>
                <div className="space-y-2">
                  <div 
                    className="h-12 rounded flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: variation.colors.primary }}
                  >
                    ראשי
                  </div>
                  <div 
                    className="h-12 rounded flex items-center justify-center text-foreground text-xs font-medium"
                    style={{ backgroundColor: variation.colors.secondary }}
                  >
                    משני
                  </div>
                  <div 
                    className="h-12 rounded flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: variation.colors.accent }}
                  >
                    הדגשה
                  </div>
                </div>
              </Card>

              {/* Buttons */}
              <Card className="p-4 bg-white">
                <div className="text-sm font-semibold mb-3 text-center">כפתורים</div>
                <div className="space-y-2">
                  <button 
                    className="w-full py-3 px-4 rounded text-white font-medium text-sm"
                    style={{ backgroundColor: variation.colors.primary }}
                  >
                    כפתור ראשי
                  </button>
                  <button 
                    className="w-full py-3 px-4 rounded border-2 font-medium text-sm"
                    style={{ 
                      borderColor: variation.colors.primary,
                      color: variation.colors.primary 
                    }}
                  >
                    כפתור משני
                  </button>
                </div>
              </Card>

              {/* Card Example */}
              <Card className="p-4 bg-white">
                <div className="text-sm font-semibold mb-3 text-center">דוגמת כרטיס</div>
                <div 
                  className="p-4 rounded border"
                  style={{ borderColor: variation.colors.secondary }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5" style={{ color: variation.colors.primary }} />
                    <span className="font-semibold text-sm">כותרת</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    זהו טקסט לדוגמה שמראה איך נראה תוכן בכרטיס. הטקסט צריך להיות קריא ונוח לעין.
                  </p>
                  <button 
                    className="w-full py-2 px-3 rounded text-white text-xs font-medium"
                    style={{ backgroundColor: variation.colors.accent }}
                  >
                    לחצו כאן
                  </button>
                </div>
              </Card>

              {/* Typography */}
              <Card className="p-4 bg-white">
                <div className="text-sm font-semibold mb-3 text-center">טיפוגרפיה</div>
                <div className="space-y-2">
                  <div className="text-lg font-bold">כותרת ראשית</div>
                  <div className="text-base font-semibold">כותרת משנית</div>
                  <div className="text-sm">טקסט רגיל לקריאה</div>
                  <div className="text-xs text-muted-foreground">טקסט קטן</div>
                </div>
              </Card>

              {/* Icons */}
              <Card className="p-4 bg-white">
                <div className="text-sm font-semibold mb-3 text-center">אייקונים</div>
                <div className="flex justify-around">
                  <Home className="h-6 w-6" style={{ color: variation.colors.primary }} />
                  <Users className="h-6 w-6" style={{ color: variation.colors.primary }} />
                  <Phone className="h-6 w-6" style={{ color: variation.colors.primary }} />
                  <Heart className="h-6 w-6" style={{ color: variation.colors.primary }} />
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-white max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">המלצות לבחירה</h2>
            <div className="text-right space-y-3 text-foreground">
              <p><strong>וריאציה 1 (רך וממוקד):</strong> מתאים למי שצריך סביבה מרגיעה מאוד</p>
              <p><strong>וריאציה 2 (ממשלתי נקי):</strong> מתאים למי שרגיל לאתרי ממשלה ואוהב מראה מקצועי</p>
              <p><strong>וריאציה 3 (חם ותומך):</strong> מתאים למי שצריך תחושה של חום ותמיכה</p>
              <p><strong>וריאציה 4 (מינימליסטי):</strong> מתאים למי שרוצה רק את המידע, ללא הסחות דעת</p>
              <p><strong>וריאציה 5 (נגיש מקסימלי):</strong> מתאים למי שיש לו בעיות ראייה או צריך פונטים גדולים</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
