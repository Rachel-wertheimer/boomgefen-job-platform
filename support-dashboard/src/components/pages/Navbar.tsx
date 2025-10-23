import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaHome,
  FaBriefcase,
  FaHandshake,
  FaInfoCircle,
  FaTasks,
  FaEnvelope,
} from "react-icons/fa";
import type { AppDispatch, RootState } from "../../app/store";
import { logout } from "../../app/slice/userSlice";
import { LoginModal } from "./loginWorkWithUS";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { width } = useWindowSize();
  const isMobile = width <= 960;

  const colors = {
    primary: "#6d44b8",
    primaryHover: "#5a379a",
    danger: "#fa5252",
    dangerHover: "#e03131",
    textDark: "#212529",
    textMedium: "#555",
    borderColor: "#e0e0e0",
    activeBackground: "#f5f3f9",
  };

  const handleMobileNavigate = (path: string, state = {}) => {
    navigate(path, { state });
    setMobileMenuOpen(false);
  };

  const styles: Record<string, React.CSSProperties> = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "0 20px" : "0 30px",
      backgroundColor: "#fff",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      direction: "rtl",
      height: "90px",
      borderBottom: `3px solid ${colors.primary}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    link: {
      color: colors.textMedium,
      textDecoration: "none",
      fontWeight: 500,
      padding: "8px 10px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      background: "none",
      border: "none",
      fontSize: "16px",
    },
    activeLink: {
      backgroundColor: colors.activeBackground,
      color: colors.primary,
      fontWeight: "700",
    },
    logo: { height: "45px", cursor: "pointer" },
    icon: { verticalAlign: "middle" },
  };

  const [hover, setHover] = useState({ register: false, login: false, logout: false });

  const baseBtn = {
    padding: "8px 18px",
    fontSize: "15px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  };
  const registerBtn = {
    ...baseBtn,
    backgroundColor: hover.register ? colors.primaryHover : colors.primary,
    color: "white",
    border: `2px solid ${colors.primary}`,
  };
  const loginBtn = {
    ...baseBtn,
    backgroundColor: "white",
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
  };
  const logoutBtn = {
    ...baseBtn,
    backgroundColor: hover.logout ? colors.dangerHover : colors.danger,
    color: "white",
    border: `2px solid ${colors.danger}`,
  };

  return (
    <>
      <nav style={styles.nav}>
        <img
          src="/12.png"
          alt="לוגו"
          style={styles.logo}
          onClick={() => handleMobileNavigate("/")}
        />

        {/* ניווט דסקטופ */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <NavLink to="/home" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}>
              <FaHome /> בית
            </NavLink>
            <NavLink to="/ads" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}>
              <FaBriefcase /> לוח משרות
            </NavLink>
            <NavLink to="/work-with-us" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}>
              <FaHandshake /> עבוד איתנו
            </NavLink>
            <NavLink to="/createAsdJob" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}>
              <FaHandshake /> לפרסם אצלנו
            </NavLink>
            <NavLink to="/about-us" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}>
              <FaInfoCircle /> אודותינו
            </NavLink>

            {/* צור קשר – שולח state: {fromNav:true} */}
            <button
              style={styles.link}
              onClick={() => navigate("/contact-us", { state: { fromNav: true } })}
            >
              <FaEnvelope /> צור קשר
            </button>

            {currentUser?.role === "MANAGER" && (
              <NavLink to="/adsManager" style={({ isActive }) => (isActive ? { ...styles.link, ...styles.activeLink } : styles.link)}>
                <FaTasks /> ניהול מודעות
              </NavLink>
            )}
          </div>
        )}

        {/* צד ימין */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {currentUser ? (
              <>
                <span>שלום {currentUser.name}</span>
                <button
                  style={logoutBtn}
                  onMouseEnter={() => setHover({ ...hover, logout: true })}
                  onMouseLeave={() => setHover({ ...hover, logout: false })}
                  onClick={() => dispatch(logout())}
                >
                  יציאה
                </button>
              </>
            ) : (
              <>
                <button
                  style={loginBtn}
                  onMouseEnter={() => setHover({ ...hover, login: true })}
                  onMouseLeave={() => setHover({ ...hover, login: false })}
                  onClick={() => setIsLoginOpen(true)}
                >
                  התחבר
                </button>
                <NavLink
                  to="/work-with-us"
                  style={registerBtn}
                  onMouseEnter={() => setHover({ ...hover, register: true })}
                  onMouseLeave={() => setHover({ ...hover, register: false })}
                >
                  הירשם
                </NavLink>
              </>
            )}
          </div>
        )}

        {/* אייקון תפריט במובייל */}
        {isMobile && (
          <div
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              cursor: "pointer",
            }}
          >
            <div style={{ width: "25px", height: "3px", background: "#000" }} />
            <div style={{ width: "25px", height: "3px", background: "#000" }} />
            <div style={{ width: "25px", height: "3px", background: "#000" }} />
          </div>
        )}
      </nav>

      {/* תפריט מובייל */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "90px",
            left: 0,
            width: "100%",
            background: "white",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            gap: "10px",
          }}
        >
          <NavLink to="/home" onClick={() => setMobileMenuOpen(false)}>
            <FaHome /> בית
          </NavLink>
          <NavLink to="/ads" onClick={() => setMobileMenuOpen(false)}>
            <FaBriefcase /> לוח משרות
          </NavLink>
          <NavLink to="/work-with-us" onClick={() => setMobileMenuOpen(false)}>
            <FaHandshake /> עבוד איתנו
          </NavLink>
          <NavLink to="/createAsdJob" onClick={() => setMobileMenuOpen(false)}>
            <FaHandshake /> לפרסם אצלנו
          </NavLink>
          <NavLink to="/about-us" onClick={() => setMobileMenuOpen(false)}>
            <FaInfoCircle /> אודותינו
          </NavLink>

          {/* צור קשר עם state */}
          <button
            style={styles.link}
            onClick={() => handleMobileNavigate("/contact-us", { fromNav: true })}
          >
            <FaEnvelope /> צור קשר
          </button>

          {currentUser?.role === "MANAGER" && (
            <NavLink to="/adsManager" onClick={() => setMobileMenuOpen(false)}>
              <FaTasks /> ניהול מודעות
            </NavLink>
          )}

          <div style={{ marginTop: "15px", borderTop: `1px solid ${colors.borderColor}`, paddingTop: "10px" }}>
            {currentUser ? (
              <>
                <span>שלום {currentUser.name}</span>
                <button
                  style={{ ...logoutBtn, width: "100%" }}
                  onClick={() => {
                    dispatch(logout());
                    setMobileMenuOpen(false);
                  }}
                >
                  יציאה
                </button>
              </>
            ) : (
              <>
                <button
                  style={{ ...loginBtn, width: "100%" }}
                  onClick={() => {
                    setIsLoginOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  התחבר
                </button>
                <button
                  style={{ ...registerBtn, width: "100%" }}
                  onClick={() => handleMobileNavigate("/work-with-us")}
                >
                  הירשם
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
  );
}
