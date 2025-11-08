import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSpinner, FaWhatsapp } from "react-icons/fa";
import { useWindowSize } from "../../utils/hooks";
import { appColors } from "../../utils/colors";
import { sendMail } from "../../utils/mailService";
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

const ContactUs: React.FC = () => {
  const location = useLocation();
  const fromNav = location.state?.fromNav === true;


  const [sendingMail, setSendingMail] = useState(false);
  const [mailError, setMailError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});
  const [isSubmitHover, setIsSubmitHover] = useState(false);
  const [isWhatsappHover, setIsWhatsappHover] = useState(false);

  const handleFocus = (field: string) => setFocusState(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string) => setFocusState(prev => ({ ...prev, [field]: false }));

  const colors = appColors;

  const styles: Record<string, React.CSSProperties> = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "100vh",
      background: colors.lightGradient,
      padding: isMobile ? "90px 15px 30px 15px" : "100px 30px 30px 30px",
      boxSizing: "border-box",
      direction: "rtl",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : (fromNav ? "1fr 1fr" : "1fr"),
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      width: "100%",
      maxWidth: isMobile ? "600px" : (fromNav ? "1100px" : "600px"),
    },
    infoPanel: {
      backgroundColor: colors.activeBackground,
      padding: isMobile ? "30px" : "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "20px",
      borderBottom: isMobile ? `1px solid ${colors.borderColor}` : 'none',
      borderLeft: isMobile ? 'none' : `1px solid ${colors.borderColor}`,
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: 0,
      color: colors.primary,
    },
    subtitle: {
      color: colors.textMedium,
      marginBottom: "10px",
      fontSize: '1.1rem',
      lineHeight: 1.6
    },
    infoItem: {
      marginBottom: "10px",
    },
    infoLabel: {
      margin: 0,
      fontWeight: "bold",
      color: colors.primary,
      fontSize: '1.1rem',
    },
    infoText: {
      margin: "5px 0",
      color: colors.textDark,
      fontSize: '1rem',
    },
    formPanel: {
      padding: isMobile ? "30px" : "40px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    formTitle: {
      color: colors.primary,
      marginBottom: "10px",
      fontSize: '1.8rem',
      textAlign: 'center',
    },
    inputBase: {
      width: "100%",
      padding: "14px 16px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: `1px solid ${colors.borderColor}`,
      boxSizing: "border-box",
      transition: "border-color 0.3s, box-shadow 0.3s",
      outline: "none",
      fontFamily: "inherit",
    },
    inputFocus: {
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}30`,
    },
    baseButton: {
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "bold",
      border: "2px solid transparent",
      transition: "all 0.3s ease",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      textDecoration: 'none',
    },
    primaryButton: {
      backgroundColor: colors.primary,
      color: "white",
      border: `2px solid ${colors.primary}`,
    },
    primaryButtonHover: {
      backgroundColor: colors.primaryHover,
      borderColor: colors.primaryHover,
    },
    secondaryButton: {
      backgroundColor: "white",
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
    },
    secondaryButtonHover: {
      backgroundColor: colors.activeBackground,
    },
    disabledButton: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    loadingSpinner: {
      animation: animationStyles.spin,
    },
    errorText: {
      color: colors.danger,
      textAlign: "center",
      fontSize: '0.9rem',
    },
    error: {
      marginTop: "15px",
      color: "red",
      fontWeight: 500,
    },
    success: {
      marginTop: "15px",
      color: "green",
      fontWeight: 500,
    },

  };

  const getInputStyle = (name: string) => ({
    ...styles.inputBase,
    ...(focusState[name] ? styles.inputFocus : {})
  });

  const getTextAreaStyle = (name: string) => ({
    ...styles.inputBase,
    minHeight: "120px",
    resize: "vertical" as 'vertical',
    ...(focusState[name] ? styles.inputFocus : {})
  });

  const submitBtnStyle = {
    ...styles.baseButton,
    ...styles.primaryButton,
    marginTop: '10px',
    ...(sendingMail ? styles.disabledButton : (isSubmitHover ? styles.primaryButtonHover : {}))
  };

  const whatsappBtnStyle = {
    ...styles.baseButton,
    ...styles.secondaryButton,
    width: "fit-content",
    ...(isWhatsappHover ? styles.secondaryButtonHover : {})
  };

  return (
    <div style={styles.pageContainer}>
      <SEO
        title="יצירת קשר - BoomGefen | דרושים אמנים"
        description="יצירת קשר עם BoomGefen - פלטפורמה לחיפוש עבודה לאמנים. משרות בתחום האמנות, עבודות יצירה, והזדמנויות מקצועיות. דרושים אמנים."
        keywords={seoKeywords}
      />
      <AnimationStyles />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.gridContainer}
      >
        {fromNav && (
          <div style={styles.infoPanel}>
            <h1 style={styles.title}>
              יצירת קשר
            </h1>
            <p style={styles.subtitle}>
              בואו נתחיל לתכנן את האירוע המושלם שלכם ✨
            </p>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>
                📞 טלפון:
              </p>
              <p style={styles.infoText}>0507999045</p>
            </div>

            <div style={styles.infoItem}>
              <p style={styles.infoLabel}>
                ✉️ מייל:
              </p>
              <p style={styles.infoText}>boom.gefen.hevy@gmail.com</p>
            </div>

            <a
              href="https://wa.me/972507999045?text=שלום%20כבי%20וBOOM!"
              target="_blank"
              rel="noopener noreferrer"
              style={whatsappBtnStyle}
              onMouseEnter={() => setIsWhatsappHover(true)}
              onMouseLeave={() => setIsWhatsappHover(false)}
            >
              <FaWhatsapp />
              צ׳אט בוואטסאפ
            </a>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={styles.formPanel}
        >
          {!fromNav && (
            <h2 style={styles.formTitle}>
              שלחו לנו הודעה
            </h2>
          )}

          <input
            type="text"
            name="name"
            placeholder="שם מלא"
            value={formData.name}
            onChange={handleChange}
            style={getInputStyle('name')}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="כתובת מייל"
            value={formData.email}
            onChange={handleChange}
            style={getInputStyle('email')}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="מספר טלפון"
            value={formData.phone}
            onChange={handleChange}
            style={getInputStyle('phone')}
            onFocus={() => handleFocus('phone')}
            onBlur={() => handleBlur('phone')}
          />
          <textarea
            name="message"
            placeholder="ספרו לנו על האירוע שלכם..."
            value={formData.message}
            onChange={handleChange}
            style={getTextAreaStyle('message')}
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
          />

          <motion.button
            whileHover={{ scale: sendingMail ? 1 : 1.03 }} 
            whileTap={{ scale: sendingMail ? 1 : 0.98 }}
            type="submit"
            style={submitBtnStyle}
            disabled={sendingMail}
            onMouseEnter={() => setIsSubmitHover(true)}
            onMouseLeave={() => setIsSubmitHover(false)}
          >
            {sendingMail ? (
              <>
                שולח...
                <FaSpinner style={styles.loadingSpinner} />
              </>
            ) : "שלח הודעה"}
          </motion.button>

          {mailError && <p style={styles.error}>{mailError}</p>}
          {success && <p style={styles.success}>ההודעה נשלחה בהצלחה ✅</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;