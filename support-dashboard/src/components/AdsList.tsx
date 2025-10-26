import React from "react";
import type { Ad } from "../app/slice/adsSlice";
import { AdCard } from "./AdCard";

type AdsListProps = {
  ads: Ad[];
  isMobile: boolean;
};

export const AdsList: React.FC<AdsListProps> = ({ ads, isMobile }) => {
  const styles: Record<string, React.CSSProperties> = {
    listContainer: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "24px",
      width: "100%",
      maxWidth: "1200px",
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
