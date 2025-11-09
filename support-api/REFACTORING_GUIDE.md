# מדריך ארגון ורפקטורינג Backend
## Backend Refactoring and Organization Guide

### מבנה תיקיות מוצע - Proposed Folder Structure

```
support-api/
├── config/                 # קבצי קונפיגורציה
│   ├── database.js        # הגדרות מסד נתונים
│   └── env.js             # משתני סביבה
├── routes/                 # נתיבי API
│   ├── ads.js
│   ├── users.js
│   ├── user_profiles.js
│   └── email.js
├── controllers/            # בקרים - טיפול בבקשות HTTP
│   ├── adsController.js
│   ├── usersController.js
│   ├── userProfilesController.js
│   └── emailController.js
├── services/               # לוגיקה עסקית
│   ├── adsService.js
│   ├── usersService.js
│   ├── userProfilesService.js
│   ├── emailService.js
│   ├── cache.js
│   ├── changeTracking.js
│   └── sendEmail.js
├── models/                 # מודלים - גישה לנתונים (DAL)
│   ├── Ad.js
│   ├── User.js
│   └── UserProfile.js
├── middleware/             # Middleware של Express
│   ├── asyncHandler.js
│   ├── changeTrackingMiddleware.js
│   ├── authMiddleware.js
│   └── errorHandler.js
├── utils/                  # כלי עזר
│   ├── logger.js
│   ├── validation.js
│   └── constants.js
├── DB/                     # קבצי מסד נתונים
│   └── Table.js
└── server.js               # נקודת כניסה
```

### שיפורים מוצעים - Proposed Improvements

#### 1. הוספת הערות והסברים
- ✅ הוספת JSDoc comments לכל הפונקציות
- ✅ הסבר בעברית ובאנגלית
- ✅ תיעוד פרמטרים וערכים חוזרים

#### 2. שיפור טיפול בשגיאות
- ✅ יצירת Error Handler מרכזי
- ✅ הוספת error codes
- ✅ שיפור הודעות שגיאה

#### 3. ולידציה
- ✅ הוספת ולידציה לנתוני קלט
- ✅ שימוש ב-joi או express-validator

#### 4. לוגים
- ✅ יצירת logger מרכזי
- ✅ הוספת לוגים מפורטים
- ✅ הפרדת לוגים לפי רמות (info, error, debug)

#### 5. אבטחה
- ✅ הוספת rate limiting
- ✅ הוספת sanitization
- ✅ שיפור אימות

#### 6. מבנה קבצים
- ✅ העברת function*.js ל-models/
- ✅ ארגון קבצים לפי תחום
- ✅ יצירת index files ל-imports נוחים

### שינויים שצריך לעשות - Required Changes

#### 1. עדכון Controllers
```javascript
// ישן - Old
exports.CreateUser = asyncHandler(async (req, res, next) => {
  try {
    const userId = await CreateUserBL(req.body);
    res.json({ message: 'User registered', userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
    return next('CreateUser failed', 404);
  }
});

// חדש - New
/**
 * Create a new user
 * יצירת משתמש חדש
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  // Validation
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Business logic
  const userId = await usersService.createUser(req.body);
  
  res.status(201).json({ 
    success: true,
    message: 'User registered successfully', 
    userId 
  });
});
```

#### 2. עדכון Services
```javascript
// ישן - Old
exports.CreateUserBL = async (user, details) => {
  try {
    console.log('Start registerUserBL');
    const userId = await CreateUserDAL(user, details);
    console.log('End registerUserBL');
    return userId;
  } catch (err) {
    console.error('Error in registerUserBL', err);
    throw err;
  }
};

// חדש - New
/**
 * Create a new user
 * יצירת משתמש חדש
 * @param {Object} userData - User data
 * @returns {Promise<number>} User ID
 * @throws {Error} If user creation fails
 */
exports.createUser = async (userData) => {
  logger.info('Creating new user', { email: userData.email });
  
  try {
    // Normalize email
    if (userData.email) {
      userData.email = userData.email.toLowerCase().trim();
    }

    // Create user in database
    const userId = await userModel.create(userData);
    
    logger.info('User created successfully', { userId });
    return userId;
  } catch (error) {
    logger.error('Error creating user', { error: error.message });
    throw error;
  }
};
```

#### 3. עדכון Models
```javascript
// חדש - New
/**
 * User Model
 * מודל משתמש - גישה לנתוני משתמשים במסד הנתונים
 */
const db = require('../DB/Table');
const functionDB = require('../functionUser');

class UserModel {
  /**
   * Create a new user
   * יצירת משתמש חדש
   */
  async create(userData) {
    return await functionDB.insertUser(userData);
  }

  /**
   * Find user by email
   * מציאת משתמש לפי אימייל
   */
  async findByEmail(email) {
    return await functionDB.getUserByEmail(email);
  }

  // ... other methods
}

module.exports = new UserModel();
```

### הצעות לשיפורים נוספים - Additional Improvement Suggestions

#### 1. Testing
- הוספת unit tests
- הוספת integration tests
- הוספת API tests

#### 2. Documentation
- יצירת Swagger/OpenAPI documentation
- הוספת API documentation
- יצירת README מפורט

#### 3. Performance
- הוספת caching
- אופטימיזציה של שאילתות
- הוספת indexes למסד נתונים

#### 4. Monitoring
- הוספת monitoring
- הוספת health checks
- הוספת metrics

### שלבי יישום - Implementation Steps

1. ⏳ יצירת מבנה תיקיות חדש
2. ⏳ הוספת הערות לקבצים הקיימים
3. ⏳ יצירת error handler מרכזי
4. ⏳ יצירת logger מרכזי
5. ⏳ הוספת ולידציה
6. ⏳ העברת function*.js ל-models/
7. ⏳ עדכון imports
8. ⏳ בדיקת פונקציונליות

### הערות חשובות - Important Notes

- ⚠️ **אין לשבור פונקציונליות קיימת!** - כל השינויים צריכים להיות backwards compatible
- 📝 כל פונקציה צריכה להכיל הערות JSDoc
- 🧪 יש לבדוק כל שינוי לפני המשך
- 📚 יש לעדכן את התיעוד בהתאם לשינויים

