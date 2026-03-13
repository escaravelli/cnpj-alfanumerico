import { Code2, Hash, Calculator, ShieldCheck, Download, Fingerprint, ExternalLink, MessageCircleWarning } from "lucide-react";

export function Hero() {
  return (
    <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-4xl mx-auto animate-slide-up">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Atualizado pela Receita Federal
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          O Guia Definitivo do <br />
          <span className="gradient-text">CNPJ Alfanumérico</span>
        </h1>
        
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Descubra a nova lógica matemática de conversão de caracteres, adapte seus formulários legados e copie snippets otimizados para mais de 15 linguagens.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#codigos" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-[1.02]">
            <Code2 className="w-5 h-5" />
            Ver Códigos Prontos
          </a>
          <a href="#testador" className="w-full sm:w-auto px-8 py-4 rounded-xl btn-glow font-medium flex items-center justify-center gap-2">
            <Fingerprint className="w-5 h-5" />
            Testar Validador Real
          </a>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
          <a 
            href="https://servicos.receitafederal.gov.br/servico/cnpj-alfa/simular" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition"
          >
            <ExternalLink className="w-4 h-4" />
            Simulador Oficial da Receita Federal
          </a>
          
          <a 
            href="https://github.com/escaravelli/cnpj-alfanumerico/issues/new" 
            target="_blank"
            rel="noreferrer" 
            className="flex items-center gap-2 text-zinc-400 hover:text-rose-400 transition"
          >
            <MessageCircleWarning className="w-4 h-4" />
            Reportar Bug ou Dar Sugestão
          </a>
        </div>
      </div>

      {/* Concept Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mt-32">
        <div className="glass-card p-8 animate-slide-up delay-100 group">
          <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-500">
            <Hash />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Letras na Raiz</h3>
          <p className="text-zinc-400 leading-relaxed">As 12 primeiras posições (8 da raiz e 4 da filial) agora permitem letras (A-Z) e números. Apenas o DV (2 dígitos finais) continua 100% numérico.</p>
        </div>
        <div className="glass-card p-8 animate-slide-up delay-200 group">
          <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500/10 transition-all duration-500">
            <Calculator />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Módulo 11 (Tabela ASCII)</h3>
          <p className="text-zinc-400 leading-relaxed">A validação usa os mesmos pesos clássicos, mas o multiplicador de cada letra é o seu valor na Tabela ASCII subtraído de 48.</p>
        </div>
        <div className="glass-card p-8 animate-slide-up delay-300 group">
          <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500">
            <ShieldCheck />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">100% Retrocompatível</h3>
          <p className="text-zinc-400 leading-relaxed">A avaliação Tabela ASCII - 48 garante compatibilidade para os números. Se o dígito for '0' (ASCII 48), calcula-se 48-48 = 0. A lógica antiga não quebra.</p>
        </div>
      </div>
    </main>
  )
}
