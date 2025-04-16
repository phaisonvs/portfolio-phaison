import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/core/providers/ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full overflow-hidden relative"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -45,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Sun className="h-5 w-5 text-yellow-300" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 45 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Moon className="h-5 w-5 text-slate-400" />
        </motion.div>
      </div>

      {/* Efeito de ripple ao clicar */}
      <span className="absolute inset-0 rounded-full pointer-events-none bg-primary/10 opacity-0 peer-active:opacity-100 transition-opacity" />
    </Button>
  );
}
