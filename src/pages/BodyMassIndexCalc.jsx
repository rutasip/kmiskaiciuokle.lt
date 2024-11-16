import { useState, useRef, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const categoryList = [
  {
    id: 1,
    index: "< 18.5",
    category: "Nepakankamas svoris",
    risks: "Padidėjusi rizika",
    isCurrent: false,
    min: 0,
    max: 18.5,
  },
  {
    id: 2,
    index: "18.5 – 24.9",
    category: "Normalus svoris",
    risks: "Mažiausia rizika",
    isCurrent: false,
    min: 18.5,
    max: 24.9,
  },
  {
    id: 3,
    index: "25 – 29.9",
    category: "Antsvoris",
    risks: "Padidėjusi rizika",
    isCurrent: false,
    min: 25,
    max: 29.9,
  },
  {
    id: 4,
    index: "30 – 34.9",
    category: "I laipsnio nutukimas",
    risks: "Didelė rizika",
    isCurrent: false,
    min: 30,
    max: 34.9,
  },
  {
    id: 5,
    index: "35 – 39.9",
    category: "II laipsnio nutukimas",
    risks: "Labai didelė rizika",
    isCurrent: false,
    min: 35,
    max: 39.9,
  },
  {
    id: 6,
    index: "≥ 40",
    category: "III laipsnio nutukimas",
    risks: "Itin didelė rizika",
    isCurrent: false,
    min: 40,
    max: Infinity,
  },
];

const normalIndexRanges = [
  {
    id: 1,
    age: "19–24 metai",
    women: 19.5,
    men: 21.4,
  },
  {
    id: 2,
    age: "25–34 metai",
    women: 23.2,
    men: 21.6,
  },
  {
    id: 3,
    age: "35–44 metai",
    women: 23.4,
    men: 22.9,
  },
  {
    id: 4,
    age: "45–54 metai",
    women: 25.2,
    men: 25.8,
  },
  {
    id: 5,
    age: "Daugiau nei 55",
    women: 27.3,
    men: 26.6,
  },
];

const faqs = [
  {
    question: "Kas yra idealus svoris?",
    answer:
      "Idealus svoris – tai apytikslė kūno svorio reikšmė, atsižvelgiant į Jūsų ūgį, amžių ir lytį. Jis padeda įvertinti, koks svoris gali būti laikomas sveiku Jums individualiai.",
  },
  {
    question: "Ar KMI tinka visiems žmonėms?",
    answer:
      "Ne visada. KMI gali būti netikslus sportininkams, nėščioms moterims, vaikams, paaugliams ir vyresnio amžiaus žmonėms.",
  },
  {
    question: "Ar turėčiau remtis tik KMI vertindamas savo sveikatą?",
    answer:
      "Ne. KMI yra tik vienas iš įrankių. Svarbu atsižvelgti į kitus veiksnius, tokius kaip kūno riebalų procentas, juosmens apimtis, mityba, fizinis aktyvumas ir bendras gyvenimo būdas.",
  },
  {
    question: "Ką daryti, jei mano KMI yra per didelis arba per mažas?",
    answer:
      "Pasitarkite su sveikatos priežiūros specialistu. Jie gali padėti nustatyti priežastis ir pasiūlyti tinkamą veiksmų planą.",
  },
  {
    question: "Ar galiu pasikliauti KMI skaičiuoklės rezultatais?",
    answer:
      "KMI skaičiuoklės rezultatai yra orientaciniai. Jei turite klausimų ar rūpesčių dėl savo sveikatos, kreipkitės į profesionalą.",
  },
];

export default function BodyMassIndexCalc() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [categories, setCategories] = useState(categoryList);
  const [currentCategory, setCurrentCategory] = useState(null);
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
    return parseFloat(bmi.toFixed(2));
  };

  const calculateIdealWeight = (height, gender) => {
    const heightInCm = parseFloat(height);
    const heightInMeters = heightInCm / 100;
    let idealWeight = 0;

    if (gender === "male") {
      idealWeight = 22.5 * heightInMeters * heightInMeters;
    } else if (gender === "female") {
      idealWeight = 21 * heightInMeters * heightInMeters;
    }

    return idealWeight.toFixed(1);
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
      return;
    }

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

    updateCategories(bmiValue);
  };

  const calculatePinPosition = (bmi) => {
    const minBMI = 15.5;
    const maxBMI = 33.5;
    const relativeBMI = Math.min(Math.max(bmi, minBMI), maxBMI);
    return ((relativeBMI - minBMI) / (maxBMI - minBMI)) * 100;
  };

  useEffect(() => {
    if (bmi) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [bmi]);

  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 justify-items-center">
          <h1 className="text-[33px] font-[300] text-gray-700 mr-auto mb-10">
            Kūno masės indekso skaičiuoklė
          </h1>
          <form
            onSubmit={handleCalculateBMI}
            className="w-full h-fit bg-white sm:rounded-md ring-1 ring-slate-200"
          >
            <div className="p-6">
              <div className="grid max-w-2xl grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="height" className="block text-base">
                    Ūgis
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      value={height}
                      name="height"
                      id="height"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
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
                    <p className="mt-2 text-sm text-pink-600">{heightError}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="weight" className="block text-base">
                    Svoris
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      value={weight}
                      name="weight"
                      id="weight"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                      placeholder="70"
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
                    <p className="mt-2 text-sm text-pink-600">{weightError}</p>
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
                      className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    />
                    <label
                      htmlFor="showIdealWeight"
                      className="ml-2 block text-base"
                    >
                      Noriu sužinoti idealų svorį
                    </label>
                  </div>
                </div>

                {showIdealWeight && (
                  <div className="sm:col-span-3">
                    <label className="block text-base">Lytis</label>
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
                            className="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-500"
                          />
                          <label
                            htmlFor="female"
                            className="ml-3 block font-medium"
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
                            className="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-500"
                          />
                          <label
                            htmlFor="male"
                            className="ml-3 block font-medium"
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
              <div className="flex items-center justify-end gap-x-6 mt-8">
                <button
                  type="submit"
                  className="rounded-md text-[15px] leading-normal py-2 px-8 bg-accent font-semibold text-on-accent shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                  Skaičiuoti
                </button>
              </div>
            </div>
          </form>

          {bmi && (
            <div
              ref={resultsRef}
              style={{ scrollMarginTop: "80px" }}
              className={classNames(
                bmi && "bg-white h-fit",
                "flex w-full flex-col p-6 shadow-sm ring-2 ring-gray-900/5 sm:rounded-md justify-center"
              )}
            >
              <div>
                <div className="pb-8 border-b border-neutral-200">
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

                <div className="mt-6">
                  <p className="text-sm text-gray-700 mb-3 selection:bg-fuchsia-300 selection:text-fuchsia-900">
                    Rekomenduojamos skaičiuoklės:
                  </p>
                  <div className="space-y-2">
                    <a
                      href="/sudeginamos-kalorijos"
                      className="block p-3 rounded-md transition bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-gray-500 hover:text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-800 hover:text-gray-900">
                            Kalorijų sudeginimo skaičiuoklė
                          </p>
                          <p className="text-xs text-gray-600 hover:text-gray-800">
                            Sužinokite, kiek kalorijų sudeginate įvairių veiklų
                            metu.
                          </p>
                        </div>
                        <div className="ml-auto">
                          <svg
                            className="h-4 w-4 text-gray-500 hover:text-gray-700"
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
                      className="block p-3 rounded-md transition bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-6 w-6 text-gray-500 hover:text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-800 hover:text-gray-900">
                            Dienos kalorijų poreikio skaičiuoklė
                          </p>
                          <p className="text-xs text-gray-600 hover:text-gray-800">
                            Asmeninis kalorijų poreikis pagal aktyvumo lygį.
                          </p>
                        </div>
                        <div className="ml-auto">
                          <svg
                            className="h-4 w-4 text-gray-500 hover:text-gray-700"
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
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 mt-10">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white sm:rounded-md ring-1 ring-slate-200 p-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Kas yra KMI?
                </h2>
                <p className="mt-4">
                  Kūno masės indeksas (<b>KMI</b>) – tai skaičius, gaunamas
                  padalinus kūno svorį kilogramais iš ūgio metrais kvadratu:
                </p>
                <p className="mt-2 font-medium italic">
                  KMI = svoris (kg) / [ūgis (m)]²
                </p>
                <p className="mt-2">
                  Jis padeda nustatyti, ar žmogaus svoris yra
                  <b> per mažas</b>,<b> normalus</b>, ar
                  <b> per didelis</b> (<b>antsvoris</b> ar
                  <b> nutukimas</b>). KMI plačiai naudojamas sveikatos
                  priežiūros specialistų, mitybos konsultantų ir sporto
                  trenerių.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  KMI istorija
                </h2>
                <p className="mt-4">
                  KMI buvo sukurtas <b>1832 m.</b> belgų matematiko
                  <b> Lamberto Adolphe&apos;o Jacques&apos;o Quetelet</b>. Jo
                  tikslas buvo lengvai ir greitai įvertinti tam tikros
                  populiacijos antsvorio ir nutukimo lygį, kad padėtų
                  vyriausybėms paskirstyti sveikatos ir finansinius išteklius.{" "}
                  <span className="italic">
                    Nors Quetelet teigė, kad KMI nėra tinkamas vertinant
                    individualius asmenis
                  </span>
                  , šiandien jis plačiai naudojamas kaip vienas iš pagrindinių
                  įrankių vertinant tiek populiacijų, tiek individualių asmenų
                  kūno svorį ir sveikatos būklę, nepaisant jo ribotumų.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  Nutukimas Lietuvoje: ką sako statistika?
                </h2>
                <p className="mt-4">
                  Jei Jūsų svoris viršija rekomenduojamą, priklausote
                  <b> 57% </b>Lietuvos gyventojų, turinčių antsvorį ar nutukimą.
                  Apie
                  <b> 38% </b>suaugusiųjų Lietuvoje turi antsvorį (KMI 25–30), o
                  <b> 19% </b>kenčia nuo nutukimo (KMI &gt; 30). Per
                  pastaruosius metus vidutinis suaugusiųjų KMI Lietuvoje augo,
                  ypač tarp vyresnių amžiaus grupių.
                  <b> Pasaulio sveikatos organizacija pabrėžia</b>, kad
                  antsvoris ir nutukimas didina įvairių lėtinių ligų riziką,
                  įskaitant širdies ir kraujagyslių ligas bei diabetą. Daugiau
                  informacijos rasite{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                  >
                    čia
                  </a>
                  .
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  Kaip apskaičiuoti KMI?
                </h2>
                <p className="mt-4">
                  KMI apskaičiuojamas pagal <b>šią formulę:</b>
                </p>
                <p className="mt-2 italic">
                  <b>KMI = svoris (kg) / [ūgis (m)]²</b>
                </p>
                <p className="mt-4 font-medium">Pavyzdys:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>
                    <b>Svoris:</b> 70 kg
                  </li>
                  <li>
                    <b>Ūgis:</b> 1,75 m
                  </li>
                </ul>
                <p className="mt-2 italic">
                  <b>KMI = 70 / (1,75)² = 22,86</b>
                </p>
                <div className="mt-8">
                  <p className="mb-4">
                    Žemiau pateiktoje lentelėje galite matyti KMI reikšmių
                    intervalus, jų atitikmenis sveikatos būklei ir galimai ligų
                    rizikai.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left font-medium text-gray-900"
                          >
                            KMI reikšmė
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left font-medium text-gray-900"
                          >
                            Būklė
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left font-medium text-gray-900"
                          >
                            Ligų rizika
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category) => (
                          <tr key={category.id}>
                            <td className="border-t border-gray-200 px-4 py-3">
                              {category.index}
                              {category.isCurrent && (
                                <span className="ml-3 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                  Jūsų KMI
                                </span>
                              )}
                            </td>
                            <td className="border-t border-gray-200 px-4 py-3">
                              {category.category}
                            </td>
                            <td className="border-t border-gray-200 px-4 py-3">
                              {category.risks}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  KMI pagal amžių ir lytį
                </h2>
                <p className="mt-4">
                  <b>Amžius</b> ir
                  <b> lytis</b> taip pat gali turėti įtakos KMI interpretacijai.
                </p>
                <p className="mb-4">
                  Žemiau pateiktoje lentelėje galite matyti KMI normų skirtumus
                  pagal amžiaus grupes ir lytį.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="px-4 py-3.5 text-left font-medium text-gray-900">
                          Amžius
                        </th>
                        <th className="px-4 py-3.5 text-left font-medium text-gray-900">
                          Moterų KMI
                        </th>
                        <th className="px-4 py-3.5 text-left font-medium text-gray-900">
                          Vyrų KMI
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalIndexRanges.map((range) => (
                        <tr key={range.id}>
                          <td className="border-t border-gray-200 px-4 py-3">
                            {range.age}
                          </td>
                          <td className="border-t border-gray-200 px-4 py-3">
                            {range.women}
                          </td>
                          <td className="border-t border-gray-200 px-4 py-3">
                            {range.men}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  KMI ribotumai
                </h2>
                <p className="mt-4">
                  Nors KMI yra naudingas rodiklis, jis turi tam tikrų
                  apribojimų:
                </p>
                <ul className="mt-4 list-disc list-inside space-y-4">
                  <li>
                    <b>Neatsižvelgia į kūno sudėtį:</b> KMI neskiria raumenų
                    masės nuo riebalų masės. Todėl sportininkai ar raumeningi
                    asmenys gali turėti aukštą KMI, nors jų kūno riebalų
                    procentas yra mažas.
                  </li>
                  <li>
                    <b>Amžius ir lytis:</b> Vaikams, paaugliams ir vyresnio
                    amžiaus žmonėms KMI gali būti netikslus. Taip pat reikia
                    atsižvelgti į lytį, nes moterų ir vyrų kūno sudėtis
                    skiriasi.
                  </li>
                  <li>
                    <b>Nėštumas:</b> Nėščiosios neturėtų naudoti KMI kaip
                    sveikatos rodiklio, nes svorio padidėjimas yra natūralus ir
                    būtinas kūdikio vystymuisi.
                  </li>
                  <li>
                    <b>Rasės ir etninės grupės skirtumai:</b> KMI ribos,
                    apibrėžiančios antsvorį ar nutukimą, ne visada tiksliai
                    atspindi sveikatos riziką skirtingoms rasinėms ar etninėms
                    grupėms. Pavyzdžiui, Azijos populiacijose sveikatos
                    problemos, susijusios su nutukimu, gali atsirasti esant
                    mažesniam KMI, palyginti su kitomis grupėmis.
                  </li>
                  <li>
                    <b>Sveikatos būklė:</b> KMI neatsižvelgia į kitus svarbius
                    sveikatos veiksnius, tokius kaip kraujospūdis, cholesterolio
                    lygis, cukraus kiekis kraujyje ir kiti rodikliai, kurie
                    padeda įvertinti širdies ir kraujagyslių ligų, diabeto ar
                    kitų ligų riziką.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  Sveikatos rizikos esant per mažam ar per dideliam KMI
                </h2>
                <p className="mt-4">
                  Tiek per mažas, tiek per didelis kūno masės indeksas (KMI)
                  gali sukelti įvairių sveikatos problemų. Žemiau pateikiamos
                  galimos rizikos, susijusios su KMI, kuris yra už sveikos
                  normos ribų.
                </p>
                <div className="mt-4">
                  <p className="font-medium">
                    Per mažas KMI (<span className="italic">&lt; 18.5</span>):
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>Mitybos nepakankamumas</li>
                    <li>Anemija (mažakraujystė)</li>
                    <li>Kaulų retėjimas (osteoporozė)</li>
                    <li>Susilpnėjusi imuninė sistema</li>
                    <li>Širdies problemos</li>
                  </ul>
                  <p className="mt-6 font-medium">
                    Per didelis KMI (<span className="italic">&gt; 25,0</span>):
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>Širdies ir kraujagyslių ligos</li>
                    <li>Aukštas kraujospūdis</li>
                    <li>2 tipo cukrinis diabetas</li>
                    <li>Kvėpavimo sutrikimai (miego apnėja)</li>
                    <li>Tam tikros vėžio rūšys</li>
                    <li>Kepenų ligos</li>
                    <li>Sąnarių problemos (osteoartritas)</li>
                  </ul>
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  Kaip palaikyti sveiką KMI?
                </h2>
                <p className="mt-4">
                  Palaikyti sveiką kūno masės indeksą (KMI) yra svarbu bendrai
                  sveikatai ir gerovei. Žemiau pateikiami patarimai padės Jums
                  pasiekti ir išlaikyti optimalų KMI.
                </p>
                <ol className="list-decimal list-inside mt-4 space-y-6">
                  <li>
                    <b>Sveika ir subalansuota mityba:</b>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>
                        Vartokite įvairius maisto produktus: daržoves, vaisius,
                        pilno grūdo produktus, liesus baltymus.
                      </li>
                      <li>
                        Ribokite sočiųjų riebalų, cukraus ir druskos vartojimą.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <b>Reguliarus fizinis aktyvumas:</b>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>
                        Bent 150 minučių vidutinio intensyvumo fizinės veiklos
                        per savaitę.
                      </li>
                      <li>
                        Įtraukite jėgos treniruotes bent 2 kartus per savaitę.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <b>Žalingų įpročių vengimas:</b>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>Nerūkykite.</li>
                      <li>Ribokite alkoholio vartojimą.</li>
                    </ul>
                  </li>
                  <li>
                    <b>Reguliarus poilsis ir streso valdymas:</b>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                      <li>Užtikrinkite pakankamą miego kiekį.</li>
                      <li>Praktikuokite streso valdymo technikas.</li>
                    </ul>
                  </li>
                </ol>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  Dažniausiai užduodami klausimai (D.U.K.)
                </h2>
                <p className="mt-4">
                  Žemiau rasite atsakymus į dažniausiai užduodamus klausimus
                  apie KMI.
                </p>
                <div className="space-y-6 mt-6">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium text-gray-800">
                        {faq.question}
                      </h3>
                      <p className="mt-2">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
                  Naudingi patarimai
                </h2>
                <p className="mt-4">
                  Šie patarimai padės jums palaikyti sveiką gyvenimo būdą ir
                  geriau pasirūpinti savo sveikata.
                </p>
                <ul className="list-disc list-inside mt-4 space-y-4">
                  <li>
                    <b>Stebėkite savo svorį reguliariai</b>, bet neperdėkite –
                    svarbu bendras sveikatos vaizdas.
                  </li>
                  <li>
                    <b>Pasirinkite fizinę veiklą, kuri jums patinka</b>, kad
                    lengviau jos laikytumėtės ilgalaikėje perspektyvoje.
                  </li>
                  <li>
                    <b>Įtraukite į mitybą daržovių ir vaisių</b>, nes jie yra
                    turtingi maistinėmis medžiagomis.
                  </li>
                  <li>
                    <b>Gerai išsimiegokite</b>, nes miego trūkumas gali paveikti
                    svorio reguliavimą.
                  </li>
                </ul>
              </section>
              Pastaba: Visada svarbu rūpintis savo sveikata atsakingai ir
              konsultuotis su specialistais dėl individualių rekomendacijų.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
