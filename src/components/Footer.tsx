import { Fingerprint } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-black/5 dark:border-white/5 relative z-10 bg-zinc-50 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6 opacity-80">
          <Fingerprint className="text-zinc-500 w-5 h-5" />
          <span className="font-bold tracking-tight text-zinc-900 dark:text-zinc-300">
            CNPJ<span className="text-indigo-600 dark:text-indigo-400">Alfa</span>
          </span>
        </div>
        
        <p className="text-zinc-500 text-sm max-w-xl text-center leading-relaxed">
          Este é um guia não oficial criado para ajudar a comunidade de desenvolvedores 
          brasileiros na transição para o novo formato de CNPJ Alfanumérico, utilizando a mais alta conversão 
          de tabela ASCII.
        </p>
        
        <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5 w-full flex justify-center">
          <p className="text-zinc-600 dark:text-zinc-600 text-xs text-center font-mono">
            &copy; {new Date().getFullYear()} CNPJ Alfa Explorer. Feito para a Comunidade de Desenvolvedores.
          </p>
        </div>
      </div>
    </footer>
  );
}
