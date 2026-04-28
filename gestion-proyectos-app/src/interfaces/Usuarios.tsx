export interface Usuario{
    id: number;
    nombre: string;
    email: string;
    creadoEn:string;
}
export interface CrearUsuarioDTO {
    nombre: string;
    email: string;
    password: string;
}
export interface ActualizarUsuarioDTO {
    nombre?: string;
    email?: string;    
}
export interface ActualizarUsuarioPasswordDTO {    
    password?: string;
}