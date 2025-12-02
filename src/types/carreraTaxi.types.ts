/**
 * Tipos TypeScript para la entidad CarreraTaxi
 * Basados en los DTOs del backend Spring Boot
 */

export interface CarreraTaxi {
  id: number;
  cliente: string;
  taxi: string; // Formato: ABC123
  taxista: string;
  kilometros: number;
  barrioInicio: string;
  barrioLlegada: string;
  cantidadPasajeros: number; // Máximo 8
  precio: number;
  duracionMinutos: number;
  fechaCreacion: string; // date string
}

export interface CarreraTaxiRequest {
  cliente: string;
  taxi: string; // Formato: ABC123
  taxista: string;
  kilometros: number;
  barrioInicio: string;
  barrioLlegada: string;
  cantidadPasajeros: number; // Máximo 8
  precio: number;
  duracionMinutos: number;
}

export interface CarreraTaxiListResponse {
  carreras: CarreraTaxi[];
}

export interface CarreraTaxiHttpResponse {
  ok: boolean;
  data: CarreraTaxi | CarreraTaxiListResponse;
}