import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { ActualizarTareaDTO, Tarea } from "../../../interfaces/Tareas";
import Button from "../../ui/Button";

interface Props {
  tarea: Tarea;
  onSubmit: (data: ActualizarTareaDTO) => Promise<void>;
  onCancel: () => void;
}

export default function EditarTareaForm({ tarea, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActualizarTareaDTO>();


  useEffect(() => {
    reset({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      estado: tarea.estado,
      proyectoId: tarea.proyectoId,
      usuarioId: tarea.usuarioId ?? undefined,
    });
  }, [tarea, reset]);

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const error = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Titulo *
        </label>
        <input
          {...register("titulo", {
            required: "El titulo es obligatorio",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          })}
          className={`${campo} ${errors.titulo ? error : normal}`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Descripcion *
        </label>
        <input
          {...register("descripcion", {
            required: "La descripcion es obligatoria",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
          className={`${campo} ${errors.descripcion ? error : normal}`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Estado *
        </label>
        <select
          {...register("estado", {
            required: "El estado es obligatorio",
          })}
          className={`${campo} ${errors.estado ? error : normal}`}
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="EN_PROGRESO">En progreso</option>
          <option value="COMPLETADA">Completada</option>
        </select>
      </div>

      <div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Proyecto ID *
          </label>
          <input
            type="number"
            {...register("proyectoId", {
              required: "El proyecto es obligatorio",
              valueAsNumber: true,
            })}
            className={`${campo} ${errors.proyectoId ? error : normal}`}
            placeholder="Ej: 2"
          />
          {errors.proyectoId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.proyectoId.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Usuario ID *
          </label>
          <input
            type="number"
            {...register("usuarioId", {
              required: "El usuario es obligatorio",
              valueAsNumber: true,
            })}
            className={`${campo} ${errors.usuarioId ? error : normal}`}
            placeholder="Ej: 1"
          />
          {errors.usuarioId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.usuarioId.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
