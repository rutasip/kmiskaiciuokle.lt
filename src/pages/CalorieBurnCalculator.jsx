import { Fragment, useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import HeroSection from "../components/HeroSection";
import PageContentSection from "../components/PageContentSection";
import BackToTopButton from "../components/BackToTopButton";
import InputField from "../components/InputField";
import ResultsDisclaimer from "../components/ResultsDisclaimer";
import useScrollEffects from "../hooks/useScrollEffects";
import RecommendedCalculatorsSection from "../components/RecommendedCalculatorsSection";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const activities = [
  {
    category: "Sportas",
    options: [
      { id: 1, name: "Vaikščiojimas (5 km/h)", value: 3.5 },
      { id: 2, name: "Bėgimas (8 km/h)", value: 8.0 },
      { id: 3, name: "Bėgimas (12 km/h)", value: 11.0 },
      { id: 4, name: "Dviračių sportas (16-19 km/h)", value: 7.5 },
      { id: 5, name: "Plaukimas (vidutiniu tempu)", value: 6.0 },
      { id: 6, name: "Plaukimas (intensyvus)", value: 9.8 },
      { id: 7, name: "Joga", value: 2.5 },
      { id: 8, name: "Svorio kilnojimas (vidutinio sunkumo)", value: 4.0 },
      { id: 9, name: "Boksas", value: 9.0 },
      { id: 10, name: "Krepšinis", value: 6.5 },
      { id: 11, name: "Futbolas", value: 7.0 },
      { id: 12, name: "Tenisas (dvejetas)", value: 5.0 },
      { id: 13, name: "Tenisas (vienetai)", value: 8.0 },
      { id: 14, name: "Slidinėjimas", value: 7.0 },
      { id: 15, name: "Badmintonas", value: 4.5 },
      { id: 16, name: "Žygiai pėsčiomis", value: 6.0 },
      { id: 17, name: "Aerobika (vidutinio intensyvumo)", value: 5.0 },
      { id: 18, name: "Pilates", value: 3.0 },
      { id: 28, name: "Zumba", value: 6.0 },
      { id: 29, name: "Šokiai (vidutinio intensyvumo)", value: 5.5 },
      { id: 30, name: "Šokiai (intensyvūs)", value: 7.8 },
      { id: 31, name: "Elliptical treniruoklis (vidutinis)", value: 5.0 },
      { id: 32, name: "Irklavimas (vidutinė jėga)", value: 6.0 },
      { id: 33, name: "Stalo tenisas", value: 4.0 },
      { id: 34, name: "Riedučiai (vidutinis tempas)", value: 7.0 },
      { id: 35, name: "Treniruotė su kūno svoriu (vidutinė)", value: 5.0 },
      { id: 36, name: "Kopinėjimas uolomis", value: 7.5 },
    ],
  },
  {
    category: "Kasdieninė veikla",
    options: [
      { id: 19, name: "Žaidimai su vaikais", value: 3.0 },
      { id: 20, name: "Maisto gaminimas", value: 2.0 },
      { id: 21, name: "Namų tvarkymas", value: 3.5 },
      { id: 22, name: "Skalbinių džiaustymas", value: 2.3 },
      { id: 23, name: "Sodininkystė", value: 4.0 },
      { id: 24, name: "Langų valymas", value: 3.0 },
      { id: 25, name: "Maisto pirkimas", value: 2.3 },
      { id: 26, name: "Automobilio plovimas", value: 3.0 },
      { id: 27, name: "Žolės pjovimas", value: 5.0 },
      { id: 41, name: "Baldų perstumdymas", value: 5.5 },
      { id: 42, name: "Skalbiniai (lyginti)", value: 2.3 },
      { id: 43, name: "Vaikštant kalbėti telefonu", value: 2.0 },
      { id: 44, name: "Žaidimai su šunimi", value: 5.0 },
      { id: 45, name: "Nešiojimas daiktų (iki ~9 kg)", value: 4.0 },
      { id: 46, name: "Laiptų lipimas (lėtas)", value: 4.0 },
      { id: 47, name: "Laiptų lipimas (greitas)", value: 8.0 },
    ],
  },
  {
    category: "Žiemos veikla",
    options: [
      { id: 37, name: "Čiuožimas pačiūžomis (vidutinis)", value: 7.0 },
      { id: 38, name: "Čiuožimas pačiūžomis (greitas)", value: 9.0 },
      { id: 39, name: "Snieglentė (vidutinio intensyvumo)", value: 5.0 },
      { id: 40, name: "Rogės (bėgimas į kalną)", value: 7.0 },
    ],
  },
];

export default function CalorieBurnCalculator() {
  const {
    scrolled,
    showBackToTop,
    scrollToTop,
    calcTimestamp,
    setCalcTimestamp,
    resultsRef,
  } = useScrollEffects();

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(null);
  const [weightError, setWeightError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [activityError, setActivityError] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [userNavigated, setUserNavigated] = useState(false);

  useEffect(() => {
    if (calcTimestamp !== 0 && resultsRef.current) {
      const offset = 360;
      const elementTop =
        resultsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: "smooth" });
    }
  }, [calcTimestamp, resultsRef]);

  const handleCalculate = (e) => {
    e.preventDefault();
    setWeightError("");
    setDurationError("");
    setActivityError("");

    const weightInKg = parseFloat(weight);
    const durationInHours = parseFloat(duration);
    let isValid = true;

    if (isNaN(weightInKg) || weightInKg <= 0) {
      setWeightError("Prašome įvesti svorį.");
      isValid = false;
    } else if (weightInKg < 30 || weightInKg > 300) {
      setWeightError("Prašome įvesti teisingą svorį (30–300 kg).");
      isValid = false;
    }

    if (isNaN(durationInHours) || durationInHours <= 0) {
      setDurationError("Prašome įvesti trukmę.");
      isValid = false;
    }

    if (!selectedActivity) {
      setActivityError("Prašome pasirinkti veiklą.");
      isValid = false;
    }
    if (!isValid) return;

    const calories = selectedActivity.value * weightInKg * durationInHours;
    setCaloriesBurned(calories.toFixed(2));
    setCalcTimestamp(Date.now());
  };

  useEffect(() => {
    if (!open) {
      setQuery("");
      setUserNavigated(false);
    }
  }, [open]);

  const groupedActivities = activities
    .map((group) => {
      const filteredOptions = group.options.filter((act) =>
        act.name.toLowerCase().includes(query.toLowerCase())
      );
      return { ...group, options: filteredOptions };
    })
    .filter((group) => group.options.length > 0);

  return (
    <>
      <HeroSection
        title="Kalorijų deginimo skaičiuoklė"
        subtitle="Kiek kalorijų išeikvojate per dieną? Nesvarbu, ar bėgate, šokate, ar tiesiog tvarkote namus – ši skaičiuoklė padės tiksliai apskaičiuoti Jūsų energijos sąnaudas pagal svorį ir veiklos trukmę."
        calculatorForm={
          <form onSubmit={handleCalculate} className="space-y-6">
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
              label="Trukmė (valandomis)"
              id="duration"
              value={duration}
              onChange={(newVal) => setDuration(newVal)}
              placeholder="pvz. 1.5"
              error={durationError}
              type="number"
            />
            <div>
              <label
                htmlFor="activity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pasirinkite veiklą
              </label>
              <Combobox value={selectedActivity} onChange={setSelectedActivity}>
                {({ open: isOpen }) => {
                  setOpen(isOpen);

                  return (
                    <div className="relative mt-2">
                      <div
                        className={`relative w-full cursor-default overflow-hidden rounded-md border ${
                          activityError ? "border-red-500" : "border-gray-300"
                        } bg-white text-left shadow-sm focus-within:ring-1 focus-within:ring-emerald-500 focus-within:border-emerald-500 text-sm`}
                      >
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-gray-900 focus:outline-none text-sm"
                          placeholder="Pradėkite rašyti veiklos pavadinimą..."
                          displayValue={(activity) =>
                            activity ? activity.name : ""
                          }
                          onChange={(e) => {
                            setQuery(e.target.value);
                            setUserNavigated(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                              setUserNavigated(true);
                            }
                          }}
                        />
                        {(query || selectedActivity) && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedActivity(null);
                              setQuery("");
                              setUserNavigated(false);
                            }}
                            className="absolute inset-y-0 right-7 flex items-center px-2"
                          >
                            <XMarkIcon className="h-4 w-4 text-gray-400" />
                          </button>
                        )}
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </Combobox.Button>
                      </div>

                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
                        {groupedActivities.length === 0 && (
                          <div className="cursor-default select-none py-2 px-4 text-gray-700">
                            Veikla nerasta.
                          </div>
                        )}
                        {groupedActivities.map((group) => (
                          <Fragment key={group.category}>
                            <div className="cursor-default select-none py-2 pl-3 pr-9 bg-gray-100 font-semibold text-gray-900">
                              {group.category}
                            </div>
                            {group.options.map((activity) => (
                              <Combobox.Option
                                key={activity.id}
                                value={activity}
                                className={({ active, selected }) => {
                                  if (selected && !userNavigated) {
                                    return classNames(
                                      "bg-emerald-600 text-white font-semibold",
                                      "relative cursor-pointer select-none py-2 pl-3 pr-9"
                                    );
                                  }
                                  if (!userNavigated) {
                                    return classNames(
                                      "bg-white text-gray-900 font-normal",
                                      "relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-emerald-600 hover:text-white hover:font-semibold"
                                    );
                                  }
                                  return classNames(
                                    active || selected
                                      ? "bg-emerald-600 text-white font-semibold"
                                      : "bg-white text-gray-900 font-normal",
                                    "relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-emerald-600 hover:text-white hover:font-semibold"
                                  );
                                }}
                              >
                                {({ active, selected }) => (
                                  <>
                                    <span className="block truncate">
                                      {activity.name}
                                    </span>
                                    {(active || selected) && (
                                      <span
                                        className={classNames(
                                          "absolute inset-y-0 right-0 flex items-center pr-4",
                                          active || selected
                                            ? "text-white"
                                            : "text-emerald-600"
                                        )}
                                      >
                                        <CheckIcon className="h-5 w-5" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </Fragment>
                        ))}
                      </Combobox.Options>
                      {activityError && (
                        <p className="text-sm text-red-600 mt-1">
                          {activityError}
                        </p>
                      )}
                    </div>
                  );
                }}
              </Combobox>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 rounded-md bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Skaičiuoti
            </button>
          </form>
        }
        scrolled={scrolled}
      />
      <div className="flex flex-col gap-8 sm:gap-14">
        {caloriesBurned && (
          <PageContentSection ref={resultsRef} scrolled={scrolled}>
            <div>
              <ResultsDisclaimer />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                  <h3 className="text-sm font-medium text-neutral-700 tracking-wide mb-2">
                    Sudegintos kalorijos
                  </h3>
                  <span className="text-2xl font-semibold text-gray-900">
                    {caloriesBurned} kcal
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                  <h3 className="text-sm font-medium text-neutral-700 tracking-wide mb-1">
                    Veikla
                  </h3>
                  <span className="font-semibold text-gray-900">
                    {selectedActivity?.name}
                  </span>
                </div>
              </div>
              <RecommendedCalculatorsSection showWaterIntakeCalculator />
            </div>
          </PageContentSection>
        )}
        <PageContentSection ref={resultsRef} scrolled={scrolled}>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Kaip veikia ši skaičiuoklė?
            </h2>
            <p>
              Ši skaičiuoklė padeda apskaičiuoti, kiek kalorijų sudeginate
              atlikdami konkrečią veiklą, atsižvelgiant į kūno svorį ir veiklos
              trukmę.
            </p>
            <p>
              Skaičiavimai atliekami pagal{" "}
              <b>MET (Metabolic Equivalent of Task)</b> reikšmes.
            </p>
          </section>
          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">Kas yra MET?</h2>
            <p>
              MET (Metabolic Equivalent of Task) apibrėžia veiklos intensyvumą.
              1 MET prilygsta įprastoms kūno energijos sąnaudoms sėdint ar
              gulint, o didesnės MET reikšmės rodo sudėtingesnę, daugiau
              energijos reikalaujančią veiklą.
            </p>
          </section>
          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">Formulė</h2>
            <p>Sudeginamų kalorijų kiekis apskaičiuojamas taip:</p>
            <p className="font-medium">
              Sudegintos kalorijos = MET × svoris (kg) × trukmė (valandomis)
            </p>
            <p>
              Tarkime, jei veiklos MET = 5, sveriate 70 kg ir veikla trunka 1
              valandą, sudeginate 350 kcal (5 × 70 × 1).
            </p>
          </section>
        </PageContentSection>
      </div>
      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}
