import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <div className="text-9xl mb-4">🐾</div>
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">
        ¡Ups!  Esta página se perdió como una mascota
      </p>
      <Link to="/">
        <Button>Volver al Inicio</Button>
      </Link>
    </div>
  );
}
