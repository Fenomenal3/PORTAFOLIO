import { useState } from "react";
import type {
  ActualizarTareaDTO,
  CrearTareaDTO,
  Tarea,
} from "../interfaces/Tareas";
import Button from "../components/ui/Button";
import TareasTable from "../components/tables/TareasTable";
import Modal from "../components/ui/Modal";
import { useTareas } from "../hooks/useTareas";
import { Plus } from "lucide-react";
import TareasForm from "../components/forms/Tarea/TareaForm";
import EditarTareaForm from "../components/forms/Tarea/EditarTareaForm";
import EditarEstadoForm from "../components/forms/Tarea/EditarEstadoForm";

export default function TareasPage() {
  const {
    tareas,
    loading,
    error,
    crear,
    actualizar,
    eliminar,
    page,
    setPage,
    total,
    limit,
    cargar,
  } = useTareas();

  const [showCrear, setShowCrear] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Tarea | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [tareaEstado, setTareaEstado] = useState<Tarea | null>(null);
  const handleCrear = async (data: CrearTareaDTO) => {
    try {
      setFormError(null);
      await crear(data);
      await cargar();
      setShowCrear(false);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleActualizar = async (data: ActualizarTareaDTO) => {
    if (!seleccionado) return;
    try {
      setFormError(null);
      await actualizar(seleccionado.id, data);
      await cargar();
      setSeleccionado(null);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Confirmas eliminar esta tarea?")) return;
    try {
      await eliminar(id);
      await cargar();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tareas</h1>
          <p className="text-slate-500 text-sm mt-1">
            {total} tarea(s) registrada(s)
          </p>
        </div>

        <Button onClick={() => setShowCrear(true)} icon={<Plus size={16} />}>
          Nueva Tarea
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <TareasTable
        tareas={tareas}
        loading={loading}
        onEditar={(t) => {
          setFormError(null);
          setSeleccionado(t);
        }}
        onEliminar={handleEliminar}
        onEditarEstado={(t) => {
          setFormError(null);
          setTareaEstado(t);
        }}
      />

      <Modal
        open={showCrear}
        onClose={() => setShowCrear(false)}
        title="Crear Tarea"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

        <TareasForm
          onSubmit={handleCrear}
          onCancel={() => setShowCrear(false)}
        />
      </Modal>
      <Modal
        open={!!tareaEstado}
        onClose={() => setTareaEstado(null)}
        title="Cambiar estado"
      >
        {tareaEstado && (
          <EditarEstadoForm
            tarea={tareaEstado}
            onSubmit={async (data) => {
              await actualizar(tareaEstado.id, data);
              await cargar();
              setTareaEstado(null);
            }}
            onCancel={() => setTareaEstado(null)}
          />
        )}
      </Modal>
      <Modal
        open={!!seleccionado}
        onClose={() => setSeleccionado(null)}
        title="Editar Tarea"
      >
        {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

        {seleccionado && (
          <EditarTareaForm
            tarea={seleccionado}
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
