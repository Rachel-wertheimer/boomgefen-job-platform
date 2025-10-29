import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { AnimationStyles, animationStyles } from "../../utils/animations";
import { appColors } from "../../utils/colors";

type Props = {
  onClose: () => void;
  onBack: () => void;
};

const ForgotPasswordModal: React.FC<Props> = ({ onClose, onBack }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      setError("נא להזין אימייל");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await axios.post(
        "https://boomgefen-job-platform-1.onrender.com/api/v1/users/forgot-password",
        { email }
      );
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה בשליחת בקשת איפוס סיסמה");
    } finally {
      setLoading(false);
    }
  };

  const colors = appColors;

  const styles: Record<string, React.CSSProperties> = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
      direction: "rtl",
      animation: animationStyles.overlayFadeIn,
    },
    modal: {
      background: "#fff",
      padding: "30px",
      borderRadius: "20px",
      width: "90%",
      maxWidth: "420px",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      animation: animationStyles.modalFadeIn,
    },
    title: {
      margin: "0 0 10px 0",
      fontSize: "1.8rem",
      fontWeight: 700,
      color: colors.primary,
    },
    description: {
      fontSize: "1rem",
      color: colors.textDark,
      lineHeight: 1.6,
      marginBottom: "10px",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: `1px solid ${colors.borderColor}`,
      boxSizing: "border-box",
      textAlign: "right",
      outline: "none",
    },
    button: {
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: "bold",
      border: "2px solid transparent",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: "100%",
      backgroundColor: loading ? colors.borderColor : colors.primary,
      color: "white",
      opacity: loading ? 0.6 : 1,
    },
    backButton: {
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "bold",
      border: `2px solid ${colors.primary}`,
      backgroundColor: "white",
      color: colors.primary,
      transition: "all 0.3s ease",
      width: "100%",
    },
    errorText: {
      color: colors.danger,
      fontSize: "0.9rem",
      fontWeight: 500,
    },
    successText: {
      color: colors.success,
      fontSize: "1rem",
      fontWeight: 600,
    },
  };

  return (
    <>
      <AnimationStyles />
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2 style={styles.title}>שכחתי סיסמה</h2>
          
          {!success ? (
            <>
              <p style={styles.description}>
                הזינו את כתובת האימייל שלכם ואנו נשלח קוד לאיפוס הסיסמה
              </p>
              <input
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
              {error && <p style={styles.errorText}>{error}</p>}
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button onClick={handleForgotPassword} style={styles.button} disabled={loading}>
                  {loading ? (
                    <>
                      שולח... <FaSpinner style={{ animation: animationStyles.spin }} />
                    </>
                  ) : (
                    "שלח קוד איפוס"
                  )}
                </button>
                <button onClick={onBack} style={styles.backButton}>
                  חזרה להתחברות
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={styles.successText}>מייל נשלח בהצלחה!</p>
              <p style={styles.description}>
                בדקו את תיבת הדואר הנכנס שלכם לקבלת קוד האיפוס
              </p>
              <button onClick={onClose} style={styles.button}>
                סגור
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;

