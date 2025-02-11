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
    name: "Kiek kalorijų sudeginu?",
    href: "/sudeginamos-kalorijos",
    icon: FireIcon,
    description:
      "Sužinokite, kiek kalorijų sudeginate užsiimdami kasdiene veikla ir sportu.",
  },
];

export const nutritionNav = [
  {
    name: "Kiek kalorijų reikia suvartoti per dieną?",
    href: "/kaloriju-poreikiai",
    icon: CakeIcon,
    description:
      "Nustatykite savo kasdienį kalorijų poreikį norimam svoriui pasiekti.",
  },
  {
    name: "Kiek vandens reikia išgerti per dieną?",
    href: "/vandens-norma",
    icon: BeakerIcon,
    description:
      "Apskaičiuokite optimalų vandens kiekį kasdienėms situacijoms – nuo sporto iki darbo biure ar karštų orų.",
  },
];
