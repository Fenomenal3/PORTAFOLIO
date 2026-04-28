import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type {
  ActualizarProyectoDTO,
  Proyecto,
} from "../../../interfaces/Proyectos";
import Button from "../../ui/Button";

interface Props {
  proyecto: Proyecto;
  onSubmit: (data: ActualizarProyectoDTO) => Promise<void>;
  onCancel: () => void;
}

export default function EditarProyectoForm({
  proyecto,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActualizarProyectoDTO>();

  useEffect(() => {
    reset({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      usuarioId: proyecto.usuarioId,
    });
  }, [proyecto, reset]);


  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const error = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nombre *
        </label>
        <input
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          })}
          className={`${campo} ${errors.nombre ? error : normal}`}
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Descripcion *
        </label>
        <input
          {...register("descripcion", {
            required: "La descripcion es obligatorio",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
          type="text"
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
            UsuarioId *
          </label>

          <input
            type="number"
            {...register("usuarioId", {
              required: "El usuario es obligatorio",
              valueAsNumber: true,
              min: { value: 1, message: "ID inválido" },
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
        {errors.usuarioId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.usuarioId.message}
          </p>
        )}
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
