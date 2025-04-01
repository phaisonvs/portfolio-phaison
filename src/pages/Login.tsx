
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm from "@/components/ui/auth-form";

const Login = () => {
  // Verificar se o usuário já está autenticado
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";
  const navigate = useNavigate();

  // Se estiver autenticado, redirecionar para o dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen">
      <AuthForm />
    </div>
  );
};

export default Login;
