
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  setIsAuthenticated: (value: boolean) => void;
}

export function AdminLayout({ setIsAuthenticated }: AdminLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    // Remover autenticação
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    
    // Mostrar mensagem de sucesso
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado do painel administrativo.",
    });
    
    // Redirecionar para login
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <AdminHeader 
        isCollapsed={isSidebarCollapsed} 
        onLogout={handleLogout}
      />
      <main
        className={`transition-all duration-300 pt-16 min-h-screen ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
