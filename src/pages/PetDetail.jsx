import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockPets } from '../data/mockPets';
import Button from '../components/common/Button';

export default function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const pet = mockPets. find(p => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className="text-center py-20">
        <div className="text-9xl mb-4">😿</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Mascota no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, no pudimos encontrar esta mascota.
        </p>
        <Link to="/buscar">
          <Button>Volver a Buscar</Button>
        </Link>
      </div>
    );
  }

  const statusConfig = {
    perdido: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: '🔍',
      label: 'Perdido'
    },
    encontrado: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: '✅',
      label: 'Encontrado'
    }
  };

  const config = statusConfig[pet.status];

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-orange-600 hover:text-orange-700 transition"
      >
        <span className="text-2xl mr-2">←</span>
        <span className="font-semibold">Volver</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 right-4 ${config. bg} ${config.text} px-4 py-2 rounded-full font-semibold flex items-center space-x-2`}>
              <span>{config.icon}</span>
              <span>{config.label}</span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {pet.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              📍 {pet.location}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Tipo:</span>
                <span className="text-gray-800">{pet. type}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Raza:</span>
                <span className="text-gray-800">{pet.breed}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Color:</span>
                <span className="text-gray-800">{pet.color}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Tamaño: </span>
                <span className="text-gray-800">{pet.size}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Fecha:</span>
                <span className="text-gray-800">{pet.date}</span>
              </div>
            </div>

            <div className="border-t pt-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">
                {pet.description}
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">👤</span>
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-semibold text-gray-800">{pet.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <a href={`tel:${pet.contactPhone}`} className="font-semibold text-orange-600 hover: text-orange-700">
                      {pet.contactPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✉️</span>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${pet.contactEmail}`} className="font-semibold text-orange-600 hover:text-orange-700">
                      {pet.contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a href={`mailto:${pet.contactEmail}?subject=Consulta sobre ${pet.name}&body=Hola, vi tu publicación sobre ${pet.name}...`}>
                  <Button className="w-full">
                    Contactar por Email
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
