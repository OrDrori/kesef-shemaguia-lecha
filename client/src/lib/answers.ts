export interface Answers {
  // Level 1 questions (basic)
  employment: 'employed' | 'unemployed' | 'pensioner' | 'student' | null;
  hasChildren: 'yes' | 'no' | null;
  numChildren: number | null;
  housing: 'rent' | 'own' | null;
  health: 'yes' | 'no' | 'skip' | null;
  
  // Level 2 questions (detailed)
  monthlyIncome?: 'under-5000' | '5000-10000' | '10000-15000' | '15000-20000' | 'over-20000' | null;
  childrenAges?: string | null; // e.g., "3, 7, 12"
  monthlyRent?: 'under-2000' | '2000-4000' | '4000-6000' | 'over-6000' | null;
  age?: 'under-25' | '25-40' | '40-60' | 'over-60' | null;
}

const STORAGE_KEY = 'questionnaire_answers';

export function saveAnswers(answers: Answers): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch (e) {
    console.error('Failed to save answers', e);
  }
}

export function getAnswers(): Answers | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error('Failed to get answers', e);
    return null;
  }
}

export function clearAnswers(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear answers', e);
  }
}
