import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  ArrowLeft,
  LineChart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  title: string;
  status: "draft" | "published";
  createdAt: string;
  views: number;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "posts" | "settings"
  >("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Como implementar um design system em React",
      status: "published",
      createdAt: "2023-07-15",
      views: 1243,
    },
    {
      id: 2,
      title: "Otimizando performance em aplicações React",
      status: "published",
      createdAt: "2023-08-02",
      views: 856,
    },
    {
      id: 3,
      title: "Melhores práticas para acessibilidade web",
      status: "draft",
      createdAt: "2023-08-10",
      views: 0,
    },
  ]);

  useEffect(() => {
    // Check if user is already authenticated via localStorage
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for demo
    if (email === "admin@example.com" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
    } else {
      alert("Credenciais inválidas. Use admin@example.com / admin123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const deletePost = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta postagem?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const changePostStatus = (id: number, newStatus: "draft" | "published") => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, status: newStatus } : post
      )
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-20 bg-gray-950">
          <div className="max-w-md w-full p-8 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Acesso ao Painel Admin
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full p-3 bg-gray-800/70 border border-gray-700 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-gray-800/70 border border-gray-700 rounded-md text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
              >
                Entrar
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow pt-24 pb-16 bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-emerald-600 text-white"
                    : "text-gray-300 hover:bg-gray-800/60"
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("posts")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "posts"
                    ? "bg-emerald-600 text-white"
                    : "text-gray-300 hover:bg-gray-800/60"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span>Postagens</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "settings"
                    ? "bg-emerald-600 text-white"
                    : "text-gray-300 hover:bg-gray-800/60"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </button>

              <Separator className="my-4 bg-gray-700/50" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800/60 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Sair</span>
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700/30 p-6">
              {activeTab === "dashboard" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-white">
                    Dashboard
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Total de Visitas
                        </h3>
                        <Users className="h-6 w-6 text-emerald-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">2,543</p>
                      <p className="text-sm text-emerald-400 mt-2">
                        +12% este mês
                      </p>
                    </div>

                    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Postagens
                        </h3>
                        <FileText className="h-6 w-6 text-blue-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">
                        {posts.length}
                      </p>
                      <p className="text-sm text-blue-400 mt-2">
                        {posts.filter((p) => p.status === "published").length}{" "}
                        publicadas
                      </p>
                    </div>

                    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-200">
                          Taxa de Conversão
                        </h3>
                        <LineChart className="h-6 w-6 text-purple-400" />
                      </div>
                      <p className="text-3xl font-bold text-white">3.2%</p>
                      <p className="text-sm text-purple-400 mt-2">
                        +0.8% este mês
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                    <h3 className="text-lg font-medium text-gray-200 mb-4">
                      Visualizações Recentes
                    </h3>
                    <div className="h-60 w-full flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                      <p className="text-gray-400">
                        Gráfico de visualizações por dia
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "posts" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                      Gerenciar Postagens
                    </h2>
                    <Button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700">
                      <PlusCircle className="h-4 w-4" />
                      <span>Nova Postagem</span>
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">
                            Título
                          </th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">
                            Data
                          </th>
                          <th className="text-left py-3 px-4 text-gray-300 font-medium">
                            Views
                          </th>
                          <th className="text-right py-3 px-4 text-gray-300 font-medium">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr
                            key={post.id}
                            className="border-b border-gray-800/40"
                          >
                            <td className="py-3 px-4 text-white">
                              {post.title}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block py-1 px-3 rounded-full text-xs font-medium ${
                                  post.status === "published"
                                    ? "bg-emerald-900/40 text-emerald-400"
                                    : "bg-yellow-900/40 text-yellow-400"
                                }`}
                              >
                                {post.status === "published"
                                  ? "Publicado"
                                  : "Rascunho"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {post.createdAt}
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {post.views}
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                className="p-1 text-gray-400 hover:text-white transition-colors"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                className="p-1 text-gray-400 hover:text-white transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              {post.status === "published" ? (
                                <button
                                  className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
                                  title="Despublicar"
                                  onClick={() =>
                                    changePostStatus(post.id, "draft")
                                  }
                                >
                                  <FileText className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  className="p-1 text-gray-400 hover:text-emerald-400 transition-colors"
                                  title="Publicar"
                                  onClick={() =>
                                    changePostStatus(post.id, "published")
                                  }
                                >
                                  <FileText className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                title="Excluir"
                                onClick={() => deletePost(post.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-white">
                    Configurações
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <h3 className="text-lg font-medium text-gray-200 mb-4">
                        Configurações Gerais
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Nome do Site
                          </label>
                          <input
                            type="text"
                            defaultValue="Meu Portfolio"
                            className="w-full p-3 bg-gray-800/70 border border-gray-700 rounded-md text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email de Contato
                          </label>
                          <input
                            type="email"
                            defaultValue="contato@exemplo.com"
                            className="w-full p-3 bg-gray-800/70 border border-gray-700 rounded-md text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <h3 className="text-lg font-medium text-gray-200 mb-4">
                        Segurança
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Nova Senha
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 bg-gray-800/70 border border-gray-700 rounded-md text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Confirmar Nova Senha
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 bg-gray-800/70 border border-gray-700 rounded-md text-white"
                          />
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          Salvar Alterações
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
