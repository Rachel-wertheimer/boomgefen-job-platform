import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import WorkWithUs from "./pages/WorkWithUs";
import { Ads } from "./pages/Ads";
import AboutUs from "./pages/AboutUs";
import AdsJob from "./pages/AdsJob";
import AdsManager from "./pages/AdsManger";
import FirstScreen from "./pages/firstScreen";
import ContactUs from "./pages/ContactUs";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <div style={{ padding: "20px", marginTop: "70px" }}>
      <Outlet />
    </div>
  </>
);

export const Routing = () => (
  <Routes>
    {/* מסך פתיחה בלבד */}
    <Route path="/" element={<FirstScreen />} />

    {/* כל שאר הנתיבים כוללים Navbar */}
    <Route element={<LayoutWithNavbar />}>
      <Route path="/home" element={<Home />} />
      <Route path="/work-with-us" element={<WorkWithUs />} />
      <Route path="/ads" element={<Ads />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/createAsdJob" element={<AdsJob />} />
      <Route path="/adsManager" element={<AdsManager />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Route>
  </Routes>
);
