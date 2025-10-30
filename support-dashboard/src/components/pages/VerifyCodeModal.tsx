import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { appColors } from "../../utils/colors";

type Props = {
  email: string;
  onVerified: () => void;
};

const VerifyCodeModal: React.FC<Props> = ({ email, onVerified }) => {
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
      onVerified();
    } catch (err: any) {
      setError(err.response?.data?.message || "קוד שגוי או שפג תוקפו");
    } finally {
      setLoading(false);
    }
  };

  const colors = appColors;
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
      {error && <p style={{ color: colors.danger }}>{error}</p>}
      <button
        onClick={handleVerify}
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
        {loading ? <FaSpinner /> : "אמת קוד"}
      </button>
    </div>
  );
};

export default VerifyCodeModal;
