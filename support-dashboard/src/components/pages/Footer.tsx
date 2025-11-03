import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { appColors } from "../../utils/colors";

export const Footer: React.FC = () => {
  const colors = appColors;

  const handleEmailClick = () => {
    const gmailLink =
      "https://mail.google.com/mail/?view=cm&to=Rachel.fsd108@gmail.com&su=שלום&body=שלום,%20רציתי%20לשאול...";
    window.open(gmailLink, "_blank", "noopener,noreferrer");
  };

  const handlePrivacyClick = () => {
    window.open(
      "https://docs.google.com/document/d/1_vmLe3dvBRf4UBEBsUnwNq4jKcgC08Tn2345xyews3s/edit?usp=sharing",
      "_blank",
      "noopener,noreferrer"
    );
  };

 const styles: Record<string, React.CSSProperties> = {
  footerContainer: {
    width: "100%",
    backgroundColor: colors.primaryDarker,
    color: colors.textWhite,
    padding: "12px 20px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: window.innerWidth <= 480 ? "0.7rem" : "0.9rem", // קטן לפלאפון
    fontWeight: 500,
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1000,
    boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
    direction: "rtl",
    flexWrap: "nowrap", // ביטול גלישת שורות
  },
  contactSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    whiteSpace: "nowrap", // מונע שבירת שורות
  },
  emailLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: colors.textWhite,
    textDecoration: "underline",
    cursor: "pointer",
  },
  privacyLink: {
    color: colors.textWhite,
    textDecoration: "underline",
    cursor: "pointer",
  },
};


  return (
    <footer style={styles.footerContainer}>
      {/* צד ימין - פרטים אישיים */}
      <div style={styles.contactSection}>
        <span>© {new Date().getFullYear()} רחל ורטהיימר</span>
        <span>|</span>
        <span>אפיון, עיצוב ופיתוח אתרים</span>
        <span>|</span>
        <div style={styles.emailLink} onClick={handleEmailClick}>
          <FaEnvelope size={15} />
          <span>Rachel.fsd108@gmail.com</span>
        </div>
      </div>

      {/* צד שמאל - מדיניות ופרטיות */}
      <span style={styles.privacyLink} onClick={handlePrivacyClick}>
        מדיניות ופרטיות
      </span>
    </footer>
  );
};

export default Footer;
