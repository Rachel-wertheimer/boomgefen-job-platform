import React, { useState } from "react";
import axios from "axios";
import { appColors } from "../../utils/colors";

type Props = {
  email: string;
  code: string;
  onSuccess: () => void;
};

const ResetPasswordModal: React.FC<Props> = ({ email, code, onSuccess }) => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const colors = appColors;
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
      {error && <p style={{ color: colors.danger }}>{error}</p>}
      <button
        onClick={handleReset}
        disabled={loading}
        style={{
          background: colors.primary,
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

export default ResetPasswordModal;
