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
      url: 'https://www.btl.gov.il/benefits/Income_support/Pages/default.aspx',
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
  },
  {
    id: 'health-fund-exemptions',
    title: 'פטורים בקופות חולים',
    icon: '🏥',
    category: 'health',
    whatIsIt: 'פטור מתשלומים בקופת החולים (ביקור רופא, בדיקות, תרופות).',
    howMuch: 'חיסכון של מאות עד אלפי שקלים בשנה.',
    forWhom: 'מקבלי קצבאות (נכות, זיקנה, הבטחת הכנסה), אזרחים ותיקים.',
    howToCheck: {
      steps: [
        'תתקשר לקופת החולים שלך',
        'תשאל על "פטור מתשלומים"',
        'תביא אישור מהביטוח לאומי'
      ],
      phoneDisplay: 'תתקשר לקופת החולים שלך'
    },
    eligibility: {
      unemployed: true,
      pensioner: true
    }
  },
  {
    id: 'municipal-assistance',
    title: 'סיוע מהעירייה',
    icon: '🏛️',
    category: 'money',
    whatIsIt: 'מענק כספי מהמחלקה לשירותים חברתיים בעירייה לצרכים חיוניים.',
    howMuch: 'עד 14,520 ₪ בשנה למשפחה.',
    forWhom: 'משפחות ויחידים במצוקה כלכלית.',
    howToCheck: {
      steps: [
        'לך למחלקה לשירותים חברתיים בעירייה',
        'תבקש לפגוש עובד סוציאלי',
        'תסביר מה אתה צריך (ציוד, נסיעות, בריאות)'
      ],
      phoneDisplay: 'חייג לעירייה שלך ושאל על "שירותים חברתיים"'
    },
    eligibility: {
      employed: true,
      unemployed: true
    }
  },
  {
    id: 'legal-aid',
    title: 'סיוע משפטי בחינם',
    icon: '⚖️',
    category: 'charity',
    whatIsIt: 'ייצוג משפטי חינם בבתי משפט ובתי דין.',
    howMuch: 'בחינם לגמרי (חוץ מאגרה קטנה).',
    forWhom: 'אנשים עם הכנסה נמוכה שצריכים עורך דין.',
    howToCheck: {
      steps: [
        'לך לאתר הסיוע המשפטי',
        'תמלא טופס בקשה',
        'תצרף אישורי הכנסה'
      ],
      url: 'https://www.gov.il/he/service/legal_aid_application',
      phone: '1-800-350-350',
      phoneDisplay: 'סיוע משפטי (1-800-350-350)'
    },
    eligibility: {
      employed: true,
      unemployed: true
    }
  },
  {
    id: 'vocational-training',
    title: 'שוברים להכשרה מקצועית',
    icon: '🎯',
    category: 'education',
    whatIsIt: 'מימון חלקי לקורסים מקצועיים (מחשבים, בנייה, טיפולים).',
    howMuch: 'עד 7,000 ₪ למימון הקורס.',
    forWhom: 'מבוגרים מעל 18 שרוצים ללמוד מקצוע.',
    howToCheck: {
      steps: [
        'לך לאתר השוברים',
        'תמלא בקשה',
        'תבחר קורס'
      ],
      url: 'https://www.taasuka.gov.il/applicants/shovarim/',
      phone: '1599-500-818',
      phoneDisplay: 'שוברים (1599-500-818)'
    },
    eligibility: {
      employed: true,
      unemployed: true,
      student: true
    }
  },
  {
    id: 'campus-il',
    title: 'קמפוס IL - קורסים בחינם',
    icon: '💻',
    category: 'education',
    whatIsIt: 'קורסים אונליין בחינם מהמדינה (מחשבים, אנגלית, פסיכומטרי).',
    howMuch: 'בחינם לגמרי!',
    forWhom: 'כל מי שרוצה ללמוד.',
    howToCheck: {
      steps: [
        'לך לאתר קמפוס IL',
        'תירשם',
        'תתחיל ללמוד'
      ],
      url: 'https://campus.gov.il'
    },
    eligibility: {
      employed: true,
      unemployed: true,
      student: true,
      pensioner: true
    }
  },
  {
    id: 'activities-discount',
    title: 'הנחות בחוגים וקייטנות',
    icon: '⚽',
    category: 'education',
    whatIsIt: 'הנחה בחוגים עירוניים וקייטנות לילדים.',
    howMuch: '10%-100% הנחה (תלוי בעירייה).',
    forWhom: 'משפחות עם הכנסה נמוכה.',
    howToCheck: {
      steps: [
        'תתקשר למחלקת קהילה ונוער בעירייה',
        'תשאל על "הנחות בחוגים"',
        'תביא אישורי הכנסה'
      ],
      phoneDisplay: 'חייג לעירייה שלך'
    },
    eligibility: {
      hasChildren: true
    }
  },
  {
    id: 'tax-refund',
    title: 'החזרי מס',
    icon: '💵',
    category: 'money',
    whatIsIt: 'כסף ששילמת יותר מדי מס ואפשר לקבל חזרה.',
    howMuch: 'אלפי שקלים (תלוי במשכורת ובניכויים).',
    forWhom: 'שכירים ששילמו יותר מדי מס במשך השנה.',
    howToCheck: {
      steps: [
        'לך למחשבון הזכאות',
        'תמלא פרטים',
        'אם מגיע לך - תמלא טופס 135',
        'תשלח למס הכנסה'
      ],
      url: 'https://www.gov.il/he/service/simulator-employee',
      phone: '*4954',
      phoneDisplay: '*מסים (4954*)',
      hours: 'א\'-ה\', 8:00-16:00'
    },
    eligibility: {
      employed: true
    }
  },
  {
    id: 'ogen-loan',
    title: 'הלוואות ללא ריבית - קרן עוגן',
    icon: '💰',
    category: 'money',
    whatIsIt: 'הלוואה ללא ריבית לכל מטרה (לא צריך לשלם יותר ממה שלקחת).',
    howMuch: 'עד 40,000 ₪ (תלוי במטרה).',
    forWhom: 'יחידים ומשפחות עם הכנסה נמוכה עד בינונית.',
    howToCheck: {
      steps: [
        'לך לאתר עוגן',
        'תמלא בקשה אונליין',
        'תצרף אישורי הכנסה',
        'תחכה לתשובה'
      ],
      url: 'https://www.ogen.org/',
      phone: '03-5638222',
      phoneDisplay: 'עוגן (03-5638222)',
      hours: 'א\'-ה\', 9:00-17:00'
    },
    eligibility: {
      employed: true,
      unemployed: true
    }
  },
  {
    id: 'lost-money',
    title: 'כספים אבודים - "הר הכסף"',
    icon: '🔍',
    category: 'money',
    whatIsIt: 'חשבונות בנק, פנסיות וביטוחים ששכחת עליהם.',
    howMuch: 'יכול להיות אלפי שקלים!',
    forWhom: 'כל מי שעבד בעבר או היו לו חשבונות.',
    howToCheck: {
      steps: [
        'לך לאתר "הר הכסף"',
        'תזדהה עם תעודת זהות',
        'תראה אם יש לך כספים',
        'אם כן - תפנה לבנק/קופת גמל'
      ],
      url: 'https://www.gov.il/he/service/pension_savings_search',
      phoneDisplay: 'תתקשר לבנק שלך אחרי שתמצא'
    },
    eligibility: {
      employed: true,
      unemployed: true,
      pensioner: true,
      student: true
    }
  },
  {
    id: 'heating-grant',
    title: 'מענק חימום',
    icon: '⚡',
    category: 'money',
    whatIsIt: 'כסף מהביטוח הלאומי לעזרה בחימום הדירה בחורף.',
    howMuch: '325-649 ₪ בשנה (תלוי אם יחיד או משפחה).',
    forWhom: 'אזרחים ותיקים, נכים, נפגעי פעולות איבה.',
    howToCheck: {
      steps: [
        'המענק משולם אוטומטי באוקטובר',
        'אם אתם מקבלים קצבת זקנה - זה מגיע אוטומטי',
        'אם לא קיבלתם - תתקשרו לביטוח הלאומי'
      ],
      url: 'http://www.btl.gov.il/benefits/old_age/Pages/מענק%20חימום.aspx',
      phone: '*6050',
      phoneDisplay: 'ביטוח לאומי (6050*)',
      hours: 'א\'-ה\', 8:00-16:00'
    },
    eligibility: {
      pensioner: true,
      healthIssues: true
    }
  },
  {
    id: 'study-grant',
    title: 'מענק לימודים',
    icon: '📚',
    category: 'education',
    whatIsIt: 'עזרה כספית לכיסוי הוצאות לימודיות (ספרים, תיקים, ציוד).',
    howMuch: 'תלוי בהכנסה ובמספר הילדים.',
    forWhom: 'משפחות עם ילדים בכיתות א\'-י"ב עם הכנסה נמוכה.',
    howToCheck: {
      steps: [
        'לכו לאתר הביטוח הלאומי',
        'תמלאו בקשה למענק לימודים',
        'תצרפו אישורים על הכנסה'
      ],
      url: 'http://www.btl.gov.il/benefits/Pages/m.limudim1.aspx',
      phone: '*6050',
      phoneDisplay: 'ביטוח לאומי (6050*)',
      hours: 'א\'-ה\', 8:00-16:00'
    },
    eligibility: {
      hasChildren: true
    }
  },
  {
    id: 'child-savings',
    title: 'תוכנית חיסכון לכל ילד',
    icon: '💰',
    category: 'money',
    whatIsIt: 'המדינה מפקידה 50 ₪ בחודש לחסכון עבור כל ילד עד גיל 18.',
    howMuch: '50 ₪ בחודש מהמדינה (נצבר עד גיל 18).',
    forWhom: 'כל ילד שנולד מ-2017 ואילך.',
    howToCheck: {
      steps: [
        'התוכנית פועלת אוטומטית',
        'תוכלו לבדוק את היתרה באתר הביטוח הלאומי',
        'הכסף ישוחרר בגיל 18 או 21 (תלוי בתנאים)'
      ],
      url: 'http://www.btl.gov.il/benefits/children/HisahoLayeled/Pages/default.aspx',
      phone: '*6050',
      phoneDisplay: 'ביטוח לאומי (6050*)',
      hours: 'א\'-ה\', 8:00-16:00'
    },
    eligibility: {
      hasChildren: true
    }
  }
];

export const charityOrganizations = [
  {
    category: 'ייעוץ וסיוע משפטי',
    icon: '⚖️',
    organizations: [
      { name: 'יד שרה', description: 'ייעוץ משפטי לקשישים וחולים', url: 'https://yad-sarah.net' },
      { name: 'ידיד', description: 'ייעוץ משפטי בתחום הדיור', url: 'https://www.yadid.org.il' },
      { name: 'שכר מצווה', description: 'ייעוץ משפטי בהתנדבות' },
      { name: 'נעמת', description: 'סיוע משפטי לנשים', url: 'https://www.naamat.org.il' }
    ]
  },
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
