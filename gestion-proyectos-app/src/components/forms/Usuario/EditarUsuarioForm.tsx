import { useForm } from "react-hook-form";
import type {
  ActualizarUsuarioDTO,
  Usuario,
} from "../../../interfaces/Usuarios";
import Button from "../../ui/Button";

interface Props {
  usuario: Usuario;
  onSubmit: (data: ActualizarUsuarioDTO) => Promise<void>;
  onCancel: () => void;
}

export default function EditarUsuarioForm({
  usuario,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActualizarUsuarioDTO>({
    defaultValues: { nombre: usuario.nombre, email: usuario.email },
  });
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
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          })}
          className={`${campo} ${errors.nombre ? error : normal}`}
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email *
        </label>
        <input
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          })}
          type="email"
          className={`${campo} ${errors.email ? error : normal}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Crear cambios"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
