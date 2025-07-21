import DefaultLayout from "../layout/default";
import { useEffect, useState } from "react";
import type { Project } from "../types/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ProjectsInterface {
  mode: boolean;
  email?: string;
}

export function ProjectsPage({ mode, email }: ProjectsInterface) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects([
      { id: "1", name: "Landing Page", description: "Diseño UI", status: "in_progress", priority: "medium", startDate: "2024-06-01", endDate: "2024-07-15", managerId: "123", developersIds: ["456"], createdAt: "2024-05-01" },
      { id: "2", name: "API REST", description: "Backend", status: "planning", priority: "high", startDate: "2024-07-10", endDate: "2024-08-10", managerId: "123", developersIds: ["456"], createdAt: "2024-06-01" },
      { id: "3", name: "Panel Admin", description: "Dashboard funcional", status: "completed", priority: "low", startDate: "2024-04-10", endDate: "2024-06-10", managerId: "123", developersIds: ["456"], createdAt: "2024-03-01" }
    ]);
  }, [email]);

  const statusData = [
    { name: "Planeación", value: projects.filter(p => p.status === "planning").length },
    { name: "En Progreso", value: projects.filter(p => p.status === "in_progress").length },
    { name: "Finalizados", value: projects.filter(p => p.status === "completed").length }
  ];

  const priorityData = [
    { name: "Alta", value: projects.filter(p => p.priority === "high").length },
    { name: "Media", value: projects.filter(p => p.priority === "medium").length },
    { name: "Baja", value: projects.filter(p => p.priority === "low").length }
  ];

  return (
    <DefaultLayout mode={mode}>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Proyectos</h1>

        <section className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Lista de Proyectos</h2>
          <ul className="divide-y">
            {projects.map(project => (
              <li key={project.id} className="py-2">
                <div className="font-semibold">{project.name}</div>
                <div className="text-sm text-gray-600">{project.description}</div>
                <div className="text-xs text-gray-500">
                  Estado: {project.status} | Prioridad: {project.priority}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-4">Estado de los Proyectos</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-4">Prioridades</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
