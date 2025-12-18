import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🐾</span>
              PetFinder
            </h3>
            <p className="text-gray-400">
              Ayudamos a reunir mascotas perdidas con sus familias.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/buscar" className="text-gray-400 hover: text-white transition">
                  Buscar Mascotas
                </Link>
              </li>
              <li>
                <Link to="/reportar" className="text-gray-400 hover:text-white transition">
                  Reportar Pérdida
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">Email: info@petfinder. com</p>
            <p className="text-gray-400">Tel: 555-0000</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 PetFinder. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
