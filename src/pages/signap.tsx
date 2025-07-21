import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authcontext';
import type { AuthContextType, AuthResponseError } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface SignupForm {
  mode: boolean;
}

export default function Signup({ mode }: SignupForm) {
  const { register, handleSubmit } = useForm();
  const { signup, error } = useAuth() as AuthContextType;
  const [localError, setLocalError] = useState<AuthResponseError | null>(null);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values);
      navigate('/login');
    } catch (error) {
      setLocalError({ body: { error: 'Error durante el registro' } });
      console.error("Error during signup", error);
    }
  });

  // Clases dinámicas para el contenedor
  const containerClass = mode ? 'bg-dark text-white' : 'bg-white text-dark';
  const inputClass = mode ? 'form-control bg-secondary text-white border-0' : 'form-control';
  const linkClass = mode ? 'link-light' : 'link-primary';

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className={`col-md-6 col-lg-5 shadow p-4 rounded ${containerClass}`}>
        <div className="text-center mb-4">
          <h2 className="mt-3">Registrarse</h2>
        </div>

        {localError && (
          <div className="alert alert-danger" role="alert">
            {localError.body.error}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error.body.error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Nombre</label>
            <input
              id="userName"
              type="text"
              autoComplete="name"
              {...register("userName", { required: true })}
              className={inputClass}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", { required: true })}
              className={inputClass}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
              className={inputClass}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Registrarme</button>

          <p className="text-center mt-4">
            ¿Ya tienes una cuenta? <a href="/login" className={linkClass}>Iniciar sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}
