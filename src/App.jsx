import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import AddPlant from './pages/AddPlant';
import EditPlant from './pages/EditPlant';
import PlantDetails from './pages/PlantDetails';
import { loadPlants, loadTheme, saveTheme } from './utils/storage';

function App() {
  const [plants, setPlants] = useState([]);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load plants from localStorage
    const loadedPlants = loadPlants();
    setPlants(loadedPlants);

    // Load theme from localStorage
    const savedTheme = loadTheme();
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    setLoading(false);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-vh-100">
        <Navbar theme={theme} onThemeToggle={handleThemeToggle} />
        <Routes>
          <Route path="/" element={<Dashboard plants={plants} setPlants={setPlants} />} />
          <Route path="/plants" element={<Plants plants={plants} setPlants={setPlants} />} />
          <Route path="/add-plant" element={<AddPlant setPlants={setPlants} />} />
          <Route path="/edit-plant/:id" element={<EditPlant plants={plants} setPlants={setPlants} />} />
          <Route path="/plant/:id" element={<PlantDetails plants={plants} setPlants={setPlants} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
