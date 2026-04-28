import { useState, useEffect, useCallback } from 'react';
import { proyectoService } from '../services/proyectoService';
import type { ActualizarProyectoDTO, CrearProyectoDTO, Proyecto } from "../interfaces/Proyectos";

export const useProyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [proyectosAll, setProyectosAll] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);


  const cargar =  useCallback(async () => {
    setLoading(true);
    try {
      const res = await proyectoService.getAll(page, limit);
      setProyectos(res.data);
      setTotal(res.total);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  }, [page,limit]);

  const cargarTodos = async () => {
    setLoading(true);
    try {
      const res = await proyectoService.getAll(1, 1000);
      setProyectosAll(res.data);
    } catch (err) {
      setError("Error al cargar todos los proyectos");
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    cargar();
  }, [cargar]);
  useEffect(() => {
    cargarTodos(); // dashboard
  }, []);
  const crear = async (payload: CrearProyectoDTO) => {
    try {
      const nuevo = await proyectoService.create(payload);
      setProyectos((prev) => [nuevo, ...prev]);
      return nuevo;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al crear proyecto');
      }
      throw err;
    }
  };

  const actualizar = async (id: number, payload: ActualizarProyectoDTO) => {
    try {
      const actualizado = await proyectoService.update(id, payload);
      setProyectos((prev) =>
      prev.map((p) => (p.id === id ? actualizado : p))
      );
      return actualizado;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al actualizar proyecto');
      }
      throw err;
    }
  };

  const eliminar = async (id: number) => {
    try {
      await proyectoService.remove(id);
      setProyectos((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al eliminar proyecto');
      }
      throw err;
    }
  };

  return {
    proyectos,
    proyectosAll,
    loading,
    error,
    cargar,
    cargarTodos,
    crear,
    actualizar,
    eliminar,
    page,
    setPage,
    total,
    limit,
  };
};