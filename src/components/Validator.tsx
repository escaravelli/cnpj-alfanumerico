import { useState, useCallback } from "react";
import { Terminal, ShieldCheck, ShieldAlert, Sparkles, AlertTriangle, ShieldX } from "lucide-react";

function calculaCnpjDv(cnpj: string): string {
  const limpo = cnpj.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (limpo.length < 12) throw new Error("CNPJ inválido (tamanho incorreto)");
  
  const cnpjBase = limpo.substring(0, 12);
  const pesosDV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let somatorioDV1 = 0, somatorioDV2 = 0;
  
  for (let i = 0; i < 12; i++) {
    const asciiDigito = cnpjBase.charCodeAt(i) - 48;
    somatorioDV1 += asciiDigito * pesosDV[i + 1];
    somatorioDV2 += asciiDigito * pesosDV[i];
  }
  
  const restoDV1 = somatorioDV1 % 11;
  const dv1 = restoDV1 < 2 ? 0 : 11 - restoDV1;
  
  somatorioDV2 += dv1 * pesosDV[12];
  const restoDV2 = somatorioDV2 % 11;
  const dv2 = restoDV2 < 2 ? 0 : 11 - restoDV2;
  
  return `${dv1}${dv2}`;
}

export function Validator() {
  const [cnpj, setCnpj] = useState("");
  const [badgeProps, setBadgeProps] = useState<{
    visible: boolean;
    title: string;
    desc: React.ReactNode;
    color: string;
    icon: React.ElementType;
  } | null>(null);

  const handleInput = useCallback((val: string) => {
    const limpo = val.replace(/[^A-Za-z0-9]/gi, '').toUpperCase();
    setCnpj(limpo);

    if (limpo.length === 0) {
      setBadgeProps(null);
      return;
    }

    if (limpo.length === 12) {
      try {
        const dv = calculaCnpjDv(limpo);
        setBadgeProps({
          visible: true,
          title: 'Dígito gerado automaticamente',
          desc: <><span className="text-white">{limpo}</span>-{dv}</>,
          color: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
          icon: Sparkles
        });
      } catch (e) { }
    } else if (limpo.length === 14) {
      if (limpo.substring(0, 12) === "000000000000") {
        setBadgeProps({
          visible: true,
          title: 'Erro Detectado',
          desc: 'CNPJ Zerado ou Inválido',
          color: 'bg-red-500/10 border-red-500/30 text-red-500',
          icon: ShieldAlert
        });
        return;
      }
      try {
        const dvEsperado = calculaCnpjDv(limpo.substring(0, 12));
        if (dvEsperado === limpo.substring(12, 14)) {
          setBadgeProps({
            visible: true,
            title: 'Validação Perfeita',
            desc: 'O CNPJ Alfanumérico está Válido!',
            color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
            icon: ShieldCheck
          });
          if (navigator.vibrate) navigator.vibrate(50);
        } else {
          setBadgeProps({
            visible: true,
            title: 'Erro no DV',
            desc: `Inválido. O final correto seria -${dvEsperado}`,
            color: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
            icon: ShieldX
          });
        }
      } catch (err) {
        setBadgeProps({
          visible: true,
          title: 'Erro de Sintaxe',
          desc: 'Verifique a digitação',
          color: 'bg-red-500/10 border-red-500/30 text-red-500',
          icon: AlertTriangle
        });
      }
    } else {
      setBadgeProps(null);
    }
  }, []);

  return (
    <section id="testador" className="py-24 relative z-10 border-t border-white/5 bg-zinc-950/20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Validador em <span className="text-indigo-400">Tempo Real</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Experimente a nova lógica. O algoritmo está rodando direto no seu navegador em TypeScript React moderno.
          </p>
        </div>

        <div className="glass-card p-1">
          <div className="bg-zinc-900/50 rounded-[1.4rem] p-8 md:p-12 min-h-[300px]">
            <div className="relative max-w-2xl mx-auto">
              <label className="block text-sm font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                Digite o CNPJ
              </label>
              <div className="relative flex items-center">
                <Terminal className="absolute left-5 text-zinc-500 w-5 h-5" />
                <input
                  type="text"
                  value={cnpj}
                  onChange={(e) => handleInput(e.target.value)}
                  className="glass-input w-full pl-14 pr-6 py-5 rounded-xl text-center uppercase tracking-[0.2em] font-bold"
                  placeholder="ex: 1A2B3C4D00E190"
                  maxLength={18}
                  autoComplete="off"
                />
              </div>

              {/* Status Badge */}
              <div
                className={`mt-8 flex items-center justify-center transition-all duration-300 ${
                  badgeProps ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {badgeProps && (
                  <div className={`flex items-center gap-4 px-6 py-4 rounded-xl border ${badgeProps.color} shadow-lg backdrop-blur-sm`}>
                    <badgeProps.icon className="w-6 h-6" />
                    <div className="text-left filter drop-shadow">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">{badgeProps.title}</p>
                      <p className="font-medium text-lg leading-tight mt-0.5">{badgeProps.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
