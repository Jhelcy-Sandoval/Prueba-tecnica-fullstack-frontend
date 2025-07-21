import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AuthResponseError } from "../types/types";
import { resetPassword } from "../services/forgotservice";

interface ProtectForgotProps {
  token: string | null;
  email: string | undefined;
  mode: boolean;
}

export default function PasswordReset({ token, email, mode }: ProtectForgotProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [localError, setLocalError] = useState<AuthResponseError | null>(null);
  const password = watch("password");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleReset = handleSubmit(async (data) => {
    try {
      if (
        typeof email === "string" &&
        typeof token === "string" &&
        typeof data.password === "string"
      ) {
        const formData = { password: data.password };
        const response = await resetPassword(email, formData, token);

        if (response.success) {
          setSuccessMessage("¡Contraseña actualizada con éxito!");
          setLocalError(null);
        }
      } else {
        throw new Error("Email o token inválido");
      }

      window.location.reload();
    } catch (error: any) {
      setLocalError({
        body: {
          error:
            error.response?.data?.message || "Ocurrió un error inesperado",
        },
      });
      console.error("Error al restablecer contraseña:", error);
    }
  });

  return (
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${mode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className={`card p-4 col-md-6 col-lg-5 ${mode ? 'bg-secondary text-light' : 'bg-white text-dark'}`}>
        <div className="text-center mb-4">
          <img src="/logo.webp" alt="logo" style={{ maxWidth: 100 }} />
          <h2 className="mt-3">Ingresa la contraseña</h2>
        </div>

        {localError && (
          <div className="alert alert-danger" role="alert">
            {localError.body.error}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Nueva contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
              className={`form-control ${errors.password ? "is-invalid" : ""} ${mode ? "bg-dark text-light border-light" : ""}`}
            />
            {errors.password?.message && (
              <div className="invalid-feedback">
                {errors.password.message.toString()}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Repite la contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Por favor confirma la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""} ${mode ? "bg-dark text-light border-light" : ""}`}
            />
            {errors.confirmPassword?.message && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message.toString()}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Cambiar contraseña
          </button>

          <div className="mt-3 text-center">
            <small className={`${mode ? "text-light" : "text-muted"}`}>
              ¿Ya tienes cuenta?{" "}
              <a href="/" className={`text-decoration-none ${mode ? "text-info" : "text-primary"}`}>
                Iniciar sesión
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
