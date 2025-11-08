import React, { useState } from "react";
import { useWindowSize } from "../../utils/hooks";
import { appColors } from "../../utils/colors";
import { SEO } from "../SEO";
import { seoKeywords } from "../../utils/seoKeywords";

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

export default function AboutUs() {
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const colors = appColors;

  const styles: Record<string, React.CSSProperties> = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      minHeight: "100vh",
      background: colors.lightGradient,
      padding: isMobile ? "90px 15px 30px 15px" : "100px 30px 30px 30px",
      boxSizing: "border-box",
      direction: "rtl",
    },
    mainContent: {
      width: "100%",
      maxWidth: "1200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "40px",
      animation: animationStyles.fadeIn,
    },
    topLogoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: isMobile ? "15px" : "30px",
      flexWrap: "wrap",
      filter: "saturate(1.1)",
    },
    topLogo: {
      height: isMobile ? "50px" : "80px",
      objectFit: "contain",
    },
    separator: {
      fontSize: isMobile ? "2rem" : "3rem",
      color: colors.textMedium,
      fontWeight: 300,
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "20px" : "30px",
      width: "100%",
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      padding: isMobile ? "24px" : "30px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      opacity: 0,
      animation: "fadeIn 0.5s ease-out 0.2s forwards",
    },
    cardLogo: {
      height: "60px",
      objectFit: "contain",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: isMobile ? "1.5rem" : "1.8rem",
      color: colors.primary,
      fontWeight: 700,
      margin: "10px 0",
    },
    cardText: {
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      color: colors.textMedium,
      lineHeight: 1.7,
      margin: "0 0 24px 0",
      flexGrow: 1,
    },
    visitButtonBase: {
      padding: "12px 28px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "bold",
      border: `2px solid ${colors.primary}`,
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "auto",
      backgroundColor: colors.primary,
      color: "white",
    },
    visitButtonHover: {
      backgroundColor: colors.primaryHover,
      borderColor: colors.primaryHover,
    },
  };

  const [isGefenHover, setIsGefenHover] = useState(false);
  const [isBoomHover, setIsBoomHover] = useState(false);

  const visitBtnStyleGeffen = {
    ...styles.visitButtonBase,
    ...(isGefenHover ? styles.visitButtonHover : {})
  };

  const visitBtnStyleBoom = {
    ...styles.visitButtonBase,
    ...(isBoomHover ? styles.visitButtonHover : {})
  };


  return (
    <div style={styles.pageContainer}>
      <SEO
        title="אודותינו - BoomGefen | דרושים אמנים"
        description="ללמוד עוד על BoomGefen - פלטפורמה לחיפוש עבודה לאמנים. משרות בתחום האמנות, עבודות יצירה, והזדמנויות מקצועיות. BoomGefen - דרושים אמנים."
        keywords={seoKeywords}
      />
      <AnimationStyles />
      <div style={styles.mainContent}>
        <div style={styles.topLogoContainer}>
          <img src="/geffen.jpg" style={styles.topLogo} />
          <span style={styles.separator}>&</span>
          <img src="/Boom2.png" style={styles.topLogo} />
        </div>

        <div style={styles.contentGrid}>
          <div style={styles.card}>
            <img src="/geffen.jpg" style={styles.cardLogo} />
            <h2 style={styles.cardTitle}>גפן הפקות במה</h2>
            <p style={styles.cardText}>
              עם ניסיון של מעל 10 שנים בתעשיית הבידור, גפן מתמחה בהפקות במה, תיאטרון
              ואירועים ברמה הגבוהה ביותר. הצוות מלווה את ההפקה משלב התכנון ועד
              לביצוע, תוך מתן דגש על מקצועיות, יצירתיות ושירות אישי.
            </p>
            <a
              href="https://gefenoren.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              style={visitBtnStyleGeffen}
              onMouseEnter={() => setIsGefenHover(true)}
              onMouseLeave={() => setIsGefenHover(false)}
            >
              בקרו באתר הרשמי
            </a>
          </div>

          <div style={{ ...styles.card, animationDelay: '0.4s' }}>
            <img src="/Boom2.png" style={styles.cardLogo} />
            <h2 style={styles.cardTitle}>BOOM - אמנות הבמה</h2>
            <p style={styles.cardText}>
              BOOM מחברת בין עולם הבידור להזדמנויות חדשות. אנו מציעים סדנאות, מופעים
              והצגות, לצד פלטפורמה נגישה לאמנים ולמחפשי הכנסה נוספת. המטרה שלנו היא
              לאפשר לכל אחת ואחד להיות חלק מקהילה יוצרת ותוססת.
            </p>
            <a
              href="https://67add206001ee.site123.me/"
              target="_blank"
              rel="noopener noreferrer"
              style={visitBtnStyleBoom}
              onMouseEnter={() => setIsBoomHover(true)}
              onMouseLeave={() => setIsBoomHover(false)}
            >
              בקרו באתר הרשמי
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}