import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';

/**
 * Cliente API base configurado con axios
 * Configurado para comunicarse con el backend Spring Boot
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // El servidor responde con un código de error
      console.error('Error de respuesta:', error.response.status, error.response.data);
    } else if (error.request) {
      // La petición se hizo pero no se recibió respuesta
      console.error('Error de red:', error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

