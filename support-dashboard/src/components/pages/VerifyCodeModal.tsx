// import React, { useState } from "react";
// import axios from "axios";
// import { FaSpinner } from "react-icons/fa";
// import { appColors } from "../../utils/colors";

// type Props = {
//   email: string;
//   onVerified: () => void;
// };

// const VerifyCodeModal: React.FC<Props> = ({ email, onVerified }) => {
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleVerify = async () => {
//     if (!code) return setError("נא להזין קוד אימות");
//     setLoading(true);
//     setError("");
//     try {
//       await axios.post(
//         "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles/verifyCode",
//         { email, code }
//       );
//       onVerified();
//     } catch (err: any) {
//       setError(err.response?.data?.message || "קוד שגוי או שפג תוקפו");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const colors = appColors;
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
//       {error && <p style={{ color: colors.danger }}>{error}</p>}
//       <button
//         onClick={handleVerify}
//         disabled={loading}
//         style={{
//           background: colors.primary,
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

// export default VerifyCodeModal;
import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { appColors } from "../../utils/colors";

// --- קומפוננטת אימות קוד ---
type VerifyCodeModalProps = {
  email: string;
  onVerified: (code: string) => void;
};

const VerifyCodeModal: React.FC<VerifyCodeModalProps> = ({ email, onVerified }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>אימות קוד</h2>
      <p>הכנס את הקוד שנשלח למייל {email}</p>
      <input
        type="text"
        placeholder="קוד אימות"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      />
      {error && <p style={{ color: appColors.danger }}>{error}</p>}
      <button
        onClick={handleVerify}
        disabled={loading}
        style={{
          background: appColors.primary,
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? <FaSpinner /> : "אמת קוד"}
      </button>
    </div>
  );
};

// --- קומפוננטת איפוס סיסמה ---
type ResetPasswordModalProps = {
  email: string;
  code: string;
  onSuccess: () => void;
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ email, code, onSuccess }) => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (newPassword.length < 6) return setError("הסיסמה חייבת להכיל לפחות 6 תווים");
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

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>בחר סיסמה חדשה</h2>
      <input
        type="password"
        placeholder="סיסמה חדשה"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      />
      {error && <p style={{ color: appColors.danger }}>{error}</p>}
      <button
        onClick={handleReset}
        disabled={loading}
        style={{
          background: appColors.primary,
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "מעדכן..." : "עדכן סיסמה"}
      </button>
    </div>
  );
};

// --- קומפוננטת שכחתי סיסמה ---
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

  const handleSendEmail = async () => {
    if (!email) return setError("נא להזין כתובת מייל");
    setLoading(true);
    setError("");
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

  if (step === "verify")
    return (
      <VerifyCodeModal
        email={email}
        onVerified={(c) => {
          setCode(c);
          setStep("reset");
        }}
      />
    );

  if (step === "reset")
    return (
      <ResetPasswordModal
        email={email}
        code={code}
        onSuccess={() => {
          alert("הסיסמה הוחלפה בהצלחה!");
          onClose();
        }}
      />
    );

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>שכחתי סיסמה</h2>
      <p>הכנס את כתובת המייל שלך ונשלח קוד אימות</p>
      <input
        type="email"
        placeholder="כתובת מייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button
        onClick={handleSendEmail}
        disabled={loading}
        style={{
          background: appColors.primary,
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? <FaSpinner /> : "שלח קוד אימות"}
      </button>
    </div>
  );
};

export default ForgotPasswordModal;
