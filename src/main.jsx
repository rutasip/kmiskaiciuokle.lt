import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import BodyMassIndexCalc from './pages/BodyMassIndexCalc';
import BasalMetabolicRateCalc from './pages/BasalMetabolicRateCalc';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<BodyMassIndexCalc />} />
          <Route path="kaloriju-norma" element={<BasalMetabolicRateCalc />} />
          <Route path="atsakomybes-ribojimas" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);