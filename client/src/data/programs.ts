export interface AssistanceProgram {
  id: string;
  title: string;
  icon: string;
  category: 'money' | 'discounts' | 'housing' | 'education' | 'health' | 'charity';
  whatIsIt: string;
  howMuch: string;
  forWhom: string;
  howToCheck: {
    steps: string[];
    url?: string;
    phone?: string;
    phoneDisplay?: string;
    hours?: string;
  };
  eligibility: {
    employed?: boolean;
    unemployed?: boolean;
    pensioner?: boolean;
    student?: boolean;
    hasChildren?: boolean;
    renting?: boolean;
    healthIssues?: boolean;
  };
}

export const assistancePrograms: AssistanceProgram[] = [
  {
    id: 'work-grants',
    title: 'מענקי עבודה',
    icon: '💰',
    category: 'money',
    whatIsIt: 'כסף מהמדינה לעובדים עם משכורת נמוכה.',
    howMuch: 'עד כמה אלפי שקלים בשנה (תלוי בהכנסה ובמשפחה).',
    forWhom: 'עובדים עם הכנסה נמוכה.',
    howToCheck: {
      steps: [
        'לך לאתר בדיקת הזכאות',
        'תמלא תעודת זהות',
        'האתר יגיד לך אם מגיע לך'
      ],
      url: 'https://www.misim.gov.il/gmmhszakaut/',
      phone: '*4954',
      phoneDisplay: '*מסים (4954*)',
      hours: 'א\'-ה\', 8:00-16:00'
    },
    eligibility: {
      employed: true
    }
  },
  {
    id: 'income-guarantee',
    title: 'הבטחת הכנסה',
    icon: '🏦',
    category: 'money',
    whatIsIt: 'כסף מהביטוח הלאומי למי שאין לו הכנסה או הכנסה נמוכה מאוד.',
    howMuch: 'תלוי במשפחה. יכול להיות אלפי שקלים בחודש.',
    forWhom: 'מי שמעל גיל 20 וללא הכנסה או עם הכנסה נמוכה מאוד.',
    howToCheck: {
      steps: [
        'לך למחשבון הזכאות',
        'תמלא פרטים',
        'תראה אם מגיע לך'
      ],
      url: 'http://www.btl.gov.il/Simulators/Pages/IncomeSupportCalc.aspx',
      phone: '*6050',
      phoneDisplay: 'ביטוח לאומי (6050*)',
      hours: 'א\'-ה\', 8:00-16:00'
    },
    eligibility: {
      unemployed: true
    }
  },
  {
    id: 'child-allowance',
    title: 'קצבת ילדים',
    icon: '👶',
    category: 'money',
    whatIsIt: 'כסף מהביטוח הלאומי לכל משפחה עם ילדים.',
    howMuch: 'תלוי במספר ילדים. מאות שקלים בחודש.',
    forWhom: 'כל משפחה עם ילדים עד גיל 18.',
    howToCheck: {
      steps: [
        'זה אמור להגיע אוטומטי',
        'אם לא מקבל - תתקשר לביטוח לאומי'
      ],
      phone: '*6050',
      phoneDisplay: 'ביטוח לאומי (6050*)'
    },
    eligibility: {
      hasChildren: true
    }
  },
  {
    id: 'property-tax-discount',
    title: 'הנחות ארנונה',
    icon: '🏘️',
    category: 'discounts',
    whatIsIt: 'הנחה בתשלום לעירייה (ארנונה).',
    howMuch: 'עד 100% הנחה (תלוי בעירייה).',
    forWhom: 'בעלי הכנסה נמוכה, קשישים, נכים.',
    howToCheck: {
      steps: [
        'תתקשר לעירייה שלך',
        'תשאל על "הנחה בארנונה"',
        'תביא אישורי הכנסה'
      ],
      phoneDisplay: 'חייג לעירייה שלך (כל עירייה שונה)'
    },
    eligibility: {
      employed: true,
      unemployed: true,
      pensioner: true
    }
  },
  {
    id: 'electricity-discount',
    title: 'הנחות חשמל',
    icon: '💡',
    category: 'discounts',
    whatIsIt: 'הנחה של 50% על חשבון החשמל.',
    howMuch: 'חיסכון של מאות שקלים בשנה.',
    forWhom: 'מקבלי קצבאות, נכים, קשישים.',
    howToCheck: {
      steps: [
        'לך לאתר חברת החשמל',
        'תחפש "תעריף סוציאלי"',
        'תמלא בקשה'
      ],
      url: 'https://www.iec.co.il/content/tariffs/contentpages/socialtariff',
      phone: '103',
      phoneDisplay: 'חברת החשמל (103)'
    },
    eligibility: {
      unemployed: true,
      pensioner: true
    }
  },
  {
    id: 'transportation-discount',
    title: 'הנחות תחבורה',
    icon: '🚌',
    category: 'discounts',
    whatIsIt: 'הנחה של 50% באוטובוס, רכבת.',
    howMuch: 'חיסכון של מאות שקלים בחודש.',
    forWhom: 'מקבלי קצבאות, תושבי פריפריה, סטודנטים.',
    howToCheck: {
      steps: [
        'לך לתחנה מרכזית',
        'תגיד שאתה רוצה "כרטיס הנחה"',
        'תביא אישור מהביטוח לאומי'
      ],
      phone: '*8787',
      phoneDisplay: 'רב-קו (8787*) או רכבת ישראל (5770*)'
    },
    eligibility: {
      unemployed: true,
      pensioner: true,
      student: true
    }
  },
  {
    id: 'rent-assistance',
    title: 'סיוע בשכר דירה',
    icon: '🏠',
    category: 'housing',
    whatIsIt: 'כסף מהמדינה לעזרה בתשלום שכר דירה.',
    howMuch: 'מאות עד אלפי שקלים בחודש.',
    forWhom: 'שוכרים עם הכנסה נמוכה.',
    howToCheck: {
      steps: [
        'לך לאתר משרד השיכון',
        'תמלא בקשה מקוונת',
        'תחכה לתשובה'
      ],
      url: 'https://www.gov.il/he/service/assistance-rent-or-public-housing',
      phone: '*3939',
      phoneDisplay: 'משרד השיכון (3939*)'
    },
    eligibility: {
      renting: true,
      employed: true,
      unemployed: true
    }
  },
  {
    id: 'scholarships',
    title: 'מלגות לימודים',
    icon: '🎓',
    category: 'education',
    whatIsIt: 'כסף לעזרה בתשלום לימודים.',
    howMuch: 'אלפי עד עשרות אלפי שקלים.',
    forWhom: 'סטודנטים עם הכנסה נמוכה.',
    howToCheck: {
      steps: [
        'תחפש "מלגות" באינטרנט',
        'תמצא מלגות שמתאימות לך',
        'תמלא בקשה'
      ],
      url: 'https://milgapo.co.il'
    },
    eligibility: {
      student: true
    }
  },
  {
    id: 'medicine-exemption',
    title: 'פטורים בתרופות',
    icon: '💊',
    category: 'health',
    whatIsIt: 'פטור או הנחה בתשלום על תרופות.',
    howMuch: 'חיסכון של מאות שקלים בחודש.',
    forWhom: 'חולים כרוניים, מקבלי קצבאות, נכים.',
    howToCheck: {
      steps: [
        'תדבר עם הרופא שלך',
        'תשאל על "פטור מתרופות"',
        'תפנה לקופת החולים'
      ],
      phoneDisplay: 'תתקשר לקופת החולים שלך'
    },
    eligibility: {
      healthIssues: true,
      pensioner: true
    }
  },
  {
    id: 'daycare-assistance',
    title: 'סיוע במעונות יום',
    icon: '🧸',
    category: 'education',
    whatIsIt: 'עזרה בתשלום למעון יום.',
    howMuch: 'אלפי שקלים בחודש.',
    forWhom: 'הורים עובדים עם ילדים קטנים.',
    howToCheck: {
      steps: [
        'לך לאתר משרד החינוך',
        'תמלא בקשה',
        'תחכה לתשובה'
      ],
      url: 'https://www.gov.il/he/service/daycare-center-parents-request-degree-of-subsidy',
      phone: '*6552',
      phoneDisplay: 'משרד החינוך (6552*)'
    },
    eligibility: {
      hasChildren: true,
      employed: true
    }
  },
  {
    id: 'paamonim',
    title: 'פעמונים - ייעוץ כלכלי',
    icon: '📊',
    category: 'charity',
    whatIsIt: 'ארגון שעוזר לסדר את הכלכלה שלך. לא נותנים כסף, אבל עוזרים לך לארגן.',
    howMuch: 'בחינם לגמרי!',
    forWhom: 'כל מי שרוצה לסדר את הכלכלה.',
    howToCheck: {
      steps: [
        'לך לאתר פעמונים',
        'תמלא טופס',
        'יתקשרו אליך'
      ],
      url: 'https://www.paamonim.org',
      phone: '03-9127150',
      phoneDisplay: 'פעמונים (03-9127150)'
    },
    eligibility: {
      employed: true,
      unemployed: true
    }
  },
  {
    id: 'free-loan',
    title: 'הלוואות ללא ריבית',
    icon: '💸',
    category: 'charity',
    whatIsIt: 'הלוואה ללא ריבית (לא צריך לשלם יותר ממה שלקחת).',
    howMuch: 'אלפי שקלים.',
    forWhom: 'כל מי שצריך כסף לדברים חשובים.',
    howToCheck: {
      steps: [
        'לך לאתר האגודה',
        'תמלא טופס בקשה',
        'תחכה לתשובה'
      ],
      url: 'https://www.freeloan.org.il',
      phone: '1-599-500-001',
      phoneDisplay: 'האגודה הישראלית להלוואות (1-599-500-001)'
    },
    eligibility: {
      employed: true,
      unemployed: true
    }
  }
];

export const charityOrganizations = [
  {
    category: 'אוכל ומזון',
    icon: '🍞',
    organizations: [
      { name: 'פתחון לב', description: 'חלוקת סלי מזון', url: 'https://www.pitchonlev.org.il' },
      { name: 'היו שלום', description: 'סלי מזון לחגים', url: 'https://heushalom.com' },
      { name: 'לקט ישראל', description: 'הצלת מזון וחלוקה', url: 'https://www.leket.org' }
    ]
  },
  {
    category: 'תרופות ובריאות',
    icon: '💊',
    organizations: [
      { name: 'חברים לרפואה', description: 'עזרה בתרופות', phone: '03-5792220', url: 'https://www.haverim.org.il' },
      { name: 'קרן מכבי', description: 'למבוטחי מכבי - עד 3,500 ₪ לשנה', url: 'https://www.keren-maccabi.co.il' },
      { name: 'יחד בתקווה', description: 'תרופות שאינן בסל', phone: '03-5743230' }
    ]
  },
  {
    category: 'ציוד וטיפולים',
    icon: '🏥',
    organizations: [
      { name: 'לב אוהב', description: 'ציוד רפואי וטיפולים', phone: '09-9605604' },
      { name: 'וראייטי', description: 'טיפולים וציוד שיקומי', phone: '03-6447220', url: 'https://www.variety-israel.org' },
      { name: 'קרן עזרה לקהילה', description: 'סיוע חד פעמי עד 1,000 ₪', phone: '09-9508371' }
    ]
  }
];
