import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa"; 

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const AnimationStyles = () => (
    <style>
        {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}
    </style>
);

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 600;

  const colors = {
    primary: "#6d44b8",
    primaryHover: "#5a379a",
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
      padding: isMobile ? "30px" : "40px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      animation: "fadeIn 0.5s ease-out forwards",
    },
    icon: {
      fontSize: '4rem',
      color: colors.primary, 
      marginBottom: '20px',
    },
    title: {
      fontSize: "4rem",
      fontWeight: 700,
      color: colors.textDark,
      margin: "0",
      lineHeight: 1.1,
    },
    subtitle: {
        fontSize: "1.8rem",
        fontWeight: 600,
        color: colors.primary, 
        margin: "10px 0 15px 0",
    },
    statusText: {
      fontSize: "1.1rem",
      color: colors.textMedium,
      lineHeight: 1.6,
      marginBottom: '30px',
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

  return (
    <div style={styles.pageContainer}>
        <AnimationStyles />
        <div style={styles.card}>
            <FaExclamationTriangle style={styles.icon} />
            <h1 style={styles.title}>404</h1>
            <h2 style={styles.subtitle}>הדף לא נמצא</h2>
            <p style={styles.statusText}>
                אופס... נראה שהדף שחיפשת לא קיים או שהקישור שבור.
            </p>
            <button
                onClick={() => navigate("/home")} 
                style={buttonStyle}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                בחזרה לעמוד הבית
            </button>
        </div>
    </div>
  );
};

export default NotFoundPage;