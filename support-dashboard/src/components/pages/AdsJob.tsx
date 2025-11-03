import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { registerUserAndCreateAd } from "../../app/slice/adsSlice";
import { FaSpinner } from "react-icons/fa";
import { useWindowSize } from "../../utils/hooks";
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
  marqueeScroll: "marqueeScroll 40s linear infinite",
};

const CreateAdForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.ads);
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});
  const [notifyWhenExpired, setNotifyWhenExpired] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 768; 
  const colors = appColors;
  const handleFocus = (field: string) => setFocusState(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string) => setFocusState(prev => ({ ...prev, [field]: false }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!notifyWhenExpired) {
      alert("יש לאשר את הסימון לפני שניתן להמשיך");
      return;
    }

    if (!fullName || !email || !type || !goal || !description) {
      alert("אנא מלא את כל השדות");
      return;
    }

    const userData = { full_name: fullName, email, phone };
    const adData = { company, type, goal, description };
    dispatch(registerUserAndCreateAd({ userData, adData }));

    setFullName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setType("");
    setGoal("");
    setDescription("");
    setNotifyWhenExpired(false);
  };

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
    formCard: {
      width: "100%",
      maxWidth: "900px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      padding: isMobile ? "24px" : "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      boxSizing: "border-box",
      animation: animationStyles.fadeIn,
    },
    formHeader: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: isMobile ? "2rem" : "2.5rem",
      color: colors.primary,
      fontWeight: 700,
      margin: 0,
    },
    subtitle: {
      fontSize: isMobile ? "1rem" : "1.1rem",
      color: colors.textMedium,
      marginTop: "10px",
      lineHeight: 1.6,
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "24px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    formGroupFullWidth: {
      gridColumn: "1 / -1",
    },
    label: {
      fontSize: "1rem",
      fontWeight: 600,
      color: colors.textDark,
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
    textareaBase: {
      width: "100%",
      minHeight: "160px",
      resize: "vertical",
      padding: "14px 16px",
      fontSize: "1rem",
      borderRadius: "8px",
      border: `1px solid ${colors.borderColor}`,
      boxSizing: "border-box",
      fontFamily: "inherit",
    }
    ,

    buttonContainer: {
      paddingTop: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
    },
    submitBtn: {
      padding: "14px 30px",
      fontSize: "17px",
      borderRadius: "30px",
      cursor: "pointer",
      textAlign: "center",
      fontWeight: "bold",
      border: `2px solid ${colors.primary}`,
      transition: "all 0.3s ease",
      backgroundColor: colors.primary,
      color: "white",
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '180px',
      justifyContent: 'center',
    },
    submitBtnHover: {
      backgroundColor: colors.primaryHover,
      borderColor: colors.primaryHover,
    },
    submitBtnDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    loadingSpinner: {
      animation: animationStyles.spin,
    },
    errorMessage: {
      color: colors.danger,
      fontWeight: 600,
      textAlign: 'center',
      fontSize: '0.95rem',
    }
  };

  const [isSubmitHover, setIsSubmitHover] = useState(false);
  const isDisabled = loading;

  const submitBtnStyle = {
    ...styles.submitBtn,
    ...(isDisabled ? styles.submitBtnDisabled : (isSubmitHover ? styles.submitBtnHover : {}))
  };

  const getInputStyle = (name: string) => ({
    ...styles.inputBase,
    ...(focusState[name] ? styles.inputFocus : {})
  });

  const getTextareaStyle = (name: string) => ({
    ...styles.textareaBase,
    ...(focusState[name] ? styles.inputFocus : {})
  });


  return (
    <div style={styles.pageContainer}>
      <AnimationStyles />
      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <h1 style={styles.title}>יצירת מודעה חדשה</h1>
          <p style={styles.subtitle}>מלאו את הפרטים הבאים כדי ליצור מודעה ולהתחיל לקבל פניות.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>שם מלא</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required
                style={getInputStyle('fullName')} onFocus={() => handleFocus('fullName')} onBlur={() => handleBlur('fullName')}
                placeholder="שם פרטי ושם משפחה" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>חברה / מוסד</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                style={getInputStyle('company')} onFocus={() => handleFocus('company')} onBlur={() => handleBlur('company')}
                placeholder="שם החברה" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>אימייל</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                style={getInputStyle('email')} onFocus={() => handleFocus('email')} onBlur={() => handleBlur('email')}
                placeholder="example@mail.com" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>מה אתם מחפשים?</label>
              <input type="text" value={type} onChange={(e) => setType(e.target.value)} required
                style={getInputStyle('type')} onFocus={() => handleFocus('type')} onBlur={() => handleBlur('type')}
                placeholder="לדוגמה: שחקנית במה" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>טלפון</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                style={getInputStyle('phone')} onFocus={() => handleFocus('phone')} onBlur={() => handleBlur('phone')}
                placeholder="050-1234567" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>מה המטרה?</label>
              <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} required
                style={getInputStyle('goal')} onFocus={() => handleFocus('goal')} onBlur={() => handleBlur('goal')}
                placeholder="לדוגמה: להשתתף בסרט" />
            </div>
            <div style={styles.formGroupFullWidth}>
              <label style={styles.label}>תיאור</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4}
                style={getTextareaStyle('description')} onFocus={() => handleFocus('description')} onBlur={() => handleBlur('description')}
                placeholder="תרחיבו כאן עוד על הדרישה שלכם..."></textarea>
            </div>
            <div style={{ ...styles.formGroupFullWidth, display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="notifyExpired"
                checked={notifyWhenExpired}
                onChange={(e) => setNotifyWhenExpired(e.target.checked)}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <label htmlFor="notifyExpired" style={{ fontSize: "0.95rem", color: appColors.textDark }}>
                שלח התראה למערכת כאשר המשרה כבר לא רלוונטית
              </label>
            </div>
          </div>
          <p
            style={{
              color: "#ff7b00",
              fontWeight: 600,
              textAlign: "center",
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              marginTop: isMobile ? "8px" : "10px",
              lineHeight: 1.5,
              padding: isMobile ? "0 10px" : "0",
            }}
          >
            שים לב! לאחר שהמנהל יאשר את המשרה שלך – ייתכן שהפניות יגיעו לתיבת הספאם.
            <br />
            יש לבדוק את תיקיית הספאם במייל.
          </p>
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              disabled={isDisabled}
              style={submitBtnStyle}
              onMouseEnter={() => setIsSubmitHover(true)}
              onMouseLeave={() => setIsSubmitHover(false)}
            >
              {loading ? (
                <>
                  שולח...
                  <FaSpinner style={styles.loadingSpinner} />
                </>
              ) : "פרסום מודעה"}
            </button>
            {error && <p style={styles.errorMessage}>שגיאה: {error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdForm;