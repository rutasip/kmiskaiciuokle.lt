import { Link, useNavigate } from "react-router-dom";
import useScrollEffects from "../hooks/useScrollEffects";

const healthLinks = [
  { name: "Kūno masės indeksas (KMI)", href: "/" },
  { name: "Aktyvus kalorijų deginimas", href: "/sudeginamos-kalorijos" },
];

const nutritionLinks = [
  { name: "Dienos kalorijų poreikis", href: "/kaloriju-poreikiai" },
  { name: "Vandens suvartojimo poreikis", href: "/vandens-norma" },
];

export default function Footer() {
  const { scrollToTop } = useScrollEffects();
  const navigate = useNavigate();

  const handleNavigation = (event, href) => {
    event.preventDefault();
    scrollToTop();

    setTimeout(() => {
      navigate(href);
    }, 400);
  };

  return (
    <footer className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-emerald-100 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-3 cursor-default">
              Sveikata
            </h3>
            <ul className="space-y-2 text-sm">
              {healthLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    onClick={(e) => handleNavigation(e, link.href)}
                    to={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-3 cursor-default">
              Mityba
            </h3>
            <ul className="space-y-2 text-sm">
              {nutritionLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    onClick={(e) => handleNavigation(e, link.href)}
                    to={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase mb-3 cursor-default">
              Naudinga
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  onClick={(e) => handleNavigation(e, "/atsakomybes-ribojimas")}
                  to="/atsakomybes-ribojimas"
                  className="hover:text-white transition-colors"
                >
                  Atsakomybės ribojimas
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => handleNavigation(e, "/privatumo-politika")}
                  to="/privatumo-politika"
                  className="hover:text-white transition-colors"
                >
                  Privatumo politika
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-3 cursor-default">
              Sekite mus
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-white transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.998 9.998 0 008.438 9.877v-6.987H7.898v-2.89h2.54V9.797c0-2.508 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.262c-1.243 0-1.63.774-1.63 1.567V12h2.773l-.443 2.89h-2.33v6.987A9.999 9.999 0 0022 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 2.9375H8C4.68629 2.9375 2 5.62379 2 8.9375V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8.9375C22 5.62379 19.3137 2.9375 16 2.9375ZM20.1562 16C20.1562 18.2812 18.2812 20.1562 16 20.1562H8C5.71875 20.1562 3.84375 18.2812 3.84375 16V8.9375C3.84375 6.65625 5.71875 4.78125 8 4.78125H16C18.2812 4.78125 20.1562 6.65625 20.1562 8.9375V16ZM17.2188 7.625C17.765 7.625 18.2188 7.17129 18.2188 6.625C18.2188 6.07871 17.765 5.625 17.2188 5.625C16.6725 5.625 16.2188 6.07871 16.2188 6.625C16.2188 7.17129 16.6725 7.625 17.2188 7.625ZM12 7.625C9.61554 7.625 7.625 9.61554 7.625 12C7.625 14.3845 9.61554 16.375 12 16.375C14.3845 16.375 16.375 14.3845 16.375 12C16.375 9.61554 14.3845 7.625 12 7.625ZM12 14.5312C10.6997 14.5312 9.53125 13.3628 9.53125 12C9.53125 10.6372 10.6997 9.46875 12 9.46875C13.3628 9.46875 14.5312 10.6372 14.5312 12C14.5312 13.3628 13.3628 14.5312 12 14.5312Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-700 mt-10 pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Sveikatos skaičiuoklės. Visos teisės
            saugomos.
          </p>
          <p className="mt-1">
            Sukurta{" "}
            <a
              href="https://rekvizitai.vz.lt/imone/bloku_grandine/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white transition-colors"
            >
              Blokų grandinė, MB
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
