import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalculatorIcon,
  XMarkIcon,
  //   ScaleIcon,
  FireIcon,
  // Battery100Icon,
  BoltIcon,
  // MoonIcon,
  // ClockIcon,
  // PuzzlePieceIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const healthCalculatorsNavigation = [
  { name: "Koks mano KMI?", href: "/", icon: CalculatorIcon },
  { name: 'Kiek kalorijų sudeginu?', href: '/sudeginamos-kalorijos', icon: BoltIcon },
  // { name: 'Kiek miego?', href: '/miego-ciklai', icon: BoltIcon },
];

const nutritionCalculatorsNavigation = [
  { name: 'Kiek kalorijų man reikia?', href: '/kaloriju-poreikiai', icon: FireIcon },
  { name: 'Kiek vandens man reikia?', href: '/vandens-norma', icon: ArrowPathIcon },
  // { name: 'Kiek miego?', href: '/miego-ciklai', icon: BoltIcon },
  // { name: 'Kiek kalorijų man reikia?', href: '/makroelementai', icon: PuzzlePieceIcon },
];

const otherNavigation = [
  // { name: "Kontaktai", href: "/atsakomybes-ribojimas" },
  // { name: "Privatumo ir slapukų politika", href: "/atsakomybes-ribojimas" },
  { name: "Atsakomybės ribojimas", href: "/atsakomybes-ribojimas" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavItems() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex grow flex-col overflow-y-auto bg-navy-blue px-6">
      {/* <div className="flex mt-6 shrink-0 items-center">
        <a href="/">
          <img
            src={Logo}
            alt="Svetainės logotipas"
            className="w-11 rounded-lg"
          />
        </a>
      </div> */}
      <nav className="flex flex-1 flex-col">
        <div>
          <div className="mt-12 text-xs font-semibold leading-6 text-white">Sveikatos skaičiuoklės:</div>
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-3 mt-2 space-y-1">
                {healthCalculatorsNavigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.href === currentPath
                          ? "bg-gray-50 text-navy-blue"
                          : "text-white hover:bg-gray-50 hover:text-navy-blue",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.href === currentPath
                            ? "text-navy-blue"
                            : "text-white group-hover:text-navy-blue",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="mt-12 text-xs font-semibold leading-6 text-white">Mitybos skaičiuoklės:</div>
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-3 mt-2 space-y-1">
                {nutritionCalculatorsNavigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.href === currentPath
                          ? "bg-gray-50 text-navy-blue"
                          : "text-white hover:bg-gray-50 hover:text-navy-blue",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.href === currentPath
                            ? "text-navy-blue"
                            : "text-white group-hover:text-navy-blue",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="mb-3">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-3 mt-2 space-y-1">
              {otherNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.href === currentPath
                        ? "bg-gray-50 text-navy-blue"
                        : "text-white hover:bg-gray-50 hover:text-navy-blue",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                    )}
                  >
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <NavItems />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-74 lg:flex-col">
        <NavItems />
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
