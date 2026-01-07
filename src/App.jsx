import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import SearchPets from './pages/SearchPets';
import ReportPet from './pages/ReportPet';
import Rewards from './pages/Rewards';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPets />} />
            <Route path="/report" element={<ReportPet />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
