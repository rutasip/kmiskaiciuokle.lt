import { useState, useEffect } from "react";
import { initGA } from "../utils/analytics";
import React from "react";

const CookieConsent = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent === "true") {
      setConsent(true);
      initGA();
    } else if (savedConsent === "false") {
      setConsent(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setConsent(true);
    initGA();
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setConsent(false);
  };

  if (consent !== null) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:px-6 sm:pb-6 z-20">
      <div className="pointer-events-auto sm:max-w-md rounded-t-xl sm:rounded-xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-gray-900/10">
        <p className="text-sm leading-6 text-gray-900">
          Jūsų poreikiai mums yra prioritetas, o slapukai padeda juos geriau
          suprasti. Paspausdami „Sutinku“, sutinkate su mūsų{" "}
          <a
            href="/privatumo-politika"
            className="font-semibold text-gray-700 underline"
          >
            privatumo politikos
          </a>{" "}
          sąlygomis.
        </p>
        <div className="mt-4 flex items-center sm:justify-end gap-x-5">
          <button
            type="button"
            onClick={handleAccept}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Atmesti
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Sutinku
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
