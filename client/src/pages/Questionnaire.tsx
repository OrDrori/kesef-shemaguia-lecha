import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Answers, saveAnswers } from "@/lib/answers";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

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
    toast.success('✓ שמרנו בשבילכם');
    setTimeout(() => setCurrentStep(2), 300);
  };

  const handleChildrenSelect = (value: 'yes' | 'no') => {
    if (value === 'yes') {
      const newAnswers = { ...answers, hasChildren: value };
      setAnswers(newAnswers);
      saveAnswers(newAnswers);
      toast.success('✓ שמרנו בשבילכם');
      setTimeout(() => setCurrentStep(2.5), 300); // Go to children count
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                Math.floor(currentStep) >= step ? 'w-12 bg-primary' : 'w-8 bg-border'
              }`}
            />
          ))}
        </div>

        {/* Question 1: Employment */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              מה המצב שלכם עכשיו?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'employed', label: 'עובד/ת', icon: '💼' },
                { value: 'unemployed', label: 'לא עובד/ת', icon: '🏠' },
                { value: 'pensioner', label: 'פנסיונר/ית', icon: '👴' },
                { value: 'student', label: 'סטודנט/ית', icon: '🎓' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleEmploymentSelect(option.value as any)}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl">{option.icon}</div>
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
                { value: 'yes', label: 'כן', icon: '👶' },
                { value: 'no', label: 'לא', icon: '🙅' }
              ].map((option) => (
                <Card
                  key={option.label}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleChildrenSelect(option.value as 'yes' | 'no')}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl">{option.icon}</div>
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
              כמה ילדים?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((count) => (
                <Card
                  key={count}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleChildrenCount(count)}
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold">{count}</div>
                    <div className="text-xl">{count === 4 ? 'או יותר' : ''}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Question 3: Renting */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              אתם גרים בדירה שכורה?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'rent', label: 'כן, אנחנו שוכרים', icon: '🔑' },
                { value: 'own', label: 'לא, דירה בבעלות', icon: '🏡' }
              ].map((option) => (
                <Card
                  key={option.label}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleRentingSelect(option.value as 'rent' | 'own')}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl">{option.icon}</div>
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
              יש לכם או למישהו במשפחה בעיות בריאות?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'yes', label: 'כן', icon: '💊' },
                { value: 'no', label: 'לא', icon: '✅' },
                { value: 'skip', label: 'לא רוצה לענות', icon: '🤐' }
              ].map((option) => (
                <Card
                  key={option.value}
                  className="p-8 cursor-pointer hover:bg-accent hover:border-primary transition-all"
                  onClick={() => handleHealthSelect(option.value as any)}
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

        {/* Back button */}
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={goBack}
            className="text-xl px-8 py-6"
          >
            ← חזור
          </Button>
        </div>
      </div>
    </div>
  );
}
