
import { appColors } from "../../utils/colors";

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

export const Footer: React.FC = () => {
  const colors = appColors;

  // טקסט שיופיע בסרט הנע - מכיל את כל המידע
  const marqueeText = "אפיון, בנייה ועיצוב אתרים ◆ רחל ורטהיימר ◆ Rachel.fsd108@gmail.com ◆ 053-3123084 ◆ ";

  // --- סגנונות ---
  const styles: Record<string, React.CSSProperties> = {
    footerContainer: {
      width: "100%",
      backgroundColor: colors.primary,
      color: colors.textWhite,
      position: "fixed",
      bottom: 0,
      left: 0,
      zIndex: 1000, 
      borderTop: `3px solid ${colors.primaryDarker}`,
      boxSizing: "border-box",
      direction: "ltr", // שמאל לימין לאנימציה
      animation: animationStyles.fadeIn,
      overflow: "hidden", 
      whiteSpace: "nowrap",
    },
    // --- מיכל לאנימציית הסרט הנע ---
    marqueeContainer: {
      width: "100%",
      backgroundColor: colors.primaryDarker,
      padding: "8px 0", 
      boxSizing: "border-box",
      display: 'flex', // מאפשר לספאנים לשבת בשורה
    },
    scrollingText: {
        display: "inline-block", 
        color: colors.textWhite,
        fontSize: "0.9rem", 
        fontWeight: 500,
        // אנימציה: הגדלנו קצת את הזמן בגלל הטקסט הנוסף
        animation: "marqueeScroll 40s linear infinite", 
        paddingLeft: '20px', // רווח קצת יותר גדול בין השכפולים
        whiteSpace: 'nowrap', 
        minWidth: '100%', // מנסה לתפוס רוחב מלא
    },
  };

  return (
    <>
      <AnimationStyles />
      <footer style={styles.footerContainer}>
        {/* --- הסרט הנע --- */}
        <div style={styles.marqueeContainer}>
           {/* *** שינוי: שלושה ספאנים נפרדים *** */}
          <span style={styles.scrollingText}>
            {marqueeText}
          </span>
          <span style={styles.scrollingText} aria-hidden="true"> 
            {marqueeText} 
          </span>
           {/* *** הוספנו שכפול שלישי *** */}
          <span style={styles.scrollingText} aria-hidden="true"> 
            {marqueeText} 
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;