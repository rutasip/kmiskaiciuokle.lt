import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ScaleIcon,
  FireIcon,
  // DocumentTextIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

const healthNav = [
  {
    name: "Kūno masės indeksas (KMI)",
    href: "/",
    icon: ScaleIcon,
    description: "Pasitikrinkite, kokią svorio kategoriją atitinkate pagal standartinius sveikatos rodiklius.",
  },
  {
    name: "Kalorijų sudeginimas",
    href: "/sudeginamos-kalorijos",
    icon: FireIcon,
    description: "Sužinokite, kiek kalorijų sudeginate įvairių veiklų ir pratimų metu.",
  },
];

const nutritionNav = [
  // {
  //   name: "Dienos kalorijų poreikis",
  //   href: "/kaloriju-poreikiai",
  //   icon: DocumentTextIcon,
  //   description: "Sužinokite optimalų dienos kalorijų kiekį svorio mažinimui, palaikymui ar didinimui.",
  // },
  {
    name: "Vandens suvartojimo poreikis",
    href: "/vandens-norma",
    icon: BeakerIcon,
    description: "Apskaičiuokite reikalingą vandens kiekį įvairiose situacijose – sportuojant, karštomis dienomis, dirbant biure.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimerRef = useRef(null);

  const handleMouseEnter = (menu) => {
    clearTimeout(closeTimerRef.current);
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null)
    }, 600)
  };

  const renderCaret = (menuName) =>
    openMenu === menuName ? (
      <ChevronUpIcon className="w-4 h-4" />
    ) : (
      <ChevronDownIcon className="w-4 h-4" />
    );

  return (
    <nav className="fixed w-full z-50 bg-white shadow">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">KMI</span>
            </div>
          </a>
          
          <div className="hidden lg:flex lg:items-center">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("health")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 cursor-pointer">
                Sveikatos skaičiuoklės
                {renderCaret("health")}
              </div>
              {openMenu === "health" && (
                <div className="absolute right-0 mt-2 bg-white shadow border border-gray-200 rounded-lg z-50 overflow-hidden w-96">
                  {healthNav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-emerald-700 hover:bg-gray-50 hover:text-emerald-800",
                        "block px-5 py-4 rounded-md text-sm"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <item.icon className="shrink-0 w-6 h-6 text-emerald-500" />
                        <div>
                          <p className="font-semibold pb-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
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
                {renderCaret("nutrition")}
              </div>
              {openMenu === "nutrition" && (
                <div className="absolute right-0 mt-2 bg-white shadow border border-gray-200 rounded-lg z-50 overflow-hidden w-96">
                  {nutritionNav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-emerald-700 hover:bg-gray-50 hover:text-emerald-800",
                        "block px-5 py-4 rounded-md text-sm"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <item.icon className="shrink-0 w-6 h-6 text-emerald-500" />
                        <div>
                          <p className="font-semibold pb-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
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
        <div className="lg:hidden z-50 bg-white border-t border-gray-200 px-4 pt-3 pb-4 space-y-6">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide mb-3">
              Sveikatos skaičiuoklės
            </div>
            {healthNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={classNames(
                  location.pathname === item.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-emerald-700 hover:bg-gray-50 hover:text-emerald-800",
                  "block px-3 py-3 rounded-md text-sm"
                )}
              >
                <div className="flex items-start gap-3">
                  <item.icon className="shrink-0 w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-semibold pb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide mb-3">
              Mitybos skaičiuoklės
            </div>
            {nutritionNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={classNames(
                  location.pathname === item.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-emerald-700 hover:bg-gray-50 hover:text-emerald-800",
                  "block px-3 py-3 rounded-md text-sm"
                )}
              >
                <div className="flex items-start gap-3">
                  <item.icon className="shrink-0 w-6 h-6 text-emerald-500" />
                  <div>
                    <p className="font-semibold pb-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
