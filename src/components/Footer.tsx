import { Fingerprint } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Fingerprint className="text-indigo-500 w-6 h-6" />
          <span className="text-lg font-bold text-white">
            CNPJ<span className="text-indigo-400">Alfa</span>
          </span>
        </div>
        <p className="text-zinc-500 text-sm mb-4">
          Criado para facilitar a vida nos sistemas legados e infraestruturas modernas brasileiras.
        </p>
        <p className="text-zinc-600 text-xs tracking-wider">
          ESTÉTICA & UX: ENABLED &bull; OPEN SOURCE
        </p>
      </div>
    </footer>
  );
}
