# 📊 Analytics Setup Guide

## Current Status ✅

**מערכת אנליטיקס פנימית פעילה!**

האתר כעת כולל מערכת מעקב פנימית שעובדת ללא צורך בשרתים חיצוניים:

### מה עובד עכשיו:
- ✅ מעקב אחר כניסות לכל עמוד
- ✅ מעקב אחר השלמת שאלון
- ✅ מעקב אחר התחלת רמה 2
- ✅ מעקב אחר שיתופים בוואטסאפ
- ✅ מעקב אחר ביקורים בעמוד עזרה דחופה
- ✅ מעקב אחר צפייה בתוכניות
- ✅ דשבורד אנליטיקס ב-`/analytics`
- ✅ ייצוא נתונים ל-CSV
- ✅ **100% פרטי** - הכל נשמר ב-localStorage בדפדפן

### איך לגשת:
1. פתח את האתר
2. עבור ל-`https://justice4all.co.il/analytics`
3. תראה סטטיסטיקות מלאות:
   - סך כניסות
   - צפיות בעמודים
   - השלמת שאלונים
   - שיתופים
   - התוכניות הפופולריות ביותר

### ייצוא נתונים:
- לחץ על "ייצא ל-CSV" בדשבורד
- קובץ CSV יורד עם כל הנתונים
- אפשר לפתוח ב-Excel/Google Sheets לניתוח

---

## Future Upgrade: Umami Analytics 🚀

**למה Umami?**
- קוד פתוח ופרטי לחלוטין
- ממשק יפה ופשוט
- דוחות בזמן אמת
- ללא cookies, ללא מעקב אישי
- תואם GDPR

### שלבים להתקנה (דורש התחברות):

#### 1. הרשמה ל-Railway
1. עבור ל-https://railway.app
2. הירשם עם GitHub
3. אשר את החשבון

#### 2. Deploy Umami
1. עבור ל-https://railway.com/new/template/umami-analytics
2. לחץ "Deploy Now"
3. המתן 2-3 דקות להתקנה
4. Railway יצור:
   - PostgreSQL database
   - Umami application
   - Domain אוטומטי

#### 3. הגדרת Umami
1. פתח את ה-domain שנוצר (משהו כמו `umami-xxxx.up.railway.app`)
2. התחבר עם:
   - Username: `admin`
   - Password: `umami`
3. **שנה סיסמה מיד!** (Settings → Account → Change Password)

#### 4. הוספת האתר
1. לחץ "Add Website"
2. שם: "כסף שמגיע לך"
3. Domain: `justice4all.co.il`
4. לחץ "Save"

#### 5. קבלת Tracking Code
1. לחץ על האתר שיצרת
2. לחץ "Edit"
3. לחץ "Tracking Code"
4. העתק את הקוד (משהו כמו):
```html
<script async src="https://umami-xxxx.up.railway.app/script.js" data-website-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></script>
```

#### 6. הוספת הקוד לאתר
1. פתח `client/index.html`
2. הוסף את הקוד לפני `</head>`
3. שמור
4. Push ל-GitHub:
```bash
cd /home/ubuntu/kesef-shemaguia-lecha
git add client/index.html
git commit -m "הוספת Umami Analytics"
git push github main
```

#### 7. בדיקה
1. המתן 3-5 דקות לפרסום
2. עבור לאתר
3. חזור ל-Umami dashboard
4. תראה את הביקור הראשון!

---

## Comparison: Internal vs Umami

| Feature | Internal Analytics | Umami |
|---------|-------------------|-------|
| **עלות** | חינם לגמרי | חינם (Railway Free Tier) |
| **פרטיות** | 100% מקומי | 100% פרטי (שרת שלך) |
| **התקנה** | ✅ כבר מותקן | צריך התחברות |
| **דוחות** | בסיסי | מתקדם + יפה |
| **זמן אמת** | לא | כן |
| **היסטוריה** | מוגבל (100 sessions) | ללא הגבלה |
| **גרפים** | בסיסי | מתקדם |
| **ניתוח** | CSV export | Built-in |

---

## המלצה 💡

**עכשיו:** השתמש במערכת הפנימית - היא עובדת מצוין!

**בעתיד:** כשיהיה לך זמן, התקן Umami לדוחות מתקדמים יותר.

**שני המערכות יכולות לעבוד ביחד** - אין צורך להסיר את המערכת הפנימית.

---

## Support

יש בעיה? שאלה?
- פתח issue ב-GitHub
- או צור קשר דרך האתר

**זכור:** הכל פרטי, הכל בשליטה שלך! 🔒
