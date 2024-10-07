import { useState } from "react";

const categoryList = [
  {
    id: 1,
    index: "< 18.5",
    category: "Mažas",
    isCurrent: false,
    min: 0,
    max: 18.5,
  },
  {
    id: 2,
    index: "18.5 - 24.9",
    category: "Normalus",
    isCurrent: false,
    min: 18.5,
    max: 24.9,
  },
  {
    id: 3,
    index: "25 - 29.9",
    category: "Antsvoris",
    isCurrent: false,
    min: 25,
    max: 29.9,
  },
  {
    id: 4,
    index: "30 - 34.9",
    category: "Pirmo lygio nutukimas",
    isCurrent: false,
    min: 30,
    max: 34.9,
  },
  {
    id: 5,
    index: "35 - 39.9",
    category: "Antro lygio nutukimas",
    isCurrent: false,
    min: 35,
    max: 39.9,
  },
  {
    id: 6,
    index: "> 40.0",
    category: "Trečio lygio nutukimas",
    isCurrent: false,
    min: 40,
    max: Infinity,
  },
];

const faqs = [
  {
    question: "Ar KMI apskaičiavimas tikslus visiems?",
    answer:
      "Ne visada. KMI gali būti netikslus tam tikroms žmonių grupėms, pvz., sportininkams, kurie turi daugiau raumenų masės, nėščioms ir žindančioms moterims, vaikams bei vyresnio amžiaus žmonėms. Tai tik apytikslis rodiklis, todėl norint išsamiau įvertinti sveikatos būklę, rekomenduojama kreiptis į sveikatos specialistą.",
  },
  {
    question: "Ar pakanka remtis tik KMI vertinant sveikatą?",
    answer:
      "Ne. KMI yra tik vienas iš būdų įvertinti kūno svorį ir sveikatą, bet jis nėra galutinis rodiklis. Sveikatai įtakos turi ir kiti veiksniai, tokie kaip kraujospūdis, cholesterolio lygis, genetika ir gyvenimo būdas. Jei turite abejonių dėl sveikatos, rekomenduojama kreiptis į sveikatos priežiūros specialistą.",
  },
  {
    question: "Kaip apskaičiuojamas KMI?",
    answer:
      "KMI apskaičiuojamas pagal formulę: svoris (kg) / ūgis (m²). Pavyzdžiui, jei žmogus sveria 70 kg ir jo ūgis yra 1,75 m, KMI bus apskaičiuotas kaip 70 / (1,75 * 1,75) = 22,86.",
  },
  {
    question: "Kokia yra normali KMI reikšmė?",
    answer:
      "Normalus KMI paprastai laikomas, kai jis yra tarp 18,5 ir 24,9. KMI žemiau 18,5 rodo, kad žmogus yra per mažo svorio, o KMI tarp 25 ir 29,9 rodo viršsvorį. KMI, kuris yra 30 ar daugiau, rodo nutukimą.",
  },
  {
    question: "Ar galima naudoti KMI ligoms diagnozuoti?",
    answer:
      "Ne. KMI yra tik priemonė, skirta įvertinti svorio ir ūgio santykį. Jis nėra skirtas diagnozuoti ligų ar kitų sveikatos būklių. Norint tiksliai nustatyti sveikatos problemas, būtina konsultuotis su gydytoju.",
  },
  {
    question: "Ar galiu naudoti KMI skaičiuoklę, jei esu nėščia ar žindanti?",
    answer:
      "KMI skaičiuoklė gali būti netiksli nėštumo ar žindymo metu, nes šie gyvenimo etapai gali labai pakeisti kūno svorį ir sudėtį. Nėščioms ir žindančioms moterims rekomenduojama pasitarti su sveikatos specialistu dėl tinkamo svorio valdymo.",
  },
  {
    question: "Ar gali KMI būti netikslus žmonėms, turintiems daug raumenų?",
    answer:
      "Taip. KMI nesiskiria tarp raumenų masės ir riebalinio audinio, todėl žmonės, turintys daug raumenų (pvz., sportininkai), gali turėti didesnį KMI, nors jų kūno riebalų procentas yra mažas. Tokiais atvejais gali būti naudinga atlikti papildomus kūno sudėties tyrimus.",
  },
  {
    question: "Kaip galiu pagerinti savo KMI?",
    answer:
      "Jei jūsų KMI yra už normalaus diapazono ribų, galite imtis sveikos mitybos pokyčių ir reguliariai sportuoti. Jei turite klausimų apie svorio valdymą, dietą ar fizinį aktyvumą, kreipkitės į dietologą ar kitą sveikatos specialistą.",
  },
  {
    question: "Kaip dažnai turėčiau tikrinti savo KMI?",
    answer:
      "Nėra konkretaus dažnumo, kaip dažnai turėtumėte tikrinti savo KMI, tačiau paprastai pakanka atlikti matavimus, kai keičiasi jūsų svoris arba sveikatos būklė. Jei ketinate numesti arba priaugti svorio, KMI stebėjimas gali padėti sekti progresą.",
  },
];

export default function BodyMassIndexCalc() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [categories, setCategories] = useState(categoryList);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showIcon, setShowIcon] = useState(false);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const updateCategories = (bmi) => {
    const currentCat = categories.find(
      (category) => bmi >= category.min && bmi <= category.max
    );

    if (!currentCat) {
      console.error("Kategorija nerasta KMI reikšmei:", bmi);
      return;
    }

    const updatedCategories = categories.map((category) => {
      return { ...category, isCurrent: category.id === currentCat.id };
    });

    setCategories(updatedCategories);
    setCurrentCategory(currentCat);
  };

  const handleCalculateBMI = (e) => {
    e.preventDefault();

    setCategories(
      categoryList.map((category) => ({ ...category, isCurrent: false }))
    );

    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);

    if (
      isNaN(weightInKg) ||
      isNaN(heightInCm) ||
      weightInKg <= 0 ||
      heightInCm <= 0
    ) {
      alert("Prašome įvesti teisingus svorio ir ūgio duomenis.");
      return;
    }

    const bmiValue = calculateBMI(weightInKg, heightInCm);

    setBmi(bmiValue);

    // Show the tick icon after calculation
    setShowIcon(true);

    // Optionally hide it after a few seconds
    setTimeout(() => {
      setShowIcon(false);
      updateCategories(bmiValue);
    }, 1600);
  };

  const calculatePinPosition = (bmi) => {
    const minBMI = 15.5;
    const maxBMI = 33.5;
    const relativeBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
    return ((relativeBMI - minBMI) / (maxBMI - minBMI)) * 100;
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCurrentCategory(null);

    setCategories(
      categoryList.map((category) => ({ ...category, isCurrent: false }))
    );
  };

  return (
    <>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
          <form
            onSubmit={handleCalculateBMI}
            className="w-full max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
          >
            <div className="p-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Kūno masės indekso skaičiuoklė
              </h1>
              <div className="mt-7 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ūgis
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      value={height}
                      name="height"
                      id="height"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="170"
                      aria-describedby="height-value"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="height-value"
                      >
                        cm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Svoris
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      value={weight}
                      name="weight"
                      id="weight"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="67"
                      aria-describedby="weight-value"
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="weight-value"
                      >
                        kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 py-4 px-8">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Ištrinti
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-navy-blue shadow-sm hover:bg-indigo-100"
              >
                Skaičiuoti
              </button>
            </div>
          </form>
          {bmi &&
            (showIcon ? (
              <div className="flex w-full max-w-xl flex-col bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl justify-center">
                <div className="flex justify-center place-content-center">
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="flex w-full max-w-xl flex-col bg-white p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl justify-between">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 flex items-center">
                    <p className="text-sm">Apskaičiuotas KMI:</p>
                  </div>
                  <div className="col-span-1 flex text-gray-900">
                    <p className="text-4xl font-bold">{bmi}</p>
                  </div>

                  <div className="col-span-1 flex">
                    <p className="text-sm">Svorio kategorija:</p>
                  </div>
                  <div className="col-span-1 flex">
                    <span className="font-semibold">
                      {currentCategory.category}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "16px",
                    marginTop: "20px",
                    marginBottom: "24px",
                    background:
                      "linear-gradient(to right, #87CEEB, #00FA9A, #FFD700, #FF6347)",
                    borderRadius: "10px",
                    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: `${calculatePinPosition(bmi)}%`,
                      transform: "translateX(-50%)",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#333",
                      border: "4px solid white",
                      transition: "left 0.3s ease-in-out",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "0%",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    Mažas
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "33%",
                      transform: "translateX(-50%)",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    Normalus
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "67%",
                      transform: "translateX(-50%)",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    Antsvoris
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      right: "0",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    Nutukimas
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 pt-10">
          <div className="max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl xl:max-w-none">
            <div className="p-8">
              <div className="grid grid-cols-1 gap-x-12 space-y-8 xl:space-y-0 xl:grid-cols-2">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <p className="text-base leading-7 text-gray-600">
                      <b>Kūno masės indeksas (KMI) </b> yra paprastas ir plačiai
                      naudojamas įrankis, padedantis įsivertinti, ar Jūsų svoris
                      yra normalus. KMI gali suteikti bendrą supratimą apie Jūsų
                      kūno svorio kategoriją, tačiau tai tik vienas iš daugelio
                      būdų vertinti sveikatą.
                    </p>
                    <div className="mt-2 text-base leading-7 text-gray-600">
                      Svarbu žinoti:
                      <ul className="list-inside list-disc">
                        <li>
                          KMI skaičiuoklė yra skirta suaugusiems nuo 20 metų.
                          Rezultatai gali būti netikslūs nėštumo, žindymo
                          laikotarpiu arba kitų sveikatos būklių atveju.
                        </li>
                        <li>
                          KMI nesuteikia visos informacijos apie sveikatą ar
                          kūno sudėtį. Pavyzdžiui, jis neatsižvelgia į raumenų
                          masę, kūno riebalų pasiskirstymą ar kitus svarbius
                          faktorius.
                        </li>
                        <li>
                          Šis skaičiuoklės rezultatas neturėtų būti naudojamas
                          ligų diagnozei. Jeigu turite sveikatos problemų arba
                          kyla abejonių dėl savo sveikatos, kreipkitės į
                          sveikatos priežiūros specialistą.
                        </li>
                      </ul>
                    </div>
                    <p className="mt-2 text-base leading-7 text-gray-600">
                      <b>
                        Pateikta informacija yra tik švietimo tikslais ir
                        nepakeičia profesionalių medicininių patarimų.{" "}
                      </b>{" "}
                      Jei turite klausimų apie savo sveikatos būklę arba reikia
                      individualios konsultacijos, kreipkitės į kvalifikuotą
                      sveikatos priežiūros specialistą.
                    </p>
                  </div>
                </div>
                <div className="h-min ring-1 ring-gray-300 sm:mx-0 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Kūno masės indeksas
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          Kūno svoris
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className="border-t border-gray-200 px-3 py-3.5 text-sm text-gray-600 lg:table-cell">
                            {category.index}
                            {category.isCurrent ? (
                              <span className="ml-3 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Jūsų KMI
                              </span>
                            ) : null}
                          </td>
                          <td className="border-t border-gray-200 px-3 py-3.5 text-sm text-gray-600 lg:table-cell">
                            {category.category}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <div className="p-8">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                D.U.K
              </h2>
              <div className="mt-8 space-y-10">
                <dl className="space-y-16 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-16 md:space-y-0 2xl:grid-cols-3 2xl:gap-x-10">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <dt className="text-base font-semibold leading-7 text-gray-900">
                        {faq.question}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-600">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
