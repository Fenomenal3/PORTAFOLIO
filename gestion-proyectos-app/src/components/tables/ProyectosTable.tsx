import { Folder, Pencil, Trash2 } from "lucide-react";
import type { Proyecto } from "../../interfaces/Proyectos";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props{
    proyectos: Proyecto[];
    loading: boolean;
    onEliminar: (id: number)=>void;
    onEditar: (proyecto: Proyecto)=>void;
}

export default function ProyectosTable({ proyectos, loading, onEditar, onEliminar }: Props) {
  if (loading) return <div className="text-center py-12 text-slate-400 animate-pulse">Cargando proyectos...</div>;
  if (!proyectos.length) return <EmptyState icon={Folder} title="Sin proyectos" description="Crea un proyecto para comenzar." />;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 font-semibold">
          <tr>
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Nombre</th>
            <th className="text-left px-5 py-3">Descripcion</th>
            <th className="text-left px-5 py-3">Registrado</th>
            <th className="text-left px-5 py-3">Usuario</th>
            <th className="text-left px-5 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((p) => (
            
            <tr key={p.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-3 text-slate-400">{p.id}</td>
              <td className="px-5 py-3 font-medium text-slate-800">{p.nombre}</td>
              <td className="px-5 py-3 text-slate-600">{p.descripcion}</td>
              <td className="px-5 py-3 text-slate-400">{new Date(p.creadoEn).toLocaleDateString('es-BO')}</td>
              <td className="px-5 py-3 text-slate-600"> {p.usuario ? p.usuario.nombre : "Cargando..."}</td>
              <td className="px-5 py-3">
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => onEditar(p)} icon={<Pencil size={14} />}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => onEliminar(p.id)} icon={<Trash2 size={14} />}>
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