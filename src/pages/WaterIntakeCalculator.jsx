import { useState } from "react";
import HeroSection from "../components/HeroSection";
import PageContentSection from "../components/PageContentSection";
import BackToTopButton from "../components/BackToTopButton";
import RecommendedCalculatorsSection from "../components/RecommendedCalculatorsSection";
import InputField from "../components/InputField";
import RadioGroupInput from "../components/RadioGroupInput";
import ResultsDisclaimer from "../components/ResultsDisclaimer";
import useScrollEffects from "../hooks/useScrollEffects";

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

const genderOptions = [
  { value: "female", label: "Moteris" },
  { value: "male", label: "Vyras" },
];

export default function WaterIntakeCalculator() {
  const { scrolled, showBackToTop, scrollToTop, setCalcTimestamp, resultsRef } =
    useScrollEffects();

  const [step, setStep] = useState(1);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseHours, setExerciseHours] = useState(0);
  const [climate, setClimate] = useState(climates[1]);

  const [ageError, setAgeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");

  const [totalIntake, setTotalIntake] = useState(null);

  const handleNext = (e) => {
    e.preventDefault();

    setAgeError("");
    setWeightError("");
    setHeightError("");

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

    let activityFactor = 1.2;
    if (exerciseHours > 0 && exerciseHours <= 1) {
      activityFactor = 1.375;
    } else if (exerciseHours > 1 && exerciseHours <= 3) {
      activityFactor = 1.55;
    } else if (exerciseHours > 3 && exerciseHours <= 5) {
      activityFactor = 1.725;
    } else if (exerciseHours > 5) {
      activityFactor = 1.9;
    }

    const calculatedTDEE = calculatedBMR * activityFactor;

    let calculatedTotalIntake = calculatedTDEE;

    const calculatedClimateAdjustment = climate.adjustment;
    calculatedTotalIntake += calculatedClimateAdjustment;

    setTotalIntake(calculatedTotalIntake.toFixed(0));

    setCalcTimestamp(Date.now());
  };

  return (
    <>
      <HeroSection
        title="Vandens suvartojimo skaičiuoklė"
        subtitle="Sužinokite, kiek vandens per dieną jums gali reikėti, atsižvelgiant 
        į jūsų amžių, ūgį, svorį, fizinio aktyvumo lygį ir klimatą."
        calculatorForm={
          <form
            onSubmit={step === 1 ? handleNext : handleCalculate}
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
                <InputField
                  label="Fizinis aktyvumas (valandos per dieną)"
                  id="exerciseHours"
                  value={exerciseHours}
                  onChange={(newVal) => setExerciseHours(newVal)}
                  type="number"
                />

                <div>
                  <label
                    htmlFor="climate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Klimatas
                  </label>
                  <RadioGroup
                    value={climate}
                    onChange={setClimate}
                    className="mt-3 grid gap-y-4"
                  >
                    {climates.map((climate) => (
                      <RadioGroup.Option
                        key={climate.id}
                        value={climate}
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
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium"
                              >
                                {climate.name}
                              </RadioGroup.Label>
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
        {totalIntake && (
          <PageContentSection ref={resultsRef} scrolled={scrolled}>
            <div>
              <ResultsDisclaimer/>

              <div className="rounded-md bg-emerald-50 p-6 my-8">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Rekomenduojamas vandens suvartojimas
                </h3>
                <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-emerald-900">
                  {(Number(totalIntake) / 1000).toFixed(2)} l / dieną
                </p>
              </div>
              <RecommendedCalculatorsSection
                showBodyMassIndexCalculator
                showCalorieBurnCalculator
                showWaterIntakeCalculator={false}
              />
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
