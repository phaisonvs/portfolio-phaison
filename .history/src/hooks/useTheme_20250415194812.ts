import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    // Se houver um tema salvo, usa-o; caso contrário, usa o tema do sistema ou "dark" como padrão
    return (
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  // Função para alternar entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  // Função para definir um tema específico
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  // Aplica o tema ao documento HTML quando ele mudar
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Salva o tema no localStorage para persistência
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme, setThemeMode };
};
