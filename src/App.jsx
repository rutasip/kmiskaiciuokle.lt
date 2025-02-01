import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import "./styles/tailwind.css";
import "./styles/checkmark.scss";
import "./styles/heart.css";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-900 relative overflow-x-hidden">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-gray-50 mt-16 pt-12 pb-8 px-6">
        <div className="max-w-5xl mx-auto space-y-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-wide">
                Teisinė informacija
              </h3>
              <p className="text-sm leading-relaxed text-emerald-100">
                Ši skaičiuoklė ir pateikta informacija yra skirta tik
                informaciniams tikslams. Ji nepakeičia profesionalios
                medicininės konsultacijos, diagnozės ar gydymo.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-wide">
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
            {/* <a href="#" className="hover:text-white transition">
              Privatumo politika
            </a>
            <a href="#" className="hover:text-white transition">
              Kontaktai
            </a> */}
          </div>
          <div className="border-t border-emerald-700 pt-4">
            <p className="text-sm text-emerald-100">
              Sukurta <a href="https://rekvizitai.vz.lt/imone/bloku_grandine/" target="_blank" className="font-semibold text-white hover:underline">Blokų grandinė, MB</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
