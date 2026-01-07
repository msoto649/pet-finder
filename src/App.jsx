import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import SearchPets from './pages/SearchPets';
import ReportPet from './pages/ReportPet';
import PetDetail from './pages/PetDetail';
import MyRewards from './pages/MyRewards';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<SearchPets />} />
          <Route path="/reportar" element={<ReportPet />} />
          <Route path="/mascota/:id" element={<PetDetail />} />
          <Route path="/mis-recompensas" element={<MyRewards />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
