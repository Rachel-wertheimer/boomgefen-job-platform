 

// const animationStyles = {
//   modalFadeIn: "modalFadeIn 0.3s ease-out forwards",
//   overlayFadeIn: "overlayFadeIn 0.3s ease-out forwards",
//   spin: "spin 1s linear infinite",
//   fadeIn: "fadeIn 0.5s ease-out forwards",
//   marqueeScroll: "marqueeScroll 40s linear infinite",
// };

// export const AdCard: React.FC<{ ad: Ad; index: number; totalAds: number }> = ({
//   ad,
//   index,
// }) => {
//   const { company, type, description, id_user, is_relevant } = ad;

//   const token = useSelector((state: RootState) => state.user.token);
//   const [showLogin, setShowLogin] = useState(false);
//   const [contactDetails, setContactDetails] = useState<UserDetails | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSending, setIsSending] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [messageText, setMessageText] = useState("");

//   const [isTextareaFocus, setIsTextareaFocus] = useState(false);

//   const [isVisible, setIsVisible] = useState(false);
//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), index * 100);
//     return () => clearTimeout(timer);
//   }, [index]);

//   const handleContact = async () => {
//     if (contactDetails) {
//       setContactDetails(null);
//       setMessageText("");
//       return;
//     }
//     if (!token) return setShowLogin(true);

//     setIsLoading(true);
//     setError(null);
//     try {
//       const details = await getUserDetailsByID(id_user);
//       setContactDetails(details);
//     } catch {
//       setError("שגיאה בקבלת פרטי המפרסם.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!messageText.trim()) return alert("אנא כתוב הודעה לפני שליחה");
//     if (!contactDetails?.email) return alert("פרטי הקשר חסרים");

//     setIsSending(true);
//     try {
//       // הכנת payload לפי השירות החדש
//       const payload = {
//         to: contactDetails.email,
//         subject: `פנייה בנוגע למודעה של ${company}`,
//         text: messageText,
//         // אופציונלי: אפשר לשלוח גם html אם רוצים
//         html: `<p>${messageText}</p>`,
//       };

//       await sendMail(payload);

//       alert("המייל נשלח בהצלחה!");
//       setMessageText("");
//       setContactDetails(null);
//     } catch (err: any) {
//       console.error(err);
//       alert("שגיאה בשליחת המייל");
//     } finally {
//       setIsSending(false);
//     }
//   };


//   // --- סגנונות ---
//   const colors = appColors;
//   const styles: Record<string, React.CSSProperties> = {
//     card: {
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: colors.cardBackground,
//       borderRadius: "16px",
//       padding: "24px",
//       boxShadow: "0 6px 20px rgba(0, 0, 0, 0.07)",
//       border: "1px solid " + colors.borderColor,
//       opacity: isVisible ? 1 : 0,
//       animation: isVisible ? animationStyles.fadeIn : "none",
//       transition: "box-shadow 0.3s ease",
//       minHeight: "250px", // מינימום גובה לקלף
//     },
//     companyWrapper: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "flex-start",
//       gap: "6px",
//       marginBottom: "6px",
//     },
//     company: {
//       fontWeight: "700",
//       fontSize: "1.4rem",
//       color: colors.primary,
//     },
//     sticker: {
//       display: "inline-block",
//       backgroundColor: colors.danger,
//       color: "#fff",
//       padding: "4px 10px",
//       borderRadius: "30px",
//       fontSize: "12px",
//       fontWeight: "bold",
//     },
//     goal: {
//       margin: 0,
//       color: colors.textDark,
//       fontSize: "1.1rem",
//       fontWeight: 500,
//     },
//     description: {
//       margin: 0,
//       color: colors.textMedium,
//       lineHeight: 1.6,
//       fontSize: "1rem",
//       overflow: "hidden",          // מונע גלישה החוצה
//       textOverflow: "ellipsis",    // מוסיף "..." אם הטקסט ארוך
//       display: "-webkit-box",
//       WebkitLineClamp: 5,          // מספר שורות מקסימלי
//       WebkitBoxOrient: "vertical",
//       wordBreak: "break-word",     // שובר מילים ארוכות
//       flex: 1,                     // תופס את כל המרחב הפנוי
//     },

//     button: {
//       marginTop: "auto",           // דוחף את הכפתור לתחתית
//       padding: "12px 24px",
//       fontSize: "16px",
//       borderRadius: "30px",
//       cursor: "pointer",
//       textAlign: "center",
//       fontWeight: "bold",
//       border: "2px solid transparent",
//       transition: "all 0.3s ease",
//       backgroundColor: contactDetails ? appColors.danger : appColors.primary,
//       color: "white",
//       width: "100%",
//     },
//     contactBox: {
//       backgroundColor: colors.activeBackground,
//       padding: contactDetails ? "16px" : "0",
//       borderRadius: "12px",
//       overflow: "hidden",
//       transition: "all 0.4s ease-in-out",
//       maxHeight: contactDetails ? "1000px" : "0px",
//       opacity: contactDetails ? 1 : 0,
//       marginTop: contactDetails ? "20px" : "0",
//       borderTop: contactDetails ? `1px solid ${colors.borderColor}` : "none",
//       boxSizing: "border-box", // ← חשוב כדי שה-padding לא יחרוג
//       width: "100%",            // ← תמיד תתאים לרוחב הקארד
//     },

//     textarea: {
//       width: "100%",
//       minHeight: "120px",
//       marginTop: "10px",
//       padding: "12px",
//       borderRadius: "8px",
//       border: `1px solid ${isTextareaFocus ? colors.primary : colors.borderColor}`,
//       fontSize: "1rem",
//       fontFamily: "inherit",
//       boxShadow: isTextareaFocus ? `0 0 0 3px ${colors.primary}30` : "none",
//       outline: "none",
//       boxSizing: "border-box", // ← מונע גלישה החוצה
//       resize: "vertical",      // ← אפשר לגרור רק לגובה
//     }
//   };


//   return (
//     <>
//       <AnimationStyles />
//       <div style={styles.card}>
//         <div style={styles.companyWrapper}>
//           {is_relevant === 0 ? (
//             <span style={styles.sticker}>לא רלוונטי</span>
//           ) : (
//             // שמרי מקום ריק בגובה התגית
//             <span style={{ ...styles.sticker, visibility: "hidden" }}>לא רלוונטי</span>
//           )}
//           <h3 style={styles.company}>{company}</h3>

//         </div>
//         <span style={styles.goal}>מחפשת {type.toLowerCase()}</span>
//         <p style={styles.description}>{description}</p>

//         <button
//           style={styles.button}
//           onClick={handleContact}
//           disabled={isLoading}
//         >
//           {isLoading ? <FaSpinner className="spin" /> : contactDetails ? "הסתר פרטים" : "ליצירת קשר"}
//         </button>

//         {error && <p style={{ color: colors.danger }}>{error}</p>}

//         <div style={styles.contactBox}>
//           {contactDetails?.full_name && <p><strong>שם:</strong> {contactDetails.full_name}</p>}
//           {contactDetails?.phone && <p><strong>טלפון:</strong> {contactDetails.phone}</p>}
//           <p style={{ marginTop: "15px", fontWeight: "600" }}>כתבי הודעה למפרסם:</p>
//           <textarea
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             style={styles.textarea}
//             onFocus={() => setIsTextareaFocus(true)}
//             onBlur={() => setIsTextareaFocus(false)}
//             placeholder={`שלום ${contactDetails?.full_name || "מפרסם"}, אשמח לשמוע פרטים נוספים על המודעה ל${type.toLowerCase()}...`}
//           />
//           <button
//             style={{
//               ...styles.button,
//               backgroundColor: colors.primary,
//               marginTop: "12px",
//             }}
//             onClick={handleSendMessage}
//             disabled={isSending}
//           >
//             {isSending ? (
//               <>
//                 שולח... <FaSpinner style={{ animation: animationStyles.spin }} />
//               </>
//             ) : (
//               "שלח הודעה"
//             )}
//           </button>
//         </div>
//       </div>
//       {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
//     </>
//   );
import React, { useState, useEffect } from "react";
import type { Ad } from "../app/slice/adsSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { LoginModal } from "./pages/loginWorkWithUS";
import { getUserDetailsByID } from "../app/api/user";
import type { UserDetails } from "../app/slice/userSlice";
import { FaSpinner } from "react-icons/fa";
import { appColors } from "../utils/colors";
import { sendMail } from "../utils/mailService";

// Inline animations
const AnimationStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `,
    }}
  />
);

const animationStyles = {
  modalFadeIn: "modalFadeIn 0.3s ease-out forwards",
  overlayFadeIn: "overlayFadeIn 0.3s ease-out forwards",
  spin: "spin 1s linear infinite",
  fadeIn: "fadeIn 0.5s ease-out forwards",
  marqueeScroll: "marqueeScroll 40s linear infinite",
};

// הגדרת קבוע עבור מספר השורות המקסימלי להצגה
const MAX_LINES = 5;

export const AdCard: React.FC<{ ad: Ad; index: number; totalAds: number }> = ({
  ad,
  index,
}) => {
  const { company, type, description, id_user, is_relevant } = ad;

  const token = useSelector((state: RootState) => state.user.token);
  const [showLogin, setShowLogin] = useState(false);
  const [contactDetails, setContactDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [isTextareaFocus, setIsTextareaFocus] = useState(false);
  // ✨ הוספת סטייט חדש לשליטה בהצגת התיאור המלא
  const [isExpanded, setIsExpanded] = useState(false);


  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleContact = async () => {
    if (contactDetails) {
      setContactDetails(null);
      setMessageText("");
      return;
    }
    if (!token) return setShowLogin(true);

    setIsLoading(true);
    setError(null);
    try {
      const details = await getUserDetailsByID(id_user);
      setContactDetails(details);
    } catch {
      setError("שגיאה בקבלת פרטי המפרסם.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!senderEmail.trim()) return alert("נא להזין מייל לשליחת פרטי יצירת קשר");
    if (!messageText.trim()) return alert("אנא כתוב הודעה לפני שליחה");
    if (!contactDetails?.email) return alert("פרטי הקשר חסרים");

    setIsSending(true);
    try {
      // הכנת payload לפי השירות החדש
      const payload = {
        to: contactDetails.email,
        subject: `פנייה בנוגע למודעה של ${company}`,
        text: `פרטי יוצר/ת הקשר: ${senderEmail}\n\n${messageText}`,
        html: `<p><strong>פרטי יוצר/ת הקשר:</strong> ${senderEmail}</p><p>${messageText}</p>`,
      };

      await sendMail(payload);

      alert("המייל נשלח בהצלחה!");
      setMessageText("");
      setSenderEmail("");
      setContactDetails(null);
    } catch (err: any) {
      console.error(err);
      alert("שגיאה בשליחת המייל");
    } finally {
      setIsSending(false);
    }
  };


  // --- סגנונות ---
  const colors = appColors;
  const styles: Record<string, React.CSSProperties> = {
    card: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: colors.cardBackground,
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.07)",
      border: "1px solid " + colors.borderColor,
      opacity: isVisible ? 1 : 0,
      animation: isVisible ? animationStyles.fadeIn : "none",
      transition: "box-shadow 0.3s ease",
      minHeight: "250px", // מינימום גובה לקלף
    },
    companyWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "6px",
      marginBottom: "6px",
    },
    company: {
      fontWeight: "700",
      fontSize: "1.4rem",
      color: colors.primary,
    },
    sticker: {
      display: "inline-block",
      backgroundColor: colors.danger,
      color: "#fff",
      padding: "4px 10px",
      borderRadius: "30px",
      fontSize: "12px",
      fontWeight: "bold",
    },
    goal: {
      margin: 0,
      color: colors.textDark,
      fontSize: "1.1rem",
      fontWeight: 500,
    },
    // ✨ עדכון סגנון התיאור להתאמה לסטייט ההרחבה
    description: {
      margin: 0,
      color: colors.textMedium,
      lineHeight: 1.6,
      fontSize: "1rem",
      overflow: isExpanded ? "visible" : "hidden",            // מונע גלישה רק אם לא מורחב
      textOverflow: isExpanded ? "clip" : "ellipsis",        // מוסיף "..." רק אם לא מורחב
      display: isExpanded ? "block" : "-webkit-box",        // משנה את מצב התצוגה בהתאם
      WebkitLineClamp: isExpanded ? "unset" : MAX_LINES,     // מספר שורות מקסימלי רק במצב מקוצר
      WebkitBoxOrient: "vertical",
      wordBreak: "break-word",     // שובר מילים ארוכות
      flex: 1,                     // תופס את כל המרחב הפנוי
      marginBottom: isExpanded ? "10px" : "0", // רווח קטן אם מורחב
    },
    // ✨ הוספת סגנון לכפתור הצפייה המלאה
    readMoreButton: {
      alignSelf: "flex-start", // <--- שינוי מ-flex-end ל-flex-start כדי שיהיה בצד ימין (RTL)
      backgroundColor: "transparent",
      border: "none",
      color: colors.danger, // צבע כתום לפי הבקשה
      cursor: "pointer",
      padding: "0",
      fontSize: "1rem",
      fontWeight: "bold",
      textDecoration: "underline",
      marginBottom: "15px", // רווח לפני הכפתור הראשי
      // מנגנון חשיפה והסתרה פשוט, שומר על רוחב מלא של הקלף
      display: isExpanded ? "none" : "block", // מציג רק כשהטקסט מקוצר
    },

    button: {
      marginTop: "auto",           // דוחף את הכפתור לתחתית
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      textAlign: "center",
      fontWeight: "bold",
      border: "2px solid transparent",
      transition: "all 0.3s ease",
      backgroundColor: contactDetails ? appColors.danger : appColors.primary,
      color: "white",
      width: "100%",
    },
    contactBox: {
      backgroundColor: colors.activeBackground,
      padding: contactDetails ? "16px" : "0",
      borderRadius: "12px",
      overflow: "hidden",
      transition: "all 0.4s ease-in-out",
      maxHeight: contactDetails ? "1000px" : "0px",
      opacity: contactDetails ? 1 : 0,
      marginTop: contactDetails ? "20px" : "0",
      borderTop: contactDetails ? `1px solid ${colors.borderColor}` : "none",
      boxSizing: "border-box", // ← חשוב כדי שה-padding לא יחרוג
      width: "100%",            // ← תמיד תתאים לרוחב הקארד
    },

    textarea: {
      width: "100%",
      minHeight: "120px",
      marginTop: "10px",
      padding: "12px",
      borderRadius: "8px",
      border: `1px solid ${isTextareaFocus ? colors.primary : colors.borderColor}`,
      fontSize: "1rem",
      fontFamily: "inherit",
      boxShadow: isTextareaFocus ? `0 0 0 3px ${colors.primary}30` : "none",
      outline: "none",
      boxSizing: "border-box", // ← מונע גלישה החוצה
      resize: "vertical",      // ← אפשר לגרור רק לגובה
    }
  };

  // לוגיקה לבדיקה האם הטקסט ארוך מספיק כדי להצריך כפתור
  // זוהי הערכה גסה כיוון שאין גישה ל-DOM, אבל בהינתן שה-CSS מגביל ל-5 שורות:
  // נניח שכ-300 תווים זה בערך 5 שורות (בהתאם לגודל הפונט ורוחב הקלף)
  const isTextLong = description.length > 300;


  return (
    <>
      <AnimationStyles />
      <div style={styles.card}>
        <div style={styles.companyWrapper}>
          {is_relevant === 0 ? (
            <span style={styles.sticker}>לא רלוונטי</span>
          ) : (
            // שמרי מקום ריק בגובה התגית
            <span style={{ ...styles.sticker, visibility: "hidden" }}>לא רלוונטי</span>
          )}
          <h3 style={styles.company}>{company}</h3>

        </div>
        <span style={styles.goal}>מחפשת {type.toLowerCase()}</span>
        <p style={styles.description}>{description}</p>
        {/* ✨ הוספת כפתור "לצפיה בפרטי המשרה" */}
        {isTextLong && !isExpanded && (
          <button
            style={styles.readMoreButton}
            onClick={() => setIsExpanded(true)}
          >
            **+ לצפייה בפרטי המשרה**
          </button>
        )}
        {/* כפתור "צמצם" כשמורחב */}
        {isTextLong && isExpanded && (
          <button
            style={{ ...styles.readMoreButton, display: 'block', textDecoration: 'none', marginBottom: '5px' }}
            onClick={() => setIsExpanded(false)}
          >
            צמצם תיאור
          </button>
        )}
        {/* סוף השינויים בתיאור ובכפתור */}

        <button
          style={styles.button}
          onClick={handleContact}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spin" /> : contactDetails ? "הסתר פרטים" : "ליצירת קשר"}
        </button>

        {error && <p style={{ color: colors.danger }}>{error}</p>}

        <div style={styles.contactBox}>
          {contactDetails?.full_name && <p><strong>שם:</strong> {contactDetails.full_name}</p>}
          {contactDetails?.phone && <p><strong>טלפון:</strong> {contactDetails.phone}</p>}
          <p style={{ marginTop: "10px", fontWeight: 600 }}>המייל שלך ליצירת קשר חוזר:</p>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="example@gmail.com"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: `1px solid ${colors.borderColor}`,
              outline: "none"
            }}
          />
          <p style={{ marginTop: "15px", fontWeight: "600" }}>כתבי הודעה למפרסם:</p>
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={styles.textarea}
            onFocus={() => setIsTextareaFocus(true)}
            onBlur={() => setIsTextareaFocus(false)}
            placeholder={`שלום ${contactDetails?.full_name || "מפרסם"}, אשמח לשמוע פרטים נוספים על המודעה ל${type.toLowerCase()}...`}
          />
          <button
            style={{
              ...styles.button,
              backgroundColor: colors.primary,
              marginTop: "12px",
            }}
            onClick={handleSendMessage}
            disabled={isSending}
          >
            {isSending ? (
              <>
                שולח... <FaSpinner style={{ animation: animationStyles.spin }} />
              </>
            ) : (
              "שלח הודעה"
            )}
          </button>
        </div>
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};