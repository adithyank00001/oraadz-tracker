import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "../contexts/ThemeContext";
import { smoothTransition } from "../lib/animations";

export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={smoothTransition}
    >
      <motion.div
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 0.8 : 1,
        }}
        transition={smoothTransition}
      >
        <Sun className="h-4 w-4 text-muted-foreground" />
      </motion.div>
      <motion.div whileTap={{ scale: 0.95 }} transition={smoothTransition}>
        <Switch
          checked={isDark}
          onCheckedChange={toggleTheme}
          aria-label="Toggle theme"
        />
      </motion.div>
      <motion.div
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0.8,
        }}
        transition={smoothTransition}
      >
        <Moon className="h-4 w-4 text-muted-foreground" />
      </motion.div>
    </motion.div>
  );
}
