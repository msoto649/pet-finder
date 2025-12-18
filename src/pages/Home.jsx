import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-20 rounded-lg">
        <div className="text-center px-4">
          <div className="text-6xl mb-6">🐾</div>
          <h1 className="text-5xl font-bold mb-4">
            Reúnete con tu Mejor Amigo
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            PetFinder te ayuda a encontrar mascotas perdidas y reunirlas con sus familias
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/buscar">
              <Button variant="primary">Buscar Mascotas</Button>
            </Link>
            <Link to="/reportar">
              <Button variant="outline" className="bg-white text-orange-600 hover:bg-gray-100">
                Reportar Pérdida
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-2">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">1,234</h3>
          <p className="text-gray-600">Mascotas Buscadas</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">892</h3>
          <p className="text-gray-600">Reuniones Exitosas</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-2">👥</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">5,678</h3>
          <p className="text-gray-600">Usuarios Activos</p>
        </div>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">¿Cómo Funciona?</h2>
        <div className="grid grid-cols-1 md: grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">1. Reporta</h3>
            <p className="text-gray-600">
              Publica información sobre tu mascota perdida con fotos y detalles
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">2. Busca</h3>
            <p className="text-gray-600">
              Explora reportes de mascotas encontradas en tu zona
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💚</div>
            <h3 className="text-xl font-bold mb-2">3. Reúnete</h3>
            <p className="text-gray-600">
              Contacta y coordina para reunirte con tu mascota
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
