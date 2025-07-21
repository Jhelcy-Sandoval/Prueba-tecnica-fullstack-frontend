import type { ReactNode } from 'react';

/** Usuario */
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'developer';
  avatar: string; // URL de la imagen
  createdAt: string;
}

/** Proyecto */
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  startDate: string; // ISO Date
  endDate: string;   // ISO Date
  managerId: string;
  developersIds: string[];
  createdAt: string;
}

/** Tarea */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  assignedTo: string;
  estimatedHours: number;
  actualHours: number;
  dueDate: string;     // ISO Date
  createdAt: string;
}

/** Subtarea (no especificado en PDF, puedes usarlo opcionalmente) */
export interface SubTask {
  id: string;
  name: string;
  done: boolean;
  taskId: string;
}

/** Comentario (opcional como feature extra) */
export interface Comment {
  authorId: string;
  message: string;
  date: string;
}

/** Respuesta al hacer login o registro */
export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

/** Error de autenticación */
export interface AuthResponseError {
  body: {
    error: string;
  };
}

/** Error genérico */
export interface ResponseError {
  message: string;
}

/** Contexto de autenticación para React */
export interface AuthContextType {
  signup: (userData: any) => Promise<void>;
  signin: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  isLogin: string;
  user: User | null;
  isAuthenticated: boolean;
  error: AuthResponseError | null;
}

/** Proveedor de autenticación */
export interface AuthProviderProps {
  children: ReactNode;
}
