// import { appColors } from "../../utils/colors";

// // Inline animations
// const AnimationStyles = () => (
//   <style
//     dangerouslySetInnerHTML={{
//       __html: `
//         @keyframes modalFadeIn {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes overlayFadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes marqueeScroll {
//           0% { transform: translateX(0%); }
//           100% { transform: translateX(-100%); }
//         }
//       `,
//     }}
//   />
// );

// const animationStyles = {
//   modalFadeIn: "modalFadeIn 0.3s ease-out forwards",
//   overlayFadeIn: "overlayFadeIn 0.3s ease-out forwards",
//   spin: "spin 1s linear infinite",
//   fadeIn: "fadeIn 0.5s ease-out forwards",
//   marqueeScroll: "marqueeScroll 40s linear infinite",
// };

// export const Footer: React.FC = () => {
//   const colors = appColors;

//   // טקסט שיופיע בסרט הנע - מכיל את כל המידע
//   const marqueeText = "אפיון, בנייה ועיצוב אתרים ◆ רחל ורטהיימר ◆ Rachel.fsd108@gmail.com ◆ 053-3123084 ◆ ";

//   // --- סגנונות ---
//   const styles: Record<string, React.CSSProperties> = {
//     footerContainer: {
//       width: "100%",
//       backgroundColor: colors.primary,
//       color: colors.textWhite,
//       position: "fixed",
//       bottom: 0,
//       left: 0,
//       zIndex: 1000, 
//       borderTop: `3px solid ${colors.primaryDarker}`,
//       boxSizing: "border-box",
//       direction: "ltr", // שמאל לימין לאנימציה
//       animation: animationStyles.fadeIn,
//       overflow: "hidden", 
//       whiteSpace: "nowrap",
//     },
//     // --- מיכל לאנימציית הסרט הנע ---
//     marqueeContainer: {
//       width: "100%",
//       backgroundColor: colors.primaryDarker,
//       padding: "8px 0", 
//       boxSizing: "border-box",
//       display: 'flex', // מאפשר לספאנים לשבת בשורה
//     },
//     scrollingText: {
//         display: "inline-block", 
//         color: colors.textWhite,
//         fontSize: "0.9rem", 
//         fontWeight: 500,
//         // אנימציה: הגדלנו קצת את הזמן בגלל הטקסט הנוסף
//         animation: "marqueeScroll 40s linear infinite", 
//         paddingLeft: '20px', // רווח קצת יותר גדול בין השכפולים
//         whiteSpace: 'nowrap', 
//         minWidth: '100%', // מנסה לתפוס רוחב מלא
//     },
//   };

//   return (
//     <>
//       <AnimationStyles />
//       <footer style={styles.footerContainer}>
//         {/* --- הסרט הנע --- */}
//         <div style={styles.marqueeContainer}>
//            {/* *** שינוי: שלושה ספאנים נפרדים *** */}
//           <span style={styles.scrollingText}>
//             {marqueeText}
//           </span>
//           <span style={styles.scrollingText} aria-hidden="true"> 
//             {marqueeText} 
//           </span>
//            {/* *** הוספנו שכפול שלישי *** */}
//           <span style={styles.scrollingText} aria-hidden="true"> 
//             {marqueeText} 
//           </span>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Footer;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { appColors } from "../../utils/colors";
import { useWindowSize } from "../../utils/hooks";
import { sendMail } from "../../utils/mailService";
import { FaWhatsapp } from "react-icons/fa";

const ContactUs: React.FC = () => {
  const location = useLocation();
  const fromNav = location.state?.fromNav === true;

  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sendingMail, setSendingMail] = useState(false);
  const [mailError, setMailError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingMail(true);
    setMailError(null);
    setSuccess(false);

    const payload = {
      to: "boom.gefen.hevy@gmail.com",
      subject: `פנייה חדשה מאתר - ${formData.name}`,
      text: `
        התקבלה פנייה חדשה מאתר:
        שם מלא: ${formData.name}
        מייל: ${formData.email}
        טלפון: ${formData.phone}
        -----------------
        ${formData.message}
      `,
    };

    try {
      await sendMail(payload);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setMailError(err.message || "שגיאה בשליחת המייל");
    } finally {
      setSendingMail(false);
    }
  };

  return (
    <div style={styles.pageContainer(isMobile)}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.gridContainer(isMobile, fromNav)}
      >
        {/* צד שמאל - פרטים נוספים אם הגענו מה-NAV */}
        {fromNav && (
          <div style={styles.infoPanel(isMobile)}>
            <h1 style={styles.title}>יצירת קשר</h1>
            <p style={styles.subtitle}>בואו נתחיל לתכנן את האירוע המושלם שלכם ✨</p>
            <p>📞 טלפון: 0507999045</p>
            <p>✉️ מייל: boom.gefen.hevy@gmail.com</p>
            <a
              href="https://wa.me/972507999045?text=שלום%20כבי%20וBOOM!"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "10px", color: "#fff", background: appColors.primary, padding: "10px 15px", borderRadius: "8px", textDecoration: "none" }}
            >
              <FaWhatsapp /> צ׳אט בוואטסאפ
            </a>
          </div>
        )}

        {/* צד ימין - הטופס */}
        <form onSubmit={handleSubmit} style={styles.formPanel}>
          {!fromNav && <h2 style={styles.formTitle}>שלחו לנו הודעה</h2>}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="שם מלא"
            required
            style={styles.input}
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="אימייל"
            required
            type="email"
            style={styles.input}
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="טלפון"
            style={styles.input}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="הודעה"
            required
            rows={4}
            style={styles.textarea}
          />

          <button
            type="submit"
            disabled={sendingMail}
            style={{
              ...styles.button,
              backgroundColor: sendingMail ? "#aaa" : appColors.primary,
              color: "#fff",
            }}
          >
            {sendingMail ? "שולח..." : "שלח"}
          </button>

          {mailError && <p style={styles.error}>{mailError}</p>}
          {success && <p style={styles.success}>ההודעה נשלחה בהצלחה ✅</p>}
        </form>
      </motion.div>
    </div>
  );
};

const styles = {
  pageContainer: (isMobile: boolean) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: appColors.lightGradient,
    padding: isMobile ? "90px 15px" : "100px 30px",
    boxSizing: "border-box" as const,
    direction: "rtl" as const,
  }),
  gridContainer: (isMobile: boolean, fromNav: boolean) => ({
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : (fromNav ? "1fr 1fr" : "1fr"),
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: isMobile ? "600px" : (fromNav ? "1100px" : "600px"),
  }),
  infoPanel: (isMobile: boolean) => ({
    backgroundColor: appColors.activeBackground,
    padding: isMobile ? "20px" : "40px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    gap: "15px",
    borderLeft: isMobile ? "none" : `1px solid ${appColors.borderColor}`,
    borderBottom: isMobile ? `1px solid ${appColors.borderColor}` : "none",
  }),
  title: { fontSize: "2rem", fontWeight: "bold", color: appColors.primary },
  subtitle: { color: "#555", fontSize: "1.1rem" },
  formPanel: { padding: "30px", display: "flex", flexDirection: "column" as const, gap: "15px" },
  formTitle: { fontSize: "1.8rem", color: appColors.primary, textAlign: "center" as const },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem", outline: "none" },
  textarea: { padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem", resize: "none" as const },
  button: { marginTop: "10px", padding: "12px", border: "none", borderRadius: "10px", fontSize: "1.1rem", cursor: "pointer", transition: "0.3s" },
  error: { color: "red", fontWeight: 500, marginTop: "10px" },
  success: { color: "green", fontWeight: 500, marginTop: "10px" },
};

export default ContactUs;
