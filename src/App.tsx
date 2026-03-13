import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Validator } from "./components/Validator"
import { CodeExplorer } from "./components/CodeExplorer"
import { Footer } from "./components/Footer"
import "./index.css"

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Background Design */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
        {/* Grid overlay animado */}
        <div className="absolute inset-0 bg-grid-premium" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bgBase to-transparent pointer-events-none" />
      </div>

      <Navbar />
      <Hero />
      <Validator />
      <CodeExplorer />
      <Footer />
    </div>
  )
}

export default App
