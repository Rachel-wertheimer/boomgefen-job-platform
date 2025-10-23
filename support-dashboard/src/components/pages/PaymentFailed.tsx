// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PaymentFailed: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
//       <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed ❌</h1>
//       <p className="text-gray-700 mb-6">
//         Something went wrong while processing your payment. Please try again.
//       </p>
//       <button
//         onClick={() => navigate("/home")}
//         className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//       >
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default PaymentFailed;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa"; // אייקון לשגיאה

// --- הגדרת אנימציית FadeIn ---
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

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  // --- פלטת צבעים אחידה ---
  const colors = {
    primary: "#6d44b8",
    primaryHover: "#5a379a",
    danger: "#fa5252",
    lightGradient: "linear-gradient(135deg, #f5f7fa, #e6e8ff)",
    textDark: "#212529",
    textMedium: "#555",
  };

  // --- סגנונות ---
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
    iconError: {
      fontSize: '4rem',
      color: colors.danger,
      marginBottom: '20px',
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: 700,
      color: colors.danger, // צבע אדום
      margin: "0 0 15px 0",
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
            <FaTimesCircle style={styles.iconError} />
            <h1 style={styles.title}>התשלום נכשל ❌</h1>
            <p style={styles.statusText}>
                אירעה שגיאה בעיבוד התשלום שלך. אנא נסי שוב.
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

export default PaymentFailed;