import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Level1Answers {
  employment: string;
  hasChildren: string;
  numChildren?: number;
  housing: string;
  health: string;
}

interface Level2Answers {
  income: string;
  childrenAges: string;
  rentAmount: string;
  healthCondition: string;
  age: string;
}

const questions = [
  {
    id: 'income',
    question: 'מה ההכנסה החודשית שלכם?',
    subtitle: 'זה עוזר לנו למצוא בדיוק מה מגיע לכם',
    options: [
      { value: 'under-3000', label: 'פחות מ-3,000 ₪', icon: '💰' },
      { value: '3000-5000', label: '3,000-5,000 ₪', icon: '💵' },
      { value: '5000-7000', label: '5,000-7,000 ₪', icon: '💴' },
      { value: '7000-10000', label: '7,000-10,000 ₪', icon: '💶' },
      { value: 'over-10000', label: 'מעל 10,000 ₪', icon: '💷' }
    ]
  },
  {
    id: 'childrenAges',
    question: 'בני כמה הילדים שלכם?',
    subtitle: 'יש הטבות שונות לגילאים שונים',
    options: [
      { value: '0-3', label: 'תינוקות (0-3)', icon: '👶' },
      { value: '3-6', label: 'גן (3-6)', icon: '🧒' },
      { value: '6-12', label: 'יסודי (6-12)', icon: '👦' },
      { value: '12-18', label: 'תיכון (12-18)', icon: '👨' },
      { value: 'mixed', label: 'מעורב', icon: '👨‍👩‍👧‍👦' }
    ],
    condition: (level1: Level1Answers) => level1.hasChildren === 'yes'
  },
  {
    id: 'rentAmount',
    question: 'כמה אתם משלמים שכר דירה?',
    subtitle: 'יש סיוע בשכר דירה למי שמשלם הרבה',
    options: [
      { value: 'under-2000', label: 'פחות מ-2,000 ₪', icon: '🏠' },
      { value: '2000-3000', label: '2,000-3,000 ₪', icon: '🏡' },
      { value: '3000-4000', label: '3,000-4,000 ₪', icon: '🏘️' },
      { value: 'over-4000', label: 'מעל 4,000 ₪', icon: '🏢' }
    ],
    condition: (level1: Level1Answers) => level1.housing === 'rent'
  },
  {
    id: 'healthCondition',
    question: 'איזה סוג של בעיה בריאותית?',
    subtitle: 'יש תוכניות ספציפיות לכל סוג',
    options: [
      { value: 'disability', label: 'נכות מוכרת', icon: '♿' },
      { value: 'chronic', label: 'מחלה כרונית', icon: '💊' },
      { value: 'mental', label: 'בריאות הנפש', icon: '🧠' },
      { value: 'temporary', label: 'זמני', icon: '🩹' },
      { value: 'prefer-not', label: 'לא רוצה לענות', icon: '🤐' }
    ],
    condition: (level1: Level1Answers) => level1.health === 'yes'
  },
  {
    id: 'age',
    question: 'בני כמה אתם?',
    subtitle: 'יש תוכניות מיוחדות לגילאים שונים',
    options: [
      { value: 'under-30', label: 'מתחת ל-30', icon: '🧑' },
      { value: '30-50', label: '30-50', icon: '👨' },
      { value: '50-67', label: '50-67', icon: '👴' },
      { value: 'over-67', label: 'מעל 67 (פנסיה)', icon: '👵' }
    ]
  }
];

export default function QuestionnaireLevel2() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<Level2Answers>>({});
  const [level1Answers, setLevel1Answers] = useState<Level1Answers | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  useEffect(() => {
    // Load Level 1 answers
    const saved = sessionStorage.getItem('questionnaire_answers');
    if (saved) {
      const level1 = JSON.parse(saved);
      setLevel1Answers(level1);
      
      // Filter questions based on Level 1 answers
      const filtered = questions.filter(q => !q.condition || q.condition(level1));
      setFilteredQuestions(filtered);
    } else {
      // No Level 1 answers - redirect back
      toast.error('אופס! חסר מידע מהשלב הראשון');
      setLocation('/questionnaire');
    }

    // Load existing Level 2 answers if any
    const savedLevel2 = sessionStorage.getItem('questionnaire_level2_answers');
    if (savedLevel2) {
      setAnswers(JSON.parse(savedLevel2));
    }
  }, [setLocation]);

  const handleAnswer = (value: string) => {
    const questionId = filteredQuestions[currentQuestion].id as keyof Level2Answers;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Save to sessionStorage
    sessionStorage.setItem('questionnaire_level2_answers', JSON.stringify(newAnswers));
    
    // Show feedback
    toast.success('✓ שמרנו את התשובה');

    // Move to next question or results
    if (currentQuestion < filteredQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // All questions answered - go to results
      setTimeout(() => setLocation('/results-level2'), 500);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setLocation('/results');
    }
  };

  if (!level1Answers || filteredQuestions.length === 0) {
    return null;
  }

  const question = filteredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">שאלה {currentQuestion + 1} מתוך {filteredQuestions.length}</span>
            <span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-6 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {question.question}
            </h2>
            <p className="text-gray-600">{question.subtitle}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full h-auto py-6 text-xl hover:bg-green-50 hover:border-green-500 transition-all"
              >
                <span className="text-5xl mr-4">{option.icon}</span>
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-gray-600"
          >
            <ArrowLeft className="ml-2 h-5 w-5" />
            חזור
          </Button>

          <p className="text-sm text-gray-500">
            💚 כל המידע נשמר אוטומטית
          </p>
        </div>
      </div>
    </div>
  );
}
