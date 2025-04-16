import { createContext, useContext, ReactNode } from "react";
import { useTheme } from "@/hooks/useTheme";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setThemeMode: (theme: Theme) => void;
}

// Cria o contexto de tema
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto de tema
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext deve ser usado dentro de um ThemeProvider"
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

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};
