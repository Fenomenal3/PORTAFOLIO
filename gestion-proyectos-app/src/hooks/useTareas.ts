import { useState, useEffect, useCallback } from 'react';
import { tareaService } from '../services/tareaService';
import type { ActualizarTareaDTO, CrearTareaDTO, Tarea } from "../interfaces/Tareas";

export const useTareas= () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const [filtros, setFiltros] = useState<{
    proyectoId?: number;
    estado?: string;
  }>({});

  const cargar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await tareaService.getAll({
        page,
        limit,
        ...filtros,
      });
      setTareas(res.data);
      setTotal(res.total);
    } catch (err) {
      setError("Error al cargar tareas");
    } finally {
      setLoading(false);
    }
  }, [page, limit, filtros]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const crear = async (payload: CrearTareaDTO) => {
    try {
      const nuevo = await tareaService.create(payload);
      setTareas((prev) => [...prev, nuevo]);
      return nuevo;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear tarea');
      }
      throw err;
    }
  };

  const actualizar = async (id: number, payload: ActualizarTareaDTO) => {
  try {
    const actualizado = await tareaService.update(id, payload);

    setTareas((prev) =>
      prev.map((t) => (t.id === id ? actualizado : t))
    );

    return actualizado;
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Error al actualizar tarea");
    }
    throw err;
  }
};

  const eliminar = async (id: number) => {
    try {
      await tareaService.remove(id);
      setTareas((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al eliminar tarea');
      }
      throw err;
    }
  };

  return {
    tareas,
    loading,
    error,
    cargar,
    crear,
    actualizar,
    eliminar,
    page,
    setPage,
    total,
    limit,
    filtros,
    setFiltros,
  };
};