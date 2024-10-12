import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const faqs = [
  {
    question: "Kas yra miego ciklas?",
    answer:
      "Miego ciklas yra maždaug 90 minučių trunkantis laikotarpis, kurį sudaro keli miego etapai, pradedant nuo lengvo miego ir pereinant prie gilaus miego bei REM (greito akių judesio) etapo. Geriausiai jausitės, jei prabusite pasibaigus pilnam miego ciklui.",
  },
  {
    question: "Kiek miego ciklų man reikia?",
    answer:
      "Sveikam suaugusiam žmogui rekomenduojama miegoti apie 4-6 miego ciklus per naktį, kas sudaro 6-9 valandas. Optimalus miego kiekis gali skirtis priklausomai nuo amžiaus, gyvenimo būdo ir individualių poreikių.",
  },
];

export default function SleepCalculator() {
  const [bedtime, setBedtime] = useState("");
  const [optimalWakeTimes, setOptimalWakeTimes] = useState([]);
  const [showIcon, setShowIcon] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();

    if (!bedtime) {
      alert("Prašome įvesti miego laiką.");
      return;
    }

    const [hours, minutes] = bedtime.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      alert("Prašome įvesti teisingą laiką HH:MM formatu.");
      return;
    }

    setShowIcon(true);
    const bedtimeDate = new Date();
    bedtimeDate.setHours(hours);
    bedtimeDate.setMinutes(minutes);
    
    const calculatedTimes = [];
    for (let i = 1; i <= 6; i++) {
      const wakeTime = new Date(bedtimeDate.getTime() + i * 90 * 60000);
      calculatedTimes.push(wakeTime);
    }

    setOptimalWakeTimes(calculatedTimes);
    setTimeout(() => {
      setShowIcon(false);
    }, 1600);
  };

  const handleReset = () => {
    setBedtime("");
    setOptimalWakeTimes([]);
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 xl:grid-cols-2">
        <form
          onSubmit={handleCalculate}
          className="w-full max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        >
          <div className="gap-x-6 border-b border-gray-900/10 p-8">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900">
              Miego Skaičiuoklė
            </h1>
            <h2 className="mt-4 text-sm leading-6 text-gray-600">
              Sužinokite optimalų pabudimo laiką, kad pabustumėte po pilnų miego ciklų ir jaustumėtės geriausiai.
            </h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="bedtime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Miego laikas (HH:MM)
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="time"
                  value={bedtime}
                  name="bedtime"
                  id="bedtime"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setBedtime(e.target.value)}
                />
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

        <div className="w-full max-w-xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          {optimalWakeTimes.length > 0 ? (
            showIcon ? (
              <div className="flex justify-center place-content-center p-8">
                <CheckCircleIcon className="h-12 w-12 text-green-500" aria-hidden="true" />
              </div>
            ) : (
              <div className="p-8">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Optimalūs pabudimo laikai
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  {optimalWakeTimes.map((time, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-6">
                      <h3 className="text-sm font-medium text-gray-900">
                        {index + 1} miego ciklas
                      </h3>
                      <p className="mt-2 text-2xl font-bold text-indigo-600">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center p-8">
              <p className="text-sm text-gray-500 text-center">
                Įveskite miego laiką ir spauskite &quot;Skaičiuoti&quot;, kad pamatytumėte optimalius pabudimo laikus.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-10">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="p-8">
            <h2 className="text-base font-semibold leading-7 text-gray-900">D.U.K</h2>
            <div className="mt-8 space-y-10">
              <dl className="space-y-16 md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-16 md:space-y-0 2xl:gap-x-20">
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

      <div className="pt-10 px-8 sm:px-0">
        <p className="text-sm text-gray-500">
          Ši skaičiuoklė yra skirta tik informaciniams tikslams. Nors stengiamės pateikti tikslią informaciją, mes neprisiimame atsakomybės už jokius sveikatos sutrikimus ar žalą, kuri gali atsirasti naudojantis šia skaičiuokle. Prieš keisdami savo miego įpročius, pasitarkite su sveikatos priežiūros specialistu.
        </p>
      </div>
    </div>
  );
}
