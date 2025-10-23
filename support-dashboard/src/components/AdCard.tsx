import React, { useState, useEffect } from "react";
import type { Ad } from "../app/slice/adsSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { LoginModal } from "./pages/loginWorkWithUS";
import { getUserDetailsByID } from "../app/api/user";
import type { UserDetails } from "../app/slice/userSlice";
import { sendMail } from "../app/api/mail";
import { FaSpinner } from "react-icons/fa"; // אייקון לטעינה

// 🎨 פלטת צבעים אחידה
const colors = {
  primary: "#6d44b8",
  primaryHover: "#5a379a",
  danger: "#fa5252",
  dangerHover: "#e03131",
  textDark: "#212529",
  textMedium: "#555",
  borderColor: "#e0e0e0",
  activeBackground: "#f5f3f9",
};

// --- הגדרת האנימציה ---
const AnimationStyles = () => (
  <style>
    {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}
  </style>
);

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

  const [isContactHover, setIsContactHover] = useState(false);
  const [isSendHover, setIsSendHover] = useState(false);
  const [isTextareaFocus, setIsTextareaFocus] = useState(false);

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
    if (!messageText.trim()) return alert("אנא כתוב הודעה לפני שליחה");
    if (!contactDetails?.email) return alert("פרטי הקשר חסרים");

    setIsSending(true);
    try {
      await sendMail(contactDetails.email, `פנייה בנוגע למודעה של ${company}`, messageText);
      alert("המייל נשלח בהצלחה!");
      setMessageText("");
      setContactDetails(null);
    } catch {
      alert("שגיאה בשליחת המייל");
    } finally {
      setIsSending(false);
    }
  };

  // --- סגנונות ---
  const styles: Record<string, React.CSSProperties> = {
    card: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.07)",
      border: "1px solid #e9ecef",
      opacity: isVisible ? 1 : 0,
      animation: isVisible ? "fadeIn 0.4s ease-out forwards" : "none",
      transition: "box-shadow 0.3s ease",
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
    description: {
      margin: 0,
      color: colors.textMedium,
      lineHeight: 1.6,
      fontSize: "1rem",
      overflow: "hidden",          // מונע גלישה החוצה
      textOverflow: "ellipsis",    // מוסיף "..." אם הטקסט ארוך
      display: "-webkit-box",
      WebkitLineClamp: 5,          // מספר שורות מקסימלי
      WebkitBoxOrient: "vertical",
      wordBreak: "break-word",     // שובר מילים ארוכות
    },

    button: {
      marginTop: "16px",
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      textAlign: "center",
      fontWeight: "bold",
      border: "2px solid transparent",
      transition: "all 0.3s ease",
      backgroundColor: contactDetails ? colors.danger : colors.primary,
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
      width: "100%",            // ← תמיד תתאים לרוחב הקארד
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
      resize: "vertical",      // ← אפשר לגרור רק לגובה
    }
  };


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

        <button
          style={styles.button}
          onClick={handleContact}
          disabled={isLoading}
          onMouseEnter={() => setIsContactHover(true)}
          onMouseLeave={() => setIsContactHover(false)}
        >
          {isLoading ? <FaSpinner className="spin" /> : contactDetails ? "הסתר פרטים" : "ליצירת קשר"}
        </button>

        {error && <p style={{ color: colors.danger }}>{error}</p>}

        <div style={styles.contactBox}>
          {contactDetails?.full_name && <p><strong>שם:</strong> {contactDetails.full_name}</p>}
          {contactDetails?.phone && <p><strong>טלפון:</strong> {contactDetails.phone}</p>}
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
                שולח... <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
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
