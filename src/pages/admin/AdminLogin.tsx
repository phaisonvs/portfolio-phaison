
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ setIsAuthenticated }) => {
  const [username] = useState("Phaison");
  const [password] = useState("31992031320");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login
    setTimeout(() => {
      // Armazenar o status de autenticação
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      
      // Mostrar mensagem de sucesso
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo.",
      });
      
      // Redirecionar para o dashboard
      navigate("/admin");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen flex flex-col justify-center items-center p-4 text-zinc-800 dark:text-zinc-200">
      <Button 
        variant="outline" 
        className="absolute top-4 left-4 flex items-center gap-2"
        onClick={() => navigate("/")}
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-800"
      >
        <div className="mb-6 flex justify-center">
          <img
            src="/lovable-uploads/1d1a30fb-6f2d-4525-94d3-9dd652079284.png"
            alt="Logo"
            className="h-14 w-14 rounded-full object-cover border-2 border-blue-500"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Login Administrativo</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Acesse o painel de gerenciamento
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              readOnly
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 
                bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200
                cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              readOnly
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 
                bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200
                cursor-not-allowed"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Entrando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Entrar
              </span>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Estas são credenciais de desenvolvimento.</p>
          <p>Não utilize em ambiente de produção.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
