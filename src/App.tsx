import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import UpcomingTournaments from './pages/UpcomingTournaments';
import TournamentResults from './pages/TournamentResults';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8 mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upcoming" element={<UpcomingTournaments />} />
            <Route path="/results" element={<TournamentResults />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;