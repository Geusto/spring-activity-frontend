import { FaUsers, FaTaxi, FaChartLine } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          CRUDL para la Gestión de Entidades
        </h1>
        <p className="text-lg text-gray-600">
          Administra usuarios, carreras de taxi provenientes de una API externa y las entidades de la base de datos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Usuarios</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Gestiona los usuarios del sistema. Crea, edita y elimina usuarios con diferentes roles.
          </p>
          <a
            href="/usuarios"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Usuarios
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <FaTaxi className="text-green-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Carreras de Taxi</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Administra las carreras de taxi. Registra nuevas carreras y consulta el historial.
          </p>
          <a
            href="/carreras-taxi"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Ver Carreras
          </a>
        </div>
      </div>

    </div>
  );
}

