
import React from "react";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { StatsCard } from "@/components/admin/StatsCard";
import { Eye, Layers, Users, Calendar, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { projects } from "@/data/projects";

// Sample data for charts
const viewsData = [
  { name: "Jan", views: 120 },
  { name: "Fev", views: 150 },
  { name: "Mar", views: 180 },
  { name: "Abr", views: 170 },
  { name: "Mai", views: 200 },
  { name: "Jun", views: 250 },
  { name: "Jul", views: 280 },
];

const AdminDashboard = () => {
  const totalViews = projects.reduce((sum, project) => sum + project.views, 0);
  const visibleProjects = projects.filter(p => p.visible).length;
  
  return (
    <div>
      <ScrollAnimator>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      </ScrollAnimator>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ScrollAnimator>
          <StatsCard
            title="Total de Visualizações"
            value={totalViews}
            change={12.5}
            icon={Eye}
            color="blue"
          />
        </ScrollAnimator>
        
        <ScrollAnimator delay={100}>
          <StatsCard
            title="Projetos Visíveis"
            value={visibleProjects}
            change={0}
            icon={Layers}
            color="green"
          />
        </ScrollAnimator>
        
        <ScrollAnimator delay={200}>
          <StatsCard
            title="Visitantes Únicos"
            value={856}
            change={5.4}
            icon={Users}
            color="yellow"
          />
        </ScrollAnimator>
        
        <ScrollAnimator delay={300}>
          <StatsCard
            title="Tempo Médio de Sessão"
            value="2m 24s"
            change={-3.2}
            icon={Calendar}
            color="purple"
          />
        </ScrollAnimator>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ScrollAnimator>
          <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">Visualizações por Mês</h3>
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <BarChart2 className="h-5 w-5" />
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px'
                    }}
                  />
                  <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollAnimator>
        
        <ScrollAnimator delay={100}>
          <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">Projetos Mais Visualizados</h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Ver todos
              </button>
            </div>
            <div className="space-y-4">
              {projects
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((project, index) => (
                  <div key={project.id} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      index === 0 
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" 
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {project.views} visualizações
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      project.visible 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                      {project.visible ? "Visível" : "Oculto"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
      
      {/* Recent Activity */}
      <ScrollAnimator>
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">Atividade Recente</h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Ver tudo
            </button>
          </div>
          <div className="space-y-4">
            {[
              { activity: "Projeto 'Color Generator' editado", time: "2 horas atrás" },
              { activity: "Novo projeto 'Portfolio v2' adicionado", time: "1 dia atrás" },
              { activity: "Projeto 'Task Management App' ocultado", time: "3 dias atrás" },
              { activity: "Atualização de configurações do site", time: "1 semana atrás" },
            ].map((item, index) => (
              <div key={index} className="flex items-start py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 dark:bg-blue-400 mr-3"></div>
                <div className="flex-grow">
                  <div className="font-medium">{item.activity}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimator>
    </div>
  );
};

export default AdminDashboard;
