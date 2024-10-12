import { useState, useRef, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const activityLevels = [
  { id: 1, name: "Sėdimas", value: 1.2 },
  { id: 2, name: "Lengvas aktyvumas", value: 1.375 },
  { id: 3, name: "Vidutinis aktyvumas", value: 1.55 },
  { id: 4, name: "Didelis aktyvumas", value: 1.725 },
  { id: 5, name: "Labai didelis aktyvumas", value: 1.9 },
];

const fitnessGoals = [
  { id: 1, name: "Lėti svorio pokyčiai (~0.25 kg/sav.)", value: 0.25 },
  { id: 2, name: "Vidutiniai svorio pokyčiai (~0.5 kg/sav.)", value: 0.5 },
  { id: 3, name: "Greiti svorio pokyčiai (~1 kg/sav.)", value: 1 },
];

const goalTypes = [
  { id: 1, name: "Svorio metimas", value: -1 },
  { id: 2, name: "Svorio palaikymas", value: 0 },
  { id: 3, name: "Svorio priaugimas", value: 1 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MacronutrientCalc() {
  const [step, setStep] = useState(1);

  // User inputs
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState(activityLevels[2]);
  const [goalType, setGoalType] = useState(goalTypes[1]);
  const [fitnessGoal, setFitnessGoal] = useState(fitnessGoals[1]);

  // Results
  const [bmr, setBMR] = useState(null);
  const [tdee, setTDEE] = useState(null);
  const [caloricNeeds, setCaloricNeeds] = useState(null);
  const [macros, setMacros] = useState(null);

  const resultsRef = useRef(null);

  // Scroll to results when they are rendered
  useEffect(() => {
    if (caloricNeeds && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [caloricNeeds]);

  const handleNext = (e) => {
    e.preventDefault();
    // Validate inputs
    if (
      !age ||
      !height ||
      !weight ||
      isNaN(age) ||
      isNaN(height) ||
      isNaN(weight)
    ) {
      alert("Prašome įvesti teisingus duomenis.");
      return;
    }
    setStep(2);
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Calculate BMR using Mifflin-St Jeor Equation
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);

    let calculatedBMR;
    if (gender === "male") {
      calculatedBMR =
        10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5;
    } else {
      calculatedBMR =
        10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;
    }

    // Calculate TDEE
    const calculatedTDEE = calculatedBMR * activityLevel.value;

    // Adjust for fitness goal
    let adjustedCalories = calculatedTDEE;

    if (goalType.value !== 0) {
      const caloriesPerKg = 7700; // kcal per kg of body weight
      const calorieAdjustment =
        (fitnessGoal.value * caloriesPerKg * goalType.value) / 7; // Daily calorie deficit or surplus
      adjustedCalories = calculatedTDEE + calorieAdjustment;
    }

    // Default macronutrient ratios
    const proteinRatio = 0.3;
    const fatRatio = 0.25;
    const carbRatio = 0.45;

    // Calculate macros in grams
    const proteinGrams = ((adjustedCalories * proteinRatio) / 4).toFixed(0);
    const fatGrams = ((adjustedCalories * fatRatio) / 9).toFixed(0);
    const carbGrams = ((adjustedCalories * carbRatio) / 4).toFixed(0);

    setBMR(calculatedBMR.toFixed(0));
    setTDEE(calculatedTDEE.toFixed(0));
    setCaloricNeeds(adjustedCalories.toFixed(0));
    setMacros({
      protein: proteinGrams,
      fat: fatGrams,
      carbs: carbGrams,
    });
  };

  const handleReset = () => {
    setStep(1);
    setAge("");
    setGender("female");
    setHeight("");
    setWeight("");
    setActivityLevel(activityLevels[2]);
    setGoalType(goalTypes[1]);
    setFitnessGoal(fitnessGoals[1]);
    setBMR(null);
    setTDEE(null);
    setCaloricNeeds(null);
    setMacros(null);
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      {/* Form Section */}
      <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-6">
        <form
          onSubmit={step === 1 ? handleNext : handleCalculate}
          className={classNames(
            "w-full bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl",
            caloricNeeds ? "xl:col-span-3" : "xl:col-span-4"
          )}
        >
          <div className="gap-x-6 border-b border-gray-900/10 p-8">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">
              Makroelementų skaičiuoklė
            </h1>
            <h2 className="mt-4 text-sm leading-6 text-gray-600">
              Sužinokite savo dienos kalorijų poreikį ir optimalią
              makroelementų (baltymų, riebalų, angliavandenių) proporciją.
            </h2>
          </div>
          <div className="p-8">
            {step === 1 && (
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                {/* Height */}
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
                </div>

                {/* Weight */}
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
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Activity Level */}
                <div>
                  <RadioGroup
                    value={activityLevel}
                    onChange={setActivityLevel}
                  >
                    <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                      Aktyvumo lygis
                    </RadioGroup.Label>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      {activityLevels.map((level) => (
                        <RadioGroup.Option
                          key={level.id}
                          value={level}
                          className={({ checked, active }) =>
                            classNames(
                              checked ? "border-transparent" : "border-gray-300",
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
                                    {level.name}
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

                {/* Goal Type */}
                <div>
                  <RadioGroup value={goalType} onChange={setGoalType}>
                    <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                      Tikslas
                    </RadioGroup.Label>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                      {goalTypes.map((goal) => (
                        <RadioGroup.Option
                          key={goal.id}
                          value={goal}
                          className={({ checked, active }) =>
                            classNames(
                              checked ? "border-transparent" : "border-gray-300",
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
                                    {goal.name}
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

                {/* Fitness Goal */}
                {goalType.value !== 0 && (
                  <div>
                    <RadioGroup
                      value={fitnessGoal}
                      onChange={setFitnessGoal}
                    >
                      <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Pasirinkite svorio pokyčio greitį
                      </RadioGroup.Label>
                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                        {fitnessGoals.map((goal) => (
                          <RadioGroup.Option
                            key={goal.id}
                            value={goal}
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
                                      {goal.name}
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
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-8 py-4">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Atgal
              </button>
            )}
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
        </form>

        {/* Results Section */}
        {caloricNeeds && (
          <div
            ref={resultsRef}
            className="h-min w-full bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl xl:col-span-3"
            style={{ scrollMarginTop: "80px" }}
          >
            <div className="p-8">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Rezultatai
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    Dienos kalorijų poreikis
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-indigo-600">
                    {caloricNeeds} kcal
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    Makroelementų pasiskirstymas
                  </h3>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        Baltymai
                      </p>
                      <p className="mt-1 text-2xl font-bold text-indigo-600">
                        {macros.protein} g
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        Riebalai
                      </p>
                      <p className="mt-1 text-2xl font-bold text-indigo-600">
                        {macros.fat} g
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        Angliavandeniai
                      </p>
                      <p className="mt-1 text-2xl font-bold text-indigo-600">
                        {macros.carbs} g
                      </p>
                    </div>
                  </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Content (e.g., FAQs) */}
      {/* ... You can add FAQs or other informational content here ... */}
    </div>
  );
}
