import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { assistancePrograms, charityOrganizations, type AssistanceProgram } from "@/data/programs";
import { type Answers, getAnswers } from "@/lib/answers";
import { ChevronDown, ExternalLink, Phone, Share2 } from "lucide-react";
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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            מצאנו לכם {relevantPrograms.length} דברים שכדאי לבדוק! 🎯
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            כל אחד מהדברים האלה יכול לעזור לכם.
            <br />
            לחצו על כל אחד כדי לראות איך בודקים.
          </p>
        </div>

        {/* Level 2 Upgrade Card */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-6xl">💡</div>
            </div>
            <CardTitle className="text-3xl">רוצה תוצאות מדויקות יותר?</CardTitle>
            <CardDescription className="text-lg mt-2">
              ענו על עוד כמה שאלות ונחשב לכם בדיוק כמה כסף מגיע לכם!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-white/60 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-gray-700 font-medium">
                💰 נחשב לכם: <strong>15,000-35,000 ₪ בשנה!</strong>
                <br />
                <span className="text-sm text-gray-600">
                  (בהתאם למצב הכלכלי שלכם)
                </span>
              </p>
            </div>
            <Button
              size="lg"
              className="text-xl px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => navigate('/questionnaire-level2')}
            >
              🚀 כן! תנ לי תוצאות מדויקות
            </Button>
            <p className="text-sm text-gray-500">
              רק 5 שאלות נוספות • לוקח 2 דקות
            </p>
          </CardContent>
        </Card>

        {/* Programs List */}
        <div className="space-y-4">
          {relevantPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* WhatsApp Share */}
        <div className="mt-12 text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">📱 שמור את זה לעצמך</h3>
            <p className="text-muted-foreground mb-4">
              שלח לעצמך את התוצאות בוואטסאפ כדי שלא תשכח
            </p>
            <Button
              size="lg"
              className="text-xl px-8 py-6"
              onClick={() => {
                const text = `היי! מצאתי כלי שבודק מה מגיע לי מהמדינה.

הנה התוצאות שלי:
${relevantPrograms.map(p => `✓ ${p.title}`).join('\n')}

כנס לכאן: ${window.location.origin}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
            >
              <Share2 className="ml-2 h-5 w-5" />
              שלח לוואטסאפ
            </Button>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold text-center">💬 אנשים שזה עבד להם</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-primary/5">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👨‍👩‍👧‍👦</div>
                  <div className="flex-1">
                    <blockquote className="text-lg italic">
                      "לא האמנתי שזה אמיתי. אבל עשיתי את מה שהכלי אמר לי,
                      ואחרי חודשיים קיבלתי 12,000 ₪ מהמדינה.
                      זה שינה לנו את החיים."
                    </blockquote>
                    <cite className="text-sm text-muted-foreground mt-2 block">
                      — דני, אב ל-3 ילדים, תל אביב
                    </cite>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-primary/5">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">👵</div>
                  <div className="flex-1">
                    <blockquote className="text-lg italic">
                      "הייתי בטוחה שלא מגיע לי כלום. הכלי הראה לי שאני זכאית
                      להנחות בארנונה ובחשמל. זה חוסך לי אלפים בשנה."
                    </blockquote>
                    <cite className="text-sm text-muted-foreground mt-2 block">
                      — רחל, פנסיונרית, חיפה
                    </cite>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="pt-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">צריך עזרה נוספת? 💙</h2>
          
          <div className="space-y-6">
            {charityOrganizations.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span>{category.icon}</span>
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
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              <Phone className="w-4 h-4" />
                              <span>{org.phone}</span>
                            </a>
                          )}
                          {org.url && (
                            <a
                              href={org.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-secondary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
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
        </div>

        {/* Start Over Button */}
        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/')}
            className="text-xl px-8 py-6"
          >
            התחל מחדש
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProgramCard({ program }: { program: AssistanceProgram }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-4xl">{program.icon}</div>
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <CardDescription className="text-lg space-y-1">
                    <div><strong>מה זה?</strong> {program.whatIsIt}</div>
                    <div><strong>כמה?</strong> {program.howMuch}</div>
                    <div><strong>למי?</strong> {program.forWhom}</div>
                  </CardDescription>
                </div>
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            <div className="bg-accent/50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold">איך בודקים?</h3>
              
              <div className="space-y-3">
                {program.howToCheck.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 text-lg pt-0.5">{step}</div>
                  </div>
                ))}
              </div>

              {program.howToCheck.url && (
                <div className="pt-2">
                  <Button
                    size="lg"
                    className="w-full text-xl"
                    asChild
                  >
                    <a
                      href={program.howToCheck.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 ml-2" />
                      פתח את האתר
                    </a>
                  </Button>
                </div>
              )}

              {program.howToCheck.phone && (
                <div className="space-y-2">
                  <div className="font-semibold text-lg">צריך עזרה?</div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    <a
                      href={`tel:${program.howToCheck.phone}`}
                      className="text-xl text-primary hover:underline font-semibold"
                    >
                      {program.howToCheck.phoneDisplay || program.howToCheck.phone}
                    </a>
                  </div>
                  {program.howToCheck.hours && (
                    <div className="text-muted-foreground">
                      ⏰ {program.howToCheck.hours}
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
