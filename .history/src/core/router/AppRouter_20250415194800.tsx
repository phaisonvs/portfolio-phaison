import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import ProjectSingle from "@/pages/ProjectSingle";
import NotFound from "@/pages/NotFound";

// Componente para gerenciar transições entre rotas
const RouteTransition = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Mostra a tela de carregamento por 2 segundos na mudança de rota
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/projects"
          element={
            <RouteTransition>
              <Projects />
            </RouteTransition>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <RouteTransition>
              <ProjectDetail />
            </RouteTransition>
          }
        />
        <Route
          path="/project/:id"
          element={
            <RouteTransition>
              <ProjectSingle />
            </RouteTransition>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
