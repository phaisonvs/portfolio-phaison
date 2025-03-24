
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm from "@/components/ui/auth-form";

interface LoginProps {
  onLogin?: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate("/");
  };
  
  const handleLogin = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "admin123") {
      if (onLogin) {
        onLogin();
      }
      navigate("/admin");
    }
  };
  
  // Verifica se já está autenticado
  if (localStorage.getItem("isAuthenticated") === "true") {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <div className="min-h-screen">
      <AuthForm 
        onBackClick={handleGoBack} 
        onLogin={handleLogin}
        defaultEmail="admin@example.com"
        defaultPassword="admin123"
      />
    </div>
  );
};

export default Login;
