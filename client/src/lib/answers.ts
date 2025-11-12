export interface Answers {
  employment: 'employed' | 'unemployed' | 'pensioner' | 'student' | null;
  hasChildren: 'yes' | 'no' | null;
  numChildren: number | null;
  housing: 'rent' | 'own' | null;
  health: 'yes' | 'no' | 'skip' | null;
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
