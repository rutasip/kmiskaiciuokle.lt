import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import HeroSection from "../components/HeroSection";
import PageContentSection from "../components/PageContentSection";
import BackToTopButton from "../components/BackToTopButton";
import InputField from "../components/InputField";
import ResultsDisclaimer from "../components/ResultsDisclaimer";
import useScrollEffects from "../hooks/useScrollEffects";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const activities = [
  {
    category: "Sportas",
    options: [
      { id: 1, name: "Bėgimas (8 km/h)", value: 8.0 },
      { id: 2, name: "Vaikščiojimas (5 km/h)", value: 3.5 },
      { id: 3, name: "Dviračių sportas (16-19 km/h)", value: 7.5 },
      { id: 4, name: "Plaukimas (vidutiniu tempu)", value: 6.0 },
      { id: 5, name: "Joga", value: 2.5 },
      { id: 6, name: "Svorio kilnojimas (vidutinio sunkumo)", value: 4.0 },
      { id: 7, name: "Bėgimas (12 km/h)", value: 11.0 },
      { id: 8, name: "Intensyvus plaukimas", value: 9.8 },
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

  const [selectedActivity, setSelectedActivity] = useState(
    activities[0].options[0]
  );
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(null);

  const [weightError, setWeightError] = useState("");
  const [durationError, setDurationError] = useState("");

  // Smooth scroll to results when we set calcTimestamp
  useEffect(() => {
    if (calcTimestamp !== 0 && resultsRef.current) {
      const offset = 360;
      const elementTop =
        resultsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: "smooth" });
    }
  }, [calcTimestamp]);

  // Handle calculation
  const handleCalculate = (e) => {
    e.preventDefault();
    setWeightError("");
    setDurationError("");

    const weightInKg = parseFloat(weight);
    const durationInHours = parseFloat(duration);

    let isValid = true;

    if (isNaN(weightInKg) || weightInKg <= 0) {
      setWeightError("Prašome įvesti teisingą svorį.");
      isValid = false;
    }
    if (isNaN(durationInHours) || durationInHours <= 0) {
      setDurationError("Prašome įvesti teisingą trukmę.");
      isValid = false;
    }

    if (!isValid) return;

    const calories = selectedActivity.value * weightInKg * durationInHours;
    setCaloriesBurned(calories.toFixed(2));

    setCalcTimestamp(Date.now());
  };

  return (
    <>
      <style>
        {`
          @keyframes horizontalBounce {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
          }
        `}
      </style>

      <HeroSection
        title="Kalorijų sudeginimo skaičiuoklė"
        subtitle="Sužinokite, kiek kalorijų sudeginate įvairios veiklos metu. Ši
      skaičiuoklė remiasi MET metodu, kad tiksliai įvertintų Jūsų
      energijos sąnaudas pagal Jūsų svorį ir veiklos trukmę."
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
              <Listbox value={selectedActivity} onChange={setSelectedActivity}>
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                        <span className="block truncate">
                          {selectedActivity.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          static
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                          {activities.map((group) => (
                            <Fragment key={group.category}>
                              <Listbox.Option
                                disabled
                                value=""
                                className="cursor-default select-none py-2 pl-3 pr-9 text-gray-900 bg-gray-100 font-semibold"
                              >
                                {group.category}
                              </Listbox.Option>
                              {group.options.map((activity) => (
                                <Listbox.Option
                                  key={activity.id}
                                  value={activity}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "bg-emerald-600 text-white"
                                        : "text-gray-900",
                                      "relative cursor-default select-none py-2 pl-3 pr-9"
                                    )
                                  }
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "block truncate"
                                        )}
                                      >
                                        {activity.name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? "text-white"
                                              : "text-emerald-600",
                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                          )}
                                        >
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Fragment>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
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
              <ResultsDisclaimer/>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Sudegintos kalorijos
                  </h3>
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {caloriesBurned} kcal
                  </span>
                </div>
                <div className="bg-white rounded-lg shadow p-5 flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">
                    Veikla
                  </h3>
                  <span className="text-lg sm:text-xl font-semibold text-gray-900">
                    {selectedActivity.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/"
                  className="relative flex items-center bg-white p-5 rounded-md sm:w-1/2 hover:bg-gray-50 transition shadow"
                >
                  <div className="mr-8">
                    <h5 className="text-base font-semibold leading-normal text-neutral-700 hover:text-gray-900">
                      Kūno masės indekso skaičiuoklė
                    </h5>
                    <p className="text-xs text-gray-600 mt-1">
                      Sužinokite savo KMI (kūno masės indeksą).
                    </p>
                  </div>
                  <div
                    className="absolute right-4"
                    style={{ animation: "horizontalBounce 1.5s infinite" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-500 hover:text-emerald-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
                {/* <a
                href="/kaloriju-poreikiai"
                className="relative flex items-center bg-white p-5 rounded-md sm:w-1/2 hover:bg-gray-50 transition shadow"
              >
                <div className="mr-8">
                  <h5 className="text-base font-semibold leading-normal text-neutral-700 hover:text-gray-900">
                    Dienos kalorijų poreikio skaičiuoklė
                  </h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Sužinokite, kiek kalorijų reikia suvartoti per dieną.
                  </p>
                </div>
                <div
                  className="absolute right-4"
                  style={{ animation: "horizontalBounce 1.5s infinite" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500 hover:text-emerald-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a> */}
              </div>
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
              Skaičiavimai atliekami pagal MET (Metabolic Equivalent of Task)
              reikšmes.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">Kas yra MET?</h2>
            <p>
              MET (Metabolic Equivalent of Task) – tai vienetas, nurodantis
              energijos sunaudojimą. 1 MET atitinka energijos kiekį, reikalingą
              žmogaus organizmui ramybės būsenoje.
            </p>
            <p>
              Pavyzdžiui, veikla su 2 MET yra dvigubai intensyvesnė už bazinį
              ramybės metabolizmą.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-bold text-gray-900">Formulė</h2>
            <p className="italic">
              <b>
                Sudegintos kalorijos = MET × svoris (kg) × trukmė (valandomis)
              </b>
            </p>
            <p>
              Pvz., jei veiklos MET = 6, sveriate 70 kg ir veikla trunka 1
              valandą, sudeginate: 6 × 70 × 1 = 420 kcal.
            </p>
          </section>
        </PageContentSection>
      </div>

      <BackToTopButton show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}
