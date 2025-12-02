import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaTaxi, FaHome, FaCode } from 'react-icons/fa';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <FaCode className="text-blue-600 text-2xl" />
            <h1 className="text-xl font-bold text-gray-800">Gestión de Entidades</h1>
          </div>
          
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaHome />
              <span>Inicio</span>
            </Link>
            
            <Link
              to="/usuarios"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/usuarios')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaUsers />
              <span>Usuarios</span>
            </Link>
            
            <Link
              to="/carreras-taxi"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/carreras-taxi')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaTaxi />
              <span>Carreras de Taxi</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

