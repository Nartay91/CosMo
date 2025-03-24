import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import { Outlet } from 'react-router-dom';

import './App.css';


function App() {
  return (
    <div className="App">
      <div className='left_side'>
      <Sidebar /> {/* Рендерим Sidebar */}
      </div>
      <div className="main_box">
        <Header />  {/* Рендерим Header */}
        <div className="main-layout">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;