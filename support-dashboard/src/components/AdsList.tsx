// import React, { useEffect, useState } from "react";
// import type { Ad } from "../app/slice/adsSlice";
// import { AdCard } from "./AdCard";



// type AdsListProps = {
//   ads: Ad[];
// };

// export const AdsList: React.FC<AdsListProps> = ({ ads }) => {


//   const styles: Record<string, React.CSSProperties> = {
//     listContainer: {
//       display: "grid", // --- שדרוג לפריסת גריד ---
//       // יוצר עמודות אוטומטיות: מינימום 350px, מקסימום 1fr (חלוקה שווה)
//       // במובייל, עובר אוטומטית לעמודה אחת (כי 350px לא נכנס פעמיים)
//       gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
//       gap: "24px", // רווח מודרני
//       width: "100%",
//       maxWidth: "1400px", // מאפשר פריסה רחבה
//       margin: '0 auto', // מרכוז הגריד
//     }
//   };

//   return (
//     <div id="ads-list" style={styles.listContainer}>
//       {(ads || []).map((ad, index) => (
//         // הוספנו index ו-totalAds כדי לאפשר אנימציה מדורגת
//         <AdCard key={ad.id} ad={ad} index={index} totalAds={ads.length} />
//       ))}
//     </div>
//   );
// };
import React from "react";
import type { Ad } from "../app/slice/adsSlice";
import { AdCard } from "./AdCard";

type AdsListProps = {
  ads: Ad[];
  isMobile: boolean; // הוספנו את isMobile
};

export const AdsList: React.FC<AdsListProps> = ({ ads, isMobile }) => {
  const styles: Record<string, React.CSSProperties> = {
    listContainer: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr" // מובייל: עמודה אחת
        : "repeat(auto-fit, minmax(320px, 1fr))", // שולחן עבודה: עד 3 עמודות
      gap: "24px",
      width: "100%",
      maxWidth: "1200px", // מגבלת רוחב כוללת
      margin: "0 auto",
    },
  };
  

  return (
    <div id="ads-list" style={styles.listContainer}>
      {ads.map((ad, index) => (
        <AdCard key={ad.id} ad={ad} index={index} totalAds={ads.length} />
      ))}
    </div>
  );
};
