import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import useScrollEffects from "../hooks/useScrollEffects";
import PageContentSection from "../components/PageContentSection";
import RecommendedCalculatorsSection from "../components/RecommendedCalculatorsSection";
import BackToTopButton from "../components/BackToTopButton";
import InputField from "../components/InputField";
import RadioGroupInput from "../components/RadioGroupInput";
import ResultsDisclaimer from "../components/ResultsDisclaimer";
import HeroSection from "../components/HeroSection";

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

const genderOptions = [
  { value: "female", label: "Moteris" },
  { value: "male", label: "Vyras" },
];

export default function BasalMetabolicRateCalc() {
  const { scrolled, showBackToTop, scrollToTop, setCalcTimestamp, resultsRef } =
    useScrollEffects();

  const [step, setStep] = useState(1);

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("female");
  const [activityLevel, setActivityLevel] = useState(activityLevels[1]);
  const [calories, setCalories] = useState(null);
  const [weightLossCalories, setWeightLossCalories] = useState(null);
  const [weightGainCalories, setWeightGainCalories] = useState(null);

  const [ageError, setAgeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");

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

    if (!isValid) return;

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

    setCalcTimestamp(Date.now());
  };

  return (
    <>
      <HeroSection
        title="Kiek kalorijų reikia suvartoti per dieną?"
        subtitle="Sužinokite, kiek kalorijų reikėtų sunaudoti norint palaikyti esamą svorį, arba numesti, arba priaugti svorio"
        calculatorForm={
          <form
            onSubmit={step === 1 ? handleNext : handleCalculateCalories}
            className="space-y-6"
          >
            {step === 1 && (
              <>
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
                  onChange={(newVal) => setAge(newVal)}
                  placeholder="pvz. 25"
                  error={ageError}
                  type="number"
                />

                <RadioGroupInput
                  label="Pasirinkite lytį"
                  name="gender"
                  options={genderOptions}
                  selectedValue={gender}
                  onChange={(val) => setGender(val)}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Aktyvumo lygis
                  </label>
                  <RadioGroup
                    value={activityLevel}
                    onChange={setActivityLevel}
                    className="mt-3 grid gap-y-4"
                  >
                    {activityLevels.map((activity) => (
                      <RadioGroup.Option
                        key={activity.id}
                        value={activity}
                        className={({ checked }) =>
                          classNames(
                            checked
                              ? "border-transparent bg-emerald-600 text-white"
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
              </>
            )}

            <div className="flex items-center">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 hover:text-gray-700 mr-auto"
                >
                  Grįžti atgal
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2 rounded-md bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {step === 1 ? "Toliau" : "Skaičiuoti"}
              </button>
            </div>
          </form>
        }
        scrolled={scrolled}
      />

      <div className="flex flex-col gap-10 sm:gap-14">
        {calories && (
          <PageContentSection ref={resultsRef} scrolled={scrolled}>
            <div>
              <ResultsDisclaimer />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-12">
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
                        Priaugti <span className="font-semibold">0.25 kg</span>
                        /sav
                      </span>
                      <span className="text-xl font-medium text-gray-900">
                        {weightGainCalories["0.25kg"]} kcal
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Priaugti <span className="font-semibold">0.5 kg</span>
                        /sav
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
                        Numesti <span className="font-semibold">0.25 kg</span>
                        /sav
                      </span>
                      <span className="text-xl font-medium text-gray-900">
                        {weightLossCalories["0.25kg"]} kcal
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Numesti <span className="font-semibold">0.5 kg</span>
                        /sav
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
              <RecommendedCalculatorsSection showCalorieBurnCalculator/>
            </div>
          </PageContentSection>
        )}

        <PageContentSection ref={resultsRef} scrolled={scrolled}>
          <section className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <div className="mt-1 text-gray-700">{faq.answer}</div>
              </div>
            ))}
          </section>
        </PageContentSection>
      </div>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}
