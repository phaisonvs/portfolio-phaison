import { useThemeContext } from "@/core/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme, isLoaded } = useThemeContext();
  const isDarkTheme = theme === "dark";

  // Não renderiza nada até que o tema seja carregado para evitar flickering
  if (!isLoaded) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        isDarkTheme ? "Mudar para tema claro" : "Mudar para tema escuro"
      }
      className="overflow-hidden relative w-10 h-10 rounded-full"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isDarkTheme ? 1 : 0,
          opacity: isDarkTheme ? 1 : 0,
          rotate: isDarkTheme ? 0 : 90,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: !isDarkTheme ? 1 : 0,
          opacity: !isDarkTheme ? 1 : 0,
          rotate: !isDarkTheme ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-500" />
      </motion.div>

      <span className="sr-only">
        {isDarkTheme ? "Mudar para tema claro" : "Mudar para tema escuro"}
      </span>
    </Button>
  );
}
