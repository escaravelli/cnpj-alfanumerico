import { Fingerprint, Github } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-zinc-950/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Fingerprint className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CNPJ<span className="text-indigo-400">Alfa</span>
          </span>
        </div>
        
        <div className="hidden md:flex space-x-1 p-1 bg-white/5 rounded-full border border-white/10">
          <a href="#testador" className="px-5 py-2 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition">Testador Real</a>
          <a href="#codigos" className="px-5 py-2 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition">Snippets</a>
          <a href="#como-implementar" className="px-5 py-2 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition">Documentação Explicativa</a>
        </div>
        
        <a href="https://github.com/escaravelli/cnpj-alfanumerico" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 text-zinc-400 hover:text-white transition group">
          <span className="text-sm font-medium group-hover:text-white transition">Github</span>
          <Github className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
}
