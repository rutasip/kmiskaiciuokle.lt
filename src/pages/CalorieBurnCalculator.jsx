import { Fragment, useState, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CalorieBurnCalculator() {
  const [selectedActivity, setSelectedActivity] = useState(
    activities[0].options[0]
  );
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(null);
  const [weightError, setWeightError] = useState("");
  const [durationError, setDurationError] = useState("");

  const resultsRef = useRef(null);

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

    if (!isValid) {
      return;
    }

    const calories = selectedActivity.value * weightInKg * durationInHours;
    setCaloriesBurned(calories.toFixed(2));

    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Kalorijų sudeginimo skaičiuoklė
      </h1>
      <form
        onSubmit={handleCalculate}
        className="grid gap-8 bg-white rounded-lg ring-1 ring-slate-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              htmlFor="duration"
              className="block text-base font-medium text-gray-700"
            >
              Trukmė (valandomis)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                step="0.1"
                min="0"
                name="duration"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="block w-full rounded-md border-gray-300 focus:ring-secondary focus:border-secondary sm:text-sm"
                placeholder="1.5"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">val.</span>
              </div>
            </div>
            {durationError && (
              <p className="mt-2 text-sm text-red-600">{durationError}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="activity"
            className="block text-base font-medium text-gray-700"
          >
            Pasirinkite veiklą
          </label>
          <div className="mt-2">
            <Listbox value={selectedActivity} onChange={setSelectedActivity}>
              {({ open }) => (
                <>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary sm:text-sm">
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
                                      ? "bg-secondary text-white"
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
                                            : "text-secondary",
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
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-darker"
          >
            Skaičiuoti
          </button>
        </div>
      </form>

      {caloriesBurned && (
        <div
          ref={resultsRef}
          style={{ scrollMarginTop: "80px" }}
          className="bg-white ring-1 ring-slate-200 rounded-lg p-6 mt-10"
        >
          <div className="pb-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <p className="text-sm font-medium text-gray-700">
                  Sudegintos kalorijos
                </p>
                <p className="text-3xl font-semibold text-gray-900">
                  {caloriesBurned} kcal
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <p className="text-sm font-medium text-gray-700">Veikla</p>
                <p className="text-xl font-semibold text-gray-900">
                  {selectedActivity.name}
                </p>
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
                href="/kaloriju-poreikiai"
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
                    <b>Dienos kalorijų poreikio skaičiuoklė</b>
                    <p className="text-base text-gray-600">
                      Asmeninis kalorijų poreikis pagal aktyvumo lygį.
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
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Kaip veikia ši skaičiuoklė?
            </h2>
            <p className="mb-4">
              Kalorijų sudeginimo skaičiuoklė padeda apskaičiuoti, kiek kalorijų
              sudeginate atlikdami tam tikrą veiklą, atsižvelgiant į jūsų svorį
              ir veiklos trukmę.
            </p>
            <p>
              Apskaičiavimas atliekamas naudojant MET (Metabolic Equivalent of
              Task) reikšmes, kurios nurodo energijos sąnaudas skirtingoms
              veikloms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
              Kas yra MET?
            </h2>
            <p className="mb-4">
              MET (Metabolic Equivalent of Task) yra vienetas, naudojamas
              energijos sąnaudoms matuoti. 1 MET atitinka energijos kiekį, kurį
              sunaudoja žmogus ramybės būsenoje.
            </p>
            <p>
              Pavyzdžiui, veikla su 2 MET reiškia, kad energijos sąnaudos yra
              dvigubai didesnės nei ramybės būsenoje.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-12 mb-3">
              Kaip apskaičiuojamos sudegintos kalorijos?
            </h2>
            <p className="mb-4">
              Sudegintų kalorijų skaičiavimas atliekamas pagal formulę:
            </p>
            <p className="mb-4 italic">
              <b>
                Sudegintos kalorijos = MET × svoris (kg) × trukmė (valandomis)
              </b>
            </p>
            <p>
              Tai leidžia įvertinti energijos sąnaudas konkrečiai veiklai pagal
              jūsų kūno svorį ir veiklos trukmę.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
