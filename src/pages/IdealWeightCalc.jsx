import { useState } from "react";

const faqs = [
  {
    question: "Kas yra idealus svoris?",
    answer:
      "Idealus svoris – tai orientacinė reikšmė, kuri padeda įsivertinti, ar Jūsų svoris yra sveiko diapazono ribose.",
  },
  {
    question: "Kaip veikia idealaus svorio skaičiuoklė?",
    answer:
      "Skaičiuoklė naudoja standartines formules, kurios atsižvelgia į Jūsų ūgį ir lytį, kad apskaičiuotų apytikslį idealų svorį.",
  },
  {
    question: "Ar skaičiuoklės rezultatai yra tikslūs?",
    answer:
      "Rezultatai yra apytiksliai ir skirti tik informaciniams tikslams. Jie gali neatspindėti individualių veiksnių, tokių kaip raumenų masė, kaulų tankis ar kiti sveikatos aspektai.",
  },
  {
    question: "Ar skaičiuoklė tinka visiems?",
    answer:
      "Skaičiuoklė yra skirta suaugusiems asmenims. Ji gali būti netinkama vaikams, paaugliams, vyresnio amžiaus žmonėms ar asmenims su specifinėmis sveikatos būklėmis.",
  },
  {
    question: "Kaip turėčiau interpretuoti rezultatus?",
    answer:
      "Rezultatai turėtų būti vertinami kaip bendras vadovas. Jei turite klausimų ar rūpesčių dėl savo svorio ar sveikatos, rekomenduojama pasikonsultuoti su sveikatos priežiūros specialistu.",
  },
];

export default function IdealWeightCalc() {
  const [height, setHeight] = useState(""); // Default height value
  const [gender, setGender] = useState("female"); // Default gender
  const [idealWeight, setIdealWeight] = useState(null);
  const [showIcon, setShowIcon] = useState(false);

  const calculateIdealWeight = (height, gender) => {
    const heightInInches = height / 2.54;
    let weight = 0;

    if (gender === "male") {
      weight = 50 + 2.3 * (heightInInches - 60);
    } else {
      weight = 45.5 + 2.3 * (heightInInches - 60);
    }

    return weight.toFixed(1);
  };

  const handleCalculateIdealWeight = (e) => {
    e.preventDefault();

    const heightInCm = parseFloat(height);

    if (isNaN(heightInCm) || heightInCm <= 0) {
      alert("Įveskite teisingą ūgį.");
      return;
    }

    const idealWeightValue = calculateIdealWeight(heightInCm, gender);
    setIdealWeight(idealWeightValue);

    // Show the tick icon after calculation
    setShowIcon(true);

    // Optionally hide it after a few seconds
    setTimeout(() => {
      setShowIcon(false);
    }, 1600);
  };

  const handleReset = () => {
    setHeight("");
    setGender("female");
    setIdealWeight(null);
  };

  return (
    <>
      <div className="space-y-10 divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
          <form
            onSubmit={handleCalculateIdealWeight}
            className="w-full max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
          >
            <div className="p-8">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Idealaus svorio skaičiuoklė
              </h1>
              <div className="mt-7 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
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
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
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
          {idealWeight && (
            <div className="flex w-full max-w-xl flex-col justify-center bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-8">
              {showIcon ? (
                <div className="flex place-content-center justify-center">
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
                <div className="flex items-center">
                  <div className="m-auto">
                    <p className="mb-2 text-base font-semibold leading-7 text-gray-900">
                      Apskaičiuotas idealus svoris:
                    </p>
                    <div className="flex items-center justify-center text-gray-900">
                      <p className="text-4xl font-bold">{idealWeight} kg</p>
                    </div>
                  </div>
                </div>
              )}
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
