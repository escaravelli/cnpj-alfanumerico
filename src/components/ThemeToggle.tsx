import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center text-zinc-400 hover:text-white"
      title="Alternar Tema"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500" />
      )}
    </button>
  )
}
