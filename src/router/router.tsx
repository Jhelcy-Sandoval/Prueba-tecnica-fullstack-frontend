import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "../pages/signap";
import {DashboardPage} from "../pages/dashboard";
import ProtectedRoute from "../router/protectroutes";
import { AuthProvider } from "../context/authcontext"; // sin .tsx
import {HomePage} from "../pages/home";
import Signin from "../pages/login";
import {ProjectsPage} from "../pages/projects";
// import UserP from "./pages/UserPage";
import Forgot from "../pages/forgot";
import ProtectForgot from "./protectforgot";
import PasswordReset from "../pages/passwordreset";

interface AppRouterProps {
  mode: boolean;
}

export default function AppRouter({ mode }: AppRouterProps) {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const onData = (newToken: string | null, email: string | undefined) => {
    setToken(newToken);
    setEmail(email);
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Signin mode={mode}/>,
    },
    {
      path: "/register",
      element: <Signup mode={mode}/>,
    },
    {
      path: "/forgot",
      element: <Forgot onData={onData} mode={mode}/>,
    },
    {
      path: "/reset",
      element: <ProtectForgot token={token} />,
      children: [
        {
          path: "password_reset",
          element: <PasswordReset token={token} email={email} mode={mode}/>,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "dashboard",
          element: <DashboardPage mode={mode} />,
        },
        {
          path: "home",
          element: <HomePage mode={mode} />,
        },
        {
          path: "projects",
          element: <ProjectsPage mode={mode} />,
        }
        // {
        //   path: "user",
        //   element: <UserP mode={mode} />,
        // },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
