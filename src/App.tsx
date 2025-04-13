
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import ProjectSingle from "./pages/ProjectSingle";

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
  
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
    
    // Initial loading screen for 2 seconds
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingScreen onLoadingComplete={() => setInitialLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <RouteTransition>
                <Index />
              </RouteTransition>
            } />
            <Route path="/projects" element={
              <RouteTransition>
                <Projects />
              </RouteTransition>
            } />
            <Route path="/projects/:id" element={
              <RouteTransition>
                <ProjectDetail />
              </RouteTransition>
            } />
            <Route path="/project/:id" element={
              <RouteTransition>
                <ProjectSingle />
              </RouteTransition>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
