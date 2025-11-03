import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";  
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { subscribeUser } from "../../app/slice/userSlice";
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { sendMail } from "../../utils/mailService";

const AnimationStyles = () => (
  <style>
    {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}
  </style>
);

const PaymentSuccess: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    dispatch(subscribeUser());
    const email = sessionStorage.getItem("userEmail");
    if (email) {
      sendMail({
        to: email,
        subject: "הרשמתך לסוכנות הושלמה בהצלחה",
        text: `שלום,
        ההרשמה שלך לסוכנות הושלמה בהצלחה.
        תודה שהצטרפת!`,
      })
        .then(() => {
          sessionStorage.removeItem("userEmail");    
        })
        .catch(err => console.error("Error sending confirmation email:", err));
    }
  }, [dispatch]);

  const colors = {
    primary: "#6d44b8",
    primaryHover: "#5a379a",
    success: "#40c057",
    danger: "#fa5252",
    lightGradient: "linear-gradient(135deg, #f5f7fa, #e6e8ff)",
    textDark: "#212529",
    textMedium: "#555",
  };

  const styles: Record<string, React.CSSProperties> = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "100vh",
      background: colors.lightGradient,
      padding: "20px",
      boxSizing: "border-box",
      direction: "rtl",
    },
    card: {
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#ffffff",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      animation: "fadeIn 0.5s ease-out forwards",
    },
    iconWrapper: {
      marginBottom: '20px',
    },
    iconSuccess: {
      fontSize: '4rem',
      color: colors.success,
    },
    iconError: {
      fontSize: '4rem',
      color: colors.danger,
    },
    iconLoading: {
      fontSize: '3rem',
      color: colors.primary,
      animation: 'spin 1.5s linear infinite',
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: 700,
      color: colors.primary,
      margin: "0 0 15px 0",
    },
    statusText: {
      fontSize: "1.1rem",
      color: colors.textMedium,
      lineHeight: 1.6,
      minHeight: '50px',
      display: 'flex',
      alignItems: 'center',
    },
    errorText: {
      fontSize: "1.1rem",
      color: colors.danger,
      fontWeight: 600,
    },
    buttonContainer: {
      marginTop: '30px',  
    },
    buttonBase: {
      padding: "12px 28px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "bold",
      border: `2px solid ${colors.primary}`,
      transition: "all 0.3s ease",
      textDecoration: "none",
      backgroundColor: colors.primary,
      color: "white",
    },
    buttonHover: {
      backgroundColor: colors.primaryHover,
      borderColor: colors.primaryHover,
    },
  };

  const buttonStyle = {
    ...styles.buttonBase,
    ...(isHover ? styles.buttonHover : {})
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div style={styles.iconWrapper}>
            <FaSpinner style={styles.iconLoading} />
          </div>
          <h1 style={styles.title}>מעבדים...</h1>
          <p style={styles.statusText}>מעדכן את המנוי שלך...</p>
        </>
      );
    }
    if (error) {
      return (
        <>
          <div style={styles.iconWrapper}>
            <FaTimesCircle style={styles.iconError} />
          </div>
          <h1 style={{ ...styles.title, color: colors.danger }}>אירעה שגיאה</h1>
          <p style={(styles.errorText, { marginBottom: '30px' })}>{error}</p>
          <button
            onClick={() => navigate("/home")}
            style={buttonStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            בחזרה לעמוד הבית
          </button>
        </>
      );
    }
    return (
      <>
        <div style={styles.iconWrapper}>
          <FaCheckCircle style={styles.iconSuccess} />
        </div>
        <h1 style={styles.title}>תודה לך!</h1>
        <p style={styles.statusText}>נרשמת בהצלחה להיות מנויה שלנו 🎉</p>
        <div style={styles.buttonContainer}>
          <button
            onClick={() => navigate("/home")}
            style={buttonStyle}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            מעבר לעמוד הבית
          </button>
        </div>
      </>
    );
  };

  return (
    <div style={styles.pageContainer}>
      <AnimationStyles />
      <div style={styles.card}>
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentSuccess;