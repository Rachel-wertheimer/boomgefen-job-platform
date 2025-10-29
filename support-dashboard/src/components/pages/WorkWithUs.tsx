import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { updateRegistrationFormField, updateProfession } from '../../app/slice/userSlice';
import { createUser, createUserProfile } from '../../app/api/user';
import { FaSpinner } from 'react-icons/fa';
import { useWindowSize } from "../../utils/hooks";
import { appColors } from "../../utils/colors";

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

const professionsList = [
    'שחקנית', 'מפיקה', 'צלמת', 'עורכת וידאו', 'רקדנית', 'ארטיסטית',
    'בימאית', 'אולפניסטית', 'גרפיקאית', 'נגנית', 'סאונדמנית'
];


export default function WorkWithUs() {
    const dispatch = useDispatch<AppDispatch>();
    const formData = useSelector((state: RootState) => state.user.registrationForm);
    const [loading, setLoading] = useState(false);

    const [focusState, setFocusState] = useState<Record<string, boolean>>({});

    const { width } = useWindowSize();
    const isMobile = width <= 768;

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScUvzvNjNO2U75PvFc0gIZ-B8qp9N0nD6-v-XbZYHkzQKVyIQ/formResponse';

    const colors = appColors;

    const handleFocus = (field: string) => setFocusState(prev => ({ ...prev, [field]: true }));
    const handleBlur = (field: string) => setFocusState(prev => ({ ...prev, [field]: false }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';
        const checkedValue = (e.target as HTMLInputElement).checked;

        dispatch(updateRegistrationFormField({
            field: name as keyof typeof formData,
            value: isCheckbox ? checkedValue : value
        }));
    };

    const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        dispatch(updateProfession({ name, checked }));
    };

    const handleDownloadFiles = () => {
        const filesToDownload = [
            { name: 'טופס הצהרה לפרסום דרך הסוכנות.pdf', path: '/files/טופס הצהרה לפרסום דרך הסוכנות.pdf' },
            { name: 'טופס הצהרה חוקי להשתתפות בסוכנות.pdf', path: '/files/טופס הצהרה חוקי להשתתפות בסוכנות.pdf' },
            { name: 'חוזה התקשרות לקבוצת הצעות עבודה לאומניות.pdf', path: '/files/חוזה התקשרות לקבוצת הצעות עבודה לאומניות.pdf' }
        ];

        filesToDownload.forEach((file, index) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = file.path;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, index * 400);
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = new FormData();
            payload.append('entry.1801059523', formData.fullName);
            payload.append('entry.344081749', formData.email);
            payload.append('entry.1529304238', formData.phone);
            payload.append('entry.1371511795', formData.age.toString());
            payload.append('entry.1976640316', formData.portfolioLink);
            payload.append('entry.169457285', formData.educationExperience);
            payload.append('entry.683306129', formData.additionalSkills);
            payload.append('entry.790512187', formData.expectations);

            Object.keys(formData.professions).forEach(prof => {
                if (formData.professions[prof]) {
                    if (prof === 'אחר') {
                        payload.append('entry.776091200.other_option_response', formData.otherProfession);
                    } else {
                        payload.append('entry.776091200', prof);
                    }
                }
            });

            if (formData.isDetailsCorrect) payload.append('entry.334908836', 'אני מאשרת שהפרטים שמילאתי בשאלון זה נכונים ומדויקים.');
            if (formData.isCommitteeApproved) payload.append('entry.334908836', 'אני מאשרת שאני מסכימה שהוועדה של BOOM גפן הפקה תבחן את מועמדותי.');
            if (formData.isReceivingOffers) payload.append('entry.334908836', 'אני מאשרת לקבל הצעות ומייל מBOOM גפן הפקה');
            payload.append('fvv', '1');

            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: payload,
            });

            const userPayload = {
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                type: 'ARTIST',
                is_agree: formData.isDetailsCorrect && formData.isCommitteeApproved,
                is_subscribed: formData.isReceivingOffers,
                subscription_start: null,
                subscription_end: null,
            };

            const userRes = await createUser(userPayload);
            sessionStorage.setItem('userId', userRes.userId);

            const selectedProfessions = Object.keys(formData.professions)
                .filter(p => formData.professions[p]);
            if (formData.otherProfession) selectedProfessions.push(formData.otherProfession);

            const profilePayload = {
                age: parseInt(formData.age, 10),
                website: formData.portfolioLink,
                password: formData.passWord,
                occupation: selectedProfessions.join(", "),
                educationExperience: formData.educationExperience,
                additionalSkills: formData.additionalSkills,
                expectations: formData.expectations,
            };

            await createUserProfile(profilePayload, userRes.userId);
            window.location.href = "https://pay.sumit.co.il/g9687k/gg7p5h/hykun7/payment/";

        } catch (err) {
            console.error('Error submitting form:', err);
            alert('אירעה שגיאה בשליחת הטופס. נסי שוב.');
            setLoading(false);
        }
    };

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
        title: {
            fontSize: isMobile ? "2rem" : "2.5rem",
            marginBottom: "24px",
            // --- שינוי כאן: צבע הכותרת ---
            color: colors.primary,
            fontWeight: 700,
            textAlign: 'center',
        },
        formCard: {
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: isMobile ? "24px" : "40px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            animation: animationStyles.fadeIn,
        },
        formRow: {
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "20px",
        },
        formGroup: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        },
        label: {
            fontSize: "1rem",
            fontWeight: 600,
            color: colors.textDark,
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
            fontFamily: "inherit",
        },
        inputFocus: {
            borderColor: colors.primary,
            boxShadow: `0 0 0 3px ${colors.primary}30`,
        },
        checkboxGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
            marginTop: "10px",
        },
        checkboxLabel: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "1rem",
            color: colors.textMedium,
            cursor: "pointer",
        },
        checkboxInput: {
            width: "18px",
            height: "18px",
            accentColor: colors.primary,
            cursor: "pointer",
        },
        checkboxLabelVertical: {
            padding: "8px 0",
        },
        filesSection: {
            padding: "20px",
            backgroundColor: colors.activeBackground,
            borderRadius: "12px",
            border: `1px solid ${colors.borderColor}`,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        filesText: {
            fontSize: "1rem",
            color: colors.textMedium,
            lineHeight: 1.6,
            margin: 0,
        },
        clickableLink: {
            color: colors.primary,
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: `2px dashed ${colors.primary}`,
            cursor: "pointer",
        },
        formActions: {
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
        },
        submitBtn: {
            padding: "14px 30px",
            fontSize: "17px",
            borderRadius: "30px",
            cursor: "pointer",
            textAlign: "center",
            fontWeight: "bold",
            border: `2px solid ${colors.primary}`,
            transition: "all 0.3s ease",
            backgroundColor: colors.primary,
            color: "white",
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        submitBtnHover: {
            backgroundColor: colors.primaryHover,
            borderColor: colors.primaryHover,
        },
        submitBtnDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
        },
        loadingSpinner: {
            animation: animationStyles.spin,
        },
    };

    const [isSubmitHover, setIsSubmitHover] = useState(false);
    const isDisabled = !formData.hasSentFiles || loading;

    const submitBtnStyle = {
        ...styles.submitBtn,
        ...(isDisabled ? styles.submitBtnDisabled : (isSubmitHover ? styles.submitBtnHover : {}))
    };

    const getInputStyle = (name: string) => ({
        ...styles.inputBase,
        ...(focusState[name] ? styles.inputFocus : {})
    });

    return (
        <div style={styles.pageContainer}>
            <AnimationStyles />
            <form style={styles.formCard} onSubmit={handleSubmit}>
                <h1 style={styles.title}>הרשמה לסוכנות</h1>

                {/* שדות טקסט */}
                <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                        <label htmlFor="fullName" style={styles.label}>שם מלא *</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required
                            style={getInputStyle('fullName')} onFocus={() => handleFocus('fullName')} onBlur={() => handleBlur('fullName')} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>אימייל *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                            style={getInputStyle('email')} onFocus={() => handleFocus('email')} onBlur={() => handleBlur('email')} />
                    </div>
                </div>

                <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                        <label htmlFor="phone" style={styles.label}>טלפון *</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                            style={getInputStyle('phone')} onFocus={() => handleFocus('phone')} onBlur={() => handleBlur('phone')} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="age" style={styles.label}>גיל *</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required
                            style={getInputStyle('age')} onFocus={() => handleFocus('age')} onBlur={() => handleBlur('age')} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="passWord" style={styles.label}>סיסמה *</label>
                    <input type="password" id="passWord" name="passWord" value={formData.passWord} onChange={handleChange} required
                        style={getInputStyle('passWord')} onFocus={() => handleFocus('passWord')} onBlur={() => handleBlur('passWord')} />
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="portfolioLink" style={styles.label}>אתר אישי / תיק עבודות</label>
                    <input type="url" id="portfolioLink" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange}
                        style={getInputStyle('portfolioLink')} onFocus={() => handleFocus('portfolioLink')} onBlur={() => handleBlur('portfolioLink')} />
                </div>

                {/* מקצועות */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>במה את עוסקת? *</label>
                    <div style={styles.checkboxGrid}>
                        {professionsList.map(prof => (
                            <label key={prof} style={styles.checkboxLabel}>
                                <input type="checkbox" name={prof} checked={!!formData.professions[prof]} onChange={handleProfessionChange} style={styles.checkboxInput} />
                                {prof}
                            </label>
                        ))}
                        <label style={styles.checkboxLabel}>
                            <input type="checkbox" name="אחר" checked={!!formData.professions['אחר']} onChange={handleProfessionChange} style={styles.checkboxInput} />
                            אחר
                        </label>
                    </div>
                    {formData.professions['אחר'] && (
                        <div style={{ ...styles.formGroup, marginTop: '10px' }}>
                            <label htmlFor="otherProfession" style={styles.label}>אנא פרטי:</label>
                            <input type="text" id="otherProfession" name="otherProfession" value={formData.otherProfession} onChange={handleChange}
                                style={getInputStyle('otherProfession')} onFocus={() => handleFocus('otherProfession')} onBlur={() => handleBlur('otherProfession')} />
                        </div>
                    )}
                </div>

                {/* שדות תיאור ארוכים */}
                <div style={styles.formGroup}>
                    <label htmlFor="educationExperience" style={styles.label}>השכלה וניסיון</label>
                    <textarea id="educationExperience" name="educationExperience" value={formData.educationExperience} onChange={handleChange}
                        style={{ ...getInputStyle('educationExperience'), minHeight: '120px', resize: 'vertical' }} onFocus={() => handleFocus('educationExperience')} onBlur={() => handleBlur('educationExperience')}
                        placeholder="פרטי על לימודים, סדנאות, הפקות קודמות..." />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="additionalSkills" style={styles.label}>כישורים נוספים</label>
                    <textarea id="additionalSkills" name="additionalSkills" value={formData.additionalSkills} onChange={handleChange}
                        style={{ ...getInputStyle('additionalSkills'), minHeight: '100px', resize: 'vertical' }} onFocus={() => handleFocus('additionalSkills')} onBlur={() => handleBlur('additionalSkills')}
                        placeholder="שירה, ריקוד, נגינה, שפות..." />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="expectations" style={styles.label}>ציפיות והעדפות</label>
                    <textarea id="expectations" name="expectations" value={formData.expectations} onChange={handleChange}
                        style={{ ...getInputStyle('expectations'), minHeight: '100px', resize: 'vertical' }} onFocus={() => handleFocus('expectations')} onBlur={() => handleBlur('expectations')}
                        placeholder="סוגי פרויקטים, זמינות, מגבלות..." />
                </div>

                {/* הורדת קבצים */}
                <div style={styles.filesSection}>
                    <p style={styles.filesText}>
                        הורידי את <span style={styles.clickableLink} onClick={handleDownloadFiles}>הקבצים כאן</span>,
                        מלאי אותם ושלחי למייל: <a style={styles.clickableLink} href="mailto:boom.gefen.hevy@gmail.com">boom.gefen.hevy@gmail.com</a>
                    </p>
                    <label style={{ ...styles.checkboxLabel, marginTop: '10px', color: colors.textDark, fontWeight: 600 }}>
                        <input type="checkbox" name="hasSentFiles" checked={formData.hasSentFiles} onChange={handleChange} style={styles.checkboxInput} />
                        אישור: מילאתי את הקבצים ושלחתי למייל
                    </label>
                </div>

                {/* אישורים */}
                <div style={styles.formGroup}>
                    <label style={styles.checkboxLabelVertical}>
                        <input type="checkbox" name="isDetailsCorrect" checked={formData.isDetailsCorrect} onChange={handleChange} required style={styles.checkboxInput} />
                        אני מאשרת שהפרטים נכונים
                    </label>
                    <label style={styles.checkboxLabelVertical}>
                        <input type="checkbox" name="isCommitteeApproved" checked={formData.isCommitteeApproved} onChange={handleChange} required style={styles.checkboxInput} />
                        אני מסכימה שהוועדה תבחן את מועמדותי
                    </label>
                    <label style={styles.checkboxLabelVertical}>
                        <input type="checkbox" name="isReceivingOffers" checked={formData.isReceivingOffers} onChange={handleChange} required style={styles.checkboxInput} />
                        אני מאשרת לקבל הצעות ומייל
                    </label>
                </div>

                {/* כפתור המשך */}
                <div style={styles.formActions}>
                    <button
                        type="submit"
                        style={submitBtnStyle}
                        disabled={isDisabled}
                        onMouseEnter={() => setIsSubmitHover(true)}
                        onMouseLeave={() => setIsSubmitHover(false)}
                    >
                        {loading ? (
                            <>
                                שולח...
                                <FaSpinner style={styles.loadingSpinner} />
                            </>
                        ) : 'המשך לתשלום'}
                    </button>
                </div>
            </form>
        </div>
    );
}