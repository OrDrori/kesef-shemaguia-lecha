import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { assistancePrograms, charityOrganizations, type AssistanceProgram } from "@/data/programs";
import { type Answers, getAnswers } from "@/lib/answers";
import { ChevronDown, ExternalLink, Phone, Share2, Instagram, BookOpen, Pill, Coins, User } from "lucide-react";
import IconRenderer from "@/components/IconRenderer";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trackCompletion } from "@/lib/api";
import { trackPageView, trackProgramView, trackProgramClick, trackWhatsAppShare } from "@/lib/analytics";

export default function Results() {
  const [, navigate] = useLocation();
  const answers = getAnswers();

  // If no answers, redirect to home
  if (!answers || !answers.employment) {
    navigate('/');
    return null;
  }

  // Track page view and scroll to top when component mounts
  useEffect(() => {
    trackPageView('results');
    window.scrollTo(0, 0);
  }, []);

  // Track completion (only once)
  useEffect(() => {
    trackCompletion(answers);
  }, []);

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

  // Categorize programs
  const moneyPrograms = relevantPrograms.filter(p => p.category === 'money');
  const discountPrograms = relevantPrograms.filter(p => p.category === 'discounts');
  const housingPrograms = relevantPrograms.filter(p => p.category === 'housing');
  const educationPrograms = relevantPrograms.filter(p => p.category === 'education');
  const healthPrograms = relevantPrograms.filter(p => p.category === 'health');

  // Get top 3 most important programs
  const top3Programs = relevantPrograms.slice(0, 3);

  // Calculate estimated amount (rough estimate)
  const estimatedMin = relevantPrograms.length * 1500;
  const estimatedMax = relevantPrograms.length * 3500;

  return (
    <>
      <Header />
      <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 relative">
          {/* Success illustration */}
          <div className="mx-auto w-48 h-48 mb-4 rounded-full overflow-hidden border-4 border-green-200">
            <img src="/success-illustration.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            מצאנו לכם {relevantPrograms.length} דרכים לקבל כסף וסיוע!
          </h1>
          
          {/* Estimated amount */}
          {relevantPrograms.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <p className="text-2xl md:text-3xl font-bold text-green-700">
                סכום משוער: {estimatedMin.toLocaleString()}-{estimatedMax.toLocaleString()} ₪ בשנה
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                (בהתאם למצב הכלכלי שלכם והתוכניות שתקבלו)
              </p>
            </div>
          )}

          <p className="text-xl md:text-2xl text-muted-foreground">
            לחצו על כל תוכנית כדי לראות איך מקבלים אותה
          </p>
        </div>

        {/* Top 3 - Most Important */}
        {top3Programs.length > 0 && (
          <div className="space-y-4 stagger-children">
            <h2 className="text-3xl font-bold text-center">הכי חשוב לכם עכשיו</h2>
            <div className="space-y-4">
              {top3Programs.map((program) => (
                <ProgramCard key={program.id} program={program} highlighted />
              ))}
            </div>
          </div>
        )}

        {/* Money Programs */}
        {moneyPrograms.length > 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Coins className="w-6 h-6" />
              כסף נוסף שאפשר לקבל
            </h2>
            <div className="space-y-4">
              {moneyPrograms.slice(3).map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {/* Discounts & Benefits */}
        {discountPrograms.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">הנחות וטבות</h2>
            <div className="space-y-4">
              {discountPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {/* Housing */}
        {housingPrograms.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold"> דיור</h2>
            <div className="space-y-4">
              {housingPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educationPrograms.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6" /><span>חינוך</span></h2>
            <div className="space-y-4">
              {educationPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {/* Health */}
        {healthPrograms.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2"><Pill className="w-6 h-6" /><span>בריאות</span></h2>
            <div className="space-y-4">
              {healthPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {/* Charity Organizations - PROMINENT! */}
        <div className="space-y-4 mt-12 pt-8 border-t-2 border-primary/20">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-3xl font-bold">צריכים עזרה נוספת?</h2>
            <p className="text-xl text-muted-foreground">
              ארגוני סיוע שיכולים לעזור לכם
            </p>
          </div>

          {charityOrganizations.map((category) => (
            <div key={category.category} className="space-y-4">
              <h3 className="text-2xl font-bold">{category.icon} {category.category}</h3>
              <div className="grid gap-4">
                {category.organizations.map((org, index) => (
                  <Card key={index} className="p-6 bg-primary/5 hover:bg-primary/10 transition-colors">
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold">{org.name}</h4>
                      <p className="text-muted-foreground">{org.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {'phone' in org && org.phone && (
                          <a href={`tel:${org.phone}`}>
                            <Button variant="default" size="lg">
                              <Phone className="ml-2 h-5 w-5" />
                              {org.phone}
                            </Button>
                          </a>
                        )}
                        {'url' in org && org.url && (
                          <a href={org.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="lg">
                              <ExternalLink className="ml-2 h-5 w-5" />
                              לאתר
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Share */}
        <div className="mt-12 text-center">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">שמרו את זה לעצמכם</h3>
            <p className="text-muted-foreground mb-4">
              שלחו לעצמכם את התוצאות בוואטסאפ כדי שלא תשכחו
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="text-xl px-8 py-6"
                onClick={() => {
                  trackWhatsAppShare();
                  const text = `היי! מצאנו כלי שבודק מה מגיע לנו מהמדינה.\n\nהנה התוצאות שלי:\n${relevantPrograms.slice(0, 10).map(p => `✓ ${p.title}`).join('\n')}\n\nכנסו לכאן: ${window.location.origin}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
              >
                <Share2 className="ml-2 h-5 w-5" />
                שלח לוואטסאפ
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-8 py-6"
                onClick={() => {
                  // Copy link to clipboard for Instagram story
                  navigator.clipboard.writeText(window.location.origin);
                  alert('הקישור הועתק! עכשיו אפשר להדביק אותו בסטורי של אינסטגרם');
                }}
              >
                <Instagram className="ml-2 h-5 w-5" />
                שתף באינסטגרם
              </Button>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold text-center">אנשים שזה עבד להם</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-primary/5">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <User className="w-12 h-12 text-primary" />
                  <div className="flex-1">
                    <blockquote className="text-lg italic">
                      "לא האמנו שזה אמיתי. אבל עשינו את מה שהכלי אמר לנו,
                      ואחרי חודשיים קיבלנו 12,000 ₪ מהמדינה.
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
                  <User className="w-12 h-12 text-primary" />
                  <div className="flex-1">
                    <blockquote className="text-lg italic">
                      "בת שלי עזרה לי למלא. גיליתי שמגיע לי הנחה בארנונה
                      וגם בחשמל. חוסכת 500 ₪ בחודש!"
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

        {/* Actions */}
        <div className="text-center space-y-4 pt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="text-xl px-8 py-6"
          >
            התחל מחדש
          </Button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

function ProgramCard({ program, highlighted = false }: { program: AssistanceProgram; highlighted?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={`overflow-hidden ${highlighted ? 'border-2 border-primary shadow-lg' : ''}`}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <IconRenderer iconName={program.icon} className="w-12 h-12 text-primary" />
                <div className="text-right">
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <CardDescription className="text-lg mt-1">
                    {program.whatIsIt}
                  </CardDescription>
                  <p className="text-xl font-bold text-primary mt-2">
                    {program.howMuch}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-6 space-y-6">
            {/* For whom */}
            <div>
              <h4 className="font-bold text-lg mb-2">👥 למי זה מתאים?</h4>
              <p className="text-muted-foreground">{program.forWhom}</p>
            </div>

            {/* How to check */}
            <div>
              <h4 className="font-bold text-lg mb-3">✅ איך מקבלים?</h4>
              <ol className="space-y-2">
                {program.howToCheck.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {program.howToCheck.url && (
                <a
                  href={program.howToCheck.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px]"
                >
                  <Button className="w-full" size="lg">
                    <ExternalLink className="ml-2 h-5 w-5" />
                    לאתר
                  </Button>
                </a>
              )}
              {program.howToCheck.phone && (
                <a
                  href={`tel:${program.howToCheck.phone}`}
                  className="flex-1 min-w-[200px]"
                >
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="ml-2 h-5 w-5" />
                    {program.howToCheck.phoneDisplay || program.howToCheck.phone}
                  </Button>
                </a>
              )}
            </div>

            {/* Hours */}
            {program.howToCheck.hours && (
              <div className="text-sm text-muted-foreground text-center pt-2">
                🕐 שעות פעילות: {program.howToCheck.hours}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
