import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { UsuarioRequest, Usuario } from '../../types/usuario.types';
import { FaSpinner } from 'react-icons/fa';

// Esquema de validación con Zod (alineado con las validaciones del backend)
const usuarioSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .nonempty('El nombre es requerido'),
  rol: z
    .string()
    .min(2, 'El rol debe tener al menos 2 caracteres')
    .max(20, 'El rol no puede tener más de 20 caracteres')
    .nonempty('El rol es requerido'),
  clave: z
    .string()
    .min(6, 'La clave debe tener al menos 6 caracteres')
    .max(100, 'La clave no puede tener más de 100 caracteres')
    .nonempty('La clave es requerida'),
});

interface UsuarioFormProps {
  usuario?: Usuario; // Si se proporciona, es modo edición
  onSubmit: (data: UsuarioRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UsuarioForm({ usuario, onSubmit, onCancel, isLoading = false }: UsuarioFormProps) {
  const isEditMode = !!usuario;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioRequest>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: usuario
      ? {
          nombre: usuario.nombre,
          rol: usuario.rol,
          clave: '', // No prellenamos la clave por seguridad
        }
      : undefined,
  });

  const onSubmitForm = async (data: UsuarioRequest) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          {...register('nombre')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.nombre ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ingrese el nombre del usuario"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
          Rol
        </label>
        <input
          type="text"
          id="rol"
          {...register('rol')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.rol ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: Administrador, Usuario, etc."
        />
        {errors.rol && (
          <p className="mt-1 text-sm text-red-600">{errors.rol.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="clave" className="block text-sm font-medium text-gray-700 mb-1">
          {isEditMode ? 'Nueva Clave' : 'Clave'}
        </label>
        <input
          type="password"
          id="clave"
          {...register('clave')}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.clave ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={isEditMode ? 'Ingrese la nueva clave' : 'Ingrese la clave'}
        />
        {errors.clave && (
          <p className="mt-1 text-sm text-red-600">{errors.clave.message}</p>
        )}
        {isEditMode && (
          <p className="mt-1 text-xs text-gray-500">
            Ingrese una nueva clave para actualizar
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          <span>{isEditMode ? 'Actualizar' : 'Crear'} Usuario</span>
        </button>
      </div>
    </form>
  );
}

