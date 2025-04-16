import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { applyViewTransitionStyles } from "@/utils/viewTransition";
import { LoadingScreen } from "./LoadingScreen";

interface ViewTransitionProps {
  children: React.ReactNode;
}

export const ViewTransition: React.FC<ViewTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Aplica os estilos de transição ao montar o componente
  useEffect(() => {
    applyViewTransitionStyles();
  }, []);

  // Gerencia as transições de página quando a rota muda
  useEffect(() => {
    // Reset the loading state when location changes
    setIsLoading(true);

    // Show loading screen for 2 seconds on route change
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Configure browser back/forward navigation to use transitions
    const handlePopState = () => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          // This is handled by React Router automatically
        });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);

  // Intercepta e modifica links para usar a View Transition API
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Verificar se o elemento clicado é um link
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      // Verificar se é um link interno e não tem modificadores (ctrl, alt, etc)
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return;
      }

      // Prevenir comportamento padrão
      e.preventDefault();

      // Usar View Transition API para navegação
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate(href);
        });
      } else {
        navigate(href);
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [navigate]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
};
