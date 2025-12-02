import { useState } from 'react';
import CarreraTaxiList from '../components/carrerasTaxi/CarreraTaxiList';
import CarreraTaxiForm from '../components/carrerasTaxi/CarreraTaxiForm';
import Modal from '../components/common/Modal';
import { carreraTaxiService } from '../api/services/carreraTaxiService';
import type { CarreraTaxi, CarreraTaxiRequest } from '../types/carreraTaxi.types';
import toast from 'react-hot-toast';

export default function CarrerasTaxiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarrera, setEditingCarrera] = useState<CarreraTaxi | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreate = () => {
    setEditingCarrera(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (carrera: CarreraTaxi) => {
    setEditingCarrera(carrera);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCarrera(undefined);
  };

  const handleSubmit = async (data: CarreraTaxiRequest) => {
    try {
      setIsLoading(true);
      
      if (editingCarrera) {
        await carreraTaxiService.update(editingCarrera.id, data);
        toast.success('Carrera actualizada correctamente');
      } else {
        await carreraTaxiService.create(data);
        toast.success('Carrera creada correctamente');
      }

      handleCloseModal();
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast.error(editingCarrera ? 'Error al actualizar la carrera' : 'Error al crear la carrera');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Carreras de Taxi</h1>
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <span>Crear Carrera</span>
        </button>
      </div>
      
      <CarreraTaxiList key={refreshKey} onEdit={handleEdit} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCarrera ? 'Editar Carrera de Taxi' : 'Crear Nueva Carrera de Taxi'}
      >
        <CarreraTaxiForm
          carrera={editingCarrera}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
}

