/**
 * Main Layout Component
 * קומפוננטת Layout ראשית - כוללת Navbar ו-Footer
 */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";

/**
 * Main layout wrapper for pages that require navbar and footer
 * עטיפת Layout ראשית לדפים הדורשים navbar ו-footer
 */
const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px", marginTop: "90px", minHeight: "calc(100vh - 140px)" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

