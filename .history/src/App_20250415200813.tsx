import { useEffect, useState } from "react";
import { AppProviders } from "@/core/providers/AppProviders";
import { AppRouter } from "@/core/router/AppRouter";
import { LoadingScreen } from "@/components/LoadingScreen";
import "./App.css";

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  // Configura o tema inicial com base nas preferências do localStorage ou sistema
  useEffect(() => {
    // Encontra o tema armazenado ou usa as preferências do sistema
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Define o tema inicial
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else if (savedTheme === "dark" || systemPrefersDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }

    // Mostra a tela de carregamento por 5 segundos no carregamento inicial
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingScreen onLoadingComplete={() => setInitialLoading(false)} />;
  }

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
