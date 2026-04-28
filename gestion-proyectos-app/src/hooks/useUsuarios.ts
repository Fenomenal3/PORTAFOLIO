import { useState, useEffect, useCallback } from "react";
import { usuarioService } from "../services/usuarioService";
import type {
  ActualizarUsuarioDTO,
  CrearUsuarioDTO,
  Usuario,
} from "../interfaces/Usuarios";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuariosAll, setUsuariosAll] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await usuarioService.getAll(page, limit);
      setUsuarios(res.data);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const cargarTodos = async () => {
    setLoading(true);
    try {
      const res = await usuarioService.getAll(1, 1000);
      setUsuariosAll(res.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    cargar();
  }, [cargar]);

  useEffect(() => {
    cargarTodos();
  }, []);
  const crear = async (payload: CrearUsuarioDTO) => {
    try {
      const nuevo = await usuarioService.create(payload);
      setUsuarios((prev) => [...prev, nuevo]);
      return nuevo;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al crear usuario");
      }
      throw err;
    }
  };

  const actualizar = async (id: number, payload: ActualizarUsuarioDTO) => {
    try {
      const actualizado = await usuarioService.update(id, payload);
      setUsuarios((prev) => prev.map((u) => (u.id === id ? actualizado : u)));
      return actualizado;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al actualizar usuario");
      }
      throw err;
    }
  };
  const actualizarPassword = async (id: number, password: string) => {
  try {
    const actualizado = await usuarioService.updatePassword(id, {
      password,
    });

    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? actualizado : u))
    );

    return actualizado;
  } catch (err: any) {
  console.log("ERROR REAL:", err.response?.data || err.message);
  setError(err.response?.data?.message || "Error al actualizar password");
  throw err;
}
};
  const eliminar = async (id: number) => {
    try {
      await usuarioService.remove(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al eliminar usuario");
      }
      throw err;
    }
  };

  return {
    usuarios,
    usuariosAll,
    loading,
    error,
    cargar,
    cargarTodos,
    crear,
    actualizar,
    actualizarPassword,
    eliminar,
    page,
    setPage,
    total,
    limit,
  };
};
