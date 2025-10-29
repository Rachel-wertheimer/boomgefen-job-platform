import React, { useState, useEffect } from "react"; // הוספנו useEffect
import { useNavigate } from "react-router-dom";
import { LoginModal } from "./loginWorkWithUS";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // קריאה ראשונית לקביעת הגודל
    // ניקוי ה-event listener כשהקומפוננטה יורדת
    return () => window.removeEventListener("resize", handleResize);
  }, []); // ריבוע ריק = יפעל רק פעם אחת (בטעינה)
  return windowSize;
};

export default function FirstScreen() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // מצב לפתיחת מודאל

  const handleCloseLogin = () => {
    setShowLogin(false);
    navigate("/home")
  };

  // --- קביעת מצב רספונסיבי ---
  const { width } = useWindowSize();
  const isMobile = width <= 600; // נקודת שבירה למובייל

  // פלטת צבעים בהשראת לוגו "גפן"
  const colors = {
    primary: "#6d44b8", // סגול עמוק מהלוגו
    primaryHover: "#5a379a", // סגול כהה יותר
    secondary: "#f5f3f9", // רקע בהיר לכפתור משני
    lightGradient: "linear-gradient(135deg, #f5f7fa, #e6e8ff)", // רקע עמוד
    textDark: "#212529",
    textMedium: "#555",
    textLight: "#666",
    borderColor: "#e0e0e0",
  };

  // --- אובייקט סגנונות דינמי ---
  // עבר לתוך הקומפוננטה כדי שיוכל להשתמש במשתנה isMobile
  const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
      width: "100vw",
      minHeight: "100vh",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: colors.lightGradient, // רקע גרדיאנט עדין
      padding: isMobile ? "10px" : "20px", // פדינג מוקטן למובייל
    },
    mainCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: isMobile ? "16px" : "20px", // ריווח מוקטן
      padding: isMobile ? "24px 16px" : "30px", // פדינג מוקטן (במיוחד למובייל)
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.08)",
      width: "100%",
      maxWidth: "900px",
      textAlign: "center",
      boxSizing: "border-box", // חשוב כדי שהפדינג לא ישבור את הרוחב
    },
    logoContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: isMobile ? "20px" : "30px",
      width: "100%",
    },
    logoImage: {
      width: isMobile ? "280px" : "300px", // גודל קבוע
      height: isMobile ? "280px" : "300px", // גודל קבוע
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      objectFit: "contain", // שומר על יחס הגובה ללא עיוות
    },
    title: {
      fontSize: isMobile ? "24px" : "28px", // פונט מוקטן
      fontWeight: "bold",
      color: colors.textDark,
      marginTop: "10px", // מרווח מוקטן
      marginBottom: "0px",
    },
    subtitle: {
      fontSize: isMobile ? "15px" : "17px", // פונט מוקטן
      color: colors.textMedium,
      marginBottom: "16px", // מרווח מוקטן
    },
    actionContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px", // ריווח מוקטן בין כפתורים
      width: "100%",
      maxWidth: "450px",
    },
    baseButton: {
      padding: "14px 24px", // פדינג מוקטן בכפתורים
      fontSize: isMobile ? "16px" : "17px", // פונט מוקטן
      borderRadius: "30px",
      cursor: "pointer",
      textAlign: "center",
      width: "100%",
      fontWeight: "bold",
      border: "2px solid transparent",
      transition: "all 0.3s ease",
      boxSizing: "border-box",
    },
    primaryButton: {
      backgroundColor: colors.primary,
      color: "white",
      border: `2px solid ${colors.primary}`,
    },
    secondaryButton: {
      backgroundColor: "white",
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
    },
    secondaryLinksContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "16px", // ריווח מוקטן
      marginTop: "12px", // מרווח מוקטן
    },
    linkButton: {
      background: "none",
      border: "none",
      color: colors.textLight,
      cursor: "pointer",
      fontSize: isMobile ? "13px" : "14px", // פונט מוקטן
      fontWeight: "500",
      textDecoration: "underline",
      padding: "5px",
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginTop: "16px", // מרווח מוקטן
      paddingTop: "16px", // מרווח מוקטן
      width: "100%",
      maxWidth: "450px",
      borderTop: `1px solid ${colors.borderColor}`,
    },
    icon: {
      width: isMobile ? "40px" : "48px", // אייקונים מוקטנים למובייל
      height: isMobile ? "40px" : "48px",
      cursor: "pointer",
      transition: "transform 0.2s ease",
    },
  };

  // הוספת אפקטי hover (ניתן להוסיף גם ב-CSS חיצוני)
  const [isPrimaryHover, setIsPrimaryHover] = useState(false);
  const [isSecondaryHover, setIsSecondaryHover] = useState(false);

  const primaryButtonStyle = {
    ...styles.baseButton,
    ...styles.primaryButton,
    ...(isPrimaryHover
      ? { backgroundColor: colors.primaryHover, borderColor: colors.primaryHover }
      : {}),
  };

  const secondaryButtonStyle = {
    ...styles.baseButton,
    ...styles.secondaryButton,
    ...(isSecondaryHover ? { backgroundColor: colors.secondary } : {}),
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.mainCard}>
        {/* עמודת תמונות */}
        <div style={styles.logoContainer}>
          <img
            src="/Geffen2.png"
            alt="גפן הפקות במה"
            style={styles.logoImage}
          />
          <img src="/Boom2.png" alt="BOOM הפקות" style={styles.logoImage} />
        </div>

        <h1 style={styles.title}>ברוכים הבאים לאתר הדרושים</h1>
        <h2 style={styles.subtitle}>
          מצאו את ההזדמנות הבאה שלכם בעולם ההפקות
        </h2>

        {/* עמודת כפתורים ואייקונים */}
        <div style={styles.actionContainer}>
          <button
            style={primaryButtonStyle}
            onClick={() => navigate("/work-with-us")}
            onMouseEnter={() => setIsPrimaryHover(true)}
            onMouseLeave={() => setIsPrimaryHover(false)}
          >
            הירשמי
          </button>
          <button
            style={secondaryButtonStyle}
            onClick={() => setShowLogin(true)}
            onMouseEnter={() => setIsSecondaryHover(true)}
            onMouseLeave={() => setIsSecondaryHover(false)}
          >
            התחברי
          </button>
          <button
            style={secondaryButtonStyle}
            onClick={() => navigate("/ads")}
            onMouseEnter={() => setIsSecondaryHover(true)}
            onMouseLeave={() => setIsSecondaryHover(false)}
          >
            כניסה חופשית ללא הרשמה
          </button>
        </div>

        {/* קישורים משניים */}
        <div style={styles.secondaryLinksContainer}>
          <button
            style={styles.linkButton}
            onClick={() => navigate("/about-us")}
          >
            מי אנחנו?
          </button>
          {/* <button style={styles.linkButton} onClick={() => navigate("/faq")}>
            שאלות נפוצות
          </button> */}
          <button
            style={styles.linkButton}
            onClick={() => navigate("/createAsdJob")}
          >
            עובדים איתנו
          </button>
        </div>

        {/* אייקונים */}
        <div style={styles.iconContainer}>
          <img
            src="/gmail.png"
            alt="ג'ימייל"
            style={styles.icon}
            onClick={() => navigate("/contact-us", { state: { fromNav: false } })
            }

          />
          <img
            src="/whatsapp.gif"
            alt="וואטסאפ"
            style={styles.icon}
            onClick={() =>
              window.open(
                "https://wa.me/972507999045?text=שלום%20כבי%20וBOOM!",
                "_blank"
              )
            }
          />
        </div>
      </div>

      {/* מודאל התחברות */}
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
    </div>
  );
}