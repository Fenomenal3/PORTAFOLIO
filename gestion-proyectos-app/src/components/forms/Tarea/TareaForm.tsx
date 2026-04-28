import { useForm } from "react-hook-form";
import type { CrearTareaDTO } from "../../../interfaces/Tareas";
import Button from "../../ui/Button";

interface Props {
  onSubmit: (data: CrearTareaDTO) => Promise<void>;
  onCancel: () => void;
}

export default function TareasForm({ onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CrearTareaDTO>();

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
        {errors.titulo && (
          <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>
        )}
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
        {errors.descripcion && (
          <p className="text-red-500 text-xs mt-1">
            {errors.descripcion.message}
          </p>
        )}
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
          {isSubmitting ? "Guardando..." : "Crear Tarea"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
