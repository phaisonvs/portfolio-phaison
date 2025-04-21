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

const queryClient = new QueryClient();

// Wrapper component to handle route transitions with loading screen
// const RouteTransition = ({ children }: { children: React.ReactNode }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     // Show loading screen for 2 seconds on route change
//     setIsLoading(true);

//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [location.pathname]);

//   if (isLoading) {
//     return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
//   }

//   return <>{children}</>;
// };

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Always show loading screen for 5 seconds on initial load
    // Set dark mode by default
    document.documentElement.classList.add("dark");
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
            <Route path="/" element={<Index />} />
            <Route
              path="/projects"
              // element={
              //   <RouteTransition>
              //     <Projects />
              //   </RouteTransition>
              // }
              element={<Projects />}
            />
            <Route
              path="/projects/:id"
              // element={
              //   <RouteTransition>
              //     <ProjectDetail />
              //   </RouteTransition>
              // }
              element={<ProjectDetail />}
            />
            <Route
              path="/project/:id"
              // element={
              //   <RouteTransition>
              //     <ProjectSingle />
              //   </RouteTransition>
              // }
              element={<ProjectSingle />}
            />
            <Route
              path="/admin"
              // element={
              //   <RouteTransition>
              //     <Admin />
              //   </RouteTransition>
              // }
              element={<Admin />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
