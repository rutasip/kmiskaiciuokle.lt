import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BodyMassIndexCalc from "./pages/BodyMassIndexCalc";
import BasalMetabolicRateCalc from "./pages/BasalMetabolicRateCalc";
import WaterIntakeCalculator from "./pages/WaterIntakeCalculator";
import CalorieBurnCalculator from "./pages/CalorieBurnCalculator";
import SleepCalculator from "./pages/SleepCalculator";
// import MacronutrientCalc from './pages/MacronutrientCalc';
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<BodyMassIndexCalc />} />
          <Route
            path="kaloriju-poreikiai"
            element={<BasalMetabolicRateCalc />}
          />
          <Route path="vandens-norma" element={<WaterIntakeCalculator />} />
          <Route
            path="sudeginamos-kalorijos"
            element={<CalorieBurnCalculator />}
          />
          <Route path="miego-ciklai" element={<SleepCalculator />} />
          {/* <Route path="Makroelementai" element={<MacronutrientCalc />} /> */}
          <Route path="atsakomybes-ribojimas" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
