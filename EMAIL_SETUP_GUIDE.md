# מדריך הגדרת מערכת המייל ✅

## ✅ הקוד מוכן לעבוד עם SendGrid!

כרגע המערכת לא שולחת מיילים כי חסר API Key. ברגע שתציבי את המפתח ב-Render, המיילים יעבדו אוטומטית!

## ⚡ הוראות מהירות - SendGrid (מומלץ!)

### אופציה 1: SendGrid (מומלץ, חינמי ל-100 מיילים ביום) ✅

**הקוד כבר מוכן - רק צריך להוסיף API Key:**

1. **היכנסי ל-https://signup.sendgrid.com/ והרשמי (חינם)**
2. **בחרי "Create API Key" בדשבורד**
3. **בחרי "Full Access"**
4. **העתיקי את ה-API Key**
5. **הוסיפי ל-Render Environment Variables:**
   ```
   Key: SENDGRID_API_KEY
   Value: [העתיקי את המפתח]
   ```
6. **אימתי את המייל השולח ב-SendGrid:**
   - https://app.sendgrid.com/settings/sender_auth/senders/new
   - הכניסי: boom.gefen.hevy@gmail.com
   - ואימתי דרך מייל

### אופציה 2: Resend (חינמי ל-3000 מיילים בחודש)
1. הרשם ל-Resend: https://resend.com/
2. קבל API Key
3. עדכן את `support-api/.env`:
```
MAIL_SERVICE=resend
RESEND_API_KEY=your_api_key_here
```

### אופציה 3: Mailgun (חינמי ל-5000 מיילים בחודש)
1. הרשם ל-Mailgun: https://signup.mailgun.com/
2. קבל API Key
3. עדכן את `support-api/.env`:
```
MAIL_SERVICE=mailgun
MAILGUN_API_KEY=your_api_key_here
```

### אופציה 4: Gmail עם App Password
1. לך ל: https://myaccount.google.com/apppasswords
2. צור App Password חדש
3. עדכן את `support-api/.env`:
```
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_app_password
```

## איך זה עובד עכשיו
כרגע הקוד מדפיס בקונסול מה הוא היה שולח:
```
Mail service not available - skipping email send
Would have sent: To: user@example.com, Subject: ..., Text: ...
```

זה אומר שהמערכת עובדת אבל לא שולחת באמת מיילים כי אין הגדרות SMTP.
