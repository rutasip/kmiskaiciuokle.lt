import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import PageContentSection from "../components/PageContentSection";
import BackToTopButton from "../components/BackToTopButton";
import InputField from "../components/InputField";
import RadioGroupInput from "../components/RadioGroupInput";
import ResultsDisclaimer from "../components/ResultsDisclaimer";

import useScrollEffects from "../hooks/useScrollEffects";

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

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const ageValue = parseFloat(age);
    let valid = true;

    if (isNaN(weightValue) || weightValue <= 0) {
      setWeightError("Prašome įvesti svorį.");
      valid = false;
    }

    if (isNaN(heightValue) || heightValue <= 0) {
      setHeightError("Prašome įvesti ūgį.");
      valid = false;
    }

    if (isNaN(ageValue)) {
      setAgeError("Prašome įvesti amžių.");
      valid = false;
    }

    if (ageValue < 18) {
      setAgeError("Ši skaičiuoklė skirta suaugusiesiems (nuo 18 metų).");
      valid = false;
    }

    if (showIdealWeight && !gender) {
      setGenderError("Prašome pasirinkti lytį.");
      valid = false;
    }

    if (!valid) return;

    const newBmi = calculateBMI(weightValue, heightValue);
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
        subtitle="Greitas būdas įvertinti, ar jūsų svoris yra normalus, per mažas ar
        per didelis. Jei norite, galite sužinoti ir idealų svorį."
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 mb-16">
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    KMI
                  </h3>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {bmi}
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Kategorija
                  </h3>
                  <span className="text-lg sm:text-xl font-semibold text-gray-900">
                    {currentCategory?.category}
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Idealus svoris
                  </h3>
                  {idealWeight ? (
                    <span className="text-lg sm:text-xl font-semibold text-gray-900">
                      {idealWeight} kg
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400 mt-2">
                      Nenurodytas
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-14">
                <div
                  className="relative w-full h-4 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, #BAE6FD 0%, #BBF7D0 33%, #FEF08A 66%, #FCA5A5 100%)",
                  }}
                >
                  <span
                    className="absolute -top-7 left-0 text-xs font-semibold px-2 py-1 rounded-full bg-sky-100 text-sky-800"
                    style={{ transform: "translateX(0)" }}
                  >
                    Mažas
                  </span>
                  <span
                    className="absolute -top-7 left-1/3 text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800"
                    style={{ transform: "translate(-50%, 0)" }}
                  >
                    Normalus
                  </span>
                  <span
                    className="absolute -top-7 left-2/3 text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800"
                    style={{ transform: "translate(-50%, 0)" }}
                  >
                    Antsvoris
                  </span>
                  <span
                    className="absolute -top-7 right-0 text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-800"
                    style={{ transform: "translateX(0)" }}
                  >
                    Nutukimas
                  </span>

                  <div
                    className="absolute top-1/2 w-5 h-5 rounded-full bg-gray-800 border-2 border-white"
                    style={{
                      left: `${calcPinPos(bmi)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/sudeginamos-kalorijos"
                  className="relative flex items-center bg-white p-5 rounded-md sm:w-1/2 hover:bg-gray-100 transition shadow"
                >
                  <div className="mr-8">
                    <h5 className="text-base font-semibold leading-normal text-neutral-700 hover:text-gray-900">
                      Kalorijų sudeginimo skaičiuoklė
                    </h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Sužinokite, kiek kalorijų sudeginate įvairių veiklų metu.
                    </p>
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
                {/* <a
                href="/kaloriju-poreikiai"
                className="relative flex items-center bg-white p-5 rounded-md sm:w-1/2 hover:bg-gray-100 transition shadow"
              >
                <div className="mr-8">
                  <h5 className="text-base font-semibold leading-normal text-neutral-700 hover:text-gray-900">
                    Dienos kalorijų poreikio skaičiuoklė
                  </h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Sužinokite, kiek kalorijų reikia suvartoti per dieną pagal
                    Jūsų aktyvumo lygį.
                  </p>
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
              </a> */}
              </div>
            </div>
          </PageContentSection>
        )}

        <PageContentSection ref={resultsRef} scrolled={scrolled}>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Kas yra KMI?</h2>
            <p>
              Kūno masės indeksas (<b>KMI</b>) – tai skaičius, gautas kūno svorį
              kilogramais padalijus iš ūgio metrais kvadratu. Šis indeksas
              padeda nustatyti, ar kūno svoris yra per mažas, normalus, ar per
              didelis.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Trumpa KMI istorija
            </h2>
            <p>
              KMI sukūrė <b>1832 m.</b> belgų matematikas{" "}
              <b>Lamberto A. J. Quetelet</b>, siekdamas įvertinti populiacijos
              antsvorio lygį.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Nutukimo Lietuvoje statistika
            </h2>
            <p>
              Apie <b>38%</b> saugusiųjų Lietuvoje turi antsvorį (KMI 25–30), o{" "}
              <b>19%</b> – nutukimą (KMI &gt; 30).
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Kaip apskaičiuoti KMI?
            </h2>
            <p>
              Formulė: <b>KMI = svoris (kg) / [ūgis (m)]².</b>
            </p>
            <p>Pvz., sveriant 70 kg ir esant 1,75 m ūgio:</p>
            <p className="italic">
              <b>KMI = 70 / (1,75)² ≈ 22,86.</b>
            </p>
            <p>
              Toliau pateikiami bendrieji KMI intervalai ir galimos sveikatos
              būklės:
            </p>
            <div className="overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      KMI
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Būklė
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Rizika
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {category.index}
                        {category.isCurrent && (
                          <span className="ml-2 inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                            Jūsų KMI
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {category.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {category.risks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              KMI pagal amžių ir lytį
            </h2>
            <p>
              Įvairiame amžiuje ir priklausomai nuo lyties KMI gali būti
              interpretuojamas skirtingai.
            </p>
            <div className="overflow-hidden shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Amžius
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Moterų KMI
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Vyrų KMI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {normalIndexRanges.map((range) => (
                    <tr key={range.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {range.age}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {range.women}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {range.men}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">KMI ribotumai</h2>
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
          </section>

          <section className="space-y-4 mt-8">
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
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              Kaip palaikyti sveiką KMI?
            </h2>
            <ol className="list-decimal list-inside pl-4 space-y-1 text-gray-700">
              <li>Subalansuota mityba (daug daržovių, vaisių)</li>
              <li>Reguliarus fizinis aktyvumas</li>
              <li>Venkite žalingų įpročių (rūkymas, alkoholis)</li>
              <li>Pakankamas miegas ir streso valdymas</li>
            </ol>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">
              D.U.K. (Dažniausiai užduodami klausimai)
            </h2>
            <div className="space-y-5 mt-2">
              {faqs.map((faq, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                  <p className="mt-1 text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </PageContentSection>
      </div>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}
