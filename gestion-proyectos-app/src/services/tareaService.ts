import axiosInstance from "../api/axiosInstance";
import type {
  ActualizarTareaDTO,
  CrearTareaDTO,
  Tarea,
} from "../interfaces/Tareas";
export const tareaService = {
  getAll: async (params: {
    page?: number;
    limit?: number;
    proyectoId?: number;
    estado?: string;
  }) => {
    const { data } = await axiosInstance.get("/tareas", { params });
    return data;
  },

  getById: async (id: number): Promise<Tarea> => {
    const { data } = await axiosInstance.get<Tarea>(`/tareas/${id}`);
    return data;
  },

  create: async (payload: CrearTareaDTO): Promise<Tarea> => {
    const { data } = await axiosInstance.post<Tarea>("/tareas", payload);
    return data;
  },

  update: async (id: number, payload: ActualizarTareaDTO): Promise<Tarea> => {
    const { data } = await axiosInstance.patch<Tarea>(`/tareas/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/tareas/${id}`);
  },
};
