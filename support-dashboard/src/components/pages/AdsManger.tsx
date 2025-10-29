import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  fetchAllAds,
  fetchNotApprovedAds,
  fetchNotRelevantAds,
  toggleAdApproved,
  toggleAdRelevant,
} from "../../app/slice/adsSlice";
import { fetchUserDetails } from "../../app/slice/userSlice";
import { sendUserMail } from "../../app/slice/mailSlice";
import { FaSpinner, FaEdit } from "react-icons/fa";
import { appColors } from "../../utils/colors";
import EditAdModal from "./EditAdModal";
import { useWindowSize } from "../../utils/hooks";

// Inline animations
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

export default function AdsManager() {
  const dispatch = useDispatch<AppDispatch>();
  const { ads, loading, error } = useSelector((state: RootState) => state.ads);

  // --- שינוי: מצב סינון אחיד ---
  const [filter, setFilter] = useState<'all' | 'notApproved' | 'notRelevant'>('all');

  // --- מצב טעינה לכל כרטיס בנפרד ---
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [editingAd, setEditingAd] = useState<any | null>(null);

  const token = sessionStorage.getItem("token") || "";

  const { width } = useWindowSize();
  const isMobile = width <= 768;

  // Use shared colors and styles
  const colors = appColors;

  useEffect(() => {
    if (filter === 'notApproved') {
      dispatch(fetchNotApprovedAds());
    } else if (filter === 'notRelevant') {
      dispatch(fetchNotRelevantAds());
    } else {
      dispatch(fetchAllAds());
    }
  }, [filter, dispatch]);

  const refreshList = () => {
    if (filter === 'notApproved') dispatch(fetchNotApprovedAds());
    else if (filter === 'notRelevant') dispatch(fetchNotRelevantAds());
    else dispatch(fetchAllAds());
  };

  // טוגל אישור/דחייה
  const handleToggleApproved = async (ad: any) => {
    if (togglingId) return;
    setTogglingId(ad.id);

    try {
      await dispatch(toggleAdApproved({ adId: ad.id, token }));
      refreshList();

      // שליחת מייל למשתמש
      let userEmail = ad.userEmail;
      if (!userEmail && ad.id_user) {
        try {
          const userDetails = await dispatch(fetchUserDetails(ad.id_user)).unwrap();
          userEmail = userDetails.email;
        } catch (err) {
          console.error("שגיאה בקבלת פרטי המשתמש:", err);
        }
      }

      if (userEmail) {
        const isNowApproved = !ad.approved;
        const subject = isNowApproved ? "המודעה שלך אושרה" : "המודעה שלך נדחתה";
        const text = isNowApproved
          ? "המודעה שלך אושרה על ידי מנהל המערכת."
          : "המודעה שלך נדחתה על ידי מנהל המערכת.";

        dispatch(sendUserMail({ to: userEmail, subject, text }));
      } else {
        console.log("לא נמצא אימייל למודעה:", ad);
      }
    } catch (err) {
      console.error("שגיאה בטיפול באישור מודעה:", err);
    } finally {
      setTogglingId(null);
    }
  };

  // טוגל רלוונטי/לא רלוונטי
  const handleToggleRelevant = async (ad: any) => {
    if (togglingId) return;
    setTogglingId(ad.id);

    try {
      await dispatch(toggleAdRelevant({ adId: ad.id, token }));
      refreshList();
    } catch (err) {
      console.error("שגיאה בטיפול ברלוונטיות:", err);
    } finally {
      setTogglingId(null);
    }
  };

  // --- סגנונות ---
  const styles: Record<string, React.CSSProperties> = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      minHeight: "100vh",
      background: colors.lightGradient,
      padding: isMobile ? "90px 15px 30px 15px" : "100px 30px 30px 30px",
      boxSizing: "border-box",
      direction: "rtl",
    },
    mainContent: {
      width: "100%",
      maxWidth: "1400px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "30px",
      animation: animationStyles.fadeIn,
    },
    header: {
      textAlign: "center",
    },
    title: {
      fontSize: isMobile ? "2rem" : "2.5rem",
      color: colors.primary,
      fontWeight: 700,
      margin: 0,
    },
    subtitle: {
      fontSize: isMobile ? "1rem" : "1.1rem",
      color: colors.textMedium,
      marginTop: "10px",
      lineHeight: 1.6,
    },
    filterContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "15px",
      justifyContent: "center",
      width: "100%",
    },
    filterButtonBase: {
      padding: "10px 25px",
      fontSize: "16px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "bold",
      border: `2px solid ${colors.primary}`,
      transition: "all 0.3s ease",
      backgroundColor: "transparent",
      color: colors.primary,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      color: "white",
    },
    loadingText: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.2rem',
      color: colors.primary,
      textAlign: 'center',
      padding: '40px',
      fontWeight: 600,
    },
    errorText: {
      fontSize: '1.2rem',
      color: colors.danger,
      textAlign: 'center',
      padding: '40px',
      fontWeight: 600,
    },
    emptyText: {
      fontSize: '1.2rem',
      color: colors.textMedium,
      textAlign: 'center',
      padding: '40px',
    },
    adsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
      width: "100%",
    },
    adCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: "16px",
      padding: isMobile ? "20px" : "24px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.07)",
      border: "1px solid #e9ecef",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      opacity: 0,
      animation: "fadeIn 0.4s ease-out forwards",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      flexGrow: 1,
    },
    cardField: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    fieldLabel: {
      fontWeight: 600,
      color: colors.textDark,
      marginLeft: '5px',
    },
    fieldValue: {
      color: colors.textMedium,
    },
    companyValue: {
      color: colors.primary,
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    fieldDescription: {
      color: colors.textMedium,
      backgroundColor: colors.activeBackground,
      padding: '10px',
      borderRadius: '8px',
      border: `1px solid ${colors.borderColor}`,
      margin: '5px 0 0 0',
      lineHeight: 1.6,
    },
    toggleSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginTop: '10px',
      paddingTop: '15px',
      borderTop: `1px solid ${colors.borderColor}`,
    },
    toggleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toggleLabel: {
      fontSize: '1rem',
      fontWeight: 600,
      color: colors.textDark,
    },
    toggleContainer: {
      width: '44px',
      height: '22px',
      borderRadius: '11px',
      padding: '2px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      boxSizing: 'border-box',
    },
    toggleThumb: {
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease',
    },
    toggleContainerDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    }
  };

  // --- פונקציות להחזרת סגנון דינמי ---
  const getFilterButtonStyle = (filterName: typeof filter) => {
    if (filter === filterName) {
      return { ...styles.filterButtonBase, ...styles.filterButtonActive };
    }
    return styles.filterButtonBase;
  };

  const getToggleStyle = (
    isActive: boolean,
    isDisabled: boolean,
  ) => {
    const containerStyle: React.CSSProperties = {
      ...styles.toggleContainer,
      backgroundColor: isActive ? colors.success : colors.danger,
      ...(isDisabled ? styles.toggleContainerDisabled : {}),
    };

    const thumbStyle: React.CSSProperties = {
      ...styles.toggleThumb,
      transform: isActive ? "translateX(22px)" : "translateX(0px)",
    };

    return { container: containerStyle, thumb: thumbStyle };
  };



  return (
    <div style={styles.pageContainer}>
      <AnimationStyles />
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.title}>ניהול מודעות</h1>
          <p style={styles.subtitle}>כאן ניתן , לאשר ולנהל את כל המודעות במערכת</p>
        </div>

        <div style={styles.filterContainer}>
          <button
            style={getFilterButtonStyle('all')}
            onClick={() => setFilter('all')}
          >
            הצג הכל
          </button>
          <button
            style={getFilterButtonStyle('notApproved')}
            onClick={() => setFilter('notApproved')}
          >
            {`ממתינות לאישור (${filter === 'notApproved' ? ads.length : '...'})`}
          </button>
          <button
            style={getFilterButtonStyle('notRelevant')}
            onClick={() => setFilter('notRelevant')}
          >
            {`לא רלוונטיות (${filter === 'notRelevant' ? ads.length : '...'})`}
          </button>
        </div>

        {loading && (
          <p style={styles.loadingText}>
            <FaSpinner style={{ animation: animationStyles.spin }} />
            טוען...
          </p>
        )}
        {error && <p style={styles.errorText}>{error}</p>}
        {!loading && ads.length === 0 && <p style={styles.emptyText}>אין מודעות להצגה</p>}

        <div style={styles.adsGrid}>
          {ads.map((ad, index) => {
            const isToggling = togglingId === ad.id;
            const approvedToggle = getToggleStyle(Boolean(ad.approved), isToggling);
            const relevantToggle = getToggleStyle(Boolean(ad.is_relevant), isToggling);


            return (
              <div key={ad.id} style={{ ...styles.adCard, animationDelay: `${index * 50}ms` }}>
                <div style={styles.cardContent}>
                  <div style={styles.cardField}>
                    <span style={styles.fieldLabel}>חברה: </span>
                    <span style={styles.companyValue}>{ad.company}</span>
                  </div>
                  <div style={styles.cardField}>
                    <span style={styles.fieldLabel}>סוג: </span>
                    <span style={styles.fieldValue}>{ad.type}</span>
                  </div>
                  <div style={styles.cardField}>
                    <span style={styles.fieldLabel}>מטרה: </span>
                    <span style={styles.fieldValue}>{ad.goal}</span>
                  </div>
                  <div style={styles.cardField}>
                    <span style={styles.fieldLabel}>תיאור: </span>
                    <p style={styles.fieldDescription}>{ad.description}</p>
                  </div>
                </div>

                <div style={styles.toggleSection}>
                  {/* טוגל אישור */}
                  <div style={styles.toggleWrapper}>
                    <span style={styles.toggleLabel}>
                      {ad.approved ? "מודעה מאושרת" : "ממתינה לאישור"}
                    </span>
                    <div
                      style={approvedToggle.container}
                      onClick={() => !isToggling && handleToggleApproved(ad)}
                    >
                      <div style={approvedToggle.thumb}></div>
                    </div>
                  </div>
                  {/* טוגל רלוונטיות */}
                  <div style={styles.toggleWrapper}>
                    <span style={styles.toggleLabel}>
                      {ad.is_relevant ? "רלוונטי" : "לא רלוונטי"}
                    </span>
                    <div
                      style={relevantToggle.container}
                      onClick={() => !isToggling && handleToggleRelevant(ad)}
                    >
                      <div style={relevantToggle.thumb}></div>
                    </div>
                  </div>
                  
                  {/* כפתור עריכה */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    marginTop: '15px',
                    padding: '10px 0'
                  }}>
                    <button
                      onClick={() => setEditingAd(ad)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDarker}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                      style={{
                        padding: "12px 30px",
                        fontSize: "16px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        border: "none",
                        backgroundColor: colors.primary,
                        color: "white",
                        transition: "all 0.3s ease",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: "0 4px 12px rgba(109, 68, 184, 0.3)",
                      }}
                    >
                      <FaEdit style={{ fontSize: '18px' }} /> ערוך תוכן
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {editingAd && (
        <EditAdModal
          ad={editingAd}
          onClose={() => setEditingAd(null)}
          onSave={() => {
            refreshList();
            setEditingAd(null);
          }}
        />
      )}
    </div>
  );
}