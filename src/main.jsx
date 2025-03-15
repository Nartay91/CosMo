import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./i18n.js"
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Statistics from './pages/Statistics.jsx';
import Employers from './pages/Employers.jsx';
import Courses from "./pages/Courses.jsx"
import Quiz from "./components/course/Quiz";
import LanguageSelection from './pages/LanguageSelection.jsx';
import Division from './pages/Division.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Здесь вложенные маршруты для компонентов, которые должны отображаться внутри App */}
          <Route index element={<Home />} /> {/* Home Page */}
          <Route path="/statistics" element={<Statistics />} /> {/* Statistics Page */}
          <Route path="/employers" element={<Employers />} /> {/* Employers Page */}
          <Route path="/courses" element={<Courses />} /> {/* Courses Page */}
          <Route path="/select-language/:subject" element={<LanguageSelection  />} />
          <Route path="/courses/:subject" element={<Quiz />} />
          <Route path="/division" element={<Division/>}/>
          {/* <Route path="/courses/geography" element={<Quiz />} /> */}
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
