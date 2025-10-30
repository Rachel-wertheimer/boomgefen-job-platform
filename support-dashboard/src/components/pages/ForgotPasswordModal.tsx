import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { appColors } from "../../utils/colors";

// קומפוננטות נוספות לשלבים הבאים
const VerifyCodeModal = ({ email, onVerified }: { email: string; onVerified: (code: string) => void }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      {error && <p style={{ color: "red" }}>{error}</p>}
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

const ResetPasswordModal = ({
  email,
  code,
  onSuccess,
}: {
  email: string;
  code: string;
  onSuccess: () => void;
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      {error && <p style={{ color: "red" }}>{error}</p>}
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

const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async () => {
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

  // שלב אימות
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

  // שלב שינוי סיסמה
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

  // שלב שליחת מייל
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
        onClick={handleForgotPassword}
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
