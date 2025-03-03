import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./styles/tailwind.css";
import "./styles/checkmark.scss";
import "./styles/heart.css";
import Footer from "./components/Footer";
import { initGA, trackPageView } from "./utils/analytics";
// import CookieConsent from "./components/CookieConsent";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
    trackPageView(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen text-gray-900 relative overflow-x-hidden">
      <Sidebar />
      <main className="flex-1">
      {/* <CookieConsent /> */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
