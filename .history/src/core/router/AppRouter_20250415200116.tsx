import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppLayout } from "@/core/layout/AppLayout";
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
    // Mostra a tela de carregamento por menos tempo (1 segundo) na mudança de rota
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
};

// Componente para aplicar o layout em páginas específicas
const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary>
      <AppLayout>{children}</AppLayout>
    </ErrorBoundary>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <Index />
            </LayoutWrapper>
          }
        />
        <Route
          path="/projects"
          element={
            <LayoutWrapper>
              <RouteTransition>
                <Projects />
              </RouteTransition>
            </LayoutWrapper>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <LayoutWrapper>
              <RouteTransition>
                <ProjectDetail />
              </RouteTransition>
            </LayoutWrapper>
          }
        />
        <Route
          path="/project/:id"
          element={
            <LayoutWrapper>
              <RouteTransition>
                <ProjectSingle />
              </RouteTransition>
            </LayoutWrapper>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
