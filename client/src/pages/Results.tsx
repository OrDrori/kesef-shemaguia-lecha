import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { assistancePrograms, charityOrganizations, type AssistanceProgram } from "@/data/programs";
import { type Answers, getAnswers } from "@/lib/answers";
import { 
  ChevronDown, 
  ExternalLink, 
  Phone, 
  Share2, 
  Target,
  Lightbulb,
  DollarSign,
  Rocket,
  Smartphone,
  MessageCircle,
  Users,
  UserRound,
  Heart,
  Clock,
  Building,
  Baby,
  Building2,
  Bus,
  Home,
  GraduationCap,
  Pill,
  BarChart,
  Banknote,
  Hospital,
  Landmark,
  Scale,
  Laptop,
  Receipt,
  Search,
  Trophy,
  Zap,
  BookOpen,
  Wheat,
  type LucideIcon
} from "lucide-react";

// Icon mapping for programs
const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Building,
  Baby,
  Building2,
  Lightbulb,
  Bus,
  Home,
  GraduationCap,
  Pill,
  BarChart,
  Banknote,
  Hospital,
  Landmark,
  Scale,
  Target,
  Laptop,
  Receipt,
  Search,
  Trophy,
  Zap,
  BookOpen,
  Wheat
};
import { useState } from "react";
import { useLocation } from "wouter";

export default function Results() {
  const [, navigate] = useLocation();
  const answers = getAnswers();

  // If no answers, redirect to home
  if (!answers || !answers.employment) {
    navigate('/');
    return null;
  }

  // Filter programs based on answers
  const relevantPrograms = assistancePrograms.filter((program) => {
    const { eligibility } = program;
    
    // Check employment status
    if (answers.employment === 'employed' && !eligibility.employed) return false;
    if (answers.employment === 'unemployed' && !eligibility.unemployed) return false;
    if (answers.employment === 'pensioner' && !eligibility.pensioner) return false;
    if (answers.employment === 'student' && !eligibility.student) return false;
    
    // Check children
    if (eligibility.hasChildren && answers.hasChildren !== 'yes') return false;
    
    // Check renting
    if (eligibility.renting && answers.housing !== 'rent') return false;
    
    // Check health
    if (eligibility.healthIssues && answers.health !== 'yes') return false;
    
    return true;
  });

  return (
    <>
      {/* Skip to main content link - WCAG 2.1 - 2.4.1 Bypass Blocks */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        דלג לתוכן הראשי
      </a>

      <div className="min-h-screen py-8 px-4">
        <main id="main-content" tabIndex={-1} className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-3">
              <Target className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />
              מצאנו לכם {relevantPrograms.length} דברים שכדאי לבדוק!
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              כל אחד מהדברים האלה יכולים לעזור לכם.
              <br />
              לחצו על כל אחד כדי לראות איך בודקים.
            </p>
          </header>

          {/* Level 2 Upgrade Card */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-200 dark:border-purple-800">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                </div>
              </div>
              <CardTitle className="text-3xl">רוצה תוצאות מדויקות יותר?</CardTitle>
              <CardDescription className="text-lg mt-2">
                ענו על עוד כמה שאלות ונחשב לכם בדיוק כמה כסף מגיע לכם!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white/60 dark:bg-black/20 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-foreground dark:text-gray-300 font-medium flex items-center justify-center gap-2">
                  <DollarSign className="w-5 h-5 text-secondary" aria-hidden="true" />
                  <span>
                    נחשב לכם: <strong>15,000-35,000 ₪ בשנה!</strong>
                  </span>
                </p>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
                  (בהתאם למצב הכלכלי שלכם)
                </p>
              </div>
              <Button
                size="lg"
                className="text-xl px-8 py-6 min-h-[60px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => navigate('/questionnaire-level2')}
                aria-label="עבור לשאלון מדויק - קבל תוצאות מדויקות"
              >
                <Rocket className="w-5 h-5 ml-2" aria-hidden="true" />
                כן! תנו לי תוצאות מדויקות
              </Button>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                רק 5 שאלות נוספות • לוקח 2 דקות
              </p>
            </CardContent>
          </Card>

          {/* Programs List */}
          <section aria-labelledby="programs-heading">
            <h2 id="programs-heading" className="sr-only">תוכניות סיוע זמינות</h2>
            <div className="space-y-4">
              {relevantPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </section>

          {/* WhatsApp Share */}
          <section aria-labelledby="share-heading" className="mt-12">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-2xl mx-auto">
              <h2 id="share-heading" className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <Smartphone className="w-6 h-6 text-primary" aria-hidden="true" />
                שמרו את זה לעצמכם
              </h2>
              <p className="text-muted-foreground mb-4 text-center">
                שלחו לעצמכם את התוצאות בוואטסאפ כדי שלא תשכחו
              </p>
              <Button
                size="lg"
                className="text-xl px-8 py-6 min-h-[60px] w-full sm:w-auto"
                onClick={() => {
                  const text = `היי! מצאנו כלי שבודק מה מגיע לנו מהמדינה.

הנה התוצאות שלי:
${relevantPrograms.map(p => `✓ ${p.title}`).join('\n')}

כנס לכאן: ${window.location.origin}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                aria-label="שלח תוצאות לוואטסאפ"
              >
                <Share2 className="w-5 h-5 ml-2" aria-hidden="true" />
                שלח לוואטסאפ
              </Button>
            </div>
          </section>

          {/* Success Stories */}
          <section aria-labelledby="stories-heading" className="mt-16 space-y-6">
            <h2 id="stories-heading" className="text-3xl font-bold text-center flex items-center justify-center gap-2">
              <MessageCircle className="w-8 h-8 text-primary" aria-hidden="true" />
              אנשים שזה עבד להם
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-primary/5">
                <article className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-lg italic text-foreground">
                        "לא האמנו שזה אמיתי. אבל עשינו את מה שהכלי אמר לנו,
                        ואחרי חודשיים קיבלנו 12,000 ₪ מהמדינה.
                        זה שינה לנו את החיים."
                      </blockquote>
                      <cite className="text-sm text-muted-foreground mt-2 block not-italic">
                        — דני, אב ל-3 ילדים, תל אביב
                      </cite>
                    </div>
                  </div>
                </article>
              </Card>
              <Card className="p-6 bg-primary/5">
                <article className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <UserRound className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-lg italic text-foreground">
                        "היינו בטוחים שלא מגיע לנו כלום. הכלי הראה לנו שאנחנו זכאים
                        להנחות בארנונה ובחשמל. זה חוסך לנו אלפים בשנה."
                      </blockquote>
                      <cite className="text-sm text-muted-foreground mt-2 block not-italic">
                        — רחל, פנסיונרית, חיפה
                      </cite>
                    </div>
                  </div>
                </article>
              </Card>
            </div>
          </section>

          {/* Additional Help Section */}
          <section aria-labelledby="help-heading" className="pt-8 space-y-6">
            <h2 id="help-heading" className="text-3xl font-bold text-center flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-secondary" aria-hidden="true" />
              צריך עזרה נוספת?
            </h2>
            
            <div className="space-y-6">
              {charityOrganizations.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      {(() => {
                        const IconComponent = iconMap[category.icon];
                        return IconComponent ? <IconComponent className="w-8 h-8 text-primary" aria-hidden="true" /> : <span className="text-3xl" aria-hidden="true">{category.icon}</span>;
                      })()}
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.organizations.map((org, idx) => (
                        <div key={idx} className="border-r-4 border-primary pr-4 space-y-1">
                          <div className="font-semibold text-lg">{org.name}</div>
                          <div className="text-muted-foreground">{org.description}</div>
                          <div className="flex flex-wrap gap-3 pt-2">
                            {('phone' in org) && org.phone && (
                              <a
                                href={`tel:${org.phone}`}
                                className="inline-flex items-center gap-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                                aria-label={`התקשר ל-${org.name}`}
                              >
                                <Phone className="w-4 h-4" aria-hidden="true" />
                                <span>{org.phone}</span>
                              </a>
                            )}
                            {org.url && (
                              <a
                                href={org.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-secondary rounded"
                                aria-label={`פתח אתר ${org.name} בחלון חדש`}
                              >
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                <span>אתר</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Start Over Button */}
          <div className="flex justify-center pt-8">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/')}
              className="text-xl px-8 py-6 min-h-[60px]"
              aria-label="התחל שאלון חדש מההתחלה"
            >
              התחל מחדש
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}

function ProgramCard({ program }: { program: AssistanceProgram }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger asChild>
          <CardHeader 
            className="cursor-pointer hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            role="button"
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'סגור' : 'פתח'} פרטים על ${program.title}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 flex items-center justify-center" aria-hidden="true">
                  {(() => {
                    const IconComponent = iconMap[program.icon];
                    return IconComponent ? <IconComponent className="w-10 h-10 text-primary" /> : <div className="text-4xl">{program.icon}</div>;
                  })()}
                </div>
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-2xl text-right">{program.title}</CardTitle>
                  <CardDescription className="text-lg space-y-1 text-right">
                    <div><strong>מה זה?</strong> {program.whatIsIt}</div>
                    <div><strong>כמה?</strong> {program.howMuch}</div>
                    <div><strong>למי?</strong> {program.forWhom}</div>
                  </CardDescription>
                </div>
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            <div className="bg-accent/50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold">איך בודקים?</h3>
              
              <ol className="space-y-3 list-none">
                {program.howToCheck.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold"
                      aria-label={`שלב ${idx + 1}`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 text-lg pt-0.5">{step}</div>
                  </li>
                ))}
              </ol>

              {program.howToCheck.url && (
                <div className="pt-2">
                  <Button
                    size="lg"
                    className="w-full text-xl min-h-[60px]"
                    asChild
                  >
                    <a
                      href={program.howToCheck.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`פתח אתר ${program.title} בחלון חדש`}
                    >
                      <ExternalLink className="w-5 h-5 ml-2" aria-hidden="true" />
                      פתחו את האתר
                    </a>
                  </Button>
                </div>
              )}

              {program.howToCheck.phone && (
                <div className="space-y-2">
                  <div className="font-semibold text-lg">צריך עזרה?</div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                    <a
                      href={`tel:${program.howToCheck.phone}`}
                      className="text-xl text-primary hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-primary rounded"
                      aria-label={`התקשר למספר ${program.howToCheck.phoneDisplay || program.howToCheck.phone}`}
                    >
                      {program.howToCheck.phoneDisplay || program.howToCheck.phone}
                    </a>
                  </div>
                  {program.howToCheck.hours && (
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{program.howToCheck.hours}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
