import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CarreraTaxiRequest, CarreraTaxi } from '../../types/carreraTaxi.types';
import { FaSpinner } from 'react-icons/fa';



const carreraTaxiSchema = z.object({
  cliente: z
    .string()
    .min(1, 'El cliente es requerido')
    .trim(),
  taxi: z
    .string()
    .min(1, 'La placa es requerida')
    .regex(/^[A-Z]{3}\d{3}$/, 'La placa debe tener el formato ABC123 (3 letras mayúsculas y 3 números)')
    .trim(),
  taxista: z
    .string()
    .min(1, 'El taxista es requerido')
    .trim(),
  kilometros: z
    .number('Los kilómetros deben ser un número')
    .positive('Los kilómetros deben ser mayores a 0'),
  barrioInicio: z
    .string()
    .min(1, 'El barrio de inicio es requerido')
    .trim(),
  barrioLlegada: z
    .string()
    .min(1, 'El barrio de llegada es requerido')
    .trim(),
  cantidadPasajeros: z
    .number('La cantidad de pasajeros debe ser un número entero')
    .int('Debe ser un número entero')
    .positive('Debe ser mayor a 0')
    .max(8, 'Máximo 8 pasajeros'),
  precio: z
    .number('El precio debe ser un número')
    .positive('El precio debe ser mayor a 0'),
  duracionMinutos: z
    .number('La duración debe ser un número entero')
    .int('Debe ser un número entero')
    .positive('La duración debe ser mayor a 0'),
});

interface CarreraTaxiFormProps {
  carrera?: CarreraTaxi;
  onSubmit: (data: CarreraTaxiRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function CarreraTaxiForm({
  carrera,
  onSubmit,
  onCancel,
  isLoading = false,
}: CarreraTaxiFormProps) {
  const isEditMode = !!carrera;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CarreraTaxiRequest>({
    resolver: zodResolver(carreraTaxiSchema),
    defaultValues: carrera
      ? {
          cliente: carrera.cliente,
          taxi: carrera.taxi,
          taxista: carrera.taxista,
          kilometros: carrera.kilometros,
          barrioInicio: carrera.barrioInicio,
          barrioLlegada: carrera.barrioLlegada,
          cantidadPasajeros: carrera.cantidadPasajeros,
          precio: carrera.precio,
          duracionMinutos: carrera.duracionMinutos,
        }
      : undefined,
  });

  const taxiValue = watch('taxi') || '';

  const handleTaxiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    
    // Filtrar solo letras y números
    value = value.replace(/[^A-Z0-9]/g, '');
    
    // Limitar a 6 caracteres
    if (value.length > 6) {
      value = value.substring(0, 6);
    }
    
    // Si ya hay 3 letras, solo permitir números
    const letras = value.match(/[A-Z]/g) || [];
    const numeros = value.match(/\d/g) || [];
    
    if (letras.length >= 3) {
      // Si ya hay 3 letras, solo permitir números después
      const parteLetras = value.substring(0, 3).replace(/\d/g, '');
      const parteNumeros = value.substring(3).replace(/[A-Z]/g, '');
      value = parteLetras + parteNumeros;
    } else {
      // Si aún no hay 3 letras, permitir letras y números pero priorizar letras
      value = letras.join('') + numeros.join('').substring(0, 6 - letras.length);
    }
    
    setValue('taxi', value, { shouldValidate: false });
  };

  const onSubmitForm = async (data: CarreraTaxiRequest) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
            Cliente
          </label>
          <input
            type="text"
            id="cliente"
            {...register('cliente')}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.cliente ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nombre del cliente"
          />
          {errors.cliente && (
            <p className="mt-1 text-sm text-red-600">{errors.cliente.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="taxi" className="block text-sm font-medium text-gray-700 mb-1">
            Placa del Taxi
          </label>
          <input
            type="text"
            id="taxi"
            {...register('taxi')}
            value={taxiValue}
            onChange={handleTaxiChange}
            onBlur={() => setValue('taxi', taxiValue, { shouldValidate: true })}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 uppercase ${
              errors.taxi ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ABC123"
            maxLength={6}
            pattern="[A-Z]{3}[0-9]{3}"
            title="Formato: 3 letras mayúsculas seguidas de 3 números (ej: ABC123)"
          />
          {errors.taxi && (
            <p className="mt-1 text-sm text-red-600">{errors.taxi.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Formato: 3 letras mayúsculas y 3 números</p>
        </div>

        <div>
          <label htmlFor="taxista" className="block text-sm font-medium text-gray-700 mb-1">
            Taxista
          </label>
          <input
            type="text"
            id="taxista"
            {...register('taxista')}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.taxista ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nombre del taxista"
          />
          {errors.taxista && (
            <p className="mt-1 text-sm text-red-600">{errors.taxista.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="kilometros" className="block text-sm font-medium text-gray-700 mb-1">
            Kilómetros
          </label>
          <input
            type="number"
            id="kilometros"
            step="0.1"
            min="0"
            {...register('kilometros', { valueAsNumber: true })}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.kilometros ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.0"
          />
          {errors.kilometros && (
            <p className="mt-1 text-sm text-red-600">{errors.kilometros.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="barrioInicio" className="block text-sm font-medium text-gray-700 mb-1">
            Barrio de Inicio
          </label>
          <input
            type="text"
            id="barrioInicio"
            {...register('barrioInicio')}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.barrioInicio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Barrio de inicio"
          />
          {errors.barrioInicio && (
            <p className="mt-1 text-sm text-red-600">{errors.barrioInicio.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="barrioLlegada" className="block text-sm font-medium text-gray-700 mb-1">
            Barrio de Llegada
          </label>
          <input
            type="text"
            id="barrioLlegada"
            {...register('barrioLlegada')}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.barrioLlegada ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Barrio de llegada"
          />
          {errors.barrioLlegada && (
            <p className="mt-1 text-sm text-red-600">{errors.barrioLlegada.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="cantidadPasajeros" className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad de Pasajeros
          </label>
          <input
            type="number"
            id="cantidadPasajeros"
            min="1"
            max="8"
            {...register('cantidadPasajeros', { valueAsNumber: true })}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.cantidadPasajeros ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="1-8"
          />
          {errors.cantidadPasajeros && (
            <p className="mt-1 text-sm text-red-600">{errors.cantidadPasajeros.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Máximo 8 pasajeros</p>
        </div>

        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
            Precio (COP)
          </label>
          <input
            type="number"
            id="precio"
            step="0.01"
            min="0"
            {...register('precio', { valueAsNumber: true })}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.precio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.precio && (
            <p className="mt-1 text-sm text-red-600">{errors.precio.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="duracionMinutos" className="block text-sm font-medium text-gray-700 mb-1">
            Duración (minutos)
          </label>
          <input
            type="number"
            id="duracionMinutos"
            min="1"
            {...register('duracionMinutos', { valueAsNumber: true })}
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.duracionMinutos ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Minutos"
          />
          {errors.duracionMinutos && (
            <p className="mt-1 text-sm text-red-600">{errors.duracionMinutos.message}</p>
          )}
        </div>
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
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          <span>{isEditMode ? 'Actualizar' : 'Crear'} Carrera</span>
        </button>
      </div>
    </form>
  );
}

