import apiClient from '../client/apiClient';
import type { Usuario, UsuarioRequest, UsuarioHttpResponse, UsuarioListResponse } from '../../types/usuario.types';

/**
 * Servicio para operaciones CRUD de Usuarios
 */
export const usuarioService = {
  /**
   * Obtener todos los usuarios
   */
  getAll: async (): Promise<Usuario[]> => {
    const response = await apiClient.get<UsuarioHttpResponse>('/usuarios');
    const data = response.data.data as UsuarioListResponse;
    return data.usuarios || [];
  },

  /**
   * Obtener un usuario por ID
   */
  getById: async (id: number): Promise<Usuario> => {
    const response = await apiClient.get<UsuarioHttpResponse>(`/usuarios/${id}`);
    return response.data.data as Usuario;
  },

  /**
   * Crear un nuevo usuario
   */
  create: async (usuario: UsuarioRequest): Promise<Usuario> => {
    const response = await apiClient.post<UsuarioHttpResponse>('/usuarios', usuario);
    return response.data.data as Usuario;
  },

  /**
   * Actualizar un usuario existente
   */
  update: async (id: number, usuario: UsuarioRequest): Promise<Usuario> => {
    const response = await apiClient.put<UsuarioHttpResponse>(`/usuarios/${id}`, usuario);
    return response.data.data as Usuario;
  },

  /**
   * Eliminar un usuario
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/usuarios/${id}`);
  },
};

