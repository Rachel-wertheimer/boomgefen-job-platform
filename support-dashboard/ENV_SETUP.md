# הגדרות משתני סביבה (Environment Variables)

## מערכת המייל (EmailJS)

המערכת משתמשת ב-EmailJS לשליחת מיילים. כדי להפעיל את המיילים, יש להגדיר את המשתנים הבאים בקובץ `.env`:

### משתנים נדרשים:

1. `VITE_EMAILJS_SERVICE_ID` - מזהה השירות שלך ב-EmailJS
2. `VITE_EMAILJS_TEMPLATE_ID` - מזהה התבנית שלך ב-EmailJS  
3. `VITE_EMAILJS_PUBLIC_KEY` - המפתח הציבורי שלך מ-EmailJS

### הוראות הגדרה:

1. היכנס לחשבון שלך ב-EmailJS: https://www.emailjs.com/
2. עבור ל-Email Services ובחר שירות קיים או צור חדש
3. העתק את ה-Service ID
4. עבור ל-Email Templates ובחר תבנית קיימת או צור חדשה
5. העתק את ה-Template ID
6. עבור ל-Account > API Keys והעתק את ה-Public Key
7. צור קובץ `.env` בתיקיית `support-dashboard` והכנס את הערכים:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

### הערות:

- קובץ `.env` לא צריך להיכנס ל-Git (כבר מופיע ב-.gitignore)
- לאחר שינוי המשתנים, יש לבנות מחדש את האפליקציה (`npm run build`) או להפעיל מחדש את שרת הפיתוח (`npm run dev`)

