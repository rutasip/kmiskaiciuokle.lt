import { useState, useRef, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
    question: "Kas yra idealus svoris?",
    answer:
      "Idealus svoris yra apytikslė kūno svorio reikšmė, atsižvelgiant į Jūsų ūgį ir lytį. Jis padeda įvertinti, ar Jūsų svoris yra sveiko diapazono ribose.",
  },
  {
    question: "Kaip apskaičiuojamas idealus svoris?",
    answer:
      "Idealus svoris apskaičiuojamas naudojant standartines formules, kurios atsižvelgia į Jūsų ūgį ir lytį. Tai suteikia bendrą supratimą apie galimą sveiką svorio diapazoną.",
  },
  {
    question: "Ar KMI apskaičiavimas tikslus visiems?",
    answer:
      "Ne visada. KMI gali būti netikslus tam tikroms žmonių grupėms, pvz., sportininkams, nėščioms ir žindančioms moterims, vaikams bei vyresnio amžiaus žmonėms. Tai tik apytikslis rodiklis.",
  },
  {
    question: "Ar pakanka remtis tik KMI vertinant sveikatą?",
    answer:
      "Ne. KMI yra tik vienas iš būdų įvertinti kūno svorį. Sveikatai įtakos turi ir kiti veiksniai, tokie kaip kraujospūdis, cholesterolio lygis, genetika ir gyvenimo būdas.",
  },
  {
    question: "Ar galiu pasikliauti skaičiuoklės rezultatais?",
    answer:
      "Skaičiuoklės rezultatai yra informacinio pobūdžio ir neturėtų būti laikomi medicininiais patarimais. Jei turite abejonių, kreipkitės į sveikatos priežiūros specialistą.",
  },
  {
    question: "Atsakomybės apribojimas",
    answer:
      "Ši skaičiuoklė yra skirta tik informaciniams tikslams ir nėra medicininis patarimas. Mes neprisiimame atsakomybės už jokius sveikatos sutrikimus ar žalą, kuri gali atsirasti naudojantis šia skaičiuokle.",
  },
];

export default function BodyMassIndexCalc() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [categories, setCategories] = useState(categoryList);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  const [showIdealWeight, setShowIdealWeight] = useState(false);
  const [gender, setGender] = useState("");
  const [idealWeight, setIdealWeight] = useState(null);
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [genderError, setGenderError] = useState("");

  const resultsRef = useRef(null);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const calculateIdealWeight = (height, gender) => {
    const heightInCm = parseFloat(height);
    const heightInInches = heightInCm / 2.54;
    let weight = 0;

    if (gender === "male") {
      weight = 50 + 2.3 * (heightInInches - 60);
    } else if (gender === "female") {
      weight = 45.5 + 2.3 * (heightInInches - 60);
    }

    return weight.toFixed(1);
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

    setWeightError("");
    setHeightError("");
    setGenderError("");

    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);

    let isValid = true;

    if (isNaN(weightInKg)) {
      setWeightError("Prašome įvesti svorį.");
      isValid = false;
    }

    if (weightInKg <= 0) {
      setWeightError("Prašome įvesti teisingą svorį.");
      isValid = false;
    }

    if (isNaN(heightInCm)) {
      setHeightError("Prašome įvesti ūgį.");
      isValid = false;
    }

    if (heightInCm <= 0) {
      setHeightError("Prašome įvesti teisingą ūgį.");
      isValid = false;
    }

    if (showIdealWeight && !gender) {
      setGenderError("Prašome pasirinkti lytį.");
      isValid = false;
    }

    if (!isValid) {
      setShowIcon(false);
      return;
    }

    setShowIcon(true);

    const bmiValue = calculateBMI(weightInKg, heightInCm);
    setBmi(bmiValue);

    if (showIdealWeight && gender) {
      const idealWeightValue = calculateIdealWeight(heightInCm, gender);
      setIdealWeight(idealWeightValue);
    } else {
      setIdealWeight(null);
    }

    setCategories(
      categoryList.map((category) => ({ ...category, isCurrent: false }))
    );

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

  useEffect(() => {
    if (showIcon && bmi) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showIcon, bmi]);

  return (
    <>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
          <form
            onSubmit={handleCalculateBMI}
            className="w-full max-w-2xl h-fit bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-md"
          >
            <div className="gap-x-6 border-b border-gray-900/10 p-8">
              <h1 className="text-lg font-semibold leading-7 text-gray-900">
                Kūno masės indekso skaičiuoklė
              </h1>
              <h2 className="mt-4 text-sm leading-6 text-gray-600">
                Apskaičiuokite save kūno masės indeksą (KMI) ir sužinokite, ar
                Jūsų svoris yra sveikame diapazone. Taip pat galite sužinoti
                idealų svorį pagal ūgį ir lytį.
              </h2>
            </div>
            <div className="p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                  {heightError && (
                    <p className="mt-1 text-sm text-red-600">{heightError}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="weight"
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
                  {weightError && (
                    <p className="mt-1 text-sm text-red-600">{weightError}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <div className="flex items-center">
                    <input
                      id="showIdealWeight"
                      name="showIdealWeight"
                      type="checkbox"
                      checked={showIdealWeight}
                      onChange={(e) => setShowIdealWeight(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                    />
                    <label
                      htmlFor="showIdealWeight"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Noriu sužinoti idealų svorį
                    </label>
                  </div>
                </div>

                {showIdealWeight && (
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Lytis
                    </label>
                    <fieldset className="mt-2 sm:mt-3">
                      <legend className="sr-only">Lyties pasirinkimas</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                        <div className="flex items-center">
                          <input
                            id="female"
                            name="gender"
                            type="radio"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
                          />
                          <label
                            htmlFor="female"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Moteris
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="male"
                            name="gender"
                            type="radio"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="male"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Vyras
                          </label>
                        </div>
                      </div>
                      {genderError && (
                        <p className="mt-1 text-sm text-red-600">
                          {genderError}
                        </p>
                      )}
                    </fieldset>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end gap-x-6 mt-10">
                <button
                  type="submit"
                  className="w-1/2 rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  Skaičiuoti
                </button>
              </div>
            </div>
          </form>
          <div
            ref={resultsRef}
            style={{ scrollMarginTop: "80px" }}
            className={classNames(
              bmi && !showIcon && "bg-white h-fit",
              "flex w-full max-w-2xl flex-col p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-md justify-center"
            )}
          >
            {bmi ? (
              showIcon ? (
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
              ) : (
                <div>
                  <div className="p-6 bg-gray-50 rounded-md shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">KMI</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {bmi}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Svorio kategorija
                        </p>
                        <p className="font-semibold text-gray-900">
                          {currentCategory.category}
                        </p>
                      </div>
                      {idealWeight && (
                        <div className="">
                          <p className="text-sm font-medium text-gray-700">
                            Idealus svoris
                          </p>
                          <p className="font-semibold text-gray-900">
                            {idealWeight} kg
                          </p>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "14px",
                        marginTop: "46px",
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
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          backgroundColor: "#333",
                          border: "3px solid white",
                          transition: "left 0.3s ease-in-out",
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
                          left: "0%",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        Mažas svoris
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
                          left: "33%",
                          transform: "translateX(-50%)",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        Normalus svoris
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
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
                          top: "26px",
                          right: "0",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        Nutukimas
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-sm text-gray-700 mb-2">
                      Rekomenduojamos skaičiuoklės:
                    </p>
                    <div className="space-y-2">
                      <a
                        href="/sudeginamos-kalorijos"
                        className="block p-3 rounded-md transition hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              Kalorijų sudeginimo skaičiuoklė
                            </p>
                            <p className="text-xs text-gray-600">
                              Sužinokite, kiek kalorijų sudeginate įvairių
                              veiklų metu.
                            </p>
                          </div>
                          <div className="ml-auto">
                            <svg
                              className="h-4 w-4 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <a
                        href="/kaloriju-poreikiai"
                        className="block p-3 rounded-md transition hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              Dienos kalorijų poreikio skaičiuoklė
                            </p>
                            <p className="text-xs text-gray-600">
                              Asmeninis kalorijų poreikis pagal aktyvumo lygį.
                            </p>
                          </div>
                          <div className="ml-auto">
                            <svg
                              className="h-4 w-4 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <p className="text-sm text-gray-500 text-center">
                Įveskite duomenis ir spauskite &quot;Skaičiuoti&quot;, kad
                pamatytumėte rezultatus.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 pt-10">
          <div className="max-w-2xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-md xl:max-w-none">
            <div className="p-8">
              <div className="grid grid-cols-1 gap-x-12 space-y-8 xl:space-y-0 xl:grid-cols-2">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <p className="text-base leading-7 text-gray-600">
                      <b>Kūno masės indeksas (KMI)</b> yra paprastas ir plačiai
                      naudojamas įrankis, padedantis įsivertinti, ar Jūsų svoris
                      yra normalus. KMI gali suteikti bendrą supratimą apie Jūsų
                      kūno svorio kategoriją, tačiau tai tik vienas iš daugelio
                      būdų vertinti sveikatą.
                    </p>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      <b>Idealus svoris</b> yra apytikslė reikšmė, nustatoma
                      pagal Jūsų ūgį ir lytį. Tai gali padėti suprasti, koks
                      svoris gali būti laikomas sveiku Jums individualiai.
                    </p>
                    <div className="mt-4 text-base leading-7 text-gray-600">
                      Svarbu žinoti:
                      <ul className="list-inside list-disc">
                        <li>
                          KMI ir idealaus svorio skaičiuoklės yra skirtos
                          suaugusiems nuo 20 metų. Rezultatai gali būti
                          netikslūs nėštumo, žindymo laikotarpiu arba kitų
                          sveikatos būklių atveju.
                        </li>
                        <li>
                          Šios skaičiuoklės nesuteikia visos informacijos apie
                          sveikatą ar kūno sudėtį. Jos neatsižvelgia į raumenų
                          masę, kūno riebalų pasiskirstymą ar kitus svarbius
                          faktorius.
                        </li>
                        <li>
                          Rezultatai yra informacinio pobūdžio ir neturėtų būti
                          naudojami ligų diagnozei ar gydymui. Jei turite
                          sveikatos problemų arba kyla abejonių dėl savo
                          sveikatos, kreipkitės į sveikatos priežiūros
                          specialistą.
                        </li>
                      </ul>
                    </div>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      <b>
                        Pateikta informacija yra tik švietimo tikslais ir
                        nepakeičia profesionalių medicininių patarimų.
                      </b>{" "}
                      Jei turite klausimų apie savo sveikatos būklę arba reikia
                      individualios konsultacijos, kreipkitės į kvalifikuotą
                      sveikatos priežiūros specialistą.
                    </p>
                  </div>
                </div>
                <div className="h-min ring-1 ring-gray-300 sm:mx-0 rounded-md">
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
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-md">
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

        <div className="pt-10 px-8 sm:px-0">
          <p className="text-sm text-gray-500">
            Ši skaičiuoklė yra skirta tik informaciniams tikslams. Nors
            stengiamės pateikti tikslią informaciją, mes neprisiimame
            atsakomybės už jokius sveikatos sutrikimus ar žalą, kuri gali
            atsirasti naudojantis šia skaičiuokle. Prieš keisdami savo įpročius,
            pasitarkite su sveikatos priežiūros specialistu.
          </p>
        </div>
      </div>
    </>
  );
}
