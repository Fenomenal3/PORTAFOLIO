import { useState } from "react";
import type {
  ActualizarProyectoDTO,
  CrearProyectoDTO,
  Proyecto,
} from "../interfaces/Proyectos";
import Button from "../components/ui/Button";
import ProyectosTable from "../components/tables/ProyectosTable";
import Modal from "../components/ui/Modal";
import { useProyectos } from "../hooks/useProyectos";
import { Plus } from "lucide-react";
import ProyectosForm from "../components/forms/Proyecto/ProyectoForm";
import EditarProyectoForm from "../components/forms/Proyecto/EditarProyectoForm";

export default function ProyectoPage() {
  const {
    proyectos,
    loading,
    error,
    crear,
    actualizar,
    eliminar,
    page,
    setPage,
    total,
    limit,
  } = useProyectos();
  const [showCrear, setShowCrear] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Proyecto | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const handleCrear = async (data: CrearProyectoDTO) => {
    try {
      setFormError(null);
      await crear(data);
      setShowCrear(false);
      setFormError(null);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleActualizar = async (data: ActualizarProyectoDTO) => {
    if (!seleccionado) return;
    try {
      setFormError(null);
      await actualizar(seleccionado.id, data);
      setSeleccionado(null);
    } catch (err: any) {
      setFormError(err.message);
    }
  };
  const handleEliminar = async (id: number) => {
    if (!confirm("¿Confirmas eliminar este proyecto?")) return;
    try {
      await eliminar(id);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Proyectos</h1>
          <p className="text-slate-500 text-sm mt-1">
            {total} proyecto(s) registrado(s)
          </p>
        </div>
        <Button onClick={() => setShowCrear(true)} icon={<Plus size={16} />}>
          Nuevo Proyecto
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <ProyectosTable
        proyectos={proyectos}
        loading={loading}
        onEditar={(p) => {
          setFormError(null);
          setSeleccionado(p);
        }}
        onEliminar={handleEliminar}
      />
      <Modal
        open={showCrear}
        onClose={() => setShowCrear(false)}
        title="Crear Proyecto"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
        {
          <ProyectosForm
            onSubmit={handleCrear}
            onCancel={() => setShowCrear(false)}
          />
        }
      </Modal>

      <Modal
        open={!!seleccionado}
        onClose={() => setSeleccionado(null)}
        title="Editar Proyecto"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
        {seleccionado && (
          <EditarProyectoForm
            proyecto={seleccionado}
            onSubmit={handleActualizar}
            onCancel={() => setSeleccionado(null)}
          />
        )}
      </Modal>
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </Button>

        <Button
          onClick={() => setPage(page + 1)}
          disabled={page * limit >= total}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
