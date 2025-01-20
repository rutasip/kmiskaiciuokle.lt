import { useState, useRef } from "react"
import { Link } from "react-router-dom";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimerRef = useRef(null)

  const handleMouseEnter = (menu) => {
    clearTimeout(closeTimerRef.current)
    setOpenMenu(menu)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null)
    }, 600)
  }

  return (
    <nav className="fixed w-full z-50 bg-white shadow">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">KMI</span>
            </div>
          </a>

          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("health")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 cursor-pointer">
                Sveikatos skaičiuoklės
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              {openMenu === "health" && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-lg py-2 z-50">
                  {healthNav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("nutrition")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 cursor-pointer">
                Mitybos skaičiuoklės
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              {openMenu === "nutrition" && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-lg py-2 z-50">
                  {nutritionNav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex lg:hidden">
            <button
              className={classNames(
                "inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
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
