import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            <span className="text-3xl">🐾</span>
            <span>PetFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Inicio
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Buscar Mascotas
            </Link>
            <Link to="/rewards" className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center">
              <span className="mr-1">💰</span>
              Recompensas
            </Link>
            <Link to="/report">
              <Button variant="primary" className="text-sm">
                Reportar Mascota Perdida
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/search"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Buscar Mascotas
            </Link>
            <Link
              to="/rewards"
              className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              💰 Recompensas
            </Link>
            <Link to="/report" onClick={() => setIsMenuOpen(false)}>
              <Button variant="primary" className="w-full text-sm">
                Reportar Mascota Perdida
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
