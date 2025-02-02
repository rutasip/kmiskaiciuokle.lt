import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./styles/tailwind.css";
import "./styles/checkmark.scss";
import "./styles/heart.css";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 relative overflow-x-hidden">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
