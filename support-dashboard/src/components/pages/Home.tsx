// import { Ads } from "./Ads";
// import AdsJob from "./AdsJob";

// export default function Home() {
//   return (
//     <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
//       {/* Ads תופס 2/3 מהרוחב */}
//       <div style={{ flex: 2 }}>
//         <Ads />
//       </div>

//       {/* AdsJob מוצמד לשמאל */}
//       <div
//         style={{
//           position: "fixed",
//           top: "100px",
//           left: "100px",
//           width: "25%", // או גודל קבוע
//         }}
//       >
//         <AdsJob />
//       </div>
//     </div>
//   );
// }
import { Ads } from "./Ads";
import AdsJob from "./AdsJob";
import React from "react"; // ייבוא של React

// אובייקט סגנונות חדש ומודרני
const styles: Record<string, React.CSSProperties> = {
  // קונטיינר ראשי עם פריסת גריד
  homeContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr", // חלוקה של 2/3 ו-1/3
    gap: "30px",
    maxWidth: "1400px",
    margin: "0 auto", // מרכוז
    padding: "90px 20px 20px 20px", // ריפוד עליון (מתחת ל-Navbar) + צדדים
  },
  // עמודת המודעות
  adsColumn: {
    gridColumn: "1 / 2", // תופס את העמודה הראשונה
    minWidth: 0, // מונע גלישה של תוכן
  },
  // עמודת הטופס
  formColumn: {
    gridColumn: "2 / 3", // תופס את העמודה השנייה
    position: "sticky", // הופך לדביק בגלילה
    top: "90px", // נצמד 90px מלמעלה (גובה ה-Navbar + ריפוד)
    alignSelf: "start", // מוודא שהוא נצמד לתחילת העמודה
    maxHeight: "calc(100vh - 100px)", // גובה מקסימלי
    overflowY: "auto", // מאפשר גלילה פנימית אם הטופס ארוך
  },
};

// מדיה קוורי עבור רספונסיביות (מוטמע בתוך הקומפוננטה)
const useResponsiveStyles = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const homeContainerStyle = {
    ...styles.homeContainer,
    // במובייל: עמודה אחת
    gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
  };

  const formColumnStyle = {
    ...styles.formColumn,
    // במובייל: מבטל את ההצמדה והופך לבלוק רגיל
    position: isMobile ? ("relative" as "sticky") : "sticky",
    top: isMobile ? "0" : "90px",
    gridColumn: isMobile ? "1 / 2" : "2 / 3", // תמיד עמודה ראשונה במובייל
    order: isMobile ? 1 : 0, // מזיז את הטופס להתחלה במובייל
  };

  const adsColumnStyle = {
    ...styles.adsColumn,
    order: isMobile ? 2 : 0, // מודעות יופיעו אחרי הטופס במובייל
  };

  return { homeContainerStyle, adsColumnStyle, formColumnStyle };
};

export default function Home() {
  const { homeContainerStyle, adsColumnStyle, formColumnStyle } = useResponsiveStyles();

  return (
    <div style={homeContainerStyle}>
      {/* Ads תופס 2/3 מהרוחב */}
      <div style={adsColumnStyle}>
        <Ads />
      </div>

      {/* AdsJob מוצמד לשמאל (או למעלה במובייל) */}
      <div style={formColumnStyle}>
        <AdsJob />
      </div>
    </div>
  );
}