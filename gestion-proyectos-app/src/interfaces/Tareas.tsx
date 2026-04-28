import type { Usuario } from "./Usuarios";
export interface Tarea{
    id: number;
    titulo: string;
    descripcion: string;
    estado:string;
    creadoEn:string;
    proyectoId:number;
    usuarioId: number;
    usuario: Usuario;
}
export interface CrearTareaDTO {
    titulo: string;
    descripcion: string;
    proyectoId:number;
    usuarioId: number;
}
export interface ActualizarTareaDTO {
    titulo?: string;
    descripcion?: string;
    estado?:string;
    usuarioId?:number;
    proyectoId?:number;
}
