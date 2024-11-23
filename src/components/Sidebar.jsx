import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  // CalculatorIcon,
  XMarkIcon,
  HeartIcon,
  ScaleIcon,
  // ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const navigation = [
  {
    name: "Sveikatos skaičiuoklės",
    icon: HeartIcon,
    children: [
      { name: "Koks mano KMI?", href: "/" },
      { name: "Kiek kalorijų sudeginu?", href: "/sudeginamos-kalorijos" },
    ],
  },
  {
    name: "Mitybos skaičiuoklės",
    icon: ScaleIcon,
    children: [
      { name: "Kiek kalorijų man reikia?", href: "/kaloriju-poreikiai" },
      { name: "Kiek vandens išgerti?", href: "/vandens-norma" },
    ],
  },
];

const otherNavigation = [
  { name: "Atsakomybės ribojimas", href: "/atsakomybes-ribojimas" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavItems() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex flex-col h-full bg-navy-blue pt-6">
      <nav className="flex-1 flex flex-col justify-between px-3 py-4 overflow-y-auto">
        <div className="flex flex-col gap-7">
          {navigation.map((item) => (
            <div key={item.name}>
              <Disclosure as="div" defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="w-full flex items-center justify-between px-2.5 py-2 mb-1 text-left text-[15px] leading-normal font-semibold text-white rounded-md">
                      <div className="flex items-center">
                        <item.icon
                          className="mr-3 flex-shrink-0 h-5 w-5 text-white group-hover:text-navy-blue"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "transform rotate-180" : "",
                          "h-5 w-5 text-white group-hover:text-navy-blue"
                        )}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="space-y-1">
                      {item.children.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className={classNames(
                            subItem.href === currentPath
                              ? "bg-white text-navy-blue"
                              : "text-white hover:bg-white hover:text-navy-blue",
                            "group flex items-center p-2.5 text-[15px] leading-normal font-semibold rounded-md"
                          )}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>

        {otherNavigation.map((item) => (
          <div key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.href === currentPath
                  ? "bg-white text-navy-blue"
                  : "text-white hover:bg-white hover:text-navy-blue",
                "group flex items-center px-2 py-2 text-[15px] leading-normal font-semibold rounded-md"
              )}
            >
              {item.name}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-200 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-navy-blue pb-4">
                <div className="flex items-center h-16 px-4">
                  <button
                    type="button"
                    className="text-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Uždaryti meniu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <NavItems />
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true" />
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-74 lg:flex-col">
        <NavItems />
      </div>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-10 flex items-center bg-white shadow px-4 py-2 lg:hidden">
        <button
          type="button"
          className="text-gray-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Atidaryti meniu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
