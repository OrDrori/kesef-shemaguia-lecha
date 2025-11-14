export interface ProgramCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  programIds: string[];
}

export const programCategories: ProgramCategory[] = [
  {
    id: 'direct-money',
    title: 'כסף ישיר מהמדינה',
    icon: 'Coins',
    description: 'מענקים וקצבאות שמגיעים ישירות לחשבון הבנק',
    programIds: [
      'work-grants',
      'income-guarantee',
      'child-allowance',
      'heating-grant',
      'study-grant',
      'child-savings',
      'employee-grant'
    ]
  },
  {
    id: 'housing',
    title: 'עזרה בדיור',
    icon: '',
    description: 'הנחות, סיוע בשכירות והלוואות לדיור',
    programIds: [
      'rent-assistance',
      'arnona-discount',
      'social-electricity'
    ]
  },
  {
    id: 'children-families',
    title: 'משפחות וילדים',
    icon: 'Baby',
    description: 'תוכניות לגנים, חינוך וסיוע למשפחות',
    programIds: [
      'kindergarten-scholarship',
      'study-grant',
      'child-savings',
      'child-allowance'
    ]
  },
  {
    id: 'health',
    title: 'בריאות ותרופות',
    icon: 'Pill',
    description: 'עזרה בתרופות, ציוד רפואי וטיפולים',
    programIds: [
      'social-electricity' // Can include health-related programs
    ]
  },
  {
    id: 'education-employment',
    title: 'חינוך ותעסוקה',
    icon: 'BookOpen',
    description: 'הלוואות לסטודנטים, קורסים והכשרה מקצועית',
    programIds: [
      'campus-loans',
      'study-grant'
    ]
  },
  {
    id: 'financial-help',
    title: 'עזרה כלכלית וייעוץ',
    icon: 'HandHeart',
    description: 'הלוואות ללא ריבית, ייעוץ כלכלי ומשפטי',
    programIds: [
      'paamonim',
      'interest-free-loans',
      'legal-aid',
      'small-business-vouchers',
      'augen-loans'
    ]
  },
  {
    id: 'lost-money',
    title: 'כספים שכוחים',
    icon: 'Search',
    description: 'איתור כסף שמגיע לכם ושכחתם',
    programIds: [
      'lost-funds'
    ]
  },
  {
    id: 'charity',
    title: 'ארגוני עזרה',
    icon: 'Heart',
    description: 'ארגונים שנותנים אוכל, ציוד רפואי ועזרה',
    programIds: [
      'yad-sarah',
      'yedid',
      'naamat',
      'pitchon-lev',
      'heu-shalom',
      'leket',
      'haverim',
      'keren-maccabi',
      'variety'
    ]
  }
];
