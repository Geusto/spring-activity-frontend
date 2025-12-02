/**
 * Tipos TypeScript para la entidad Usuario
 * Basados en los DTOs del backend Spring Boot
 */

export interface Usuario {
  id: number;
  nombre: string;
  rol: string;
  fechaCreacion: string; // date string
}

export interface UsuarioRequest {
  nombre: string;
  rol: string;
  clave: string;
}

export interface UsuarioListResponse {
  usuarios: Usuario[];
}

export interface UsuarioHttpResponse {
  ok: boolean;
  data: Usuario | UsuarioListResponse | string;
}

