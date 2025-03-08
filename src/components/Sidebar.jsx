import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { healthNav, nutritionNav } from "../constants/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimerRef = useRef(null);

  const handleMouseEnter = (menu) => {
    clearTimeout(closeTimerRef.current);
    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 600);
  };

  const renderCaret = (menuName) =>
    openMenu === menuName ? (
      <ChevronUpIcon className="w-4 h-4" />
    ) : (
      <ChevronDownIcon className="w-4 h-4" />
    );

  return (
    <nav className="fixed w-full z-50 bg-white shadow">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">KMI</span>
            </div>
          </a>

          <div className="hidden lg:flex lg:items-center gap-5">
            <div
              className="relative gap-x-8"
              onMouseEnter={() => handleMouseEnter("health")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 tracking-wide bg-neutral-100 rounded-lg cursor-pointer">
                Sveikatos skaičiuoklės
                {renderCaret("health")}
              </div>
              <div
                className={classNames(
                  "absolute right-0 mt-2 bg-white shadow border border-neutral-200 rounded-lg z-50 overflow-hidden w-[30.8rem]",
                  "transition-all duration-200 transform ease-out origin-top-right",
                  openMenu === "health"
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                {healthNav.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-neutral-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-neutral-50">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-neutral-600 group-hover:text-emerald-500"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-neutral-700 tracking-wide"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-neutral-700 tracking-wide">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("nutrition")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 tracking-wide bg-neutral-100 rounded-lg cursor-pointer">
                Mitybos skaičiuoklės
                {renderCaret("nutrition")}
              </div>
              <div
                className={classNames(
                  "absolute right-0 mt-2 bg-white shadow border border-neutral-200 rounded-lg z-50 overflow-hidden w-[30.8rem]",
                  "transition-all duration-200 transform ease-out origin-top-right",
                  openMenu === "nutrition"
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                )}
              >
                {nutritionNav.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-neutral-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-neutral-50">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-neutral-600 group-hover:text-emerald-500"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-neutral-700 tracking-wide"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-neutral-700 tracking-wide">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex lg:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
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
      <div
        className={classNames(
          "lg:hidden mx-3 origin-top transition-all duration-200 transform ease-out overflow-hidden",
          mobileMenuOpen
            ? "opacity-100 scale-100 pointer-events-auto max-h-[800px] py-4"
            : "opacity-0 scale-95 pointer-events-none max-h-0 py-0"
        )}
      >
        <div className="px-4">
          <h3 className="pb-2 text-sm font-semibold text-neutral-700">
            Sveikatos skaičiuoklės
          </h3>
          {healthNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group relative flex items-center gap-x-4 rounded-lg p-3 text-sm/6 hover:bg-neutral-50 -ml-3"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-neutral-50">
                <item.icon
                  aria-hidden="true"
                  className="h-5 w-5 text-neutral-600 group-hover:text-emerald-500"
                />
              </div>
              <div className="flex-auto">
                <p className="font-medium text-neutral-900">{item.name}</p>
                <p className="mt-1 text-neutral-600">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="px-4 pt-4 pb-2">
          <h3 className="pb-2 text-sm font-semibold text-neutral-700">
            Mitybos skaičiuoklės
          </h3>
          {nutritionNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group relative flex items-center gap-x-4 rounded-lg p-3 text-sm/6 hover:bg-neutral-50 -ml-3"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-neutral-50">
                <item.icon
                  aria-hidden="true"
                  className="h-5 w-5 text-neutral-600 group-hover:text-emerald-500"
                />
              </div>
              <div className="flex-auto">
                <p className="font-medium text-neutral-900">{item.name}</p>
                <p className="mt-1 text-neutral-600">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
