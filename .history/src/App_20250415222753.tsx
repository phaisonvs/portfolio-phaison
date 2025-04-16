import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import ProjectSingle from "./pages/ProjectSingle";
import Admin from "./pages/Admin";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

// Wrapper component to handle route transitions with loading screen
const RouteTransition = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show loading screen for 2 seconds on route change
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen
          key="loading"
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");

    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5000); // 5 segundos de carregamento inicial

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {initialLoading ? (
            <LoadingScreen
              key="initial-loading"
              onLoadingComplete={() => setInitialLoading(false)}
            />
          ) : (
            <motion.div
              key="app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="page-content-wrapper"
            >
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Index />
                      </motion.div>
                    }
                  />
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
                  <Route
                    path="/admin"
                    element={
                      <RouteTransition>
                        <Admin />
                      </RouteTransition>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
