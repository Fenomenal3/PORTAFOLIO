import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "../../ui/Button";
import type { ActualizarTareaDTO, Tarea } from "../../../interfaces/Tareas";

interface Props {
  tarea: Tarea;
  onSubmit: (data: ActualizarTareaDTO) => Promise<void>;
  onCancel: () => void;
}

export default function EditarTareaForm({
  tarea,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{ estado: string }>();

  useEffect(() => {
    reset({
      estado: tarea.estado,
    });
  }, [tarea, reset]);

  const submit = async (data: { estado: string }) => {
    await onSubmit({
      estado: data.estado,
    });
  };

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Estado
        </label>

        <select {...register("estado")} className={campo}>
          <option value="PENDIENTE">Pendiente</option>
          <option value="EN_PROGRESO">En progreso</option>
          <option value="COMPLETADA">Completada</option>
        </select>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          Guardar
        </Button>

        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}