
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import ProjectSingle from "./pages/ProjectSingle";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated when app loads
    const authStatus = localStorage.getItem("adminAuth");
    setIsAuthenticated(authStatus === "true");
    
    // Always show loading screen for 5 seconds
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  // Function to protect admin routes
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            {/* New modern project route */}
            <Route path="/project/:id" element={<ProjectSingle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminLayout setIsAuthenticated={setIsAuthenticated} />
                </RequireAuth>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
