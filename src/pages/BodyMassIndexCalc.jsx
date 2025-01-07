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
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [calcTimestamp]);

  const calculateBMI = (w, h) => {
    const hMeters = h / 100;
    return parseFloat((w / (hMeters * hMeters)).toFixed(2));
  };

  const calcIdealWeight = (hVal, gVal) => {
    const m = hVal / 100;
    let result = gVal === "male" ? 22.5 : 21;
    result *= m * m;
    return result.toFixed(1);
  };

  const updateCategories = (val) => {
    const match = categoryList.find((cat) => val >= cat.min && val <= cat.max);
    if (!match) return;
    const updated = categoryList.map((cat) => ({
      ...cat,
      isCurrent: cat.id === match.id,
    }));
    setCategories(updated);
    setCurrentCategory(match);
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
    const v = Math.min(Math.max(val || 0, min), max);
    return ((v - min) / (max - min)) * 100;
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
      <style jsx>{`
        @keyframes horizontalBounce {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
      `}</style>

      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-xl">
                Atraskite Savo KMI
              </h1>
              <p className="text-base md:text-lg max-w-xl leading-relaxed text-gray-100 drop-shadow">
                KMI – greitas būdas sužinoti, ar jūsų svoris atitinka sveikas normas. Nesvarbu, ar siekiate išlaikyti esamą svorį, ar norite pokyčių, <b>KMI</b> gali būti pirmasis žingsnis į geresnę savijautą.
              </p>
              <p className="text-sm md:text-base text-emerald-100 leading-relaxed drop-shadow">
                Ši paprasta skaičiuoklė remiasi mokslu ir padeda suprasti, kur esate šiandien, kad galėtumėte kurti sveikesnį rytojų.
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-md p-6 md:p-8 text-gray-900 max-w-md mx-auto lg:mx-0 shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                  Apskaičiuokite KMI
                </h2>
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
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="pvz. 170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    {heightError && (
                      <p className="text-sm text-red-600 mt-1">
                        {heightError}
                      </p>
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
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="pvz. 65"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    {weightError && (
                      <p className="text-sm text-red-600 mt-1">
                        {weightError}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showIdealWeight"
                      className="h-4 w-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-600"
                      checked={showIdealWeight}
                      onChange={(e) => setShowIdealWeight(e.target.checked)}
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
                            className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
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
                            className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
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

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="px-5 py-2 inline-flex items-center rounded-md bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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

      {bmi && (
        <section ref={resultsRef} className="relative pt-20 pb-16">
          <div className="relative bg-white border border-gray-200 rounded-md max-w-5xl mx-auto p-6">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Rezultatai
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
                Žemiau rasite savo KMI, nustatytą svorio kategoriją bei, jei
                pageidavote, savo idealų svorį.
              </p>
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

            <div className="mb-10">
              <p className="text-sm text-gray-600 mb-3">
                Žemiau pateikiamos KMI reikšmės, svorio kategorijos ir bendros
                ligų rizikos gairės, kurios padės geriau suprasti savo
                svorio situaciją.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm table-auto bg-emerald-50">
                  <thead>
                    <tr className="bg-neutral-100 text-gray-900">
                      <th className="py-3 px-4 text-left font-bold">
                        KMI reikšmė
                      </th>
                      <th className="py-3 px-4 text-left font-bold">
                        Būklė
                      </th>
                      <th className="py-3 px-4 text-left font-bold">
                        Ligų rizika
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr
                        key={cat.id}
                        className={classNames(
                          cat.isCurrent ? "bg-emerald-50" : "bg-white"
                        )}
                      >
                        <td className="py-3 px-4 align-middle">
                          {cat.index}
                          {cat.isCurrent && (
                            <span className="ml-2 inline-block text-xs text-white bg-emerald-700 px-2 py-1 rounded">
                              Jūsų KMI
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          {cat.category}
                        </td>
                        <td className="py-3 px-4 align-middle">
                          {cat.risks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Rekomenduojamos skaičiuoklės
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/sudeginamos-kalorijos"
                  className="relative block bg-white p-5 rounded-md group hover:bg-gray-50 transition"
                >
                  <h4 className="text-lg font-bold text-neutral-600 group-hover:text-gray-900 pr-8">
                    Kalorijų sudeginimo skaičiuoklė
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Sužinokite, kiek kalorijų sudeginate įvairių veiklų metu.
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
                  <h4 className="text-lg font-bold text-neutral-600 group-hover:text-gray-900 pr-8">
                    Dienos kalorijų poreikio skaičiuoklė
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
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
        </section>
      )}

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
