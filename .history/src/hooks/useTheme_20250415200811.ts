import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Executado apenas no lado do cliente
    if (typeof window !== "undefined") {
      // Verifica se há um tema salvo no localStorage
      const savedTheme = localStorage.getItem("theme") as Theme | null;

      // Se houver um tema salvo, usa-o
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }

      // Caso contrário, usa o tema do sistema
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    // Fallback para SSR
    return "dark";
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
    if (typeof window === "undefined") return;

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

  // Escuta por mudanças na preferência de tema do sistema
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Só escuta mudanças se não houver um tema salvo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Adiciona o listener
    mediaQuery.addEventListener("change", handleChange);

    // Remove o listener ao desmontar o componente
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return { theme, toggleTheme, setThemeMode };
};
