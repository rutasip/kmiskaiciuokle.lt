import { useState } from "react";
import HeroSection from "../components/HeroSection";
import PageContentSection from "../components/PageContentSection";
import BackToTopButton from "../components/BackToTopButton";
import RecommendedCalculatorsSection from "../components/RecommendedCalculatorsSection";
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

  const [bmr, setBMR] = useState(null);
  const [tdee, setTDEE] = useState(null);
  const [climateAdjustment, setClimateAdjustment] = useState(null);
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

    setBMR(calculatedBMR.toFixed(0));
    setTDEE(calculatedTDEE.toFixed(0));
    setClimateAdjustment(calculatedClimateAdjustment);
    setTotalIntake(calculatedTotalIntake.toFixed(0));

    setCalcTimestamp(Date.now());
  };

  return (
    <>
      {/* Optional: horizontalBounce keyframe so arrow chevrons bounce */}
      <style>
        {`
          @keyframes horizontalBounce {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
          }
        `}
      </style>

      <HeroSection
        title="Vandens suvartojimo skaičiuoklė"
        subtitle="Sužinokite, kiek vandens per dieną jums gali reikėti, atsižvelgiant 
        į jūsų amžių, ūgį, svorį, fizinio aktyvumo lygį ir klimatą."
        calculatorTitle={
          step === 1
            ? "Jūsų fiziniai duomenys"
            : "Fizinis aktyvumas ir klimatas"
        }
        calculatorForm={
          <form
            onSubmit={step === 1 ? handleNext : handleCalculate}
            className="space-y-5"
          >
            {step === 1 && (
              <>
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amžius
                  </label>
                  <input
                    type="number"
                    id="age"
                    placeholder="pvz. 25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                  {ageError && (
                    <p className="mt-1 text-sm text-red-600">{ageError}</p>
                  )}
                </div>

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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                  {heightError && (
                    <p className="mt-1 text-sm text-red-600">{heightError}</p>
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                  {weightError && (
                    <p className="mt-1 text-sm text-red-600">{weightError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lytis
                  </label>
                  <div className="flex items-center space-x-6 mt-2">
                    <div className="flex items-center">
                      <input
                        id="female"
                        name="gender"
                        type="radio"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                        className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
                      />
                      <label
                        htmlFor="female"
                        className="ml-2 text-sm text-gray-700"
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
                        className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
                      />
                      <label
                        htmlFor="male"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Vyras
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label
                    htmlFor="exerciseHours"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fizinis aktyvumas (valandos per dieną)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    id="exerciseHours"
                    placeholder="pvz. 1"
                    value={exerciseHours}
                    onChange={(e) => setExerciseHours(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>

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
                    {climates.map((clim) => (
                      <RadioGroup.Option
                        key={clim.id}
                        value={clim}
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
                                {clim.name}
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

            <div className="flex justify-end items-center pt-4">
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
              <div className="mb-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                  Rezultatai
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Remiantis jūsų įvestimi, žemiau pateikiamos rekomendacijos
                </p>
              </div>

              <div className="rounded-md bg-emerald-50 p-6 mb-8">
                <h3 className="text-lg font-semibold text-emerald-800">
                  Rekomenduojamas vandens suvartojimas
                </h3>
                <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-emerald-900">
                  {(Number(totalIntake) / 1000).toFixed(2)} l / dieną
                </p>
                <p className="mt-1 text-sm text-emerald-700">
                  Į šį kiekį įskaičiuotas papildomas kiekis šiltesniam klimatui.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    BMR
                  </h3>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    {bmr} kcal
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    TDEE
                  </h3>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    {tdee} kcal
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Klimato priedas
                  </h3>
                  {climateAdjustment > 0 ? (
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      +{(climateAdjustment / 1000).toFixed(2)} l
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Netaikomas</span>
                  )}
                </div>
              </div>

              <RecommendedCalculatorsSection />
            </div>
          </PageContentSection>
        )}

        <PageContentSection ref={resultsRef} scrolled={scrolled}>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Dažniausiai užduodami klausimai
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Žemiau pateikiame keletą atsakymų į bendrus klausimus apie vandens
              suvartojimą ir šios skaičiuoklės veikimą.
            </p>
          </section>

          <section className="space-y-6 mt-6">
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

      {/* Back to top button */}
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}
