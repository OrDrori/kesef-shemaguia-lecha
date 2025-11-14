import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultsPreview from "@/components/ResultsPreview";
import { type Answers, saveAnswers } from "@/lib/answers";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ArrowLeft, Target } from "lucide-react";
import IconRenderer from "@/components/IconRenderer";

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    employment: null,
    hasChildren: null,
    numChildren: null,
    housing: null,
    health: null,
    monthlyIncome: null,
    childrenAges: null,
    monthlyRent: null,
    age: null
  });

  // Total steps calculation
  const totalSteps = 8;
  const basicStepsComplete = currentStep > 4;

  const handleEmploymentSelect = (value: 'employed' | 'unemployed' | 'pensioner' | 'student') => {
    const newAnswers = { ...answers, employment: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('✓ שמרנו בשבילכם');
    setTimeout(() => setCurrentStep(2), 300);
  };

  const handleChildrenSelect = (value: 'yes' | 'no') => {
    if (value === 'yes') {
      const newAnswers = { ...answers, hasChildren: value };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);
      toast.success('✓ שמרנו בשבילכם');
      setTimeout(() => setCurrentStep(2.5), 300);
    } else {
      const newAnswers = { ...answers, hasChildren: value, numChildren: 0 };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);
      toast.success('✓ שמרנו בשבילכם');
      setTimeout(() => setCurrentStep(3), 300);
    }
  };

  const handleChildrenCount = (count: number) => {
    const newAnswers = { ...answers, numChildren: count };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('כל הכבוד! ✓');
    setTimeout(() => setCurrentStep(3), 300);
  };

  const handleRentingSelect = (value: 'rent' | 'own') => {
    const newAnswers = { ...answers, housing: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('כל הכבוד! ✓');
    setTimeout(() => setCurrentStep(4), 300);
  };

  const handleHealthSelect = (value: 'yes' | 'no' | 'skip') => {
    const newAnswers = { ...answers, health: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('מעולה! ✓');
    // Don't auto-advance - show preview option
    setCurrentStep(4.5);
  };

  const handleShowPreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleContinueToLevel2 = () => {
    setShowPreview(false);
    setCurrentStep(5);
    toast.success('בואו נמצא לכם עוד יותר כסף!');
  };

  const handleSkipToResults = () => {
    setLocation('/results');
  };

  const handleMonthlyIncomeSelect = (value: 'under-5000' | '5000-10000' | '10000-15000' | '15000-20000' | 'over-20000') => {
    const newAnswers = { ...answers, monthlyIncome: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('מעולה! ✓');
    
    // Next question depends on whether they have children
    if (answers.hasChildren === 'yes') {
      setTimeout(() => setCurrentStep(6), 300);
    } else if (answers.housing === 'rent') {
      setTimeout(() => setCurrentStep(7), 300);
    } else {
      setTimeout(() => setCurrentStep(8), 300);
    }
  };

  const handleChildrenAges = (ages: string) => {
    const newAnswers = { ...answers, childrenAges: ages };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('תודה! ✓');
    
    // Next question depends on housing
    if (answers.housing === 'rent') {
      setTimeout(() => setCurrentStep(7), 300);
    } else {
      setTimeout(() => setCurrentStep(8), 300);
    }
  };

  const handleMonthlyRentSelect = (value: 'under-2000' | '2000-4000' | '4000-6000' | 'over-6000') => {
    const newAnswers = { ...answers, monthlyRent: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    toast.success('כמעט סיימנו! ✓');
    setTimeout(() => setCurrentStep(8), 300);
  };

  const handleAgeSelect = (value: 'under-25' | '25-40' | '40-60' | 'over-60') => {
    const finalAnswers = { ...answers, age: value };
    setAnswers(finalAnswers);
    saveAnswers(finalAnswers);
    toast.success('סיימנו! מעביר אתכם לתוצאות... 🎉');
    setTimeout(() => {
      setLocation('/results');
    }, 800);
  };

  const goBack = () => {
    if (currentStep === 4.5) {
      setCurrentStep(4);
    } else if (currentStep === 2.5) {
      setCurrentStep(2);
      setAnswers({ ...answers, numChildren: null });
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setLocation('/');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8">
        {/* Time estimate */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            ⏱️ 2-3 דקות • עד {totalSteps} שאלות פשוטות
          </p>
        </div>

        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(currentStep) >= step ? 'w-12 bg-primary' : 'w-8 bg-border'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            שאלה {Math.floor(currentStep)} מתוך {totalSteps}
          </p>
        </div>

        {/* Question 1: Employment */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              מה המצב שלכם עכשיו?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'employed', label: 'עובד/ת', icon: 'Briefcase' },
                { value: 'unemployed', label: 'לא עובד/ת', icon: 'Home' },
                { value: 'pensioner', label: 'פנסיונר/ית', icon: 'User' },
                { value: 'student', label: 'סטודנט/ית', icon: 'GraduationCap' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleEmploymentSelect(option.value as any)}
                >
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <IconRenderer iconName={option.icon} className="w-16 h-16 text-primary" />
                    </div>
                    <div className="text-2xl font-semibold">{option.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Question 2: Children */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              יש לכם ילדים?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'yes', label: 'כן', icon: 'Baby' },
                { value: 'no', label: 'לא', icon: 'X' }
              ].map((option) => (
                <Card
                  key={option.label}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleChildrenSelect(option.value as 'yes' | 'no')}
                >
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <IconRenderer iconName={option.icon} className="w-16 h-16 text-primary" />
                    </div>
                    <div className="text-2xl font-semibold">{option.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Question 2.5: How many children */}
        {currentStep === 2.5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              כמה ילדים יש לכם?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((count) => (
                <Card
                  key={count}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleChildrenCount(count)}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl">{count === 6 ? '6+' : count}</div>
                    <div className="text-xl font-semibold">
                      {count === 1 ? 'ילד אחד' : count === 2 ? 'שני ילדים' : count === 6 ? '6 ומעלה' : `${count} ילדים`}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Question 3: Housing */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              אתם שוכרים או בעלים?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'rent', label: 'כן, אנחנו שוכרים', icon: 'Building' },
                { value: 'own', label: 'לא, אנחנו בעלים', icon: 'Home' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleRentingSelect(option.value as 'rent' | 'own')}
                >
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <IconRenderer iconName={option.icon} className="w-16 h-16 text-primary" />
                    </div>
                    <div className="text-2xl font-semibold">{option.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Question 4: Health */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              יש לכם בעיות בריאות?
            </h2>
            <p className="text-center text-muted-foreground">
              (מחלה כרונית, נכות, או צורך בטיפול רפואי קבוע)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'yes', label: 'כן', icon: 'Pill' },
                { value: 'no', label: 'לא', icon: 'X' },
                { value: 'skip', label: 'מעדיף/ה לא לענות', icon: 'Minus' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleHealthSelect(option.value as 'yes' | 'no' | 'skip')}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl">{option.icon}</div>
                    <div className="text-xl font-semibold">{option.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4.5: Preview or Continue */}
        {currentStep === 4.5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-4">
              <Target className="w-16 h-16 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">
                כל הכבוד! סיימתם את השאלות הבסיסיות
              </h2>
              <p className="text-xl text-muted-foreground">
                עכשיו אתם יכולים לבחור:
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="p-6 bg-primary/5 border-2 border-primary">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">רוצים לראות תוצאות?</h3>
                  <p className="text-muted-foreground">
                    תראו מה מצאנו לכם על בסיס התשובות עד כה
                  </p>
                  <Button
                    size="lg"
                    onClick={handleShowPreview}
                    className="w-full text-xl py-6"
                  >
                    כן! תראו לי מה מצאתם
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">רוצים תוצאות מדויקות יותר?</h3>
                  <p className="text-muted-foreground">
                    ענו על עוד 4 שאלות קצרות ונחשב לכם בדיוק כמה כסף מגיע לכם!
                  </p>
                  <Button
                    size="lg"
                    onClick={handleContinueToLevel2}
                    className="w-full text-xl py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <ArrowLeft className="ml-2 h-6 w-6" />
                    בואו נמצא לכם עוד יותר כסף!
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    רק 4 שאלות נוספות • 1-2 דקות
                  </p>
                </div>
              </Card>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSkipToResults}
                className="text-lg py-6"
              >
                דלג לתוצאות הסופיות
              </Button>
            </div>
          </div>
        )}

        {/* Question 5: Monthly Income */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              מה ההכנסה החודשית שלכם?
            </h2>
            <p className="text-center text-muted-foreground">
              💡 זה עוזר לנו למצוא תוכניות שמתאימות בדיוק לכם
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'under-5000', label: 'פחות מ-5,000 ₪', icon: '💵' },
                { value: '5000-10000', label: '5,000-10,000 ₪', icon: '💵💵' },
                { value: '10000-15000', label: '10,000-15,000 ₪', icon: '💵💵💵' },
                { value: '15000-20000', label: '15,000-20,000 ₪', icon: 'Coins' },
                { value: 'over-20000', label: 'מעל 20,000 ₪', icon: '' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-6 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleMonthlyIncomeSelect(option.value as any)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl">{option.icon}</div>
                    <div className="text-xl font-semibold">{option.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Question 6: Children Ages (only if has children) */}
        {currentStep === 6 && answers.hasChildren === 'yes' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              בני כמה הילדים שלכם?
            </h2>
            <p className="text-center text-muted-foreground">
              💡 לדוגמה: 3, 7, 12 (הפרידו בפסיקים)
            </p>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="לדוגמה: 3, 7, 12"
                className="w-full text-2xl text-center p-6 border-2 border-border rounded-xl focus:border-primary focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    handleChildrenAges(e.currentTarget.value.trim());
                  }
                }}
              />
              <Button
                size="lg"
                className="w-full mt-4 text-xl py-6"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    handleChildrenAges(input.value.trim());
                  }
                }}
              >
                המשך
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full mt-2"
                onClick={() => handleChildrenAges('לא רוצה לציין')}
              >
                מעדיף/ה לא לציין
              </Button>
            </div>
          </div>
        )}

        {/* Question 7: Monthly Rent (only if renting) */}
        {currentStep === 7 && answers.housing === 'rent' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              כמה אתם משלמים שכר דירה בחודש?
            </h2>
            <p className="text-center text-muted-foreground">
              💡 זה עוזר לנו למצוא סיוע בדיור
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'under-2000', label: 'פחות מ-2,000 ₪', icon: '🏘️' },
                { value: '2000-4000', label: '2,000-4,000 ₪', icon: '🏘️🏘️' },
                { value: '4000-6000', label: '4,000-6,000 ₪', icon: '🏘️🏘️🏘️' },
                { value: 'over-6000', label: 'מעל 6,000 ₪', icon: '🏡' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-6 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleMonthlyRentSelect(option.value as any)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl">{option.icon}</div>
                    <div className="text-xl font-semibold">{option.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Question 8: Age */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              בן כמה אתם?
            </h2>
            <p className="text-center text-muted-foreground">
              💡 יש תוכניות ספציפיות לגילאים שונים
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'under-25', label: 'מתחת ל-25', icon: '👦' },
                { value: '25-40', label: '25-40', icon: '👨' },
                { value: '40-60', label: '40-60', icon: '👨‍🦳' },
                { value: 'over-60', label: 'מעל 60', icon: '👴' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleAgeSelect(option.value as any)}
                >
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <IconRenderer iconName={option.icon} className="w-16 h-16 text-primary" />
                    </div>
                    <div className="text-2xl font-semibold">{option.label}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Back button */}
        {currentStep > 1 && currentStep !== 4.5 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={goBack}
              className="text-xl px-8 py-6"
            >
              ← חזור
            </Button>
          </div>
        )}
      </div>
    </div>

      <Footer />

      {/* Results Preview Popup */}
      {showPreview && (
        <ResultsPreview
          answers={answers}
          onClose={handleClosePreview}
          onContinue={handleContinueToLevel2}
        />
      )}
    </>
  );
}
