import { ClipboardList, Pencil, Trash2 } from "lucide-react";
import type { Tarea } from "../../interfaces/Tareas";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props {
  tareas: Tarea[];
  loading: boolean;
  onEliminar: (id: number) => void;
  onEditar: (tarea: Tarea) => void;
  onEditarEstado: (tarea: Tarea) => void;
}

export default function TareasTable({
  tareas,
  loading,
  onEditar,
  onEliminar,
  onEditarEstado
}: Props) {
  if (loading)
    return (
      <div className="text-center py-12 text-slate-400 animate-pulse">
        Cargando tareas...
      </div>
    );
  if (!tareas.length)
    return (
      <EmptyState
        icon={ClipboardList}
        title="Sin tareas"
        description="Crea una tarea para comenzar."
      />
    );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold">
          <tr>
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Titulo</th>
            <th className="text-left px-5 py-3">Descripcion</th>
            <th className="text-left px-5 py-3">Estado</th>
            <th className="text-left px-5 py-3">Registrado</th>
            <th className="text-left px-5 py-3">ProyectoId</th>
            <th className="text-left px-5 py-3">Usuario</th>
            <th className="text-left px-5 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((t) => (
            <tr
              key={t.id}
              className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors"
            >
              <td className="px-5 py-3 text-slate-400">{t.id}</td>
              <td className="px-5 py-3 font-medium text-slate-800">
                {t.titulo}
              </td>
              <td className="px-5 py-3 text-slate-600">{t.descripcion}</td>
              <td className="px-5 py-3 text-slate-600">{t.estado}</td>
              <td className="px-5 py-3 text-slate-400">
                {new Date(t.creadoEn).toLocaleDateString("es-BO")}
              </td>
              <td className="px-5 py-3 text-slate-600">{t.proyectoId}</td>
              <td className="px-5 py-3 text-slate-600">
                {loading ? "..." : (t.usuario?.nombre ?? "Sin usuario")}
              </td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => onEditar(t)}
                    icon={<Pencil size={14} />}
                  >
                    Editar
                  </Button>
                  <Button variant="ghost" onClick={() => onEditarEstado(t)}>
                    Estado
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onEliminar(t.id)}
                    icon={<Trash2 size={14} />}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
