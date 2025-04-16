import { useEffect, useState } from "react";
import { AppProviders } from "@/core/providers/AppProviders";
import { AppRouter } from "@/core/router/AppRouter";
import { LoadingScreen } from "@/components/LoadingScreen";
import "./App.css";

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
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
