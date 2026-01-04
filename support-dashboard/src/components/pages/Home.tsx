import { Ads } from "./Ads";
import AdsJob from "./AdsJob";
import React from "react";
import { SEO } from "../SEO";
import { seoKeywords } from "../../utils/seoKeywords";

const styles: Record<string, React.CSSProperties> = {
  homeContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "32px",
    maxWidth: "1320px",
    margin: "0 auto",
    padding: "96px 24px 48px",
    alignItems: "start",
    boxSizing: "border-box",
  },
  adsColumn: {
    gridColumn: "1 / 2",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  formColumnWrapper: {
    gridColumn: "2 / 3",
    height: "100%",
    position: "relative", 
  },
  formColumn: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 12px 32px rgba(15, 23, 42, 0.15)",
    padding: "28px 24px",
    boxSizing: "border-box",
    border: "1px solid rgba(148, 163, 184, 0.15)",
    position: "fixed",
    top: "120px",      
    width: "380px",     
    maxHeight: "calc(100vh - 160px)",
    overflowY: "auto",
  },
};

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
    gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
  };

  const formColumnWrapperStyle = {
    ...styles.formColumnWrapper,
    position: isMobile ? ("relative" as "sticky") : "sticky",
    top: isMobile ? "0" : styles.formColumnWrapper.top,
    gridColumn: isMobile ? "1 / 2" : "2 / 3",
    order: isMobile ? 1 : 0,
    width: "100%",
  };

  const formColumnStyle = {
    ...styles.formColumn,
    maxHeight: isMobile ? "unset" : styles.formColumn.maxHeight,
    boxShadow: isMobile ? "0 8px 24px rgba(15, 23, 42, 0.1)" : styles.formColumn.boxShadow,
    padding: isMobile ? "24px 20px" : styles.formColumn.padding,
  };

  const adsColumnStyle = {
    ...styles.adsColumn,
    order: isMobile ? 2 : 0,
  };

  return { homeContainerStyle, adsColumnStyle, formColumnWrapperStyle, formColumnStyle };
};

export default function Home() {
  const { homeContainerStyle, adsColumnStyle, formColumnWrapperStyle, formColumnStyle } =
    useResponsiveStyles();

  return (
    <div style={homeContainerStyle}>
      <SEO
        title="BoomGefen - לוח משרות לאמנים | דרושים אמנים"
        description="לוח משרות מקוון לאמנים. גלו משרות חדשות בתחום האמנות, עבודות יצירה, והזדמנויות מקצועיות. BoomGefen - פלטפורמה לחיפוש עבודה לאמנים."
        keywords={seoKeywords}
      />
      <div style={adsColumnStyle}>
        <Ads />
      </div>

      <div style={formColumnWrapperStyle}>
        <div style={formColumnStyle}>
          <AdsJob />
        </div>
      </div>
    </div>
  );
}