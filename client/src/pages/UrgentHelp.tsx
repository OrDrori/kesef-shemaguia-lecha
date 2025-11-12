import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ExternalLink, 
  Phone, 
  AlertCircle,
  Apple,
  DollarSign,
  Pill,
  Scale,
  MessageCircle
} from "lucide-react";
import { Link } from "wouter";

export default function UrgentHelp() {
  const urgentOptions = [
    {
      title: "סלי מזון (היום)",
      description: "קבל אוכל היום - ללא המתנה",
      Icon: Apple,
      actions: [
        {
          type: "phone",
          label: "התקשר ללשכת הרווחה",
          value: "*8840",
          note: "שירות זמין 24/7"
        },
        {
          type: "link",
          label: "לשכת רווחה באזור שלכם",
          url: "https://www.gov.il/he/departments/dynamiccollectors/molsa-social-departmentsd-list"
        }
      ]
    },
    {
      title: "קרן חירום (3-7 ימים)",
      description: "עד 5,000 ₪ למצבי חירום",
      Icon: DollarSign,
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
      Icon: Pill,
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
      Icon: Scale,
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
    <>
      {/* Skip to main content link - WCAG 2.1 - 2.4.1 Bypass Blocks */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        דלג לתוכן הראשי
      </a>

      <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 px-4 py-12">
        <main id="main-content" tabIndex={-1} className="container max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-destructive" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              עזרה דחופה
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              אנחנו מבינים שאתם צריכים עזרה מהר. הנה דרכים לקבל תמיכה היום או בימים הקרובים.
            </p>
          </header>

          {/* Urgent options */}
          <section aria-labelledby="urgent-options-heading">
            <h2 id="urgent-options-heading" className="sr-only">אפשרויות עזרה דחופה</h2>
            <div className="grid gap-6">
              {urgentOptions.map((option, index) => (
                <Card key={index} className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <option.Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{option.title}</h3>
                      <p className="text-lg text-muted-foreground">{option.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {option.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex-1 min-w-[200px]">
                        {action.type === "phone" ? (
                          <div>
                            <a href={`tel:${action.value}`}>
                              <Button 
                                className="w-full text-lg py-6 min-h-[60px]" 
                                size="lg"
                                aria-label={`התקשר ל-${action.label} - ${action.value}`}
                              >
                                <Phone className="w-5 h-5 ml-2" aria-hidden="true" />
                                {action.label}
                              </Button>
                            </a>
                            {'note' in action && action.note && (
                              <p className="text-sm text-muted-foreground mt-2 text-center">
                                {action.note}
                              </p>
                            )}
                          </div>
                        ) : action.type === "link" && 'url' in action ? (
                          <a 
                            href={action.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button 
                              variant="outline" 
                              className="w-full text-lg py-6 min-h-[60px]" 
                              size="lg"
                              aria-label={`${action.label} - נפתח בחלון חדש`}
                            >
                              <ExternalLink className="w-5 h-5 ml-2" aria-hidden="true" />
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
          </section>

          {/* Additional help */}
          <section aria-labelledby="talk-heading">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <h2 id="talk-heading" className="text-xl font-bold flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" aria-hidden="true" />
                  צריך לדבר עם מישהו?
                </h2>
                <p className="text-muted-foreground">
                  אם אתם במצב קשה ורוצים לדבר עם מישהו, יש אנשים שיכולים לעזור:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:1201">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="min-h-[60px]"
                      aria-label="התקשר לקו סיוע ער״ן - 1201"
                    >
                      <Phone className="w-5 h-5 ml-2" aria-hidden="true" />
                      קו סיוע ער״ן: 1201
                    </Button>
                  </a>
                  <a href="tel:*8840">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="min-h-[60px]"
                      aria-label="התקשר ללשכת רווחה - *8840"
                    >
                      <Phone className="w-5 h-5 ml-2" aria-hidden="true" />
                      לשכת רווחה: *8840
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </section>

          {/* Back to main flow */}
          <div className="text-center space-y-4 pt-8">
            <p className="text-muted-foreground">
              רוצים לבדוק גם מה עוד מגיע לכם לטווח הארוך?
            </p>
            <Link href="/">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-8 py-6 min-h-[60px]"
                aria-label="חזור לדף הבית לבדיקה מלאה"
              >
                חזור לבדיקה המלאה
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
