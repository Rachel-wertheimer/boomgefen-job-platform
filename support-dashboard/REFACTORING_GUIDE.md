# מדריך ארגון ורפקטורינג הפרויקט
## Project Refactoring and Organization Guide

### מבנה תיקיות חדש - New Folder Structure

```
support-dashboard/src/
├── components/          # קומפוננטות React
│   ├── layout/         # קומפוננטות Layout (Navbar, Footer)
│   ├── modals/         # קומפוננטות Modal
│   ├── common/         # קומפוננטות משותפות (AdCard, AdsList, etc.)
│   └── pages/          # דפים (Home, Ads, AboutUs, etc.)
├── pages/              # דפים (Alternative: can be in components/pages)
├── layouts/            # Layout components (MainLayout)
├── services/           # שירותי API
│   ├── adsService.ts
│   ├── userService.ts
│   └── emailService.ts
├── hooks/              # Custom React hooks
│   ├── useWindowSize.ts
│   └── index.ts
├── store/              # Redux store (moved from app/)
│   ├── slices/         # Redux slices
│   └── store.ts
├── utils/              # Utilities
│   ├── colors.ts
│   ├── auth.ts
│   └── seoKeywords.ts
├── styles/             # CSS and styles
│   ├── animations.ts
│   └── index.css
├── types/              # TypeScript types
│   └── index.ts
├── constants/          # Application constants
│   └── index.ts
└── config/             # Configuration
    └── api.ts
```

### שינויים שנעשו - Changes Made

#### 1. Services (שירותים)
- ✅ נוצר `services/adsService.ts` - כל קריאות ה-API למודעות
- ✅ נוצר `services/userService.ts` - כל קריאות ה-API למשתמשים
- ✅ נוצר `services/emailService.ts` - שליחת אימיילים
- ✅ נוצר `config/api.ts` - קונפיגורציה של axios

#### 2. Types (טיפוסים)
- ✅ נוצר `types/index.ts` - כל הגדרות הטיפוסים במקום אחד

#### 3. Constants (קבועים)
- ✅ נוצר `constants/index.ts` - כל הקבועים של האפליקציה

#### 4. Hooks (hooks מותאמים)
- ✅ נוצר `hooks/useWindowSize.ts` - Hook לבדיקת גודל חלון
- ✅ הוספה `useIsMobile` - Hook לבדיקה אם המסך הוא מובייל

#### 5. Styles (סגנונות)
- ✅ נוצר `styles/animations.ts` - אנימציות מרוכזות

#### 6. Layouts (Layouts)
- ✅ נוצר `layouts/MainLayout.tsx` - Layout ראשי עם Navbar ו-Footer

### שינויים שצריך לעשות - Required Changes

#### 1. עדכון Imports בקומפוננטות
```typescript
// ישן - Old
import { useWindowSize } from "../../utils/hooks";
import { getApprovedAds } from "../../app/api/ads";

// חדש - New
import { useWindowSize, useIsMobile } from "../../hooks";
import { getApprovedAds } from "../../services/adsService";
```

#### 2. עדכון Store
- העברת `app/store.ts` ל-`store/store.ts`
- העברת `app/slice/` ל-`store/slices/`

#### 3. עדכון Routing
- שימוש ב-`MainLayout` במקום `LayoutWithNavbar`

#### 4. עדכון Components
- העברת `components/pages/Navbar.tsx` ל-`components/layout/Navbar.tsx`
- העברת `components/pages/Footer.tsx` ל-`components/layout/Footer.tsx`
- העברת Modals ל-`components/modals/`

### Backend - מבנה מוצע

```
support-api/
├── config/             # Configuration files
│   └── database.js
├── routes/             # API routes
│   ├── ads.js
│   ├── users.js
│   ├── user_profiles.js
│   └── email.js
├── controllers/        # Route controllers
│   ├── adsController.js
│   ├── usersController.js
│   ├── userProfilesController.js
│   └── emailController.js
├── services/           # Business logic
│   ├── adsService.js
│   ├── usersService.js
│   ├── userProfilesService.js
│   └── emailService.js
├── models/             # Data models (DAL)
│   ├── Ad.js
│   ├── User.js
│   └── UserProfile.js
├── middleware/         # Express middleware
│   ├── asyncHandler.js
│   ├── changeTrackingMiddleware.js
│   └── authMiddleware.js
├── utils/              # Utilities
│   └── logger.js
└── server.js           # Entry point
```

### הצעות לשיפורים - Improvement Suggestions

#### Frontend
1. **Error Handling**: הוספת Error Boundary לקומפוננטות
2. **Loading States**: שיפור טיפול במצבי טעינה
3. **Form Validation**: הוספת ולידציה לטפסים
4. **Testing**: הוספת בדיקות יחידה
5. **Accessibility**: שיפור נגישות
6. **Performance**: אופטימיזציה של ביצועים (lazy loading, memoization)

#### Backend
1. **Error Handling**: שיפור טיפול בשגיאות
2. **Validation**: הוספת ולידציה לנתונים
3. **Logging**: הוספת לוגים מפורטים
4. **Security**: שיפור אבטחה (rate limiting, sanitization)
5. **Testing**: הוספת בדיקות יחידה ו-integration tests
6. **Documentation**: הוספת תיעוד API (Swagger)

### שלבי יישום - Implementation Steps

1. ✅ יצירת מבנה תיקיות חדש
2. ✅ יצירת services, types, constants
3. ⏳ עדכון קומפוננטות להשתמש ב-services החדשים
4. ⏳ עדכון imports בכל הקבצים
5. ⏳ ארגון Backend
6. ⏳ הוספת הערות והסברים
7. ⏳ בדיקת פונקציונליות

### הערות חשובות - Important Notes

- ⚠️ **אין לשבור פונקציונליות קיימת!** - כל השינויים צריכים להיות backwards compatible
- 📝 כל קובץ צריך להכיל הערות בעברית ובאנגלית
- 🧪 יש לבדוק כל שינוי לפני המשך
- 📚 יש לעדכן את התיעוד בהתאם לשינויים

