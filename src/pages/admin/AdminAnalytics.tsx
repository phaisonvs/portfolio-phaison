
import React from "react";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for charts
const monthlyData = [
  { name: "Jan", views: 4000, visitors: 2400 },
  { name: "Fev", views: 3000, visitors: 1398 },
  { name: "Mar", views: 2000, visitors: 9800 },
  { name: "Abr", views: 2780, visitors: 3908 },
  { name: "Mai", views: 1890, visitors: 4800 },
  { name: "Jun", views: 2390, visitors: 3800 },
  { name: "Jul", views: 3490, visitors: 4300 },
];

const trafficSourceData = [
  { name: "Direto", value: 400 },
  { name: "Social", value: 300 },
  { name: "Referência", value: 300 },
  { name: "Pesquisa", value: 200 },
];

const deviceData = [
  { name: "Desktop", value: 580 },
  { name: "Mobile", value: 380 },
  { name: "Tablet", value: 120 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminAnalytics = () => {
  return (
    <div>
      <ScrollAnimator>
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      </ScrollAnimator>
      
      {/* Basic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Visualizações", value: "12,456", change: "+12.5%" },
          { label: "Visitantes", value: "5,328", change: "+8.3%" },
          { label: "Projetos Vistos", value: "843", change: "+15.2%" },
          { label: "Tempo Médio", value: "2m 24s", change: "-3.1%" },
        ].map((stat, index) => (
          <ScrollAnimator key={index} delay={index * 100}>
            <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{stat.label}</h3>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className={`text-sm ${
                stat.change.startsWith("+") 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              }`}>
                {stat.change} desde o último mês
              </div>
            </div>
          </ScrollAnimator>
        ))}
      </div>
      
      {/* Main Chart */}
      <ScrollAnimator className="mb-8">
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">Visualizações e Visitantes</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Visualizações</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Visitantes</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area type="monotone" dataKey="views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="visitors" stroke="#14b8a6" fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ScrollAnimator>
      
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ScrollAnimator>
          <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
            <h3 className="font-medium mb-6">Fontes de Tráfego</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollAnimator>
        
        <ScrollAnimator delay={100}>
          <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
            <h3 className="font-medium mb-6">Dispositivos</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollAnimator>
      </div>
      
      {/* Performance Table */}
      <ScrollAnimator>
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-all">
          <h3 className="font-medium mb-6">Desempenho por Página</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/30 text-left">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Página</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Visualizações</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Tempo Médio</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Taxa de Rejeição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { page: "Página inicial", views: 4256, time: "2m 12s", bounceRate: "32%" },
                  { page: "Projetos", views: 3841, time: "1m 56s", bounceRate: "28%" },
                  { page: "ReplidShop (projeto)", views: 1256, time: "3m 44s", bounceRate: "18%" },
                  { page: "Color Generator (projeto)", views: 987, time: "2m 38s", bounceRate: "22%" },
                  { page: "Contato", views: 756, time: "1m 10s", bounceRate: "45%" },
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.page}</td>
                    <td className="px-6 py-4">{item.views}</td>
                    <td className="px-6 py-4">{item.time}</td>
                    <td className="px-6 py-4">{item.bounceRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollAnimator>
    </div>
  );
};

export default AdminAnalytics;
