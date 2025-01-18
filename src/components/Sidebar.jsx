import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const healthNav = [
  { name: "Koks mano KMI?", href: "/" },
  { name: "Kiek kalorijų sudeginu?", href: "/sudeginamos-kalorijos" },
];
const nutritionNav = [
  { name: "Kiek kalorijų man reikia?", href: "/kaloriju-poreikiai" },
  { name: "Kiek vandens išgerti?", href: "/vandens-norma" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={classNames(
        "fixed w-full z-50 transition-colors duration-300",
        scrolled ? "bg-white border-b border-gray-200" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">KMI</span>
            </div>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu("health")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div
                className={classNames(
                  "px-4 py-2 rounded-full text-sm font-medium cursor-pointer flex items-center gap-1",
                  scrolled
                    ? "text-gray-700 hover:text-emerald-600 bg-gray-100 hover:bg-gray-200"
                    : "text-white bg-white/10 hover:bg-white/20"
                )}
              >
                Sveikatos skaičiuoklės
                <ChevronDownIcon
                  className={classNames(
                    "w-4 h-4 transition-transform",
                    openMenu === "health" ? "rotate-180" : ""
                  )}
                />
              </div>
              {openMenu === "health" && (
                <div
                  className="absolute right-0 top-full w-56 bg-white border border-gray-200 rounded-xl transform origin-top-right transition-all duration-200 ease-out scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 z-50"
                >
                  <ul className="py-2">
                    {healthNav.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-emerald-50 text-emerald-700 font-semibold"
                              : "hover:bg-gray-50 hover:text-emerald-600 text-gray-700",
                            "block px-4 py-2 text-sm rounded-md mx-2"
                          )}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu("nutrition")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div
                className={classNames(
                  "px-4 py-2 rounded-full text-sm font-medium cursor-pointer flex items-center gap-1",
                  scrolled
                    ? "text-gray-700 hover:text-emerald-600 bg-gray-100 hover:bg-gray-200"
                    : "text-white bg-white/10 hover:bg-white/20"
                )}
              >
                Mitybos skaičiuoklės
                <ChevronDownIcon
                  className={classNames(
                    "w-4 h-4 transition-transform",
                    openMenu === "nutrition" ? "rotate-180" : ""
                  )}
                />
              </div>
              {openMenu === "nutrition" && (
                <div
                  className="absolute right-0 top-full w-56 bg-white border border-gray-200 rounded-xl transform origin-top-right transition-all duration-200 ease-out scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 z-50"
                >
                  <ul className="py-2">
                    {nutritionNav.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-emerald-50 text-emerald-700 font-semibold"
                              : "hover:bg-gray-50 hover:text-emerald-600 text-gray-700",
                            "block px-4 py-2 text-sm rounded-md mx-2"
                          )}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex lg:hidden">
            <button
              className={classNames(
                "inline-flex items-center justify-center rounded-md p-2",
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-emerald-100/20"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden z-50 bg-white border-t border-gray-200 px-4 pt-3 pb-4 space-y-3">
          <div className="text-sm font-semibold uppercase tracking-wide">
            Sveikatos skaičiuoklės
          </div>
          {healthNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={classNames(
                location.pathname === item.href
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50",
                "block px-3 py-2 rounded-md text-sm"
              )}
            >
              {item.name}
            </Link>
          ))}

          <div className="text-sm font-semibold uppercase tracking-wide mt-3">
            Mitybos skaičiuoklės
          </div>
          {nutritionNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={classNames(
                location.pathname === item.href
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50",
                "block px-3 py-2 rounded-md text-sm"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
