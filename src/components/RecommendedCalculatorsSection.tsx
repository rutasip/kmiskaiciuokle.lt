import React, { FC } from "react";

interface RecommendedCalculatorsSectionProps {
  showBodyMassIndexCalculator: boolean;
  showCalorieBurnCalculator: boolean;
  showBasalMetabolicRateCalculator: boolean;
  showWaterIntakeCalculator: boolean;
}

const RecommendedCalculatorsSection: FC<RecommendedCalculatorsSectionProps> = ({
  showBodyMassIndexCalculator,
  showCalorieBurnCalculator,
  showBasalMetabolicRateCalculator,
  showWaterIntakeCalculator,
}) => {
  const links = [
    {
      id: "bmi",
      show: showBodyMassIndexCalculator,
      href: "/",
      title: "Kūno masės indekso skaičiuoklė",
      description:
        "Pasitikrinkite, kurią svorio kategoriją atitinkate pagal standartinius sveikatos rodiklius.",
    },
    {
      id: "calories",
      show: showCalorieBurnCalculator,
      href: "/sudeginamos-kalorijos",
      title: "Kalorijų deginimo skaičiuoklė",
      description:
        "Sužinokite, kiek kalorijų sudeginate užsiimdami kasdiene veikla ir sportu.",
    },
    {
      id: "bmr",
      show: showBasalMetabolicRateCalculator,
      href: "/kaloriju-poreikiai",
      title: "Dienos kalorijų poreikio skaičiuoklė",
      description:
        "Sužinokite savo kasdienį kalorijų poreikį norimam svoriui pasiekti.",
    },
    {
      id: "water",
      show: showWaterIntakeCalculator,
      href: "/vandens-norma",
      title: "Vandens suvartojimo poreikio skaičiuoklė",
      description:
        "Apskaičiuokite optimalų vandens kiekį kasdienėms situacijoms – nuo sporto iki darbo biure ar karštų orų.",
    },
  ];

  return (
    <section className="flex gap-4">
      {links
        .filter((link) => link.show)
        .map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="relative flex w-full items-center bg-neutral-50 p-5 rounded-md hover:bg-neutral-100 shadow"
          >
            <div className="mr-8">
              <h5 className="font-semibold text-neutral-700 hover:text-neutral-900">
                {link.title}
              </h5>
              <p className="text-sm text-neutral-600 mt-1">
                {link.description}
              </p>
            </div>
            <div
              className="absolute right-4"
              style={{ animation: "horizontalBounce 1.5s infinite" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500 hover:text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
    </section>
  );
};

export default RecommendedCalculatorsSection;
