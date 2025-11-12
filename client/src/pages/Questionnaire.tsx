import { Button } from "@/components/ui/button";
import { type Answers, saveAnswers } from "@/lib/answers";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { 
  Briefcase, 
  Home, 
  User, 
  GraduationCap, 
  Baby, 
  X, 
  Key, 
  House,
  Pill,
  CheckCircle,
  MessageSquareOff,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    employment: null,
    hasChildren: null,
    numChildren: null,
    housing: null,
    health: null
  });

  const handleEmploymentSelect = (value: 'employed' | 'unemployed' | 'pensioner' | 'student') => {
    const newAnswers = { ...answers, employment: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('שמרנו בשבילכם', {
      icon: <CheckCircle2 className="w-5 h-5" />,
    });
    setTimeout(() => setCurrentStep(2), 300);
  };

  const handleChildrenSelect = (value: 'yes' | 'no') => {
    if (value === 'yes') {
      const newAnswers = { ...answers, hasChildren: value };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);
      toast.success('שמרנו בשבילכם', {
        icon: <CheckCircle2 className="w-5 h-5" />,
      });
      setTimeout(() => setCurrentStep(2.5), 300);
    } else {
      const newAnswers = { ...answers, hasChildren: value, numChildren: 0 };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);
      toast.success('שמרנו בשבילכם', {
        icon: <CheckCircle2 className="w-5 h-5" />,
      });
      setTimeout(() => setCurrentStep(3), 300);
    }
  };

  const handleChildrenCount = (count: number) => {
    const newAnswers = { ...answers, numChildren: count };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('כל הכבוד!', {
      icon: <CheckCircle2 className="w-5 h-5" />,
    });
    setTimeout(() => setCurrentStep(3), 300);
  };

  const handleRentingSelect = (value: 'rent' | 'own') => {
    const newAnswers = { ...answers, housing: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('כל הכבוד!', {
      icon: <CheckCircle2 className="w-5 h-5" />,
    });
    setTimeout(() => setCurrentStep(4), 300);
  };

  const handleHealthSelect = (value: 'yes' | 'no' | 'skip') => {
    const finalAnswers = { ...answers, health: value };
    setAnswers(finalAnswers);
    saveAnswers(finalAnswers);
    setTimeout(() => {
      setLocation('/results');
    }, 300);
  };

  const goBack = () => {
    if (currentStep === 2.5) {
      setCurrentStep(2);
      setAnswers({ ...answers, numChildren: null });
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setLocation('/');
    }
  };

  const totalSteps = 4;
  const progress = (Math.floor(currentStep) / totalSteps) * 100;

  return (
    <>
      {/* Skip to main content link - WCAG 2.1 - 2.4.1 Bypass Blocks */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        דלג לתוכן הראשי
      </a>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <main id="main-content" tabIndex={-1} className="max-w-3xl w-full space-y-8">
          {/* Progress indicator - WCAG 2.1 - 1.3.1 Info and Relationships */}
          <div className="space-y-2">
            <div
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`התקדמות בשאלון: שלב ${Math.floor(currentStep)} מתוך ${totalSteps}`}
              className="w-full h-2 bg-muted rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              שלב {Math.floor(currentStep)} מתוך {totalSteps}
            </p>
          </div>

          {/* Question 1: Employment */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                מה המצב שלכם עכשיו?
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-label="בחירת מצב תעסוקה">
                {[
                  { value: 'employed', label: 'עובד/ת', Icon: Briefcase },
                  { value: 'unemployed', label: 'לא עובד/ת', Icon: Home },
                  { value: 'pensioner', label: 'פנסיונר/ית', Icon: User },
                  { value: 'student', label: 'סטודנט/ית', Icon: GraduationCap }
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleEmploymentSelect(value as any)}
                    className="p-8 rounded-xl border-2 border-border bg-card hover:bg-accent hover:border-primary transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 min-h-[120px]"
                    aria-label={`בחר ${label}`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon className="w-12 h-12 text-primary" aria-hidden="true" />
                      <span className="text-2xl font-semibold text-foreground">{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Children */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                יש לכם ילדים?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-label="בחירה האם יש ילדים">
                {[
                  { value: 'yes', label: 'כן', Icon: Baby },
                  { value: 'no', label: 'לא', Icon: X }
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleChildrenSelect(value as 'yes' | 'no')}
                    className="p-8 rounded-xl border-2 border-border bg-card hover:bg-accent hover:border-primary transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 min-h-[120px]"
                    aria-label={`בחר ${label}`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon className="w-12 h-12 text-primary" aria-hidden="true" />
                      <span className="text-2xl font-semibold text-foreground">{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2.5: How many children */}
          {currentStep === 2.5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                כמה ילדים?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="group" aria-label="בחירת מספר ילדים">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => handleChildrenCount(count)}
                    className="p-8 rounded-xl border-2 border-border bg-card hover:bg-accent hover:border-primary transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 min-h-[120px]"
                    aria-label={count === 4 ? `${count} ילדים או יותר` : `${count} ילדים`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl font-bold text-primary">{count}</span>
                      <span className="text-xl text-foreground">{count === 4 ? 'או יותר' : ''}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Renting */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                אתם גרים בדירה שכורה?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-label="בחירת סוג דיור">
                {[
                  { value: 'rent', label: 'כן, אנחנו שוכרים', Icon: Key },
                  { value: 'own', label: 'לא, דירה בבעלות', Icon: House }
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleRentingSelect(value as 'rent' | 'own')}
                    className="p-8 rounded-xl border-2 border-border bg-card hover:bg-accent hover:border-primary transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 min-h-[120px]"
                    aria-label={label}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon className="w-12 h-12 text-primary" aria-hidden="true" />
                      <span className="text-2xl font-semibold text-foreground">{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4: Health */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                יש לכם או למישהו במשפחה בעיות בריאות?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="group" aria-label="בחירת מצב בריאות">
                {[
                  { value: 'yes', label: 'כן', Icon: Pill },
                  { value: 'no', label: 'לא', Icon: CheckCircle },
                  { value: 'skip', label: 'לא רוצה לענות', Icon: MessageSquareOff }
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleHealthSelect(value as any)}
                    className="p-8 rounded-xl border-2 border-border bg-card hover:bg-accent hover:border-primary transition-all focus:outline-none focus:ring-4 focus:ring-primary/50 min-h-[120px]"
                    aria-label={label}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon className="w-12 h-12 text-primary" aria-hidden="true" />
                      <span className="text-xl font-semibold text-foreground">{label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={goBack}
              className="text-xl px-8 py-6 min-h-[60px]"
              aria-label="חזור לשלב הקודם"
            >
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              חזור
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
