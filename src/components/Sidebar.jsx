import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const navigation = [
  {
    name: "Sveikata",
    children: [
      { name: "KMI skaičiuoklė", href: "/" },
      { name: "Kalorijų sudeginimo skaičiuoklė", href: "/sudeginamos-kalorijos" },
    ],
  },
  {
    name: "Mityba",
    children: [
      { name: "Kalorijų poreikio skaičiuoklė", href: "/kaloriju-poreikiai" },
      { name: "Vandens poreikio skaičiuoklė", href: "/vandens-norma" },
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
    <div className="flex grow flex-col gap-y-5 overflow-y-auto shadow-md p-6 bg-neutral-50">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <div className="flex items-center w-full text-left rounded-md gap-x-3 text-medium font-semibold text-neutral-700">
                    <ChevronRightIcon
                      className="h-5 w-5 shrink-0 rotate-90 text-gray-500"
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                  <ul>
                    {item.children.map((subItem) => (
                      <li key={subItem.name}>
                        <a
                          href={subItem.href}
                          className={classNames(
                            subItem.href === currentPath
                              ? "bg-white"
                              : "hover:bg-white",
                            "block rounded-md py-1 pr-2 pl-8 text-medium"
                          )}
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <ul role="list" className="space-y-1">
              {otherNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.href === currentPath ? "bg-white" : "hover:bg-white",
                      "block rounded-md py-0.5 px-3 text-medium"
                    )}
                  >
                    <span aria-hidden="true">{item.name}</span>
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
