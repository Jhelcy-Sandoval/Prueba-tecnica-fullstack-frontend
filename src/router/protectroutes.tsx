import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext'
import type { AuthContextType } from '../types/types'

export default function ProtectedRoute () {
  const {isAuthenticated} = useAuth() as AuthContextType;

  return isAuthenticated ? <Outlet /> : <Navigate to= "/login" /> 
}