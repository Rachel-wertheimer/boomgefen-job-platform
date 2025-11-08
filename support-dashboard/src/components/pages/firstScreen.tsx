import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "./loginWorkWithUS";
import { SEO } from "../SEO";
import { seoKeywords } from "../../utils/seoKeywords";

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
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default function FirstScreen() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => {
    setShowLogin(false);
    navigate("/home")
  };


  const { width } = useWindowSize();
  const isMobile = width <= 600;


  const colors = {
    primary: "#6d44b8",
    primaryHover: "#5a379a",
    secondary: "#f5f3f9",
    lightGradient: "linear-gradient(135deg, #f5f7fa, #e6e8ff)",
    textDark: "#212529",
    textMedium: "#555",
    textLight: "#666",
    borderColor: "#e0e0e0",
  };

  const styles: { [key: string]: React.CSSProperties } = {
    pageContainer: {
      width: "100vw",
      minHeight: "100vh",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: colors.lightGradient,
      padding: isMobile ? "10px" : "20px",
    },
    mainCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: isMobile ? "16px" : "20px",
      padding: isMobile ? "24px 16px" : "30px",
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.08)",
      width: "100%",
      maxWidth: "900px",
      textAlign: "center",
      boxSizing: "border-box",
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
      width: isMobile ? "120px" : "150px",
      height: isMobile ? "120px" : "150px",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
    }
    ,
    title: {
      fontSize: isMobile ? "24px" : "28px",
      fontWeight: "bold",
      color: colors.textDark,
      marginTop: "10px",
      marginBottom: "0px",
    },
    subtitle: {
      fontSize: isMobile ? "15px" : "17px", 
      color: colors.textMedium,
      marginBottom: "16px", 
    },
    actionContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "12px", 
      width: "100%",
      maxWidth: "450px",
    },
    baseButton: {
      padding: "14px 24px", 
      fontSize: isMobile ? "16px" : "17px", 
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
      gap: "16px", 
      marginTop: "12px", 
    },
    linkButton: {
      background: "none",
      border: "none",
      color: colors.textLight,
      cursor: "pointer",
      fontSize: isMobile ? "13px" : "14px", 
      fontWeight: "500",
      textDecoration: "underline",
      padding: "5px",
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginTop: "16px",
      paddingTop: "16px", 
      width: "100%",
      maxWidth: "450px",
      borderTop: `1px solid ${colors.borderColor}`,
    },
    icon: {
      width: isMobile ? "40px" : "48px", 
      height: isMobile ? "40px" : "48px",
      cursor: "pointer",
      transition: "transform 0.2s ease",
    },
  };

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
      <SEO
        title="BoomGefen - פלטפורמת משרות לאמנים | דרושים אמנים"
        description="פלטפורמה לחיפוש עבודה לאמנים. מצאו משרות בתחום האמנות, עבודות יצירה, והזדמנויות חדשות. BoomGefen - המקום לחיפוש עבודה לאמנים."
        keywords={seoKeywords}
      />
      <div style={styles.mainCard}>
        <div style={styles.logoContainer}>
          <img
            src="/geffen.jpg"
            alt="גפן הפקות במה"
            style={styles.logoImage}
          />
          <img src="/boom.png" alt="BOOM הפקות" style={styles.logoImage} />
        </div>

        <h1 style={styles.title}>ברוכים הבאים לאתר הדרושים</h1>
        <h2 style={styles.subtitle}>
          מצאו את ההזדמנות הבאה שלכם בעולם ההפקות
        </h2>

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

        <div style={styles.secondaryLinksContainer}>
          <button
            style={styles.linkButton}
            onClick={() => navigate("/about-us")}
          >
            מי אנחנו?
          </button>
          <button
            style={styles.linkButton}
            onClick={() => navigate("/createAsdJob")}
          >
            עובדים איתנו
          </button>
        </div>

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
                "https://wa.me/972507999045?text=שלום%20גפן%20וBOOM!",
                "_blank"
              )
            }
          />
        </div>
      </div>

      {showLogin && <LoginModal onClose={handleCloseLogin} />}
    </div>
  );
}