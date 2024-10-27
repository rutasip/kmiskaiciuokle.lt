import { useState, useRef, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
// import {
//   ArrowDownCircleIcon,
//   ArrowUpCircleIcon,
// } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Kaip apskaičiuojamas dienos kalorijų poreikis?",
    answer:
      "Dienos kalorijų poreikis apskaičiuojamas naudojant Mifflin-St Jeor formulę baziniam metabolizmo greičiui (BMR) nustatyti ir koreguojamas pagal ūsų fizinio aktyvumo lygį.",
  },
  {
    question: "Ar skaičiuoklės rezultatai yra tikslūs?",
    answer:
      "Skaičiuoklė pateikia apytikslius rezultatus, pagrįstus standartinėmis formulėmis. Individualūs poreikiai gali skirtis, todėl rekomenduojama pasitarti su sveikatos priežiūros specialistu.",
  },
  {
    question: "Ar galiu pasikliauti šia skaičiuokle planuodamas mitybą?",
    answer:
      "Nors skaičiuoklė suteikia naudingų įžvalgų, ji neturėtų būti vienintelis šaltinis planuojant mitybą. Pasitarkite su dietologu ar sveikatos priežiūros specialistu dėl individualizuotų rekomendacijų.",
  },
  {
    question: "Ar ši skaičiuoklė tinka visiems?",
    answer:
      "Skaičiuoklė skirta suaugusiems asmenims. Nėščioms moterims, sportininkams ar žmonėms su sveikatos sutrikimais gali prireikti specialių rekomendacijų.",
  },
  {
    question: "Kokie veiksniai daro įtaką kalorijų poreikiui?",
    answer:
      "Kalorijų poreikiui įtakos turi amžius, lytis, svoris, ūgis, fizinio aktyvumo lygis, medžiagų apykaita ir kiti individualūs sveikatos veiksniai.",
  },
];

const activityLevels = [
  {
    id: 1,
    name: "Sėdimas",
    description: "Mažas arba jokio fizinio aktyvumo",
    value: "1.2",
  },
  {
    id: 2,
    name: "Lengvas aktyvumas",
    description:
      "Lengvas fizinis aktyvumas ar lengvas sportas 1-3 kartus per savaitę",
    value: "1.375",
  },
  {
    id: 3,
    name: "Vidutinis aktyvumas",
    description: "Vidutinio intensyvumo sportas 3-5 kartus per savaitę",
    value: "1.55",
  },
  {
    id: 4,
    name: "Didelis aktyvumas",
    description: "Intensyvus sportas 6-7 kartus per savaitę",
    value: "1.725",
  },
  {
    id: 5,
    name: "Labai didelis aktyvumas",
    description:
      "Labai intensyvus sportas ir fizinis darbas arba sportas du kartus per dieną",
    value: "1.9",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BasalMetabolicRateCalc() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("female");
  const [activityLevel, setActivityLevel] = useState(activityLevels[1]);
  const [calories, setCalories] = useState(null);
  const [weightLossCalories, setWeightLossCalories] = useState(null);
  const [weightGainCalories, setWeightGainCalories] = useState(null);
  const [step, setStep] = useState(1);
  const [showIcon, setShowIcon] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");

  const resultsRef = useRef(null);

  const calculateBMR = (weight, height, age, gender) => {
    if (gender === "male") {
      return 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
    } else {
      return 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
    }
  };

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

  const handleCalculateCalories = (e) => {
    e.preventDefault();

    setShowIcon(true);

    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);

    const BMR = calculateBMR(weightInKg, heightInCm, ageInYears, gender);
    const maintenanceCalories = BMR * parseFloat(activityLevel.value);

    const caloriesForWeightLoss025kg = maintenanceCalories - (0.25 * 7700) / 7;
    const caloriesForWeightLoss05kg = maintenanceCalories - (0.5 * 7700) / 7;
    const caloriesForWeightLoss1kg = maintenanceCalories - (1 * 7700) / 7;

    const caloriesForWeightGain025kg = maintenanceCalories + (0.25 * 7700) / 7;
    const caloriesForWeightGain05kg = maintenanceCalories + (0.5 * 7700) / 7;
    const caloriesForWeightGain1kg = maintenanceCalories + (1 * 7700) / 7;

    setCalories(maintenanceCalories.toFixed(0));

    setTimeout(() => {
      setShowIcon(false);

      setWeightLossCalories({
        "0.25kg": caloriesForWeightLoss025kg.toFixed(0),
        "0.5kg": caloriesForWeightLoss05kg.toFixed(0),
        "1kg": caloriesForWeightLoss1kg.toFixed(0),
      });

      setWeightGainCalories({
        "0.25kg": caloriesForWeightGain025kg.toFixed(0),
        "0.5kg": caloriesForWeightGain05kg.toFixed(0),
        "1kg": caloriesForWeightGain1kg.toFixed(0),
      });
    }, 1600);
  };

  useEffect(() => {
    if (showIcon && calories) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showIcon, calories]);

  return (
    <>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
          <form
            onSubmit={step === 1 ? handleNext : handleCalculateCalories}
            className="w-full max-w-2xl h-fit bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-md"
          >
            <div className="gap-x-6 border-b border-gray-900/10 p-8">
              <h1 className="text-lg font-semibold leading-7 text-gray-900">
                Kalorijų suvartojimo skaičiuoklė
              </h1>
              <h2 className="mt-4 text-sm leading-6 text-gray-600">
                Įveskite savo duomenis ir sužinokite, kiek kalorijų Jums reikia
                per dieną norint išlaikyti, numesti ar priaugti svorio.
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
                        aria-describedby="age-value"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    {ageError && (
                      <p className="mt-1 text-sm text-red-600">{ageError}</p>
                    )}
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
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                </div>
              )}

              {step === 2 && (
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
                  <RadioGroup value={activityLevel} onChange={setActivityLevel}>
                    <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                      Aktyvumo lygis
                    </RadioGroup.Label>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      {activityLevels.map((activity) => (
                        <RadioGroup.Option
                          key={activity.id}
                          value={activity}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? "border-transparent"
                                : "border-gray-300",
                              active ? "ring-2 ring-indigo-500" : "",
                              "relative flex cursor-pointer rounded-md border bg-white p-4 shadow-sm focus:outline-none"
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
                                    {activity.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {activity.description}
                                  </RadioGroup.Description>
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
                                  "pointer-events-none absolute -inset-px rounded-md"
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
              <div
                className={classNames(
                  step === 1 ? "justify-end" : "justify-between",
                  "flex items-center gap-x-6 mt-10"
                )}
              >
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-x-2 text-sm font-semibold leading-6 text-slate-800"
                  >
                    <ArrowLeftIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                      color="text-slate-800"
                    />
                    Atgal
                  </button>
                )}
                <button
                  type="submit"
                  className="w-1/2 rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
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
              calories && !showIcon && "bg-white h-fit",
              "flex w-full max-w-2xl flex-col p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-md justify-center"
            )}
          >
            {calories ? (
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-md bg-white p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Svorio palaikymui
                    </h3>
                    <p className="mt-2 text-2xl font-bold text-navy-blue">
                      {calories} kcal
                    </p>
                  </div>

                  <div className="rounded-md bg-blue-50 p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Svorio priaugimui
                    </h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Siekiant priaugti{" "}
                          <span className="font-semibold">0.25 kg</span> per
                          savaitę
                        </span>
                        <span className="text-xl font-medium text-blue-600">
                          {weightGainCalories["0.25kg"]} kcal
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Siekiant priaugti{" "}
                          <span className="font-semibold">0.5 kg</span> per
                          savaitę
                        </span>
                        <span className="text-xl font-medium text-blue-600">
                          {weightGainCalories["0.5kg"]} kcal
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          Siekiant priaugti{" "}
                          <span className="font-semibold">1 kg</span> per
                          savaitę
                        </span>
                        <span className="text-xl font-medium text-blue-600">
                          {weightGainCalories["1kg"]} kcal
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 rounded-md bg-white p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Svorio metimui
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {Object.entries(weightLossCalories).map(
                        ([key, value]) => (
                          <div key={key} className="flex flex-col items-center">
                            <span className="text-sm text-gray-700">
                              Numesti {key.replace("kg", "")} kg/sav
                            </span>
                            <span className="text-xl font-medium text-green-600">
                              {value} kcal
                            </span>
                          </div>
                        )
                      )}
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

        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 pt-10">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-md">
            <div className="p-8">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                D. U. K.
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
