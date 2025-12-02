import apiClient from '../client/apiClient';
import type { 
  CarreraTaxi, 
  CarreraTaxiRequest, 
  CarreraTaxiHttpResponse, 
  CarreraTaxiListResponse 
} from '../../types/carreraTaxi.types';

/**
 * Servicio para operaciones CRUD de Carreras de Taxi
 */
export const carreraTaxiService = {
  /**
   * Obtener todas las carreras de taxi
   */
  getAll: async (): Promise<CarreraTaxi[]> => {
    const response = await apiClient.get<CarreraTaxiHttpResponse>('/carreras-taxi');
    const data = response.data.data as CarreraTaxiListResponse;
    return data.carreras || [];
  },

  /**
   * Obtener una carrera de taxi por ID
   */
  getById: async (id: number): Promise<CarreraTaxi> => {
    const response = await apiClient.get<CarreraTaxiHttpResponse>(`/carreras-taxi/${id}`);
    return response.data.data as CarreraTaxi;
  },

  /**
   * Crear una nueva carrera de taxi
   */
  create: async (carrera: CarreraTaxiRequest): Promise<CarreraTaxi> => {
    const response = await apiClient.post<CarreraTaxiHttpResponse>('/carreras-taxi', carrera);
    return response.data.data as CarreraTaxi;
  },

  /**
   * Actualizar una carrera de taxi existente
   */
  update: async (id: number, carrera: CarreraTaxiRequest): Promise<CarreraTaxi> => {
    const response = await apiClient.put<CarreraTaxiHttpResponse>(`/carreras-taxi/${id}`, carrera);
    return response.data.data as CarreraTaxi;
  },

  /**
   * Eliminar una carrera de taxi
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/carreras-taxi/${id}`);
  },
};

