import {
  ScaleIcon,
  FireIcon,
  // DocumentTextIcon,
  // ClockIcon,
  CakeIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

export const healthNav = [
  {
    name: "Kūno masės indeksas (KMI)",
    href: "/",
    icon: ScaleIcon,
    description:
      "Pasitikrinkite, kurią svorio kategoriją atitinkate pagal standartinius sveikatos rodiklius.",
  },
  {
    // name: "Kiek kalorijų sudeginu?",
    name: "Kalorijų deginimas",
    href: "/sudeginamos-kalorijos",
    icon: FireIcon,
    description:
      "Sužinokite, kiek kalorijų sudeginate užsiimdami įvairia kasdiene veikla ir sportu.",
  },
];

export const nutritionNav = [
  {
    // name: "Kiek kalorijų reikia suvartoti per dieną?",
    name: "Kalorijų poreikis",
    href: "/kaloriju-poreikiai",
    icon: CakeIcon,
    description:
      "Nustatykite savo kasdienį kalorijų poreikį norimam svoriui pasiekti arba išlaikyti.",
  },
  {
    // name: "Kiek vandens reikia išgerti per dieną?",
    name: "Vandens poreikis",
    href: "/vandens-norma",
    icon: BeakerIcon,
    description:
      "Apskaičiuokite vandens poreikį kasdienėms situacijoms – nuo sporto iki darbo biure ar karštų orų.",
  },
];
