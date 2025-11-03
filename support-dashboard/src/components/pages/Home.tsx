import { Ads } from "./Ads";
import AdsJob from "./AdsJob";
import React from "react";

const styles: Record<string, React.CSSProperties> = {
  homeContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "90px 20px 20px 20px",
  }
  ,  
  adsColumn: {
    gridColumn: "1 / 2", 
      minWidth: 0, 
     },
  formColumn: {
    gridColumn: "2 / 3", 
    position: "sticky", 
    top: "90px",
    alignSelf: "start",
    maxHeight: "calc(100vh - 100px)", 
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

  const formColumnStyle = {
    ...styles.formColumn,
    position: isMobile ? ("relative" as "sticky") : "sticky",
    top: isMobile ? "0" : "90px",
    gridColumn: isMobile ? "1 / 2" : "2 / 3", 
    order: isMobile ? 1 : 0,     
  };

  const adsColumnStyle = {
    ...styles.adsColumn,
    order: isMobile ? 2 : 0, 
  };

  return { homeContainerStyle, adsColumnStyle, formColumnStyle };
};
export default function Home() {
  const { homeContainerStyle, adsColumnStyle, formColumnStyle } = useResponsiveStyles();

  return (
    <div style={homeContainerStyle}>
      <div style={adsColumnStyle}>
        <Ads />
      </div>

      <div style={formColumnStyle}>
        <AdsJob />
      </div>
    </div>
  );
}