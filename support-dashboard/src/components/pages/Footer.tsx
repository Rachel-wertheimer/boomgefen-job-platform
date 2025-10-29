
import { AnimationStyles, animationStyles } from "../../utils/animations";
import { appColors } from "../../utils/colors";

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