
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthForm from "@/components/ui/auth-form";

const Login = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate("/");
  };
  
  return (
    <div className="min-h-screen">
      <AuthForm 
        onBackClick={handleGoBack} 
        defaultEmail="admin@example.com"
        defaultPassword="admin123"
      />
    </div>
  );
};

export default Login;
