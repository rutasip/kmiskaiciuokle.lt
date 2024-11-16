import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/Sidebar'

import './styles/tailwind.css'
import './styles/checkmark.scss';
import './styles/heart.css';

export default function App() {
  return (
    <div className="h-full antialiased">
      <Sidebar />
      <main className='pt-0 md:pt-12 lg:pl-74'>
        <div className="px-0 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <Outlet />
        </div>
        <div className="p-8">
          <p className="text-[14px] text-gray-500">
            Ši skaičiuoklė ir pateikta informacija yra skirta tik informaciniams
            tikslams. Ji nepakeičia profesionalios medicininės konsultacijos,
            diagnozės ar gydymo. Jei turite klausimų apie sveikatą ar norite
            pradėti svorio koregavimo programą, kreipkitės į kvalifikuotą
            sveikatos priežiūros specialistą.
          </p>
        </div>
      </main>
    </div>
  );
}
