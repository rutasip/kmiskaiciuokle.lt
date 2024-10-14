import { useState, useRef, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

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
        Skaičiuoklė naudoja <b>Mifflin-St Jeor lygtį</b> Jūsų baziniam
        metabolizmo greičiui (BMR) apskaičiuoti, atsižvelgiant į Jūsų amžių,
        lytį, ūgį ir svorį. BMR parodo, kiek kalorijų Jūsų kūnas sudegina
        ramybės būsenoje. Tada BMR dauginamas iš <b>aktyvumo koeficiento</b>,
        kuris nustatomas pagal Jūsų fizinio aktyvumo lygį (valandos per dieną),
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
  const [showIcon, setShowIcon] = useState(false);
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

    if (isNaN(ageInYears)) {
      setAgeError("Prašome įvesti amžių.");
      isValid = false;
    }

    if (ageInYears <= 0) {
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

    setShowIcon(true);

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

    setTimeout(() => {
      setShowIcon(false);
    }, 1600);
  };

  const handleReset = () => {
    setStep(1);
    setAge("");
    setGender("female");
    setHeight("");
    setWeight("");
    setExerciseHours(0);
    setClimate(climates[0]);
    setTotalIntake(null);
    setBMR(null);
    setTDEE(null);
    setClimateAdjustment(null);
    setWeightError("");
    setHeightError("");
    setAgeError("");
  };

  useEffect(() => {
    if (showIcon && totalIntake) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showIcon, totalIntake]);

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
        <form
          onSubmit={step === 1 ? handleNext : handleCalculate}
          className="w-full max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        >
          <div className="gap-x-6 border-b border-gray-900/10 p-8">
            <h1 className="text-xl font-semibold leading-7 text-gray-900">
              Vandens suvartojimo skaičiuoklė
            </h1>
            <h2 className="mt-4 text-sm leading-6 text-gray-600">
              Sužinokite, kiek vandens turėtumėte išgerti kasdien pagal savo
              amžių, lytį, ūgį, svorį, fizinį aktyvumą ir klimatą.
            </h2>
          </div>
          <div className="p-8">
            {step === 1 && (
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Age */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Amžius
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      value={age}
                      id="age"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="25"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  {ageError && (
                    <p className="mt-1 text-sm text-red-600">{ageError}</p>
                  )}
                </div>

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
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                  </fieldset>
                </div>

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
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">cm</span>
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
                      placeholder="70"
                      onChange={(e) => setWeight(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">kg</span>
                    </div>
                  </div>
                  {weightError && (
                    <p className="mt-1 text-sm text-red-600">{weightError}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="exerciseHours"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fizinis aktyvumas (valandos per dieną)
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={exerciseHours}
                      name="exerciseHours"
                      id="exerciseHours"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="1"
                      onChange={(e) => setExerciseHours(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">val.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <RadioGroup value={climate} onChange={setClimate}>
                    <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                      Klimatas
                    </RadioGroup.Label>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      {climates.map((clim) => (
                        <RadioGroup.Option
                          key={clim.id}
                          value={clim}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? "border-transparent"
                                : "border-gray-300",
                              active ? "ring-2 ring-indigo-500" : "",
                              "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className="flex flex-1">
                                <span className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {clim.name}
                                  </RadioGroup.Label>
                                </span>
                              </span>
                              {checked ? (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-lg"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
          <div
            className={classNames(
              step === 2 ? "justify-between" : "justify-end",
              "flex items-center gap-x-6 border-t border-gray-900/10 px-8 py-4"
            )}
          >
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Atgal
              </button>
            )}
            <div className="flex gap-x-6">
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
                {step === 1 ? "Toliau" : "Skaičiuoti"}
              </button>
            </div>
          </div>
        </form>

        <div
          ref={resultsRef}
          style={{ scrollMarginTop: "80px" }}
          className={classNames(
            totalIntake && !showIcon && "bg-white h-fit",
            "flex w-full max-w-xl flex-col p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl justify-center"
          )}
        >
          {totalIntake ? (
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
              <div className="p-8">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Rezultatai
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="text-sm font-medium text-gray-900">
                      Rekomenduojamas vandens suvartojimas
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">
                      {(totalIntake / 1000).toFixed(2)} litrų per dieną
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="text-sm font-medium text-gray-900">
                      Papildoma informacija
                    </h3>
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-700">
                        Bazinis metabolizmo greitis (BMR): <b>{bmr} kcal</b>
                      </p>
                      <p className="text-sm text-gray-700">
                        Bendras dienos energijos poreikis (TDEE):{" "}
                        <b>{tdee} kcal</b>
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
            )
          ) : (
            <p className="text-sm text-gray-500 text-center">
              {step === 1
                ? 'Įveskite duomenis ir spauskite "Toliau", kad tęstumėte.'
                : 'Įveskite duomenis ir spauskite "Skaičiuoti", kad pamatytumėte rezultatus.'}
            </p>
          )}
        </div>
      </div>

      <div className="pt-10">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="p-8">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              D.U.K
            </h2>
            <div className="mt-8 space-y-10">
              <dl className="space-y-16 md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-16 md:space-y-0 2xl:gap-x-20">
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
          Ši skaičiuoklė yra skirta tik informaciniams tikslams. Nors stengiamės
          pateikti tikslią informaciją, mes neprisiimame atsakomybės už jokius
          sveikatos sutrikimus ar žalą, kuri gali atsirasti naudojantis šia
          skaičiuokle. Prieš keisdami savo įpročius, pasitarkite su sveikatos
          priežiūros specialistu.
        </p>
      </div>
    </div>
  );
}
