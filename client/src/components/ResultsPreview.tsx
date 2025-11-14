import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { assistancePrograms, type AssistanceProgram } from "@/data/programs";
import { type Answers } from "@/lib/answers";
import { X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import IconRenderer from "@/components/IconRenderer";

interface ResultsPreviewProps {
  answers: Answers;
  onClose: () => void;
  onContinue: () => void;
}

export default function ResultsPreview({ answers, onClose, onContinue }: ResultsPreviewProps) {
  // Filter programs based on current answers
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

  // Get top 5 programs
  const topPrograms = relevantPrograms.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      {/* Popup - 80% of screen */}
      <div className="w-full max-w-4xl bg-background rounded-t-3xl shadow-2xl mt-[10vh] min-h-[80vh] animate-in slide-in-from-bottom-8 duration-500">
        {/* Header - 20% top area for close button */}
        <div className="sticky top-0 bg-background border-b border-border p-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              מצאנו לכם {relevantPrograms.length} דברים!
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-12 w-12 rounded-full hover:bg-accent"
              aria-label="סגור תצוגה מקדימה"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <p className="text-lg text-muted-foreground mb-4">
            אלו התוכניות שמתאימות לכם על בסיס התשובות עד כה.
          </p>

          {/* Continue button */}
          <Button
            size="lg"
            onClick={onContinue}
            className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5 flex-shrink-0" />
            <span className="leading-tight">
              המשיכו לשאלות נוספות<br />לתוצאות מדויקות יותר
            </span>
          </Button>
          
          <p className="text-sm text-muted-foreground text-center mt-2">
            עוד 4 שאלות קצרות • נחשב לכם כמה כסף בדיוק מגיע לכם
          </p>
        </div>

        {/* Content - scrollable */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold mb-4">הכי חשוב לכם עכשיו:</h3>
          
          {topPrograms.length > 0 ? (
            <div className="space-y-4">
              {topPrograms.map((program) => (
                <ProgramPreviewCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-xl text-muted-foreground">
                לא מצאנו תוכניות מתאימות על בסיס התשובות עד כה.
                <br />
                נסו להמשיך לשאלות הנוספות!
              </p>
            </Card>
          )}

          {relevantPrograms.length > 5 && (
            <p className="text-center text-muted-foreground">
              ועוד {relevantPrograms.length - 5} תוכניות נוספות...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgramPreviewCard({ program }: { program: AssistanceProgram }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <IconRenderer iconName={program.icon} className="w-12 h-12 text-primary" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-xl font-bold">{program.title}</h4>
          <p className="text-muted-foreground">{program.whatIsIt}</p>
          <p className="text-lg font-semibold text-primary">{program.howMuch}</p>
        </div>
      </div>
    </Card>
  );
}
