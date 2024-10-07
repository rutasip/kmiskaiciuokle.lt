import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/Sidebar'

import './styles/tailwind.css'
import './styles/checkmark.scss';
import './styles/heart.css';

export default function App() {
  return (
    <div className="h-full antialiased">
      <Sidebar />
      <main className='py-10 lg:pl-74'>
        <div className="px-0 sm:px-6 lg:px-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
