import { useState, useRef } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

const faqs = [
  {
    question: "Kaip apskaičiuojamas dienos kalorijų poreikis?",
    answer:
      "Dienos kalorijų poreikis apskaičiuojamas naudojant Mifflin-St Jeor formulę baziniam metabolizmo greičiui (BMR) nustatyti ir koreguojamas pagal jūsų fizinio aktyvumo lygį.",
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

  const handleCalculateCalories = (e) => {
    e.preventDefault();

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

    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Kalorijų suvartojimo skaičiuoklė
      </h1>
      <form
        onSubmit={step === 1 ? handleNext : handleCalculateCalories}
        className="grid gap-8 bg-white rounded-lg ring-1 ring-slate-200 p-6"
      >
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div>
              <label
                htmlFor="gender"
                className="block text-base font-medium text-gray-700"
              >
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
          </div>
        )}
        {step === 2 && (
          <div className="mt-6">
            <label className="block text-base font-medium text-gray-700">
              Aktyvumo lygis
            </label>
            <RadioGroup
              value={activityLevel}
              onChange={setActivityLevel}
              className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
            >
              {activityLevels.map((activity) => (
                <RadioGroup.Option
                  key={activity.id}
                  value={activity}
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
                            {activity.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className="mt-1 text-sm"
                          >
                            {activity.description}
                          </RadioGroup.Description>
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

      {calories && (
        <div
          ref={resultsRef}
          style={{ scrollMarginTop: "80px" }}
          className="bg-white ring-1 ring-slate-200 rounded-lg p-6 mt-10"
        >
          <div className="pb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Rezultatai
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-md bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Svorio palaikymui
                </h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {calories} kcal
                </p>
              </div>

              <div className="rounded-md bg-gray-50 p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Svorio priaugimui
                </h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Priaugti <span className="font-semibold">0.25 kg</span>/sav
                    </span>
                    <span className="text-xl font-medium text-gray-900">
                      {weightGainCalories["0.25kg"]} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Priaugti <span className="font-semibold">0.5 kg</span>/sav
                    </span>
                    <span className="text-xl font-medium text-gray-900">
                      {weightGainCalories["0.5kg"]} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Priaugti <span className="font-semibold">1 kg</span>/sav
                    </span>
                    <span className="text-xl font-medium text-gray-900">
                      {weightGainCalories["1kg"]} kcal
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-gray-50 p-6 sm:col-span-2">
                <h3 className="text-lg font-medium text-gray-900">
                  Svorio metimui
                </h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Numesti <span className="font-semibold">0.25 kg</span>/sav
                    </span>
                    <span className="text-xl font-medium text-gray-900">
                      {weightLossCalories["0.25kg"]} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Numesti <span className="font-semibold">0.5 kg</span>/sav
                    </span>
                    <span className="text-xl font-medium text-gray-900">
                      {weightLossCalories["0.5kg"]} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Numesti <span className="font-semibold">1 kg</span>/sav
                    </span>
                    <span className="text-xl font-medium text-gray-900">
                      {weightLossCalories["1kg"]} kcal
                    </span>
                  </div>
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
                href="/sudeginamos-kalorijos"
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
                    <b>Kalorijų sudeginimo skaičiuoklė</b>
                    <p className="text-base text-gray-600">
                      Sužinokite, kiek kalorijų sudeginate įvairių veiklų metu.
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
