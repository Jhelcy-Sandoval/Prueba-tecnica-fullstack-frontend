import DefaultLayout from "../layout/default"
import { useEffect, useState } from "react";
import type { Project, Task, User } from "../types/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardInterface {
  mode: boolean;
  user: User;
}

export function DashboardPage ({ mode, user }: DashboardInterface) {

  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Aquí harías fetch desde tu backend
    setProjects([
      { id: "1", name: "Landing Page", description: "Diseño UI", status: "in_progress", priority: "medium", startDate: "2024-06-01", endDate: "2024-07-15", managerId: "123", developersIds: ["456"], createdAt: "2024-05-01" },
      { id: "2", name: "API REST", description: "Backend", status: "planning", priority: "high", startDate: "2024-07-10", endDate: "2024-08-10", managerId: "123", developersIds: ["456"], createdAt: "2024-06-01" }
    ]);

    setTasks([
      { id: "t1", title: "Diseñar navbar", description: "", status: "in_progress", priority: "medium", projectId: "1", assignedTo: user.id, estimatedHours: 5, actualHours: 2, dueDate: "2024-07-21", createdAt: "2024-07-01" },
      { id: "t2", title: "Setup MongoDB", description: "", status: "todo", priority: "high", projectId: "2", assignedTo: user.id, estimatedHours: 3, actualHours: 0, dueDate: "2024-07-25", createdAt: "2024-07-15" }
    ]);

    setNotifications([
      "Tarea 'Diseñar navbar' actualizada.",
      "Nuevo proyecto asignado: API REST"
    ]);
  }, [user.id]);

  const taskChartData = [
    { name: "Pendientes", value: tasks.filter(t => t.status === "todo").length },
    { name: "En Progreso", value: tasks.filter(t => t.status === "in_progress").length },
    { name: "Revisión", value: tasks.filter(t => t.status === "review").length },
    { name: "Completadas", value: tasks.filter(t => t.status === "done").length },
  ];

  return(
    <>
      <DefaultLayout mode={mode}> 
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">Bienvenido, {user.name}</h1>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="font-semibold text-lg mb-2">Proyectos Activos</h2>
              <ul className="list-disc pl-5 space-y-1">
                {projects.map(proj => (
                  <li key={proj.id}>{proj.name} - <span className="text-sm text-gray-500">{proj.status}</span></li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white shadow rounded col-span-1 md:col-span-2">
              <h2 className="font-semibold text-lg mb-2">Tareas Asignadas</h2>
              <ul className="divide-y">
                {tasks.map(task => (
                  <li key={task.id} className="py-2">
                    <strong>{task.title}</strong> <span className="text-sm text-gray-500">({task.status})</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-lg mb-4">Progreso de Tareas</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={taskChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold text-lg mb-2">Notificaciones Recientes</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {notifications.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </section>
        </div>
      </DefaultLayout>
    </>
  )
}
