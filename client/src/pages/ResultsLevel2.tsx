import { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ExternalLink, Phone, Share2, Sparkles } from 'lucide-react';
import { assistancePrograms, charityOrganizations } from '@/data/programs';
import { toast } from 'sonner';

interface Answers {
  employment: string;
  hasChildren: string;
  numChildren?: number;
  housing: string;
  health: string;
  // Level 2
  income?: string;
  childrenAges?: string;
  rentAmount?: string;
  healthCondition?: string;
  age?: string;
}

interface MoneyEstimate {
  min: number;
  max: number;
  programs: Array<{ name: string; amount: string }>;
}

export default function ResultsLevel2() {
  const [, setLocation] = useLocation();
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [moneyEstimate, setMoneyEstimate] = useState<MoneyEstimate | null>(null);
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  useEffect(() => {
    // Load both Level 1 and Level 2 answers
    const level1 = sessionStorage.getItem('questionnaire_answers');
    const level2 = sessionStorage.getItem('questionnaire_level2_answers');
    
    if (!level1 || !level2) {
      toast.error('אופס! חסר מידע');
      setLocation('/questionnaire');
      return;
    }

    const combinedAnswers = { ...JSON.parse(level1), ...JSON.parse(level2) };
    setAnswers(combinedAnswers);

    // Calculate money estimate
    const estimate = calculateMoneyEstimate(combinedAnswers);
    setMoneyEstimate(estimate);
  }, [setLocation]);

  const calculateMoneyEstimate = (answers: Answers): MoneyEstimate => {
    let min = 0;
    let max = 0;
    const programsWithMoney: Array<{ name: string; amount: string }> = [];

    // Work grants (if employed with low income)
    if (answers.employment === 'employed' && 
        (answers.income === 'under-3000' || answers.income === '3000-5000')) {
      min += 3000;
      max += 6000;
      programsWithMoney.push({ name: 'מענקי עבודה', amount: '3,000-6,000 ₪' });
    }

    // Income support (if unemployed with very low income)
    if (answers.employment === 'unemployed' && answers.income === 'under-3000') {
      min += 12000;
      max += 18000;
      programsWithMoney.push({ name: 'הבטחת הכנסה', amount: '12,000-18,000 ₪' });
    }

    // Child benefits (if has children)
    if (answers.hasChildren === 'yes' && answers.numChildren) {
      const childMoney = answers.numChildren * 1500; // 150 ₪/month * 12 months
      min += childMoney;
      max += childMoney;
      programsWithMoney.push({ name: 'קצבת ילדים', amount: `${childMoney.toLocaleString()} ₪` });
    }

    // Rent assistance (if renting with high rent)
    if (answers.housing === 'rent' && 
        (answers.rentAmount === '3000-4000' || answers.rentAmount === 'over-4000')) {
      min += 6000;
      max += 12000;
      programsWithMoney.push({ name: 'סיוע בשכר דירה', amount: '6,000-12,000 ₪' });
    }

    // Electricity discount
    if (answers.income === 'under-3000' || answers.income === '3000-5000') {
      min += 600;
      max += 1200;
      programsWithMoney.push({ name: 'הנחה בחשמל', amount: '600-1,200 ₪' });
    }

    // Transportation discount
    if (answers.income === 'under-3000' || answers.income === '3000-5000') {
      min += 800;
      max += 1500;
      programsWithMoney.push({ name: 'הנחה בתחבורה', amount: '800-1,500 ₪' });
    }

    // Health-related benefits
    if (answers.health === 'yes' && answers.healthCondition === 'disability') {
      min += 5000;
      max += 15000;
      programsWithMoney.push({ name: 'קצבת נכות', amount: '5,000-15,000 ₪' });
    }

    // Tax refunds (if employed)
    if (answers.employment === 'employed') {
      min += 2000;
      max += 5000;
      programsWithMoney.push({ name: 'החזרי מס', amount: '2,000-5,000 ₪' });
    }

    return { min, max, programs: programsWithMoney };
  };

  const filteredPrograms = assistancePrograms.filter((program: any) => {
    if (!answers) return false;
    
    const eligibility = program.eligibility;
    
    // Employment check
    if (answers.employment === 'employed' && !eligibility.employed) return false;
    if (answers.employment === 'unemployed' && !eligibility.unemployed) return false;
    if (answers.employment === 'pensioner' && !eligibility.pensioner) return false;
    if (answers.employment === 'student' && !eligibility.student) return false;
    
    // Children check
    if (eligibility.hasChildren && answers.hasChildren !== 'yes') return false;
    
    // Housing check
    if (eligibility.renting && answers.housing !== 'rent') return false;
    
    // Health check
    if (eligibility.hasHealthIssues && answers.health !== 'yes') return false;
    
    return true;
  });

  const shareResults = () => {
    if (!moneyEstimate) return;
    
    const text = `מצאתי ${moneyEstimate.programs.length} תוכניות סיוע שיכולות לעזור לי!\n\nיכול להיות שמגיע לי ${moneyEstimate.min.toLocaleString()}-${moneyEstimate.max.toLocaleString()} ₪ בשנה! 💰\n\nבדקתי ב: כסף שמגיע לך`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (!answers || !moneyEstimate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Money Estimate Card */}
        <Card className="p-8 mb-8 shadow-xl bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles className="h-16 w-16" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              יכול להיות שמגיע לך:
            </h1>
            <div className="text-6xl font-black mb-6">
              {moneyEstimate.min.toLocaleString()}-{moneyEstimate.max.toLocaleString()} ₪
            </div>
            <p className="text-xl opacity-90 mb-6">
              בשנה! זה בערך {Math.round(moneyEstimate.min / 12).toLocaleString()}-{Math.round(moneyEstimate.max / 12).toLocaleString()} ₪ בחודש
            </p>
            
            {/* Programs breakdown */}
            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">מה כלול בחישוב:</h3>
              <div className="grid gap-2 text-right">
                {moneyEstimate.programs.map((prog, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/10 rounded p-3">
                    <span className="font-medium">{prog.name}</span>
                    <span className="font-bold">{prog.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={shareResults}
              className="mt-6 bg-white text-green-600 hover:bg-gray-100"
              size="lg"
            >
              <Share2 className="ml-2 h-5 w-5" />
              שלח לעצמי בוואטסאפ
            </Button>
          </div>
        </Card>

        {/* Important Note */}
        <Card className="p-6 mb-8 bg-yellow-50 border-yellow-200">
          <p className="text-center text-gray-700">
            <strong>חשוב:</strong> זה חישוב משוער בלבד! הסכום המדויק תלוי בהרבה גורמים.
            <br />
            כדי לדעת בדיוק, תצטרך לבדוק כל תוכנית בנפרד 👇
          </p>
        </Card>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            מצאנו {filteredPrograms.length} תוכניות שמתאימות לך! 🎯
          </h2>
          <p className="text-gray-600">
            עכשיו תבדוק כל אחת ותראה מה באמת מגיע לך
          </p>
        </div>

        {/* Programs */}
        <div className="space-y-4 mb-8">
          {filteredPrograms.map((program: any) => (
            <Card key={program.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{program.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
                    <p className="text-gray-600">{program.whatIsIt}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">כמה?</p>
                  <p className="font-semibold text-green-600">{program.howMuch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">למי?</p>
                  <p className="font-semibold">{program.forWhom}</p>
                </div>
              </div>

              <Button
                onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                variant="outline"
                className="w-full"
              >
                {expandedProgram === program.id ? 'סגור' : 'איך בודקים? 👇'}
              </Button>

              {expandedProgram === program.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold mb-3">צעדים לבדיקה:</h4>
                  <ol className="space-y-2 mb-4">
                    {program.howToCheck.steps.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-green-600">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="flex flex-col gap-2">
                    {program.howToCheck.url && (
                      <Button
                        onClick={() => window.open(program.howToCheck.url, '_blank')}
                        className="w-full"
                      >
                        <ExternalLink className="ml-2 h-4 w-4" />
                        פתח את האתר
                      </Button>
                    )}
                    {program.howToCheck.phone && (
                      <Button
                        onClick={() => window.location.href = `tel:${program.howToCheck.phone}`}
                        variant="outline"
                        className="w-full"
                      >
                        <Phone className="ml-2 h-4 w-4" />
                        {program.howToCheck.phoneDisplay}
                      </Button>
                    )}
                    {program.howToCheck.hours && (
                      <p className="text-sm text-gray-500 text-center mt-2">
                        ⏰ {program.howToCheck.hours}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Charity Organizations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            עמותות וקרנות שיכולות לעזור 🤝
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(charityOrganizations).map(([category, data]) => (
              <Card key={category} className="p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span>{data.icon}</span>
                  <span>{data.category}</span>
                </h3>
                <div className="space-y-3">
                  {data.organizations.map((org: any, idx: number) => (
                    <div key={idx} className="border-r-4 border-green-500 pr-3">
                      <p className="font-semibold">{org.name}</p>
                      <p className="text-sm text-gray-600 mb-2">{org.description}</p>
                      {org.phone && (
                        <Button
                          onClick={() => window.location.href = `tel:${org.phone}`}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Phone className="ml-2 h-4 w-4" />
                          {org.phone}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              <ArrowRight className="ml-2 h-5 w-5" />
              חזור לעמוד הבית
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
