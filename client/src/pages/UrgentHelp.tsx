import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Phone } from "lucide-react";
import { Link } from "wouter";

export default function UrgentHelp() {
  const urgentOptions = [
    {
      title: "סלי מזון (היום)",
      description: "קבל אוכל היום - ללא המתנה",
      icon: "🍎",
      actions: [
        {
          type: "phone",
          label: "התקשר ללשכת הרווחה",
          value: "*8840",
          note: "שירות זמין 24/7"
        },
        {
          type: "link",
          label: "לשכת רווחה באזור שלך",
          url: "https://www.gov.il/he/departments/dynamiccollectors/molsa-social-departmentsd-list"
        }
      ]
    },
    {
      title: "קרן חירום (3-7 ימים)",
      description: "עד 5,000 ₪ למצבי חירום",
      icon: "💰",
      actions: [
        {
          type: "phone",
          label: "קרן עזרה ראשונה",
          value: "03-6878790"
        },
        {
          type: "phone",
          label: "לשכת רווחה - קרנות חירום",
          value: "118",
          note: "התקשרו למוקד 118 ובקשו חיבור ללשכת הרווחה"
        }
      ]
    },
    {
      title: "עזרה רפואית דחופה",
      description: "תרופות, ציוד רפואי, טיפולים",
      icon: "💊",
      actions: [
        {
          type: "phone",
          label: "עזר מציון",
          value: "1-800-800-800"
        },
        {
          type: "phone",
          label: "יד שרה",
          value: "02-500-5000"
        }
      ]
    },
    {
      title: "עזרה משפטית מיידית",
      description: "ייעוץ חינם למצבי חירום",
      icon: "⚖️",
      actions: [
        {
          type: "phone",
          label: "הסיוע המשפטי",
          value: "*6750"
        },
        {
          type: "link",
          label: "ייעוץ משפטי מקוון",
          url: "https://www.kolzchut.org.il"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 px-4 py-12">
      <div className="container max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="text-6xl">🚨</div>
          <h1 className="text-4xl md:text-5xl font-bold">
            עזרה דחופה
          </h1>
          <p className="text-xl text-muted-foreground">
            אני מבין שאתה צריך עזרה מהר. הנה דרכים לקבל תמיכה היום או בימים הקרובים.
          </p>
        </div>

        {/* Urgent options */}
        <div className="grid gap-6">
          {urgentOptions.map((option, index) => (
            <Card key={index} className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{option.icon}</div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-2xl font-bold">{option.title}</h3>
                  <p className="text-lg text-muted-foreground">{option.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {option.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="flex-1 min-w-[200px]">
                    {action.type === "phone" ? (
                      <a href={`tel:${action.value}`} className="block">
                        <Button className="w-full text-lg py-6" size="lg">
                          <Phone className="ml-2 h-5 w-5" />
                          {action.label}
                        </Button>
                        {'note' in action && action.note && (
                          <p className="text-sm text-muted-foreground mt-1 text-center">
                            {action.note}
                          </p>
                        )}
                      </a>
                    ) : action.type === "link" && 'url' in action ? (
                      <a href={action.url} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="outline" className="w-full text-lg py-6" size="lg">
                          <ExternalLink className="ml-2 h-5 w-5" />
                          {action.label}
                        </Button>
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional help */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">💬 צריך לדבר עם מישהו?</h3>
            <p className="text-muted-foreground">
              אם אתה במצב קשה ורוצה לדבר עם מישהו, יש אנשים שיכולים לעזור:
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:1201" className="block">
                <Button variant="outline" size="lg">
                  <Phone className="ml-2 h-5 w-5" />
                  קו סיוע ער"ן: 1201
                </Button>
              </a>
              <a href="tel:*8840" className="block">
                <Button variant="outline" size="lg">
                  <Phone className="ml-2 h-5 w-5" />
                  לשכת רווחה: *8840
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Back to main flow */}
        <div className="text-center space-y-4 pt-8">
          <p className="text-muted-foreground">
            רוצה לבדוק גם מה עוד מגיע לך לטווח הארוך?
          </p>
          <Link href="/">
            <Button variant="outline" size="lg" className="text-xl px-8 py-6">
              חזור לבדיקה המלאה
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
