import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useTheme } from "@/hooks/useTheme";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (theme: Theme) => void;
  isLoaded: boolean;
}

// Valor padrão para o contexto
const defaultThemeContext: ThemeContextType = {
  theme: "dark",
  toggleTheme: () => {},
  setThemeMode: () => {},
  isLoaded: false,
};

// Cria o contexto de tema
const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

// Hook personalizado para acessar o contexto de tema
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === defaultThemeContext) {
    console.warn(
      "useThemeContext foi chamado fora de um ThemeProvider. Usando valores padrão."
    );
  }

  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

// Provedor de tema
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeValues = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  // Marca o tema como carregado após a montagem
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ThemeContext.Provider value={{ ...themeValues, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};
