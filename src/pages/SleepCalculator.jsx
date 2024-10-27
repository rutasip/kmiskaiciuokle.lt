import { useState } from "react";

export default function SleepCycleCalculator() {
  const [tab, setTab] = useState("bedtime"); // "bedtime" or "wakeup"
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [fallAsleepTime, setFallAsleepTime] = useState(15);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const calculateBedtime = () => {
    setError("");
    setResults([]);

    if (!wakeUpTime) {
      setError("Prašome įvesti pabudimo laiką.");
      return;
    }

    const fallAsleepMinutes = parseInt(fallAsleepTime);
    if (isNaN(fallAsleepMinutes) || fallAsleepMinutes < 0) {
      setError("Prašome įvesti teisingą užmigimo laiką.");
      return;
    }

    const [hours, minutes] = wakeUpTime.split(":").map(Number);

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      setError("Prašome įvesti teisingą pabudimo laiką (HH:MM).");
      return;
    }

    const baseDate = new Date();
    baseDate.setHours(hours);
    baseDate.setMinutes(minutes);
    baseDate.setSeconds(0);

    const sleepCycles = [6, 5, 4]; // Recommend 4-6 cycles
    const cycleDuration = 90; // minutes

    const calculatedTimes = sleepCycles.map((cycles) => {
      const totalSleepTime = cycleDuration * cycles + fallAsleepMinutes;
      const adjustedTime = new Date(baseDate);
      adjustedTime.setMinutes(adjustedTime.getMinutes() - totalSleepTime);

      // const adjustedHours = adjustedTime.getHours();
      // const adjustedMinutes = adjustedTime.getMinutes();

      const formattedTime = adjustedTime.toLocaleTimeString("lt-LT", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return { time: formattedTime, cycles };
    });

    setResults(calculatedTimes);
  };

  const calculateWakeUpTime = () => {
    setError("");
    setResults([]);

    if (!bedTime) {
      setError("Prašome įvesti miego laiką.");
      return;
    }

    const fallAsleepMinutes = parseInt(fallAsleepTime);
    if (isNaN(fallAsleepMinutes) || fallAsleepMinutes < 0) {
      setError("Prašome įvesti teisingą užmigimo laiką.");
      return;
    }

    const [hours, minutes] = bedTime.split(":").map(Number);

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      setError("Prašome įvesti teisingą miego laiką (HH:MM).");
      return;
    }

    const baseDate = new Date();
    baseDate.setHours(hours);
    baseDate.setMinutes(minutes);
    baseDate.setSeconds(0);

    const sleepCycles = [4, 5, 6]; // Recommend 4-6 cycles
    const cycleDuration = 90; // minutes

    const calculatedTimes = sleepCycles.map((cycles) => {
      const totalSleepTime = cycleDuration * cycles + fallAsleepMinutes;
      const adjustedTime = new Date(baseDate);
      adjustedTime.setMinutes(adjustedTime.getMinutes() + totalSleepTime);

      // const adjustedHours = adjustedTime.getHours();
      // const adjustedMinutes = adjustedTime.getMinutes();

      const formattedTime = adjustedTime.toLocaleTimeString("lt-LT", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return { time: formattedTime, cycles };
    });

    setResults(calculatedTimes);
  };

  const handleCalculate = () => {
    if (tab === "bedtime") {
      calculateBedtime();
    } else {
      calculateWakeUpTime();
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-xl mx-auto bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-md">
        <div className="p-6">
          <h1 className="text-xl font-semibold leading-7 text-gray-900">
            Miego ciklo skaičiuoklė
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Sužinokite, kada eiti miegoti arba pabusti, kad išvengtumėte miego
            ciklo trikdžių.
          </p>

          {/* Tabs */}
          <div className="mt-6">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  tab === "bedtime"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => {
                  setTab("bedtime");
                  setResults([]);
                  setError("");
                }}
              >
                Kada eiti miegoti
              </button>
              <button
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  tab === "wakeup"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => {
                  setTab("wakeup");
                  setResults([]);
                  setError("");
                }}
              >
                Kada pabusti
              </button>
            </nav>
          </div>

          {/* Input Fields */}
          <div className="mt-6 space-y-4">
            {tab === "bedtime" ? (
              <div>
                <label
                  htmlFor="wakeUpTime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kada norite pabusti? (HH:MM)
                </label>
                <input
                  type="time"
                  value={wakeUpTime}
                  id="wakeUpTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setWakeUpTime(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="bedTime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kada eisite miegoti? (HH:MM)
                </label>
                <input
                  type="time"
                  value={bedTime}
                  id="bedTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setBedTime(e.target.value)}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="fallAsleepTime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kiek laiko trunkate užmigti? (minutėmis)
              </label>
              <input
                type="number"
                value={fallAsleepTime}
                id="fallAsleepTime"
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setFallAsleepTime(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          {/* Calculate Button */}
          <div className="mt-6">
            <button
              onClick={handleCalculate}
              className="w-full flex justify-center rounded-md border border-transparent bg-amber-400 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Skaičiuoti
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="max-w-xl mx-auto bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-md">
          <div className="p-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Rekomenduojami laikai
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Siekiant geriausios miego kokybės, rekomenduojama miegoti 4–6 miego
              ciklus per naktį.
            </p>
            <ul className="mt-4 space-y-4">
              {results.map((result, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-md"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {tab === "bedtime" ? "Eikite miegoti:" : "Pabuskite:"}{" "}
                      <span className="text-indigo-600">{result.time}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      {result.cycles} miego ciklai
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="pt-6 px-4 sm:px-0">
        <p className="text-sm text-gray-500">
          Ši skaičiuoklė yra skirta tik informaciniams tikslams. Individualūs miego
          poreikiai gali skirtis. Norėdami gauti asmeninių patarimų, pasitarkite su
          sveikatos priežiūros specialistu.
        </p>
      </div>
    </div>
  );
}
