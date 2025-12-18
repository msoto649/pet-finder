export default function PetCard({ pet }) {
  const statusColors = {
    perdido: 'bg-red-100 text-red-800',
    encontrado: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Status Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${statusColors[pet.status]}`}>
          {pet.status === 'perdido' ? '🔍 Perdido' : '✅ Encontrado'}
        </span>

        {/* Name & Type */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">{pet.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{pet.type} - {pet.breed}</p>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p>🎨 Color: {pet.color}</p>
          <p>📏 Tamaño: {pet.size}</p>
          <p>📍 {pet.location}</p>
          <p>📅 {pet.lastSeen}</p>
        </div>

        {/* Button */}
        <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
          Ver Detalles
        </button>
      </div>
    </div>
  );
}