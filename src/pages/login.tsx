import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import type { AuthContextType, AuthResponseError } from '../types/types';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

interface SigninForm {
  mode: boolean;
}

export default function Signin({ mode }: SigninForm) {
  const { register, handleSubmit } = useForm();
  const { signin, isAuthenticated, error } = useAuth() as AuthContextType;
  const [localError, setLocalError] = useState<AuthResponseError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signin(values);
    } catch (error) {
      setLocalError({ body: { error: 'Error durante el inicio de sesión' } });
      console.error("Error during signin", error);
    }
  });

  return (
    <div
      className={`container d-flex align-items-center justify-content-center min-vh-100 ${
        mode ? 'bg-black text-white' : 'bg-light'
      }`}
    >
      <div className={`col-md-6 col-lg-5 shadow p-4 rounded ${mode ? 'bg-dark text-white' : 'bg-white'}`}>
        <div className="text-center mb-4">
          <h2 className="mt-3">Iniciar sesión</h2>
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
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email', { required: true })}
              className={`form-control ${mode ? 'bg-secondary text-white border-0' : ''}`}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label d-flex justify-content-between">
              <span>Contraseña</span>
              <a href="/forgot" className="link-primary small">¿Olvidaste la contraseña?</a>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password', { required: true })}
              className={`form-control ${mode ? 'bg-secondary text-white border-0' : ''}`}
            />
          </div>

          <button
            type="submit"
            className={`btn ${mode ? 'btn-outline-light' : 'btn-primary'} w-100`}
          >
            Ingresar
          </button>

          <p className={`text-center mt-4 ${mode ? 'text-light' : 'text-muted'}`}>
            ¿No tienes cuenta? <a href="/register" className="link-primary">Regístrate</a>
          </p>
        </form>
      </div>
    </div>
  );
}
