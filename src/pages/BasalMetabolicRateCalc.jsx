import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathRoundedSquareIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

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
    description: "Mažai arba jokio fizinio aktyvumo",
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
  const [activityLevel, setActivityLevel] = useState(activityLevels[2]);
  const [calories, setCalories] = useState(null);
  const [weightLossCalories, setWeightLossCalories] = useState(null);
  const [weightGainCalories, setWeightGainCalories] = useState(null);

  const calculateBMR = (weight, height, age, gender) => {
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const handleCalculateCalories = (e) => {
    e.preventDefault();
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);

    if (
      isNaN(weightInKg) ||
      isNaN(heightInCm) ||
      isNaN(ageInYears) ||
      weightInKg <= 0 ||
      heightInCm <= 0 ||
      ageInYears <= 0
    ) {
      alert("Įveskite teisingus duomenis.");
      return;
    }

    const BMR = calculateBMR(weightInKg, heightInCm, ageInYears, gender);
    const maintenanceCalories = BMR * parseFloat(activityLevel.value); // Maintenance calories based on activity level

    // Calculate the daily calorie deficit for weight loss
    const caloriesForWeightLoss025kg = maintenanceCalories - (0.25 * 7700) / 7; // Deficit for 0.25 kg per week
    const caloriesForWeightLoss05kg = maintenanceCalories - (0.5 * 7700) / 7; // Deficit for 0.5 kg per week
    const caloriesForWeightLoss1kg = maintenanceCalories - (1 * 7700) / 7; // Deficit for 1 kg per week

    const caloriesForWeightGain = maintenanceCalories + 500; // Calories for weight gain

    setCalories(maintenanceCalories.toFixed(0));
    setWeightLossCalories({
      "0.25kg": caloriesForWeightLoss025kg.toFixed(0),
      "0.5kg": caloriesForWeightLoss05kg.toFixed(0),
      "1kg": caloriesForWeightLoss1kg.toFixed(0),
    });
    setWeightGainCalories(caloriesForWeightGain.toFixed(0)); // Weight gain calories
  };

  const handleReset = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("female");
    setActivityLevel(activityLevels[2]);
    setCalories(null);
    setWeightLossCalories(null);
    setWeightGainCalories(null);
  };

  return (
    <>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
          <form
            onSubmit={handleCalculateCalories}
            className="w-full max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
          >
            <div className="gap-x-6 border-b border-gray-900/10 p-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Kasdienio kalorijų suvartojimo skaičiuoklė
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Įveskite savo duomenis ir sužinokite, kiek kalorijų jums reikia
                per dieną norint išlaikyti, numesti ar priaugti svorio.
              </p>
            </div>
            <div className="p-8">
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

                <div className="sm:col-span-6">
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
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-8 py-4">
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
                Skaičiuoti
              </button>
            </div>
          </form>

          {calories && (
            <div className="h-min w-full max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
              <div className="grid grid-cols-1 col-span-2 gap-8 p-8">
                <div className="rounded-2xl bg-gray-50 p-10">
                  <div>
                    <div className="flex gap-3">
                      <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Kalorijos esamam svoriui palaikyti
                      </h3>
                    </div>
                    <dl className="mt-3 -mb-2 space-y-1 text-sm not-italic leading-6 text-gray-600">
                      <div className="py-3 grid grid-cols-3 gap-4 content-center">
                        <dt className="flex col-span-2 gap-2">
                          <ArrowPathRoundedSquareIcon
                            className="h-6 w-6 text-gray-900"
                            aria-hidden="true"
                          />
                          <h3 className="text-sm leading-6 text-gray-700 sm:col-span-1">
                            Esamam svoriui palaikyti:
                          </h3>
                        </dt>
                        <dd className="col-span-1 text-base font-medium text-gray-900 text-right">
                          {calories} kcal
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="rounded-2xl bg-blue-50 p-10">
                  <div className="flex gap-3">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Kalorijos svorio metimui
                    </h3>
                  </div>
                  <dl className="mt-3 -mb-2 space-y-1 text-sm not-italic leading-6 text-gray-600">
                    <div className="py-3 grid grid-cols-3 gap-4 content-center">
                      <dt className="flex col-span-2 gap-2">
                        <ArrowDownCircleIcon
                          className="h-6 w-6 text-gray-900"
                          aria-hidden="true"
                        />
                        <h3 className="text-sm leading-6 text-gray-700 sm:col-span-1">
                          ~0.25 kg per savaitę:
                        </h3>
                      </dt>
                      <dd className="col-span-1 text-base font-medium text-gray-900 text-right">
                        {weightLossCalories["0.25kg"]} kcal
                      </dd>
                    </div>
                    <div className="py-3 grid grid-cols-3 gap-4 content-center">
                      <dt className="flex col-span-2 gap-2">
                        <ArrowDownCircleIcon
                          className="h-6 w-6 text-gray-900"
                          aria-hidden="true"
                        />
                        <h3 className="text-sm leading-6 text-gray-700 sm:col-span-1">
                          ~0.5 kg per savaitę:
                        </h3>
                      </dt>
                      <dd className="col-span-1 text-base font-medium text-gray-900 text-right">
                        {weightLossCalories["0.5kg"]} kcal
                      </dd>
                    </div>
                    <div className="py-3 grid grid-cols-3 gap-4 content-center">
                      <dt className="flex col-span-2 gap-2">
                        <ArrowDownCircleIcon
                          className="h-6 w-6 text-gray-900"
                          aria-hidden="true"
                        />
                        <h3 className="text-sm leading-6 text-gray-700 sm:col-span-1">
                          ~1 kg per savaitę:
                        </h3>
                      </dt>
                      <dd className="col-span-1 text-base font-medium text-gray-900 text-right">
                        {weightLossCalories["1kg"]} kcal
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl bg-orange-50 p-10">
                  <div className="flex gap-3">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Kalorijos svorio priaugimui
                    </h3>
                  </div>
                  <dl className="mt-3 -mb-2 space-y-1 text-sm not-italic leading-6 text-gray-600">
                    <div className="py-3 grid grid-cols-3 gap-4 content-center">
                      <dt className="flex col-span-2 gap-2">
                        <ArrowUpCircleIcon
                          className="h-6 w-6 text-gray-900"
                          aria-hidden="true"
                        />
                        <h3 className="text-sm leading-6 text-gray-700 sm:col-span-1">
                          ~0.5 kg per savaitę:
                        </h3>
                      </dt>
                      <dd className="col-span-1 text-base font-medium text-gray-900 text-right">
                        {weightGainCalories} kcal
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 pt-10">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
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
      </div>
    </>
  );
}
