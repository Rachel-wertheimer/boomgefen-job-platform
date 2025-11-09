import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/pages/Navbar";
import Footer from "../components/pages/Footer";

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
