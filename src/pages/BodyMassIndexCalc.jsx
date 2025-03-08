import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import PageContentSection from "../components/PageContentSection";
import BackToTopButton from "../components/BackToTopButton";
import InputField from "../components/InputField";
import RadioGroupInput from "../components/RadioGroupInput";
import ResultsDisclaimer from "../components/ResultsDisclaimer";

import useScrollEffects from "../hooks/useScrollEffects";
import RecommendedCalculatorsSection from "../components/RecommendedCalculatorsSection";

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

// const normalIndexRanges = [
//   {
//     id: 1,
//     age: "19–24 metai",
//     women: 19.5,
//     men: 21.4,
//   },
//   {
//     id: 2,
//     age: "25–34 metai",
//     women: 23.2,
//     men: 21.6,
//   },
//   {
//     id: 3,
//     age: "35–44 metai",
//     women: 23.4,
//     men: 22.9,
//   },
//   {
//     id: 4,
//     age: "45–54 metai",
//     women: 25.2,
//     men: 25.8,
//   },
//   {
//     id: 5,
//     age: "Daugiau nei 55",
//     women: 27.3,
//     men: 26.6,
//   },
// ];

const genderOptions = [
  { value: "female", label: "Moteris" },
  { value: "male", label: "Vyras" },
];

export default function BodyMassIndexCalc() {
  const {
    scrolled,
    showBackToTop,
    scrollToTop,
    calcTimestamp,
    setCalcTimestamp,
    resultsRef,
  } = useScrollEffects();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [categories, setCategories] = useState(categoryList);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showIdealWeight, setShowIdealWeight] = useState(false);
  const [idealWeight, setIdealWeight] = useState(null);

  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");

  useEffect(() => {
    if (calcTimestamp !== 0) {
      const offset = 360;
      const elementTop =
        resultsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: "smooth" });
    }
  }, [calcTimestamp]);

  const calculateBMI = (weight, height) => {
    const m = height / 100;

    return parseFloat((weight / (m * m)).toFixed(2));
  };

  const calculateIdealWeight = (height, gender) => {
    const m = height / 100;
    let result = gender === "male" ? 22.5 : 21;

    return (result * m * m).toFixed(1);
  };

  const updateCategories = (val) => {
    const matched = categoryList.find(
      (category) => val >= category.min && val <= category.max
    );

    if (!matched) return;

    const updated = categoryList.map((category) => ({
      ...category,
      isCurrent: category.id === matched.id,
    }));

    setCategories(updated);
    setCurrentCategory(matched);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setWeightError("");
    setHeightError("");
    setAgeError("");
    setGenderError("");

    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);
    let isValid = true;

    if (isNaN(weightInKg) || weightInKg <= 0) {
      setWeightError("Prašome įvesti svorį.");
      isValid = false;
    } else if (weightInKg < 30 || weightInKg > 300) {
      setWeightError("Prašome įvesti teisingą svorį (30–300 kg).");
      isValid = false;
    }

    if (isNaN(heightInCm) || heightInCm <= 0) {
      setHeightError("Prašome įvesti ūgį.");
      isValid = false;
    } else if (heightInCm < 100 || heightInCm > 272) {
      setHeightError("Prašome įvesti teisingą ūgį (100–272 cm).");
      isValid = false;
    }

    if (isNaN(ageInYears)) {
      setAgeError("Prašome įvesti amžių.");
      isValid = false;
    } else if (ageInYears < 18) {
      setAgeError("Ši skaičiuoklė skirta suaugusiesiems (nuo 18 metų).");
      isValid = false;
    } else if (ageInYears > 120) {
      setAgeError("Prašome įvesti teisingą amžių (iki 120 metų).");
      isValid = false;
    }

    if (showIdealWeight && !gender) {
      setGenderError("Prašome pasirinkti lytį.");
      isValid = false;
    }

    if (!isValid) return;

    const newBmi = calculateBMI(weightInKg, heightInCm);
    setBmi(newBmi);
    updateCategories(newBmi);

    if (showIdealWeight && gender) {
      const idealWeight = calculateIdealWeight(height, gender);
      setIdealWeight(idealWeight);
    } else {
      setIdealWeight(null);
    }

    setCalcTimestamp(Date.now());
  };

  const calcPinPos = (val) => {
    const min = 15.8;
    const max = 33.2;
    const clamped = Math.min(Math.max(val || 0, min), max);
    return ((clamped - min) / (max - min)) * 100;
  };

  return (
    <>
      <HeroSection
        title="Kūno masės indekso skaičiuoklė"
        subtitle="Sužinokite KMI bei idealų svorį, gaukite naudingų mitybos patarimų ir pradėkite savo sveikos gyvensenos pokyčius jau šiandien."
        calculatorForm={
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Ūgis (cm)"
              id="height"
              value={height}
              onChange={(newVal) => setHeight(newVal)}
              placeholder="pvz. 170"
              error={heightError}
              type="number"
            />
            <InputField
              label="Svoris (kg)"
              id="weight"
              value={weight}
              onChange={(newVal) => setWeight(newVal)}
              placeholder="pvz. 70"
              error={weightError}
              type="number"
            />
            <InputField
              label="Amžius"
              id="age"
              value={age}
              onChange={setAge}
              placeholder="pvz. 25"
              error={ageError}
              type="number"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showIdealWeight"
                checked={showIdealWeight}
                onChange={(e) => setShowIdealWeight(e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-600"
              />
              <label
                htmlFor="showIdealWeight"
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Noriu sužinoti idealų svorį
              </label>
            </div>
            {showIdealWeight && (
              <RadioGroupInput
                label="Pasirinkite lytį"
                name="gender"
                options={genderOptions}
                selectedValue={gender}
                onChange={(val) => setGender(val)}
                error={genderError}
              />
            )}
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 rounded-md bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Skaičiuoti
            </button>
          </form>
        }
        scrolled={scrolled}
      />

      <div className="flex flex-col gap-8 sm:gap-14">
        {bmi && (
          <PageContentSection ref={resultsRef} scrolled={scrolled}>
            <div>
              <ResultsDisclaimer />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 mb-10">
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                  <h3 className="text-sm font-medium text-neutral-700 tracking-wide mb-2">
                    KMI
                  </h3>
                  <span className="text-2xl font-semibold text-gray-900">
                    {bmi}
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                  <h3 className="text-sm font-medium text-neutral-700 tracking-wide mb-1">
                    Svorio kategorija
                  </h3>
                  <span className="font-semibold text-gray-900">
                    {currentCategory?.category}
                  </span>
                </div>
                {idealWeight && (
                  <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                    <h3 className="text-sm font-medium text-neutral-700 tracking-wide mb-1">
                      Idealus svoris
                    </h3>
                    <span className="font-semibold text-gray-900">
                      {idealWeight} kg
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-10 hidden sm:grid gap-4">
                <h3 className="font-bold text-gray-900">
                  Kūno masės indekso vizualus įvertinimas
                </h3>
                <p className="mb-10">
                  Žemiau pateikiama šviesoforo principu pagrįsta skalė atspindi
                  svorio intervalus nuo nepakankamo iki per didelio.
                </p>
                <div
                  className="relative w-full h-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(191 219 254) 0%, rgb(187 247 208) 33%, rgb(254 240 138) 66%, rgb(254 202 202) 100%)",
                  }}
                >
                  <span
                    className="absolute -top-8 left-0 px-2 py-1 rounded-full bg-sky-100 text-xs font-semibold text-sky-700 tracking-wide"
                    style={{ transform: "translateX(0)" }}
                  >
                    Mažas
                  </span>
                  <span
                    className="absolute -top-8 left-1/3 px-2 py-1 rounded-full bg-green-100 text-xs font-semibold text-green-700 tracking-wide"
                    style={{ transform: "translate(-50%, 0)" }}
                  >
                    Normalus
                  </span>
                  <span
                    className="absolute -top-8 left-2/3 px-2 py-1 rounded-full bg-yellow-100 text-xs font-semibold text-yellow-700 tracking-wide"
                    style={{ transform: "translate(-50%, 0)" }}
                  >
                    Antsvoris
                  </span>
                  <span
                    className="absolute -top-8 right-0 px-2 py-1 rounded-full bg-red-100 text-xs font-semibold text-red-700 tracking-wide"
                    style={{ transform: "translateX(0)" }}
                  >
                    Nutukimas
                  </span>

                  <div
                    className="absolute top-1/2 w-4 h-4 rounded-full bg-emerald-900 border-2 border-white"
                    style={{
                      left: `${calcPinPos(bmi)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-4 mb-6">
                <h3 className="font-bold text-gray-900">
                  KMI intervalai ir rizikos
                </h3>
                <p>
                  Lentelėje rasite dažniausiai taikomus KMI kategorijų
                  intervalus bei susijusias sveikatos rizikas. Tai naudinga
                  pradinė priemonė vertinant, ar reikia koreguoti mitybą ar
                  fizinį aktyvumą.
                </p>
                <div className="overflow-scroll shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 text-gray-900 text-sm">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6"
                        >
                          KMI
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left font-semibold text-gray-900"
                        >
                          Būklė
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left font-semibold text-gray-900"
                        >
                          Rizika
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white text-sm">
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6">
                            {category.index}
                            {category.isCurrent && (
                              <span className="ml-2 items-center px-2 py-1 rounded-full bg-green-100 text-xs font-semibold text-green-700 tracking-wide">
                                Jūsų KMI
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            {category.category}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                            {category.risks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-gray-600">
                  Šaltinis:{" "}
                  <a
                    href="https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline opacity-90"
                  >
                    Pasaulio sveikatos organizacija
                  </a>
                </div>
              </div>

              <RecommendedCalculatorsSection showBasalMetabolicRateCalculator />
            </div>
          </PageContentSection>
        )}

        <PageContentSection ref={resultsRef} scrolled={scrolled}>
          {/* <section>
            <p>
              Šiame straipsnyje rasite daugiau informacijos apie kūno masės
              indeksą (KMI), gausite sveikos mitybos patarimų, sužinosite apie
              populiariausias dietas, įvertinant jų privalumus ir trūkumus.
            </p>
          </section> */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Kas yra kūno masės indeksas (KMI)?
            </h2>
            <p>
              Kūno masės indeksas (angl. Body Mass Index, BMI) – tai
              tarptautinis rodiklis, padedantis įvertinti žmogaus svorio ir ūgio
              santykį. Jis dažnai naudojamas kaip paprastas pirminis būdas
              nustatyti, ar žmogus turi nepakankamą svorį, normalų svorį,
              antsvorį ar nutukimą.
            </p>
            <p>
              KMI sukūrė 1832 m. belgų matematikas Lamberto A. J. Quetelet,
              siekdamas įvertinti populiacijos antsvorio lygį.
            </p>
            <h3 className="font-bold text-gray-900 pt-4">
              Apskaičiavimo formulė
            </h3>
            {/* <div className="inline-flex items-center space-x-3">
              <span className="text-lg font-medium">KMI =</span>
              <div className="flex flex-col items-center">
                <div className="border-b border-gray-300 px-2">
                  kūno masė (kg)
                </div>
                <div>
                  (ūgis (m))<sup>2</sup>
                </div>
              </div>
            </div> */}
            <p>KMI = svoris (kg) / (ūgis (m))²</p>
            <p>Pavyzdžiui, jei žmogaus svoris yra 70 kg, o ūgis 1,75 m:</p>
            {/* <div className="inline-flex items-center space-x-3">
              <span className="text-lg font-medium">KMI =</span>
              <div className="flex flex-col items-center">
                <div className="border-b border-gray-300 px-4">70</div>
                <div>
                  (1,75)<sup>2</sup>
                </div>
              </div>
              <span className="text-lg font-medium">≈ 22,86</span>
            </div> */}
            <p>KMI = 70 / (1,75)² ≈ 22,86</p>

            <h3 className="font-bold text-gray-900 pt-4">
              Reikšmių intervalai
            </h3>
            <p>
              Dažnai naudojami šie Pasaulio sveikatos organizacijos (PSO){" "}
              nustatyti intervalai:
            </p>
            <div className="overflow-scroll shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-gray-900 text-sm">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6"
                    >
                      KMI
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left font-semibold text-gray-900"
                    >
                      Būklė
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left font-semibold text-gray-900"
                    >
                      Rizika
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6">
                        {category.index}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {category.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {category.risks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-gray-600">
              Šaltinis:{" "}
              <a
                href="https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline opacity-90"
              >
                Pasaulio sveikatos organizacija
              </a>
            </div>

            <h3 className="font-bold text-gray-900 pt-4">KMI ribotumai</h3>
            <p>
              KMI neatsižvelgia į skirtingus kūno sudėties aspektus ir kitus
              sveikatos rodiklius, todėl ne visada gali būti taikomas. Keletas
              iš ribotumų:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700">
              <li>Negali atskirti raumenų masės nuo riebalų masės.</li>
              <li>Netinka nėščioms, vaikams, sportininkams.</li>
              <li>Skiriasi pagal amžių, etninę kilmę, rasę.</li>
            </ul>

            {/* <h3 className="font-bold text-gray-900 pt-4">
              KMI pagal amžių ir lytį
            </h3>
            <p>
              Įvairiame amžiuje ir priklausomai nuo lyties KMI gali būti
              interpretuojamas skirtingai.
            </p>
            <div className="overflow-scroll shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-gray-900 text-sm">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6"
                    >
                      Amžius
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left font-semibold text-gray-900"
                    >
                      Moterų KMI
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left font-semibold text-gray-900"
                    >
                      Vyrų KMI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm">
                  {normalIndexRanges.map((range) => (
                    <tr key={range.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6">
                        {range.age}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {range.women}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                        {range.men}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </section>

          {/* <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Nutukimo Lietuvoje statistika
            </h2>
            <p>
              Apie <b>38%</b> saugusiųjų Lietuvoje turi antsvorį (KMI 25–30), o{" "}
              <b>19%</b> – nutukimą (KMI &gt; 30).
            </p>
          </section> */}

          <section className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Kaip pasiekti ir palaikyti sveiką KMI?
            </h2>
            <p>
              Palaikyti sveiką kūno masės indeksą nėra vien tik estetikos
              klausimas – tai svarbus žingsnis rūpinantis bendra sveikata bei
              savijauta. Sveikas KMI gali padėti sumažinti lėtinių ligų riziką,
              užtikrinti geresnę savijautą bei didesnį energijos lygį kasdienėje
              veikloje. Norėdami pasiekti ir išlaikyti norimą KMI,
              rekomenduojame atkreipti dėmesį į keletą pagrindinių aspektų.
            </p>
            <ol className="list-decimal list-outside pl-4 space-y-3">
              <li>
                Tikslo nustatymas:{" "}
                <b>išsikelkite konkretų, realistišką tikslą</b>. Pavyzdžiui,
                norėti numesti 5 kg per 2–3 mėnesius yra realiau, nei tikėtis
                numesti 10 kg per mėnesį.
                <br />
                Norite sužinoti kiek kalorijų reikia suvartoti norint numesti
                arba priaugti svorio? Pasinaudokite{" "}
                <a
                  href="http://localhost:5173/kaloriju-poreikiai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline opacity-90"
                >
                  šia skaičiuokle
                </a>
                .
              </li>
              <li>
                Balansas lėkštėje: pusę lėkštės turėtų sudaryti <b>daržovės</b>,
                ketvirtadalį – <b>neriebūs baltymai</b> (pvz., vištiena, žuvis,
                ankštinės daržovės), o likusią dalį –{" "}
                <b>sudėtiniai angliavandeniai</b> (pvz., pilno grūdo produktai).
              </li>
              <li>
                <b>Fizinis aktyvumas</b>: rekomenduojama bent <b>150 min.</b>{" "}
                vidutinio intensyvumo fizinio krūvio <b>per savaitę</b>.
                Pasivaikščiojimas, bėgimas, važiavimas dviračiu ar plaukimas
                gali padėti deginti kalorijas ir gerinti širdies bei
                kraujagyslių sveikatą.
                <br /> Norėdami sužinoti kiek kalorijų sudeginate užsiimdami
                įvairia veikla ir sportu, pasinaudokite{" "}
                <a
                  href="http://localhost:5173/sudeginamos-kalorijos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline opacity-90"
                >
                  skaičiuokle
                </a>
                .
              </li>
              <li>
                Pakankamas skysčių vartojimas: gerkite pakankamai <b>vandens</b>{" "}
                – apie <b>30 ml kilogramui kūno svorio</b>. Pavyzdžiui, jei
                sveriate 70 kg, reikėtų ~2,1 litro vandens per dieną
                (priklausomai nuo aktyvumo lygio ir kitų faktorių). <br />
                Norėdami sužinoti savo asmeninį vandens suvartojimo poreikį,
                pasinaudokite{" "}
                <a
                  href="http://localhost:5173/vandens-norma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline opacity-90"
                >
                  skaičiuokle
                </a>
                .
              </li>
              <li>
                Pakankamas <b>miegas</b>: miegas yra neatsiejama sveiko gyvenimo
                būdo dalis. Rekomenduojama miegoti <b>7–9 valandas per parą</b>,
                kad organizmas galėtų atsigauti, subalansuoti hormonus bei
                palaikyti sveiką svorį ir bendrą savijautą.
              </li>
            </ol>
          </section>

          <section className="space-y-4 mt-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Populiarios dietos: privalumai ir trūkumai
            </h2>
            <h3 className="font-bold text-gray-900 pt-4">
              Viduržemio jūros dieta
            </h3>
            <p>
              Raciono pagrindą sudaro daržovės, vaisiai, neskaldyti grūdai,
              alyvuogių aliejus, žuvis, paukštiena ir nedidelis raudonos mėsos
              (kiauliena, jautiena ir kt.) kiekis.
            </p>
            <div>
              <p>Privalumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Moksliškai įrodyta, kad padeda sumažinti širdies ir
                  kraujagyslių ligų riziką.
                </li>
                <li>
                  Gausu antioksidantų, kurie padeda kovoti su laisvaisiais
                  radikalais ir lėtina senėjimo procesus.
                </li>
              </ul>
            </div>
            <div>
              <p>Trūkumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Dieta gali būti brangi, jei renkatės kokybišką šviežią žuvį,
                  alyvuogių aliejų, sezonines daržoves.
                </li>
              </ul>
            </div>

            <h3 className="font-bold text-gray-900 pt-4">
              Mažai angliavandenių turinčios dietos (pvz., keto)
            </h3>
            <p>
              Angliavandenių kiekis sumažinamas iki minimumo, o riebalų
              suvartojimo kiekis padidinamas. Kūnas pereina į ketozės būseną,
              kurios metu riebalai yra naudojami kaip pagrindinis energijos
              šaltinis.
            </p>
            <div>
              <p>Privalumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Gali padėti greitai sumažinti svorį (ypač pradžioje dėl
                  skysčių netekimo).
                </li>
                <li>
                  Kai kuriems asmenims padeda kontroliuoti cukraus kiekį
                  kraujyje.
                </li>
              </ul>
            </div>
            <div>
              <p>Trūkumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Gali trūkti tam tikrų maistinių medžiagų (skaidulų, vitaminų,
                  mineralų).
                </li>
                <li>
                  Neretai sukelia šalutinius poveikius (nuovargį, vidurių
                  užkietėjimą, energijos trūkumą).
                </li>
                <li>
                  Sunku ilgai laikytis dietos dėl griežto angliavandenių
                  ribojimo.
                </li>
              </ul>
            </div>

            <h3 className="font-bold text-gray-900 pt-4">
              Protarpinis badavimas (angl. Intermittent Fasting)
            </h3>
            <p>
              Valgoma tik tam tikru laiko tarpu (pvz., 8 val. per parą) arba tam
              tikromis dienomis laikomasi itin mažo kalorijų kiekio, o kitomis
              dienomis valgoma įprastai.
            </p>
            <div>
              <p>Privalumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Gali padėti sumažinti suvartojamų kalorijų kiekį, taip
                  padedant numesti nereikalingą svorį.
                </li>
                <li>
                  Kai kuriems žmonėms paprasčiau nevalgyti tik tam tikromis
                  valandomis, nei kasdien skaičiuoti kalorijas norint numesti
                  svorio.
                </li>
              </ul>
            </div>
            <div>
              <p>Trūkumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Netinka kai kuriems asmenims, pvz., turintiems valgymo
                  sutrikimų, nėščioms ar žindančioms moterims.
                </li>
                <li>
                  Gali būti sunku išlaikyti fizinį ir protinį darbingumą, kol
                  organizmas pripranta.
                </li>
              </ul>
            </div>

            <h3 className="font-bold text-gray-900 pt-4">
              Vegetariška / veganiška dieta
            </h3>
            <p>
              Ribojama arba visiškai atsisakoma mėsos, žuvies, jūrų gėrybių,
              pieno produktų, kiaušinių (priklausomai nuo to, ar vegetariška, ar
              veganiška dieta).
            </p>
            <div>
              <p>Privalumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Daug vaisių, daržovių, ankštinių kultūrų, gausu skaidulų.
                </li>
                <li>
                  Dėl didelio antioksidantų kiekio gali būti naudinga širdžiai,
                  kraujagyslėms.
                </li>
              </ul>
            </div>
            <div>
              <p>Trūkumai:</p>
              <ul className="list-disc list-inside">
                <li>
                  Gali susidurti su vitamino B12, geležies, omega-3 riebalų
                  rūgščių, cinko, kalcio ir baltymų trūkumu, jei mityba nėra
                  subalansuota.
                </li>
                <li>
                  Norint gauti visus reikalingus baltymus, aminorūgštis ir
                  mikroelementus, reikalingas kruopštus maisto planavimas.
                </li>
              </ul>
            </div>
          </section>

          {/* <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Sveikatos rizikos
            </h2>
            <p>
              Tiek per mažas, tiek per didelis KMI gali būti susijęs su
              įvairiomis sveikatos problemomis:
            </p>
            <div>
              <b className="block mb-2">Per mažas KMI (&lt; 18.5):</b>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Mitybos nepakankamumas</li>
                <li>Anemija</li>
                <li>Osteoporozė</li>
              </ul>
            </div>
            <div className="mt-4">
              <b className="block mb-2">Per didelis KMI (&gt; 25):</b>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Širdies ir kraujagyslių ligos</li>
                <li>Padidėjęs kraujospūdis</li>
                <li>2 tipo cukrinis diabetas</li>
                <li>Miego apnėja</li>
              </ul>
            </div>
          </section> */}
        </PageContentSection>
      </div>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}
