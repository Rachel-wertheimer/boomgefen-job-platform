// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../app/store";
// import { login } from "../../app/slice/userSlice";

// type Props = {
//   onClose: () => void;
// };

// export const LoginModal: React.FC<Props> = ({ onClose }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((state: RootState) => state.user);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     dispatch(login({ email, password }))
//       .unwrap()
//       .then((res: any) => {
//         if (res?.error) {
//           const renew = window.confirm(
//             "המנוי שלך פג או אין לך מנוי פעיל. רוצים לחדש מנוי עכשיו?"
//           );
//           if (renew) {
//             window.location.href = "https://pay.sumit.co.il/g9687k/gg7p5h/hykun7/payment/";
//           }
//         } else {
//           onClose(); // כניסה תקינה
//         }
//       })
//       .catch((err: any) => {
//         console.error(err); // שגיאות רשת/שרת
//       });
//   };
  
  
  

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal}>
//         <h2>התחברות</h2>
//         <input
//           type="email"
//           placeholder="אימייל"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="סיסמה"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button onClick={handleLogin} style={styles.button} disabled={loading}>
//           {loading ? "מתחבר..." : "התחבר"}
//         </button>
//         <button onClick={onClose} style={styles.cancel}>ביטול</button>
//       </div>
//     </div>
//   );
// };


// const styles: Record<string, React.CSSProperties> = {
//   overlay: {
//     position: "fixed",
//     top: 0, left: 0,
//     width: "100%", height: "100%",
//     backgroundColor: "rgba(0,0,0,0.6)", // רקע כהה יותר
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 2000, // מעל הכל
//     direction: 'rtl',
//   },
//   modal: {
//     background: "#fff",
//     padding: "32px", // ריפוד גדול יותר
//     borderRadius: "16px", // פינות מעוגלות
//     width: "90%",
//     maxWidth: "400px",
//     textAlign: "center",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '12px', // רווח בין האלמנטים
//   },
//   title: {
//     margin: '0 0 10px 0',
//     fontSize: '1.75rem',
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     margin: "0", // מנוהל על ידי gap
//     borderRadius: "8px",
//     border: "1px solid #ced4da",
//     boxSizing: 'border-box',
//     fontSize: '1rem',
//   },
//   button: {
//     backgroundColor: "#5a4bff",
//     color: "#fff",
//     padding: "12px 14px",
//     border: "none",
//     borderRadius: "8px",
//     marginTop: "10px",
//     cursor: "pointer",
//     width: "100%",
//     fontWeight: 600,
//     fontSize: '1rem',
//   },
//   cancel: {
//     marginTop: "0",
//     background: "#f1f3f5",
//     color: '#555',
//     border: "none",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     width: "100%",
//     fontWeight: 500,
//     fontSize: '1rem',
//   },
//   error: {
//     color: "#fa5252",
//     margin: '0',
//     fontSize: '0.9rem',
//   }
// };
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { login } from "../../app/slice/userSlice";
import { FaSpinner } from "react-icons/fa"; // אייקון לטעינה

type Props = {
  onClose: () => void;
};

// --- הגדרת אנימציות ---
const AnimationStyles = () => (
    <style>
        {`
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
    `}
    </style>
);

export const LoginModal: React.FC<Props> = ({ onClose }) => {
  // --- כל הלוגיקה נשארת זהה ---
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password }))
      .unwrap()
      .then((res: any) => {
        if (res?.error) {
          const renew = window.confirm(
            "המנוי שלך פג או אין לך מנוי פעיל. רוצים לחדש מנוי עכשיו?"
          );
          if (renew) {
            window.location.href = "https://pay.sumit.co.il/g9687k/gg7p5h/hykun7/payment/";
          }
        } else {
          onClose(); // כניסה תקינה
        }
      })
      .catch((err: any) => {
        console.error(err); // שגיאות רשת/שרת
      });
  };
  // --- סוף הלוגיקה שלא נגענו בה ---


  // --- States ופונקציות לעיצוב בלבד ---
  const [isLoginHover, setIsLoginHover] = useState(false);
  const [isCancelHover, setIsCancelHover] = useState(false);
  const [focusState, setFocusState] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => setFocusState(prev => ({ ...prev, [field]: true }));
  const handleBlur = (field: string) => setFocusState(prev => ({ ...prev, [field]: false }));

  // --- פלטת צבעים אחידה ---
  const colors = {
    primary: "#6d44b8",
    primaryHover: "#5a379a",
    danger: "#fa5252",
    textDark: "#212529",
    borderColor: "#ced4da",
    activeBackground: "#f5f3f9",
  };

  // --- סגנונות מעודכנים ---
  const styles: Record<string, React.CSSProperties> = {
    overlay: {
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)", // רקע כהה יותר
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
      direction: 'rtl',
      animation: "overlayFadeIn 0.3s ease-out forwards",
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
      gap: '16px', // רווח אחיד
      animation: "modalFadeIn 0.3s ease-out forwards",
      transform: "scale(0.95)", // התחלה קטנה לאנימציה
    },
    title: {
      margin: '0 0 10px 0',
      fontSize: '1.8rem',
      fontWeight: 700,
      color: colors.primary, // צבע מותג
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
      textAlign: 'right', // יישור לימין
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
      borderRadius: "30px", // עיצוב גלולה
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
    errorText: {
      color: colors.danger,
      margin: '0',
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    loadingSpinner: {
        animation: 'spin 1s linear infinite',
    },
  };

  // --- סגנונות דינמיים לכפתורים ---
  const getInputStyle = (name: string) => ({
    ...styles.inputBase,
    ...(focusState[name] ? styles.inputFocus : {})
  });

  const loginBtnStyle = {
    ...styles.baseButton,
    ...styles.primaryButton,
    ...(loading ? styles.disabledButton : (isLoginHover ? styles.primaryButtonHover : {}))
  };

  const cancelBtnStyle = {
    ...styles.baseButton,
    ...styles.secondaryButton,
    ...(isCancelHover ? styles.secondaryButtonHover : {})
  };


  return (
    <>
        <AnimationStyles />
        <div style={styles.overlay} onClick={onClose}>
            {/* מניעת סגירה בלחיצה על המודאל עצמו */}
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 style={styles.title}>התחברות</h2>
                <input
                    type="email"
                    placeholder="אימייל"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={getInputStyle('email')}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                />
                <input
                    type="password"
                    placeholder="סיסמה"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={getInputStyle('password')}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                />
                {error && <p style={styles.errorText}>{error}</p>}
                
                <div style={styles.buttonContainer}>
                    <button 
                        onClick={handleLogin} 
                        style={loginBtnStyle} 
                        disabled={loading}
                        onMouseEnter={() => setIsLoginHover(true)}
                        onMouseLeave={() => setIsLoginHover(false)}
                    >
                        {loading ? (
                            <>
                            מתחבר...
                            <FaSpinner style={styles.loadingSpinner} />
                            </>
                        ) : "התחבר"}
                    </button>
                    <button 
                        onClick={onClose} 
                        style={cancelBtnStyle}
                        onMouseEnter={() => setIsCancelHover(true)}
                        onMouseLeave={() => setIsCancelHover(false)}
                    >
                        ביטול
                    </button>
                </div>
            </div>
        </div>
    </>
  );
};