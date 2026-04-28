import axiosInstance from "../api/axiosInstance";
import type { ActualizarUsuarioDTO, CrearUsuarioDTO, Usuario } from "../interfaces/Usuarios";
 
export const usuarioService = {
    getAll: async (page = 1, limit = 5) => {
    const { data } = await axiosInstance.get(
      `/usuarios?page=${page}&limit=${limit}`
    );
    return data;
  },
  getAllSimple: async () => {
  const { data } = await axiosInstance.get("/usuarios");
  return data;
},
 
  getById: async (id: number): Promise<Usuario> => {
    const { data } = await axiosInstance.get<Usuario>(`/usuarios/${id}`);
    return data;
  },
 
  create: async (payload: CrearUsuarioDTO): Promise<Usuario> => {
    const { data } = await axiosInstance.post<Usuario>('/usuarios', payload);
    return data;
  },
 
  update: async (id: number, payload: ActualizarUsuarioDTO): Promise<Usuario> => {
    const { data } = await axiosInstance.patch<Usuario>(`/usuarios/${id}`, payload);
    return data;
  },
  updatePassword: async (id: number, payload: { password: string }) => {
  const { data } = await axiosInstance.patch(`/usuarios/${id}`, payload);
  return data;
},
  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/usuarios/${id}`);
  },
}