import React, { FC } from "react";

interface RecommendedCalculatorsSectionProps {
  showBodyMassIndexCalculator: boolean;
  showCalorieBurnCalculator: boolean;
  showWaterIntakeCalculator: boolean;
}

/*
// EXAMPLE: Choose one of these headings:
// 1) "Rekomenduojamos skaičiuoklės"
// 2) "Papildomos skaičiuoklės"
// 3) "Kitos skaičiuoklės, kurios gali jus sudominti"
*/

// Add a bounce keyframe globally or within a <style> tag
// to support the horizontalBounce animation on the arrow icons.
// e.g.:
// @keyframes horizontalBounce {
//   0%, 100% { transform: translateX(0); }
//   50% { transform: translateX(5px); }
// }
const RecommendedCalculatorsSection: FC<RecommendedCalculatorsSectionProps> = ({
  showBodyMassIndexCalculator,
  showCalorieBurnCalculator,
  showWaterIntakeCalculator,
}) => {
  // If you like, you could early-return null if *none* are shown:
  // if (!showBodyMassIndexCalculator && !showCalorieBurnCalculator && !showWaterIntakeCalculator) {
  //   return null;
  // }

  // You can define link data in an array for simpler logic:
  const links = [
    {
      id: "bmi",
      show: showBodyMassIndexCalculator,
      href: "/",
      // Alternate Titles:
      // "Kūno masės indekso skaičiuoklė (KMI)"
      // "KMI skaičiuoklė"
      title: "Kūno masės indekso skaičiuoklė",
      // Alternate Descriptions:
      // "Greitai nustatykite, ar jūsų svoris yra normalus ar per didelis."
      // "Sužinokite, ar jūsų kūno svoris atitinka rekomendacijas."
      description: "Sužinokite savo KMI (kūno masės indeksą).",
    },
    {
      id: "calories",
      show: showCalorieBurnCalculator,
      href: "/sudeginamos-kalorijos",
      // Alternate Titles:
      // "Kalorijų sudeginimo skaičiuoklė"
      // "Sudeginamų kalorijų įvertinimas"
      title: "Kalorijų sudeginimo skaičiuoklė",
      // Alternate Descriptions:
      // "Sužinokite, kiek kalorijų išeikvojate sportuodami."
      // "Įvertinkite energijos sąnaudas skirtingoms veikloms."
      description: "Sužinokite, kiek kalorijų sudeginate įvairių veiklų metu.",
    },
    {
      id: "water",
      show: showWaterIntakeCalculator,
      href: "/vandens-norma",
      // Alternate Titles:
      // "Dienos vandens normos skaičiuoklė"
      // "Vandens poreikio apskaičiavimas"
      title: "Vandens poreikio skaičiuoklė",
      // Alternate Descriptions:
      // "Apskaičiuokite optimalų vandens kiekį pagal svorį, aktyvumą ir klimatą."
      // "Padėkite organizmui išlikti tinkamai hidratuotam kiekvieną dieną."
      description:
        "Apskaičiuokite, kiek vandens reikia skirtingomis sąlygomis.",
    },
  ];

  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Kitos skaičiuoklės, kurios gali jus sudominti
      </h3>

      <div className="flex flex-col sm:flex-row gap-4">
        {links
          .filter((link) => link.show)
          .map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="relative flex items-center bg-white p-5 rounded-md sm:w-1/2 hover:bg-gray-50 transition shadow"
            >
              <div className="mr-8">
                <h5 className="text-base font-semibold leading-normal text-neutral-700 hover:text-gray-900">
                  {link.title}
                </h5>
                <p className="text-xs text-gray-600 mt-1">{link.description}</p>
              </div>
              <div
                className="absolute right-4"
                style={{ animation: "horizontalBounce 1.5s infinite" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500 hover:text-emerald-700"
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
      </div>
    </section>
  );
};

export default RecommendedCalculatorsSection;
