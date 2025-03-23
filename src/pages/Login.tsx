
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/ui/auth-form';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar se o usuário já está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  return <AuthForm />;
};

export default Login;
