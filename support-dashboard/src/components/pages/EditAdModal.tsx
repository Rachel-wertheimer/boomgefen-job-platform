import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { appColors } from "../../utils/colors";
import { updateAdContent } from "../../app/api/ads";

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

type Props = {
  ad: any;
  onClose: () => void;
  onSave: () => void;
};

const EditAdModal: React.FC<Props> = ({ ad, onClose, onSave }) => {
  const [company, setCompany] = useState(ad.company);
  const [type, setType] = useState(ad.type);
  const [goal, setGoal] = useState(ad.goal);
  const [description, setDescription] = useState(ad.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!company.trim() || !type.trim() || !goal.trim() || !description.trim()) {
      setError("אנא מלא את כל השדות");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = sessionStorage.getItem("token") || "";
      await updateAdContent(ad.id, token, { company, type, goal, description });
      
      onSave();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "שגיאה בעדכון המודעה");
    } finally {
      setLoading(false);
    }
  };

  const colors = appColors;

  const styles = {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
      direction: "rtl" as const,
      animation: animationStyles.overlayFadeIn,
    },
    modal: {
      background: "#fff",
      padding: "30px",
      borderRadius: "20px",
      width: "90%",
      maxWidth: "600px",
      animation: animationStyles.modalFadeIn,
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: 700,
      color: colors.primary,
      margin: "0 0 20px 0",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: `1px solid ${colors.borderColor}`,
      fontSize: "1rem",
      textAlign: "right" as const,
    },
    textarea: {
      width: "100%",
      minHeight: "120px",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: `1px solid ${colors.borderColor}`,
      fontSize: "1rem",
      textAlign: "right" as const,
      resize: "vertical" as const,
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
    },
    button: {
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "bold",
      border: "none",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    saveButton: {
      backgroundColor: colors.primary,
      color: "white",
    },
    cancelButton: {
      backgroundColor: "white",
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
    },
    errorText: {
      color: colors.danger,
      marginBottom: "10px",
    },
  };

  return (
    <>
      <AnimationStyles />
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2 style={styles.title}>עריכת מודעה</h2>
          
          <input
            type="text"
            placeholder="חברה"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={styles.input}
          />
          
          <input
            type="text"
            placeholder="סוג"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.input}
          />
          
          <input
            type="text"
            placeholder="מטרה"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={styles.input}
          />
          
          <textarea
            placeholder="תיאור"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
          
          {error && <p style={styles.errorText}>{error}</p>}
          
          <div style={styles.buttonContainer}>
            <button
              onClick={onClose}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              ביטול
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                ...styles.button,
                ...styles.saveButton,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  שומר... <FaSpinner style={{ animation: animationStyles.spin }} />
                </>
              ) : (
                "שמור שינויים"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAdModal;
