export default function SearchBar({ onSearch }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre, raza o ubicación..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
        <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
          🔍 Buscar
        </button>
      </div>
    </div>
  );
}