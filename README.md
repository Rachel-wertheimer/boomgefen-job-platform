# 🎭 BoomGefen - פלטפורמת משרות לאמנים

<div dir="rtl">

## 📋 תיאור הפרויקט

**BoomGefen** היא פלטפורמה דיגיטלית מתקדמת לחיפוש ופרסום משרות לאמנים. הפרויקט פותח בשיתוף פעולה בין **BOOM הפקות** ו-**גפן הפקות במה**, ומטרתו לחבר בין אמנים למעסיקים בתחום האמנות, התיאטרון וההפקות.

הפלטפורמה מאפשרת:
- 🎨 **אמנים** - חיפוש משרות רלוונטיות בתחום האמנות
- 🏢 **מעסיקים** - פרסום משרות לאמנים מוכשרים
- 👥 **מנהלים** - ניהול ופיקוח על המודעות והמשתמשים

## 🎯 מטרת הפרויקט

הפרויקט נוצר כדי ליצור גשר דיגיטלי בין אמנים לבין הזדמנויות תעסוקה בתחום האמנות. הפלטפורמה מספקת:

1. **פרסום משרות** - מעסיקים יכולים לפרסם משרות לאמנים (שחקנים, מפיקים, מוזיקאים ועוד)
2. **חיפוש משרות** - אמנים יכולים לחפש משרות רלוונטיות בתחומם
3. **יצירת קשר** - מערכת תקשורת בין אמנים למעסיקים
4. **ניהול מנויים** - מערכת מנויים לאמנים רשומים
5. **אישור מודעות** - מערכת אישור ופיקוח על המודעות

## ✨ תכונות עיקריות

### למשתמשים (אמנים)
- 🔍 **חיפוש משרות** - חיפוש משרות לפי סוג אמנות (שחקנית, מפיקה, מוזיקאי ועוד)
- 📝 **הרשמה** - הרשמה מלאה עם פרטי פרופיל מפורטים
- 💼 **יצירת קשר** - יצירת קשר ישיר עם מעסיקים
- 📧 **התראות** - קבלת התראות על משרות חדשות
- 👤 **פרופיל אישי** - ניהול פרופיל אישי עם תיק עבודות

### למעסיקים
- 📢 **פרסום משרות** - פרסום משרות לאמנים
- 🎯 **סינון מועמדים** - סינון מועמדים לפי קריטריונים
- 💬 **תקשורת** - תקשורת ישירה עם מועמדים
- 📊 **ניהול מודעות** - ניהול וניטור מודעות

### למנהלים
- ✅ **אישור מודעות** - אישור או דחייה של מודעות
- 🔄 **ניהול רלוונטיות** - סימון מודעות כרלוונטיות או לא רלוונטיות
- 👥 **ניהול משתמשים** - ניהול משתמשים ומנויים
- 📈 **דוחות** - דוחות וסטטיסטיקות

## 🛠️ טכנולוגיות

### Frontend
- **React 18.3** - ספריית UI מודרנית
- **TypeScript** - טיפוסים סטטיים
- **Redux Toolkit** - ניהול state גלובלי
- **React Router** - ניווט בין דפים
- **Axios** - קריאות API
- **Vite** - Build tool מהיר
- **React Icons** - אייקונים
- **React Select** - רכיבי בחירה
- **Framer Motion** - אנימציות

### Backend
- **Node.js** - Runtime environment
- **Express 5.1** - Web framework
- **MySQL/PostgreSQL** - מסדי נתונים
- **JWT** - אימות משתמשים
- **Bcrypt** - הצפנת סיסמאות
- **Nodemailer/SendGrid** - שליחת אימיילים
- **CORS** - Cross-Origin Resource Sharing

### DevOps & Tools
- **Git** - ניהול גרסאות
- **Docker** - Containerization
- **Nodemon** - Development server
- **ESLint** - Code linting

## 📁 מבנה הפרויקט

```
boomGefen/
├── support-dashboard/          # Frontend Application
│   ├── src/
│   │   ├── components/         # קומפוננטות React
│   │   ├── pages/              # דפי האפליקציה
│   │   ├── layouts/            # Layout components
│   │   ├── services/           # שירותי API
│   │   ├── hooks/              # Custom hooks
│   │   ├── store/              # Redux store
│   │   ├── utils/              # Utilities
│   │   ├── styles/             # CSS and styles
│   │   ├── types/              # TypeScript types
│   │   ├── constants/          # Application constants
│   │   └── config/             # Configuration
│   ├── public/                 # קבצים סטטיים
│   └── package.json
│
├── support-api/                # Backend API
│   ├── routes/                 # API routes
│   ├── controllers/            # Route controllers
│   ├── services/               # Business logic
│   ├── BL/                     # Business Layer
│   ├── DAL/                    # Data Access Layer
│   ├── middleware/             # Express middleware
│   ├── utils/                  # Utilities
│   ├── DB/                     # Database files
│   └── server.js               # Entry point
│
└── README.md                   # קובץ זה
```

## 🚀 התקנה והרצה

### דרישות מוקדמות
- Node.js (גרסה 18 או גבוהה יותר)
- npm או yarn
- MySQL או PostgreSQL
- Git

### התקנת Frontend

```bash
# כניסה לתיקיית Frontend
cd support-dashboard

# התקנת תלויות
npm install

# הרצת שרת פיתוח
npm run dev

# בניית production
npm run build
```

### התקנת Backend

```bash
# כניסה לתיקיית Backend
cd support-api

# התקנת תלויות
npm install

# יצירת קובץ .env
cp .env.example .env
# ועדכון המשתנים הנדרשים

# הרצת שרת פיתוח
npm run dev

# הרצת production
npm start
```

### משתני סביבה (Backend)

צור קובץ `.env` בתיקיית `support-api` עם המשתנים הבאים:

```env
PORT=3001
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_key
CORS_ORIGIN=https://your-frontend-url.com
```

## 📖 שימוש

### הרשמה כאמן
1. גש לדף "עבוד איתנו"
2. מלא את פרטי ההרשמה
3. העלה תיק עבודות (אופציונלי)
4. שלח בקשה להרשמה
5. לאחר אישור, התחבר למערכת

### פרסום משרה
1. התחבר למערכת כמעסיק
2. גש לדף "לפרסם אצלנו"
3. מלא את פרטי המשרה
4. שלח את המודעה לאישור
5. לאחר אישור מנהל, המודעה תופיע באתר

### חיפוש משרות
1. גש לדף "לוח משרות"
2. השתמש בסינון לפי סוג משרה
3. צפה בפרטי המשרה
4. צור קשר עם המעסיק

## 🔒 אבטחה

- **אימות JWT** - כל הבקשות מאומתות באמצעות JWT tokens
- **הצפנת סיסמאות** - סיסמאות מוצפנות באמצעות bcrypt
- **CORS** - הגנה מפני Cross-Origin attacks
- **Validation** - ולידציה של כל הקלטים
- **Error Handling** - טיפול מרכזי בשגיאות

## 📝 API Endpoints

### מודעות (Ads)
- `GET /api/v1/ads/getAllApprovedAds` - קבלת כל המודעות המאושרות
- `GET /api/v1/ads/getAllNotApprovedAds` - קבלת מודעות שלא אושרו
- `POST /api/v1/ads/createAds` - יצירת מודעה חדשה
- `PUT /api/v1/ads/toggleApproved/:adId` - שינוי סטטוס אישור
- `PUT /api/v1/ads/toggleRelevant/:adId` - שינוי סטטוס רלוונטיות
- `DELETE /api/v1/ads/deleteAd/:adId` - מחיקת מודעה

### משתמשים (Users)
- `POST /api/v1/users/createuser` - יצירת משתמש חדש
- `POST /api/v1/users/login` - התחברות
- `GET /api/v1/users/getDetails/:user_id` - קבלת פרטי משתמש
- `PUT /api/v1/users/subscription_start/:user_id` - עדכון מנוי
- `DELETE /api/v1/users/deleteUser/:user_id` - מחיקת משתמש

### אימיילים (Email)
- `POST /api/v1/email/send` - שליחת אימייל

## 🧪 Testing

```bash
# Frontend testing (עתידי)
cd support-dashboard
npm test

# Backend testing (עתידי)
cd support-api
npm test
```

## 📚 תיעוד נוסף

- [מדריך רפקטורינג Frontend](./support-dashboard/REFACTORING_GUIDE.md)
- [מדריך רפקטורינג Backend](./support-api/REFACTORING_GUIDE.md)
- [סיכום פרויקט](./PROJECT_SUMMARY.md)
- [הגדרת סביבה](./support-dashboard/ENV_SETUP.md)

## 🤝 תרומה לפרויקט

אנחנו פתוחים לתרומות! אם יש לך רעיון לשיפור או תיקון, אנא:

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/AmazingFeature`)
3. Commit את השינויים (`git commit -m 'Add some AmazingFeature'`)
4. Push ל-branch (`git push origin feature/AmazingFeature`)
5. פתח Pull Request

## 📄 רישיון

הפרויקט פותח עבור **BOOM הפקות** ו-**גפן הפקות במה**.

## 👥 צוות הפרויקט

- **רחל ורטהיימר** - אפיון, עיצוב ופיתוח
- **BOOM הפקות** - שותף עסקי
- **גפן הפקות במה** - שותף עסקי

## 📞 יצירת קשר

לשאלות, בקשות תכונות או תמיכה:
- 📧 Email: Rachel.fsd108@gmail.com
- 🌐 Website: [BoomGefen](https://boomgefen-job-platform-yiax.onrender.com)

## 🎉 תודות

תודה לכל התורמים והשותפים שסייעו בפיתוח הפרויקט!

---

**גרסה**: 1.0.0  
**תאריך עדכון אחרון**: 2024  
**סטטוס**: פעיל 🟢

</div>

---

<div dir="ltr">

## 📋 Project Description

**BoomGefen** is an advanced digital platform for finding and posting job opportunities for artists. The project was developed in collaboration between **BOOM Productions** and **Gefen Stage Productions**, aiming to connect artists with employers in the field of arts, theater, and production.

## 🎯 Project Goals

The project was created to build a digital bridge between artists and employment opportunities in the arts field. The platform provides:

1. **Job Posting** - Employers can post jobs for artists (actors, producers, musicians, etc.)
2. **Job Search** - Artists can search for relevant jobs in their field
3. **Contact Creation** - Communication system between artists and employers
4. **Subscription Management** - Subscription system for registered artists
5. **Ad Approval** - Approval and monitoring system for ads

## ✨ Key Features

### For Users (Artists)
- 🔍 **Job Search** - Search jobs by art type (actress, producer, musician, etc.)
- 📝 **Registration** - Complete registration with detailed profile information
- 💼 **Contact Creation** - Direct contact with employers
- 📧 **Notifications** - Receive notifications about new jobs
- 👤 **Personal Profile** - Manage personal profile with portfolio

### For Employers
- 📢 **Job Posting** - Post jobs for artists
- 🎯 **Candidate Filtering** - Filter candidates by criteria
- 💬 **Communication** - Direct communication with candidates
- 📊 **Ad Management** - Manage and monitor ads

### For Managers
- ✅ **Ad Approval** - Approve or reject ads
- 🔄 **Relevance Management** - Mark ads as relevant or irrelevant
- 👥 **User Management** - Manage users and subscriptions
- 📈 **Reports** - Reports and statistics

## 🛠️ Technologies

### Frontend
- **React 18.3** - Modern UI library
- **TypeScript** - Static typing
- **Redux Toolkit** - Global state management
- **React Router** - Page navigation
- **Axios** - API calls
- **Vite** - Fast build tool
- **React Icons** - Icons
- **React Select** - Selection components
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express 5.1** - Web framework
- **MySQL/PostgreSQL** - Databases
- **JWT** - User authentication
- **Bcrypt** - Password encryption
- **Nodemailer/SendGrid** - Email sending
- **CORS** - Cross-Origin Resource Sharing

## 🚀 Installation & Running

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- MySQL or PostgreSQL
- Git

### Frontend Installation

```bash
# Navigate to Frontend directory
cd support-dashboard

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend Installation

```bash
# Navigate to Backend directory
cd support-api

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Update required variables

# Run development server
npm run dev

# Run production
npm start
```

## 📖 Usage

### Register as Artist
1. Go to "Work With Us" page
2. Fill in registration details
3. Upload portfolio (optional)
4. Submit registration request
5. After approval, login to the system

### Post a Job
1. Login as employer
2. Go to "Post With Us" page
3. Fill in job details
4. Submit ad for approval
5. After manager approval, ad will appear on the site

### Search Jobs
1. Go to "Job Board" page
2. Use filter by job type
3. View job details
4. Contact employer

## 🔒 Security

- **JWT Authentication** - All requests are authenticated using JWT tokens
- **Password Encryption** - Passwords are encrypted using bcrypt
- **CORS** - Protection against Cross-Origin attacks
- **Validation** - Validation of all inputs
- **Error Handling** - Centralized error handling

## 📝 API Endpoints

### Ads
- `GET /api/v1/ads/getAllApprovedAds` - Get all approved ads
- `GET /api/v1/ads/getAllNotApprovedAds` - Get not approved ads
- `POST /api/v1/ads/createAds` - Create new ad
- `PUT /api/v1/ads/toggleApproved/:adId` - Toggle approval status
- `PUT /api/v1/ads/toggleRelevant/:adId` - Toggle relevance status
- `DELETE /api/v1/ads/deleteAd/:adId` - Delete ad

### Users
- `POST /api/v1/users/createuser` - Create new user
- `POST /api/v1/users/login` - Login
- `GET /api/v1/users/getDetails/:user_id` - Get user details
- `PUT /api/v1/users/subscription_start/:user_id` - Update subscription
- `DELETE /api/v1/users/deleteUser/:user_id` - Delete user

### Email
- `POST /api/v1/email/send` - Send email

## 📚 Additional Documentation

- [Frontend Refactoring Guide](./support-dashboard/REFACTORING_GUIDE.md)
- [Backend Refactoring Guide](./support-api/REFACTORING_GUIDE.md)
- [Project Summary](./PROJECT_SUMMARY.md)
- [Environment Setup](./support-dashboard/ENV_SETUP.md)

## 🤝 Contributing

We welcome contributions! If you have an idea for improvement or a fix, please:

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

The project was developed for **BOOM Productions** and **Gefen Stage Productions**.

## 👥 Project Team

- **Rachel Wertheimer** - Design, UI/UX, and Development
- **BOOM Productions** - Business Partner
- **Gefen Stage Productions** - Business Partner

## 📞 Contact

For questions, feature requests, or support:
- 📧 Email: Rachel.fsd108@gmail.com
- 🌐 Website: [BoomGefen](https://boomgefen-job-platform-yiax.onrender.com)

## 🎉 Acknowledgments

Thanks to all contributors and partners who helped develop the project!

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Active 🟢

</div>

