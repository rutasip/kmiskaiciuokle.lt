export default function RecommendedCalculatorsSection() {
  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Kitos skaičiuoklės
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/kuno-mases-indeksas"
          className="relative flex items-center bg-white p-5 rounded-md sm:w-1/2 hover:bg-gray-100 transition shadow"
        >
          <div className="mr-8">
            <h5 className="text-base font-semibold leading-normal text-neutral-700 hover:text-gray-900">
              Kūno masės indekso skaičiuoklė
            </h5>
            <p className="text-xs text-gray-600 mt-1">
              Sužinokite savo kūno masės indeksą.
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

        <a
          href="/kaloriju-poreikiai"
          className="relative flex items-center bg-white p-5 rounded-md sm:w-1/2 hover:bg-gray-100 transition shadow"
        >
          <div className="mr-8">
            <h5 className="text-base font-semibold leading-normal text-neutral-700 hover:text-gray-900">
              Kalorijų suvartojimo skaičiuoklė
            </h5>
            <p className="text-xs text-gray-600 mt-1">
              Sužinokite, kiek kalorijų reikėtų suvartoti per dieną.
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
      </div>
    </section>
  );
}
