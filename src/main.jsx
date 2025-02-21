import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Statistics from './pages/Statistics.jsx';
import Employers from './pages/Employers.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Здесь вложенные маршруты для компонентов, которые должны отображаться внутри App */}
          <Route index element={<Home />} /> {/* Home Page */}
          <Route path="/statistics" element={<Statistics />} /> {/* Statistics Page */}
          <Route path="/employers" element={<Employers />} /> {/* Employers Page */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);


// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css'
// import App from './App.jsx'
// import Home from './pages/Home.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route>
//           <Route path="/" element={<App />} />
//           <Route index element={<Home />} /> {/* Home Page */}
//           {/* Add more routes here */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </StrictMode>,
// )
