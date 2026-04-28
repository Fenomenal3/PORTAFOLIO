import type { Usuario } from "./Usuarios";
import type { Tarea } from "./Tareas"
export interface Proyecto{
    id: number;
    nombre: string;
    descripcion: string;
    creadoEn:string;
    usuarioId: number;
    usuario?: Usuario;
    tareas: Tarea[];
}
export interface CrearProyectoDTO {
    nombre: string;
    descripcion: string;
    usuarioId: number;
}
export interface ActualizarProyectoDTO {
    nombre?: string;
    descripcion?: string;
    usuarioId?:number;    
}
