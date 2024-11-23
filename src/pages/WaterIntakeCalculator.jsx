import { useState, useRef, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const climates = [
  { id: 1, name: "Vėsus (žemiau 10°C)", value: "cool", adjustment: 0 },
  { id: 2, name: "Vidutinis (10–20°C)", value: "temperate", adjustment: 0 },
  { id: 3, name: "Šiltas (21–30°C)", value: "warm", adjustment: 500 },
  { id: 4, name: "Karštas (virš 30°C)", value: "hot", adjustment: 1000 },
];

const faqs = [
  {
    question:
      "Kaip apskaičiuojamas rekomenduojamas kasdienis vandens suvartojimas šioje skaičiuoklėje?",
    answer: (
      <>
        Skaičiuoklė naudoja <b>Mifflin-St Jeor lygtį</b> jūsų baziniam
        metabolizmo greičiui (BMR) apskaičiuoti, atsižvelgiant į jūsų amžių,
        lytį, ūgį ir svorį. BMR parodo, kiek kalorijų jūsų kūnas sudegina
        ramybės būsenoje. Tada BMR dauginamas iš <b>aktyvumo koeficiento</b>,
        kuris nustatomas pagal jūsų fizinio aktyvumo lygį (valandos per dieną),
        kad gautųsi <b>bendras dienos energijos poreikis (TDEE)</b>. Galiausiai,
        vadovaujantis rekomendacija, kad reikia suvartoti{" "}
        <b>1 ml vandens kiekvienai sudegintai kalorijai</b>, TDEE vertė
        konvertuojama į mililitrus vandens. Jei gyvenate šiltesniame klimate,
        pridedamas papildomas vandens kiekis.
      </>
    ),
  },
  {
    question: "Kodėl svarbu išgerti pakankamai vandens kiekvieną dieną?",
    answer:
      "Vanduo yra gyvybiškai svarbus mūsų organizmui. Jis padeda reguliuoti kūno temperatūrą, perneša maistines medžiagas ir deguonį į ląsteles, pašalina atliekas, palaiko sąnarių tepimą ir gerina virškinimą. Pakankamas vandens suvartojimas gali pagerinti energijos lygį, koncentraciją ir bendrą sveikatą. Dehidratacija gali sukelti nuovargį, galvos skausmą, sumažėjusią koncentraciją ir kitus sveikatos sutrikimus.",
  },
];

export default function WaterIntakeCalculator() {
  const [step, setStep] = useState(1);
  const [ageError, setAgeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");

  // User inputs
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseHours, setExerciseHours] = useState(0);
  const [climate, setClimate] = useState(climates[1]);

  // Results
  const [totalIntake, setTotalIntake] = useState(null);
  const [bmr, setBMR] = useState(null);
  const [tdee, setTDEE] = useState(null);
  const [climateAdjustment, setClimateAdjustment] = useState(null);

  const resultsRef = useRef(null);

  const handleNext = (e) => {
    e.preventDefault();

    setWeightError("");
    setHeightError("");
    setAgeError("");

    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);

    let isValid = true;

    if (isNaN(weightInKg) || weightInKg <= 0) {
      setWeightError("Prašome įvesti teisingą svorį.");
      isValid = false;
    }

    if (isNaN(heightInCm) || heightInCm <= 0) {
      setHeightError("Prašome įvesti teisingą ūgį.");
      isValid = false;
    }

    if (isNaN(ageInYears) || ageInYears <= 0) {
      setAgeError("Prašome įvesti teisingą amžių.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setStep(2);
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    if (isNaN(exerciseHours) || exerciseHours < 0) {
      alert("Prašome įvesti teisingą fizinio aktyvumo laiką.");
      return;
    }

    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);

    let calculatedBMR;
    if (gender === "male") {
      calculatedBMR = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5;
    } else {
      calculatedBMR =
        10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;
    }

    // Determine Activity Factor based on exercise hours
    let activityFactor = 1.2; // Default sedentary

    if (exerciseHours > 0 && exerciseHours <= 1) {
      activityFactor = 1.375; // Lightly active
    } else if (exerciseHours > 1 && exerciseHours <= 3) {
      activityFactor = 1.55; // Moderately active
    } else if (exerciseHours > 3 && exerciseHours <= 5) {
      activityFactor = 1.725; // Very active
    } else if (exerciseHours > 5) {
      activityFactor = 1.9; // Extra active
    }

    // Calculate TDEE
    const calculatedTDEE = calculatedBMR * activityFactor;

    // Total Water Intake (ml) = TDEE (kcal) * 1 ml/kcal
    let calculatedTotalIntake = calculatedTDEE;

    // Climate Adjustment (ml)
    const calculatedClimateAdjustment = climate.adjustment;

    // Adjust Total Intake for Climate
    calculatedTotalIntake += calculatedClimateAdjustment;

    setBMR(calculatedBMR.toFixed(0));
    setTDEE(calculatedTDEE.toFixed(0));
    setClimateAdjustment(calculatedClimateAdjustment);
    setTotalIntake(calculatedTotalIntake.toFixed(0));

    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Vandens suvartojimo skaičiuoklė
      </h1>
      <form
        onSubmit={step === 1 ? handleNext : handleCalculate}
        className="grid gap-8 bg-white rounded-lg ring-1 ring-slate-200 p-6"
      >
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-base font-medium text-gray-700"
              >
                Amžius
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="25"
                />
              </div>
              {ageError && (
                <p className="mt-2 text-sm text-red-600">{ageError}</p>
              )}
            </div>
            {/* Gender */}
            <div>
              <label className="block text-base font-medium text-gray-700">
                Lytis
              </label>
              <fieldset className="mt-2">
                <legend className="sr-only">Lyties pasirinkimas</legend>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      id="female"
                      name="gender"
                      type="radio"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300"
                    />
                    <label
                      htmlFor="female"
                      className="ml-2 block text-base text-gray-700"
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
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300"
                    />
                    <label
                      htmlFor="male"
                      className="ml-2 block text-base text-gray-700"
                    >
                      Vyras
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            {/* Height */}
            <div>
              <label
                htmlFor="height"
                className="block text-base font-medium text-gray-700"
              >
                Ūgis
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="170"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">cm</span>
                </div>
              </div>
              {heightError && (
                <p className="mt-2 text-sm text-red-600">{heightError}</p>
              )}
            </div>
            {/* Weight */}
            <div>
              <label
                htmlFor="weight"
                className="block text-base font-medium text-gray-700"
              >
                Svoris
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="70"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">kg</span>
                </div>
              </div>
              {weightError && (
                <p className="mt-2 text-sm text-red-600">{weightError}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Exercise Hours */}
            <div>
              <label
                htmlFor="exerciseHours"
                className="block text-base font-medium text-gray-700"
              >
                Fizinis aktyvumas (valandos per dieną)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  name="exerciseHours"
                  id="exerciseHours"
                  value={exerciseHours}
                  onChange={(e) => setExerciseHours(e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="1"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">val.</span>
                </div>
              </div>
            </div>
            {/* Climate */}
            <div>
              <label className="block text-base font-medium text-gray-700">
                Klimatas
              </label>
              <RadioGroup
                value={climate}
                onChange={setClimate}
                className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
              >
                {climates.map((clim) => (
                  <RadioGroup.Option
                    key={clim.id}
                    value={clim}
                    className={({ checked }) =>
                      classNames(
                        checked
                          ? "border-transparent bg-secondary text-white"
                          : "border-gray-300 bg-white text-gray-900",
                        "relative flex cursor-pointer rounded-md border p-4 shadow-sm focus:outline-none"
                      )
                    }
                  >
                    {({ checked }) => (
                      <>
                        <div className="flex flex-1">
                          <div className="flex flex-col">
                            <RadioGroup.Label
                              as="span"
                              className="block text-sm font-medium"
                            >
                              {clim.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <CheckCircleIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-gray-700"
            >
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
              Atgal
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-darker"
          >
            {step === 1 ? "Toliau" : "Skaičiuoti"}
          </button>
        </div>
      </form>

      {totalIntake && (
        <div
          ref={resultsRef}
          style={{ scrollMarginTop: "80px" }}
          className="bg-white ring-1 ring-slate-200 rounded-lg p-6 mt-10"
        >
          <div className="pb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Rezultatai
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-md bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Rekomenduojamas vandens suvartojimas
                </h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {(totalIntake / 1000).toFixed(2)} litrų per dieną
                </p>
              </div>
              <div className="rounded-md bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Papildoma informacija
                </h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-700">
                    Bazinis metabolizmo greitis (BMR): <b>{bmr} kcal</b>
                  </p>
                  <p className="text-sm text-gray-700">
                    Bendras dienos energijos poreikis (TDEE): <b>{tdee} kcal</b>
                  </p>
                  {climateAdjustment > 0 && (
                    <p className="text-sm text-gray-700">
                      Papildomai už klimatą:{" "}
                      <b>{(climateAdjustment / 1000).toFixed(2)} l</b>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3">Rekomenduojamos skaičiuoklės:</p>
            <div className="grid gap-4">
              <a
                href="/kuno-mases-indeksas"
                className="block p-4 rounded-md transition bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-7 w-7 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <b>Kūno masės indekso skaičiuoklė</b>
                    <p className="text-base text-gray-600">
                      Sužinokite savo kūno masės indeksą.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <svg
                      className="h-5 w-5 text-gray-500"
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
                className="block p-4 rounded-md transition bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-7 w-7 text-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <b>Kalorijų suvartojimo skaičiuoklė</b>
                    <p className="text-base text-gray-600">
                      Sužinokite, kiek kalorijų turėtumėte suvartoti per dieną.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <svg
                      className="h-5 w-5 text-gray-500"
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
      )}

      {/* FAQ Section */}
      <div className="mt-16">
        <div className="bg-white ring-1 ring-slate-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">D. U. K.</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-base text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
