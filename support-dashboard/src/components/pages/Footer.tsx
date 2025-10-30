import { appColors } from "../../utils/colors";
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
  marqueeScroll: "marqueeScroll 80s linear infinite", // האטנו את האנימציה
};

export const Footer: React.FC = () => {
  const colors = appColors;

  // --- טקסט כולל מייל בלבד ---
  const marqueeText = (
    <>
      אפיון, בנייה ועיצוב אתרים ◆ רחל ורטהיימר ◆{" "}
      <a
        href="mailto:Rachel.fsd108@gmail.com"
        style={{ color: colors.textWhite, textDecoration: "underline" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Rachel.fsd108@gmail.com
      </a>{" "}
      ◆
    </>
  );

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
      direction: "ltr",
      animation: animationStyles.fadeIn,
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    marqueeContainer: {
      width: "100%",
      backgroundColor: colors.primaryDarker,
      padding: "8px 0",
      boxSizing: "border-box",
      display: "flex",
    },
    scrollingText: {
      display: "inline-block",
      color: colors.textWhite,
      fontSize: "0.9rem",
      fontWeight: 500,
      animation: animationStyles.marqueeScroll,
      paddingLeft: "20px",
      whiteSpace: "nowrap",
      minWidth: "100%",
    },
  };

  return (
    <>
      <AnimationStyles />
      <footer style={styles.footerContainer}>
        <div style={styles.marqueeContainer}>
          <span style={styles.scrollingText}>{marqueeText}</span>
          <span style={styles.scrollingText} aria-hidden="true">
            {marqueeText}
          </span>
          <span style={styles.scrollingText} aria-hidden="true">
            {marqueeText}
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
