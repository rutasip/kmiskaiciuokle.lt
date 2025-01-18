import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fit=crop&w=1920&q=80";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const resultsRef = useRef(null);
  const [calcTimestamp, setCalcTimestamp] = useState(0);

  useEffect(() => {
    if (calcTimestamp !== 0) {
      const offset = 300;
      const elementTop =
        resultsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: "smooth" });
    }
  }, [calcTimestamp]);

  const calculateBMI = (w, h) => {
    const m = h / 100;
    return parseFloat((w / (m * m)).toFixed(2));
  };

  const calcIdealWeight = (hVal, gVal) => {
    const m = hVal / 100;
    let result = gVal === "male" ? 22.5 : 21;
    return (result * m * m).toFixed(1);
  };

  const updateCategories = (val) => {
    const matched = categoryList.find((c) => val >= c.min && val <= c.max);
    if (!matched) return;
    const updated = categoryList.map((c) => ({
      ...c,
      isCurrent: c.id === matched.id,
    }));
    setCategories(updated);
    setCurrentCategory(matched);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWeightError("");
    setHeightError("");
    setGenderError("");

    const wVal = parseFloat(weight);
    const hVal = parseFloat(height);
    let valid = true;

    if (isNaN(wVal) || wVal <= 0) {
      setWeightError("Prašome įvesti teisingą svorį.");
      valid = false;
    }
    if (isNaN(hVal) || hVal <= 0) {
      setHeightError("Prašome įvesti teisingą ūgį.");
      valid = false;
    }
    if (showIdealWeight && !gender) {
      setGenderError("Prašome pasirinkti lytį.");
      valid = false;
    }

    if (!valid) return;

    const newBmi = calculateBMI(wVal, hVal);
    setBmi(newBmi);
    updateCategories(newBmi);

    if (showIdealWeight && gender) {
      const wIdeal = calcIdealWeight(hVal, gender);
      setIdealWeight(wIdeal);
    } else {
      setIdealWeight(null);
    }

    setCalcTimestamp(Date.now());
  };

  const calcPinPos = (val) => {
    const min = 15.5;
    const max = 33.5;
    const clamped = Math.min(Math.max(val || 0, min), max);
    return ((clamped - min) / (max - min)) * 100;
  };

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowBackToTop(scrollY > 300);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>
        {`
          @keyframes horizontalBounce {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
          }
        `}
      </style>

      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-6xl w-full px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="text-white space-y-6 order-2 lg:order-1 lg:col-span-3">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-xl">
                Kūno masės indeksas (KMI)
              </h1>
              <p className="text-base md:text-lg max-w-xl leading-relaxed text-gray-100 drop-shadow">
                Greitas būdas įvertinti, ar jūsų svoris yra normalus, per mažas
                ar per didelis. Jei norite, galite sužinoti ir idealų svorį.
              </p>
              <p className="text-sm md:text-base text-emerald-100 leading-relaxed drop-shadow">
                Rezultatai – orientaciniai. Išsamiai sveikatos būklei įvertinti
                kreipkitės į profesionalus.
              </p>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-2 flex justify-end">
              <div className="bg-white rounded-md p-6 md:p-8 text-gray-900 max-w-md w-full shadow-lg">
                <h2 className="text-xl font-bold mb-4">Apskaičiuokite KMI</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ūgis (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      placeholder="pvz. 170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {heightError && (
                      <p className="text-sm text-red-600 mt-1">{heightError}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Svoris (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      placeholder="pvz. 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {weightError && (
                      <p className="text-sm text-red-600 mt-1">{weightError}</p>
                    )}
                  </div>
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
                      className="ml-2 text-sm text-gray-700"
                    >
                      Noriu sužinoti idealų svorį
                    </label>
                  </div>
                  {showIdealWeight && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pasirinkite lytį
                      </label>
                      <div className="flex space-x-6">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
                          />
                          <label htmlFor="female" className="ml-2 text-sm">
                            Moteris
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
                          />
                          <label htmlFor="male" className="ml-2 text-sm">
                            Vyras
                          </label>
                        </div>
                      </div>
                      {genderError && (
                        <p className="text-sm text-red-600 mt-1">
                          {genderError}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center px-5 py-2 rounded-md bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Skaičiuoti
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {!scrolled && (
          <div className="absolute bottom-6 inset-x-0 flex justify-center animate-bounce">
            <div className="bg-white/20 p-2 rounded-full">
              <ChevronDownIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </section>

      <section
        ref={resultsRef}
        className={classNames(
          "relative transition-transform duration-500 ease-in-out",
          scrolled ? "translate-y-0" : "translate-y-[200px]"
        )}
      >
        <div className="max-w-3xl mx-auto px-4 -mt-16 pb-10">
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 relative z-10">
            {bmi && (
              <div className="mb-8">
                <div className="mb-12 space-y-4 text-center">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    Rezultatai
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                  <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">
                      KMI
                    </h3>
                    <span className="text-2xl md:text-3xl font-bold text-gray-900">
                      {bmi}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">
                      Kategorija
                    </h3>
                    <span className="text-xl md:text-2xl font-semibold text-gray-900">
                      {currentCategory?.category}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">
                      Idealus svoris
                    </h3>
                    {idealWeight ? (
                      <span className="text-xl md:text-2xl font-semibold text-gray-900">
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
                      Nepakankamas
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
                      className="absolute top-1/2 w-6 h-6 rounded-full bg-gray-800 border-2 border-white"
                      style={{
                        left: `${calcPinPos(bmi)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                </div>
                <div className="bg-neutral-100 p-6 rounded-md shadow-sm mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Rekomenduojamos skaičiuoklės
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="/sudeginamos-kalorijos"
                      className="relative block bg-white p-5 rounded-md group hover:bg-gray-50 transition"
                    >
                      <h4 className="text-md font-bold leading-normal text-neutral-600 group-hover:text-gray-900 pr-8">
                        Kalorijų sudeginimo skaičiuoklė
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 pr-8">
                        Sužinokite, kiek kalorijų sudeginate įvairių veiklų
                        metu.
                      </p>
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{ animation: "horizontalBounce 1.5s infinite" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-500 group-hover:text-emerald-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>

                    <a
                      href="/kaloriju-poreikiai"
                      className="relative block bg-white p-5 rounded-md group hover:bg-gray-50 transition"
                    >
                      <h4 className="text-md font-bold leading-normal text-neutral-600 group-hover:text-gray-900 pr-8">
                        Dienos kalorijų poreikio skaičiuoklė
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 pr-8">
                        Asmeninis kalorijų poreikis pagal aktyvumo lygį.
                      </p>
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{ animation: "horizontalBounce 1.5s infinite" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-500 group-hover:text-emerald-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Kas yra KMI?</h2>
              <p>
                Kūno masės indeksas (<b>KMI</b>) – tai skaičius, gautas kūno
                svorį kilogramais padalijus iš ūgio metrais kvadratu. Padeda
                nustatyti, ar kūno svoris yra per mažas, normalus, ar per
                didelis (antsvoris ar nutukimas).
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-xl font-bold text-gray-900">KMI istorija</h2>
              <p>
                KMI sukūrė <b>1832 m.</b> belgų matematikas{" "}
                <b>Lamberto A. J. Quetelet</b>, siekdamas įvertinti populiacijos
                antsvorio lygį.
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-xl font-bold text-gray-900">
                Nutukimas Lietuvoje
              </h2>
              <p>
                Apie <b>57%</b> Lietuvos suaugusiųjų turi antsvorį ar nutukimą.
                Maždaug <b>38%</b> turi antsvorį (KMI 25–30), o <b>19%</b> –
                nutukimą (KMI &gt; 30).
              </p>
            </section>

            <section className="space-y-4 mt-8">
              <h2 className="text-xl font-bold text-gray-900">
                Kaip apskaičiuoti KMI?
              </h2>
              <p>
                Formulė: <b>KMI = svoris (kg) / [ūgis (m)]².</b> Pvz., sveriant
                70 kg ir esant 1,75 m ūgio:
              </p>
              <p className="italic">
                <b>KMI = 70 / (1,75)² ≈ 22,86</b>
              </p>
              <p>
                Toliau pateikiami bendrieji KMI intervalai ir galimos sveikatos
                būklės:
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-900">
                      <th className="py-3 px-4 text-left font-semibold">KMI</th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Būklė
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Rizika
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {categories.map((cat) => (
                      <tr key={cat.id}>
                        <td className="py-3 px-4">
                          {cat.index}
                          {cat.isCurrent && (
                            <span className="ml-2 inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                              Jūsų KMI
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">{cat.category}</td>
                        <td className="py-3 px-4">{cat.risks}</td>
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
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-900">
                      <th className="py-3 px-4 text-left font-semibold">
                        Amžius
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Moterų KMI
                      </th>
                      <th className="py-3 px-4 text-left font-semibold">
                        Vyrų KMI
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {normalIndexRanges.map((range) => (
                      <tr key={range.id}>
                        <td className="py-3 px-4">{range.age}</td>
                        <td className="py-3 px-4">{range.women}</td>
                        <td className="py-3 px-4">{range.men}</td>
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
                sveikatos rodiklius:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700">
                <li>Negali atskirti raumenų ir riebalų masės</li>
                <li>Netinka nėščioms, vaikams, sportininkams</li>
                <li>Skiriasi pagal amžių, etninę kilmę, rasę</li>
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
          </div>
        </div>
      </section>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition"
        >
          <ArrowUpIcon className="h-5 w-5" />
          <span className="sr-only">Grįžti į viršų</span>
        </button>
      )}
    </>
  );
}
