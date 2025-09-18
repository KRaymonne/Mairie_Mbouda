import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Employees from './pages/Employees';
import Equipment from './pages/Equipment';
import Procedures from './pages/Procedures';
import Departments from './pages/Departments';
import Landing from './components/Landing';
import Login from './pages/Login';
import Resultat from './pages/Resultat';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*" // This will match any route after "/" and allow for nested routes
          element={
            <div className="flex">
              <Sidebar />
              <main className="flex-1 bg-gray-100 min-h-screen p-8">
                <Routes>
                  <Route path="/services" element={<Departments />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/equipment" element={<Equipment />} />
                  <Route path="/procedures" element={<Procedures />} />
                  <Route path="/resultat" element={<Resultat />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
