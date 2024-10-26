import { Fragment, useState, useRef, useEffect } from "react";
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
  const [showIcon, setShowIcon] = useState(false);

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

    if (isNaN(weightInKg)) {
      setWeightError("Prašome įvesti svorį.");
      isValid = false;
    }

    if (weightInKg <= 0) {
      setWeightError("Prašome įvesti teisingą svorį.");
      isValid = false;
    }

    if (isNaN(durationInHours)) {
      setDurationError("Prašome įvesti trukmę.");
      isValid = false;
    }

    if (durationInHours <= 0) {
      setDurationError("Prašome įvesti teisingą trukmę.");
      isValid = false;
    }

    if (!isValid) {
      setShowIcon(false);
      return;
    }

    setShowIcon(true);

    const calories = selectedActivity.value * weightInKg * durationInHours;
    setCaloriesBurned(calories.toFixed(2));

    setTimeout(() => {
      setShowIcon(false);
    }, 1600);
  };

  useEffect(() => {
    if (showIcon && caloriesBurned) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showIcon, caloriesBurned]);

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
        <form
          onSubmit={handleCalculate}
          className="w-full max-w-2xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        >
          <div className="gap-x-6 border-b border-gray-900/10 p-8">
            <h1 className="text-lg font-semibold leading-7 text-gray-900">
              Kalorijų sudeginimo skaičiuoklė
            </h1>
            <h2 className="mt-4 text-sm leading-6 text-gray-600">
              Sužinokite, kiek kalorijų sudeginate atlikdami įvairius fizinius
              pratimus, atsižvelgiant į Jūsų svorį ir treniruotės trukmę.
            </h2>
          </div>
          <div className="p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="activity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pasirinkite veiklą
                </label>
                <Listbox
                  value={selectedActivity}
                  onChange={setSelectedActivity}
                >
                  {({ open }) => (
                    <>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                          ? "bg-indigo-600 text-white"
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
                                                : "text-indigo-600",
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
                {weightError && (
                  <p className="mt-1 text-sm text-red-600">{weightError}</p>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Trukmė (valandomis)
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={duration}
                    name="duration"
                    id="duration"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="1.5"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">val.</span>
                  </div>
                </div>
                {durationError && (
                  <p className="mt-1 text-sm text-red-600">{durationError}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6 mt-10">
              <button
                type="submit"
                className="w-1/2 rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                Skaičiuoti
              </button>
            </div>
          </div>
        </form>

        <div
          ref={resultsRef}
          style={{ scrollMarginTop: "80px" }}
          className={classNames(
            caloriesBurned && !showIcon && "bg-white h-fit",
            "flex w-full max-w-2xl flex-col p-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl justify-center"
          )}
        >
          {caloriesBurned ? (
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
              <>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Rezultatai
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <h3 className="text-sm font-medium text-gray-900">
                      Sudegintos kalorijos
                    </h3>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">
                      {caloriesBurned} kcal
                    </p>
                  </div>
                </div>
              </>
            )
          ) : (
            <p className="text-sm text-gray-500 text-center">
              Įveskite duomenis ir spauskite &quot;Skaičiuoti&quot;, kad
              pamatytumėte rezultatus.
            </p>
          )}
        </div>
      </div>

      <div className="pt-10">
        <p className="text-sm text-gray-500">
          Ši skaičiuoklė yra skirta tik informaciniams tikslams. Nors stengiamės
          pateikti tikslią informaciją, mes neprisiimame atsakomybės už jokius
          sveikatos sutrikimus ar žalą, kuri gali atsirasti naudojantis šia
          skaičiuokle. Prieš keisdami savo įpročius, pasitarkite su sveikatos
          priežiūros specialistu.
        </p>
      </div>
    </div>
  );
}
