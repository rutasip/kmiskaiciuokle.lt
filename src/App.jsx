import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./styles/tailwind.css";
import "./styles/checkmark.scss";
import "./styles/heart.css";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] text-gray-900 relative">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-emerald-900 text-gray-50 mt-10 pt-10 pb-6 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 tracking-wide">
                Teisinė informacija
              </h3>
              <p className="text-sm leading-relaxed text-emerald-100">
                Ši skaičiuoklė ir pateikta informacija yra skirta tik
                informaciniams tikslams. Ji nepakeičia profesionalios
                medicininės konsultacijos, diagnozės ar gydymo.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 tracking-wide">
                Svarbu žinoti
              </h3>
              <p className="text-sm leading-relaxed text-emerald-100">
                Jei turite klausimų apie sveikatą ar norite pradėti svorio
                koregavimo programą, kreipkitės į kvalifikuotą sveikatos
                priežiūros specialistą.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-emerald-100 border-t border-emerald-700 pt-4">
            <a
              href="/atsakomybes-ribojimas"
              className="hover:text-white transition"
            >
              Atsakomybės ribojimas
            </a>
            <a href="#" className="hover:text-white transition">
              Privatumo politika (placeholder)
            </a>
            <a href="#" className="hover:text-white transition">
              Kontaktai (placeholder)
            </a>
          </div>
          <div className="border-t border-emerald-700 pt-4">
            <p className="text-sm text-emerald-100">
              Sukurta{" "}
              <span className="font-semibold text-white">blokugrandine</span>{" "}
              (placeholder nuorodai).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
