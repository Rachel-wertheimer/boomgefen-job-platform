// import { useState } from "react";
// import axios from "axios";
// import { FaSpinner } from "react-icons/fa";
// import { appColors } from "../../utils/colors";

// // קומפוננטות נוספות לשלבים הבאים
// const VerifyCodeModal = ({ email, onVerified }: { email: string; onVerified: (code: string) => void }) => {
//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     if (!code) return setError("נא להזין קוד אימות");
//     setLoading(true);
//     setError("");
//     try {
//       await axios.post(
//         "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles/verifyCode",
//         { email, code }
//       );
//       onVerified(code);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "קוד שגוי או שפג תוקפו");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20, textAlign: "center" }}>
//       <h2>אימות קוד</h2>
//       <p>הכנס את הקוד שנשלח למייל {email}</p>
//       <input
//         type="text"
//         placeholder="קוד אימות"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginBottom: "10px",
//           textAlign: "center",
//         }}
//       />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <button
//         onClick={handleVerify}
//         disabled={loading}
//         style={{
//           background: appColors.primary,
//           color: "white",
//           border: "none",
//           padding: "10px 20px",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         {loading ? <FaSpinner /> : "אמת קוד"}
//       </button>
//     </div>
//   );
// };

// const ResetPasswordModal = ({
//   email,
//   code,
//   onSuccess,
// }: {
//   email: string;
//   code: string;
//   onSuccess: () => void;
// }) => {
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleReset = async () => {
//     if (newPassword.length < 6)
//       return setError("הסיסמה חייבת להכיל לפחות 6 תווים");
//     setLoading(true);
//     setError("");
//     try {
//       await axios.post(
//         "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles/updatePassword",
//         { email, code, newPassword }
//       );
//       onSuccess();
//     } catch (err: any) {
//       setError(err.response?.data?.message || "שגיאה בעדכון הסיסמה");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20, textAlign: "center" }}>
//       <h2>בחר סיסמה חדשה</h2>
//       <input
//         type="password"
//         placeholder="סיסמה חדשה"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginBottom: "10px",
//           textAlign: "center",
//         }}
//       />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <button
//         onClick={handleReset}
//         disabled={loading}
//         style={{
//           background: appColors.primary,
//           color: "white",
//           border: "none",
//           padding: "10px 20px",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         {loading ? "מעדכן..." : "עדכן סיסמה"}
//       </button>
//     </div>
//   );
// };

// const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
//   const [email, setEmail] = useState("");
//   const [step, setStep] = useState<"email" | "verify" | "reset">("email");
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleForgotPassword = async () => {
//     if (!email) return setError("נא להזין כתובת מייל");
//     setLoading(true);
//     setError("");
//     try {
//       await axios.post(
//         "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles/getUserByEmail",
//         { email }
//       );
//       setMessage("נשלח מייל עם קוד אימות");
//       setStep("verify");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "לא נמצאה כתובת מייל זו");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // שלב אימות
//   if (step === "verify")
//     return (
//       <VerifyCodeModal
//         email={email}
//         onVerified={(c) => {
//           setCode(c);
//           setStep("reset");
//         }}
//       />
//     );

//   // שלב שינוי סיסמה
//   if (step === "reset")
//     return (
//       <ResetPasswordModal
//         email={email}
//         code={code}
//         onSuccess={() => {
//           alert("הסיסמה הוחלפה בהצלחה!");
//           onClose();
//         }}
//       />
//     );

//   // שלב שליחת מייל
//   return (
//     <div style={{ padding: 20, textAlign: "center" }}>
//       <h2>שכחתי סיסמה</h2>
//       <p>הכנס את כתובת המייל שלך ונשלח קוד אימות</p>
//       <input
//         type="email"
//         placeholder="כתובת מייל"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{
//           width: "100%",
//           padding: "10px",
//           marginBottom: "10px",
//           textAlign: "center",
//         }}
//       />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {message && <p style={{ color: "green" }}>{message}</p>}
//       <button
//         onClick={handleForgotPassword}
//         disabled={loading}
//         style={{
//           background: appColors.primary,
//           color: "white",
//           border: "none",
//           padding: "10px 20px",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         {loading ? <FaSpinner /> : "שלח קוד אימות"}
//       </button>
//     </div>
//   );
// };

// export default ForgotPasswordModal;
import React, { useState } from "react";
import axios from "axios";
import { FaSpinner, FaArrowRight } from "react-icons/fa"; // הוספתי FaArrowRight
import { appColors } from "../../utils/colors";

// --- סגנונות מ-LoginModal (מומלץ לשמור בקובץ נפרד) ---
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
      `,
    }}
  />
);

const animationStyles = {
  modalFadeIn: "modalFadeIn 0.3s ease-out forwards",
  overlayFadeIn: "overlayFadeIn 0.3s ease-out forwards",
  spin: "spin 1s linear infinite",
};
// --- סוף סגנונות אנימציה ---


// --- הגדרת סגנונות גלובליים במודאל הראשי (ForgotPasswordModal) ---
const colors = appColors;

const baseStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    direction: 'rtl',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '16px', 
    animation: animationStyles.modalFadeIn,
    transform: "scale(0.95)", 
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '1.8rem',
    fontWeight: 700,
    color: colors.primary, 
  },
  inputBase: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: `1px solid ${colors.borderColor || '#ccc'}`,
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
    outline: "none",
    textAlign: 'right', 
  },
  inputFocus: {
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px ${colors.primary}30`,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
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
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    color: "white",
    border: `2px solid ${colors.primary}`,
  },
  primaryButtonHover: {
    backgroundColor: colors.primaryHover || colors.primary,
    borderColor: colors.primaryHover || colors.primary,
  },
  secondaryButton: {
    backgroundColor: "white",
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
  },
  secondaryButtonHover: {
    backgroundColor: colors.activeBackground || '#f0f0f0',
  },
  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  errorText: {
    color: colors.danger,
    margin: '0',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  messageText: { // הודעות הצלחה/מידע
    color: colors.success || 'green',
    margin: '0',
    fontSize: '0.9rem',
    fontWeight: 500,
  }
};
// --- סוף סגנונות גלובליים ---

// --- קומפוננטת איפוס סיסמה (שלב 3) ---
const ResetPasswordModal = ({ email, code, onSuccess, onBack }: { email: string; code: string; onSuccess: () => void; onBack: () => void }) => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResetHover, setIsResetHover] = useState(false);
  const [isCancelHover, setIsCancelHover] = useState(false);
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});

  // הלוגיקה נשארת כפי שהיא
  const handleReset = async () => {
    if (newPassword.length < 6)
      return setError("הסיסמה חייבת להכיל לפחות 6 תווים");

    setLoading(true);
    setError("");
    try {
      await axios.post(
        "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles/updatePassword",
        { email, code, newPassword }
      );
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה בעדכון הסיסמה");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field: string) => setFocusState(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string) => setFocusState(prev => ({ ...prev, [field]: false }));
  const getInputStyle = (name: string) => ({
    ...baseStyles.inputBase,
    ...(focusState[name] ? baseStyles.inputFocus : {})
  });

  const resetBtnStyle = {
    ...baseStyles.baseButton,
    ...baseStyles.primaryButton,
    ...(loading ? baseStyles.disabledButton : (isResetHover ? baseStyles.primaryButtonHover : {}))
  };

  const cancelBtnStyle = {
    ...baseStyles.baseButton,
    ...baseStyles.secondaryButton,
    ...(isCancelHover ? baseStyles.secondaryButtonHover : {})
  };


  return (
    <>
      <h2 style={baseStyles.title}>בחר סיסמה חדשה</h2>
      <p style={{ margin: '0', color: colors.lightGradient || '#666' }}>עוד שלב קטן ואתה בפנים!</p>
      
      <input
        type="password"
        placeholder="סיסמה חדשה"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={getInputStyle('newPassword')}
        onFocus={() => handleFocus('newPassword')}
        onBlur={() => handleBlur('newPassword')}
      />

      {error && <p style={baseStyles.errorText}>{error}</p>}
      
      <div style={baseStyles.buttonContainer}>
        <button
          onClick={handleReset}
          disabled={loading}
          style={resetBtnStyle}
          onMouseEnter={() => setIsResetHover(true)}
          onMouseLeave={() => setIsResetHover(false)}
        >
          {loading ? (
            <>
              מעדכן...
              <FaSpinner style={{ animation: animationStyles.spin }} />
            </>
          ) : "עדכן סיסמה"}
        </button>
        <button
          onClick={onBack} 
          style={cancelBtnStyle}
          onMouseEnter={() => setIsCancelHover(true)}
          onMouseLeave={() => setIsCancelHover(false)}
        >
          חזרה להתחברות
        </button>
      </div>
    </>
  );
};

// --- קומפוננטת אימות קוד (שלב 2) ---
const VerifyCodeModal = ({ email, onVerified, onBack }: { email: string; onVerified: (code: string) => void; onBack: () => void }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerifyHover, setIsVerifyHover] = useState(false);
  const [isCancelHover, setIsCancelHover] = useState(false);
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});

  // הלוגיקה נשארת כפי שהיא
  const handleVerify = async () => {
    if (!code) return setError("נא להזין קוד אימות");
    setLoading(true);
    setError("");
    try {
      await axios.post(
        "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles/verifyCode",
        { email, code }
      );
      onVerified(code);
    } catch (err: any) {
      setError(err.response?.data?.message || "קוד שגוי או שפג תוקפו");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field: string) => setFocusState(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string) => setFocusState(prev => ({ ...prev, [field]: false }));
  const getInputStyle = (name: string) => ({
    ...baseStyles.inputBase,
    ...(focusState[name] ? baseStyles.inputFocus : {}),
    textAlign: 'center' as const, // אימות קוד לרוב במרכז
    letterSpacing: '5px' // להדגשת הקוד
  });

  const verifyBtnStyle = {
    ...baseStyles.baseButton,
    ...baseStyles.primaryButton,
    ...(loading ? baseStyles.disabledButton : (isVerifyHover ? baseStyles.primaryButtonHover : {}))
  };

  const cancelBtnStyle = {
    ...baseStyles.baseButton,
    ...baseStyles.secondaryButton,
    ...(isCancelHover ? baseStyles.secondaryButtonHover : {})
  };

  return (
    <>
      <h2 style={baseStyles.title}>אימות קוד</h2>
      <p style={{ margin: '0', color: colors.lightGradient
         || '#666' }}>הכנס את הקוד שנשלח למייל **{email}**</p>
      
      <input
        type="text"
        placeholder="קוד אימות"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={getInputStyle('code')}
        onFocus={() => handleFocus('code')}
        onBlur={() => handleBlur('code')}
        maxLength={6} 
      />

      {error && <p style={baseStyles.errorText}>{error}</p>}
      
      <div style={baseStyles.buttonContainer}>
        <button
          onClick={handleVerify}
          disabled={loading}
          style={verifyBtnStyle}
          onMouseEnter={() => setIsVerifyHover(true)}
          onMouseLeave={() => setIsVerifyHover(false)}
        >
          {loading ? (
            <>
              מאמת...
              <FaSpinner style={{ animation: animationStyles.spin }} />
            </>
          ) : "אמת קוד"}
        </button>
        <button
          onClick={onBack}
          style={cancelBtnStyle}
          onMouseEnter={() => setIsCancelHover(true)}
          onMouseLeave={() => setIsCancelHover(false)}
        >
          חזרה להתחברות
        </button>
      </div>
    </>
  );
};


// --- קומפוננטת שכחתי סיסמה (שלב 1 - קומפוננטה ראשית) ---
type ForgotPasswordModalProps = {
  onClose: () => void;
};

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSendHover, setIsSendHover] = useState(false);
  const [isCancelHover, setIsCancelHover] = useState(false);
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});

  // הלוגיקה נשארת כפי שהיא
  const handleSendEmail = async () => {
    if (!email) return setError("נא להזין כתובת מייל");
    setLoading(true);
    setError("");
    setMessage(""); // ניקוי הודעות קודמות
    try {
      await axios.post(
        "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles/getUserByEmail",
        { email }
      );
      setMessage("נשלח מייל עם קוד אימות");
      setStep("verify");
    } catch (err: any) {
      setError(err.response?.data?.message || "לא נמצאה כתובת מייל זו");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field: string) => setFocusState(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string) => setFocusState(prev => ({ ...prev, [field]: false }));
  const getInputStyle = (name: string) => ({
    ...baseStyles.inputBase,
    ...(focusState[name] ? baseStyles.inputFocus : {})
  });

  const sendBtnStyle = {
    ...baseStyles.baseButton,
    ...baseStyles.primaryButton,
    ...(loading ? baseStyles.disabledButton : (isSendHover ? baseStyles.primaryButtonHover : {}))
  };

  const cancelBtnStyle = {
    ...baseStyles.baseButton,
    ...baseStyles.secondaryButton,
    ...(isCancelHover ? baseStyles.secondaryButtonHover : {})
  };


  let modalContent;
  
  if (step === "verify") {
    // השלב השני - אימות קוד
    modalContent = (
      <VerifyCodeModal
        email={email}
        onVerified={(c) => {
          setCode(c);
          setStep("reset");
        }}
        onBack={() => setStep("email")} // ניתן לחזור לשלב האימייל אם רוצים, או onCLose
      />
    );
  } else if (step === "reset") {
    // השלב השלישי - איפוס סיסמה
    modalContent = (
      <ResetPasswordModal
        email={email}
        code={code}
        onSuccess={() => {
          alert("הסיסמה הוחלפה בהצלחה!");
          onClose();
        }}
        onBack={onClose} 
      />
    );
  } else {
    // השלב הראשון - שליחת מייל
    modalContent = (
      <>
        <h2 style={baseStyles.title}>שכחתי סיסמה</h2>
        <p style={{ margin: '0', color: colors.lightGradient|| '#666' }}>הכנס את כתובת המייל שלך ונשלח קוד אימות</p>
        
        <input
          type="email"
          placeholder="כתובת מייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={getInputStyle('email')}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
        />

        {error && <p style={baseStyles.errorText}>{error}</p>}
        {message && <p style={baseStyles.messageText}>{message}</p>}
        
        <div style={baseStyles.buttonContainer}>
          <button
            onClick={handleSendEmail}
            disabled={loading}
            style={sendBtnStyle}
            onMouseEnter={() => setIsSendHover(true)}
            onMouseLeave={() => setIsSendHover(false)}
          >
            {loading ? (
              <>
                שולח...
                <FaSpinner style={{ animation: animationStyles.spin }} />
              </>
            ) : "שלח קוד אימות"}
          </button>
          <button
            onClick={onClose}
            style={cancelBtnStyle}
            onMouseEnter={() => setIsCancelHover(true)}
            onMouseLeave={() => setIsCancelHover(false)}
          >
            חזרה להתחברות
          </button>
        </div>
      </>
    );
  }


  return (
    <>
      <AnimationStyles />
      <div style={baseStyles.overlay} onClick={onClose}>
        {/* מניעת סגירה בלחיצה על המודאל עצמו */}
        <div style={baseStyles.modal} onClick={(e) => e.stopPropagation()}>
          {modalContent}
        </div>
      </div >
    </>
  );
};

export default ForgotPasswordModal;