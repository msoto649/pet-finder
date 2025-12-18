import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🐾</span>
            <h1 className="text-2xl font-bold text-orange-600">PetFinder</h1>
          </Link>

          <nav className="hidden md: flex space-x-6">
            <Link to="/" className="text-gray-700 hover: text-orange-600 transition">
              Inicio
            </Link>
            <Link to="/buscar" className="text-gray-700 hover:text-orange-600 transition">
              Buscar Mascotas
            </Link>
            <Link to="/reportar" className="text-gray-700 hover:text-orange-600 transition">
              Reportar Pérdida
            </Link>
          </nav>

          <div className="flex space-x-3">
            <button className="px-4 py-2 text-orange-600 hover:text-orange-700 transition">
              Iniciar Sesión
            </button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
