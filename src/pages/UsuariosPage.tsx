import { useState } from 'react';
import UsuarioList from '../components/usuarios/UsuarioList';
import UsuarioForm from '../components/usuarios/UsuarioForm';
import Modal from '../components/common/Modal';
import { usuarioService } from '../api/services/usuarioService';
import type { Usuario, UsuarioRequest } from '../types/usuario.types';
import toast from 'react-hot-toast';

export default function UsuariosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreate = () => {
    setEditingUsuario(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUsuario(undefined);
  };

  const handleSubmit = async (data: UsuarioRequest) => {
    try {
      setIsLoading(true);
      
      if (editingUsuario) {
        // Actualizar usuario existente
        await usuarioService.update(editingUsuario.id, data);
        toast.success('Usuario actualizado correctamente');
      } else {
        // Crear nuevo usuario
        await usuarioService.create(data);
        toast.success('Usuario creado correctamente');
      }

      handleCloseModal();
      // Forzar recarga de la lista
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast.error(editingUsuario ? 'Error al actualizar el usuario' : 'Error al crear el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Crear Usuario</span>
        </button>
      </div>
      
      <UsuarioList key={refreshKey} onEdit={handleEdit} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUsuario ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      >
        <UsuarioForm
          usuario={editingUsuario}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
}

