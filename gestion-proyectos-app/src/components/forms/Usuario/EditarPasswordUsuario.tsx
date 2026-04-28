import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "../../ui/Button";

interface Props {
  usuario: {
    id: number;
  };
  onSubmit: (data: { password: string }) => Promise<void>;
  onCancel: () => void;
}

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function EditarPasswordForm({
  usuario,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    reset({
      password: "",
      confirmPassword: "",
    });
  }, [usuario, reset]);

  const password = watch("password");

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const error = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";

  const submitHandler = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    await onSubmit({ password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nueva contraseña *
        </label>
        <input
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Mínimo 6 caracteres",
            },
          })}
          className={`${campo} ${errors.password ? error : normal}`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Confirmar contraseña *
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Confirma la contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
          className={`${campo} ${errors.confirmPassword ? error : normal}`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Actualizar contraseña"}
        </Button>

        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}