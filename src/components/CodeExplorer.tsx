import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-php";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-sql";
import { Download } from "lucide-react";

// Lista atualizada com as categorias de banco de dados para documentação
const TABS = [
  { id: "lang-ts", name: "TypeScript", file: "cnpj.ts", lang: "typescript" },
  { id: "lang-js", name: "JavaScript", file: "cnpj.js", lang: "javascript" },
  { id: "lang-python", name: "Python", file: "cnpj.py", lang: "python" },
  { id: "lang-php", name: "PHP", file: "cnpj.php", lang: "php" },
  { id: "lang-java", name: "Java", file: "CNPJ.java", lang: "java" },
  { id: "lang-csharp", name: "C#", file: "CNPJ.cs", lang: "csharp" },
  { id: "lang-go", name: "Go", file: "cnpj.go", lang: "go" },
  { id: "lang-rust", name: "Rust", file: "cnpj.rs", lang: "rust" },
  { id: "lang-ruby", name: "Ruby", file: "cnpj.rb", lang: "ruby" },
];

const DB_TABS = [
  { id: "db-postgres", name: "PostgreSQL", file: "postgres.sql", lang: "sql" },
  { id: "db-mysql", name: "MySQL", file: "mysql.sql", lang: "sql" },
  { id: "db-sqlserver", name: "SQL Server", file: "sqlserver.sql", lang: "sql" },
  { id: "db-oracle", name: "Oracle", file: "oracle.sql", lang: "sql" },
  { id: "db-mongodb", name: "MongoDB", file: "mongodb.js", lang: "javascript" },
  { id: "db-sqlite", name: "SQLite", file: "sqlite.sql", lang: "sql" },
];

export function CodeExplorer() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [code, setCode] = useState("// Carregando código...");

  useEffect(() => {
    let isMounted = true;
    setCode("// Carregando código...");
    
    fetch(`/codigos/${activeTab.file}`)
      .then((res) => {
        if (!res.ok) throw new Error("Não encontrado");
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setCode(text.trim());
          setTimeout(() => Prism.highlightAll(), 0);
        }
      })
      .catch(() => {
        if (isMounted) setCode(`// Erro ao carregar o arquivo ${activeTab.file}`);
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <section id="codigos" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Bibliotecas & <span className="text-purple-400">Snippets</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mt-4 mb-4">
              Abaixo você encontrará os códigos prontos para cada linguagem e os scripts para os Bancos de Dados 
              mais utilizados, além de instruções personalizadas pra cada stack.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-8 items-start relative">
          
          {/* Sidebar Nav */}
          <div className="glass-card p-4 sticky top-28 hidden lg:block max-h-[80vh] overflow-y-auto custom-scrollbar">
            
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4 mt-2">Tecnologias</h4>
            <nav className="flex flex-col space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group ${
                    activeTab.id === tab.id ? "active" : ""
                  }`}
                >
                  <span className="flex items-center gap-3">{tab.name}</span>
                </button>
              ))}
            </nav>

            <div className="my-4 border-t border-white/5 mx-4"></div>
            
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">Banco de Dados</h4>
            <nav className="flex flex-col space-y-1">
              {DB_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                    activeTab.id === tab.id ? "active bg-purple-500/10 text-purple-400 border-purple-500/30" : ""
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Select */}
          <div className="lg:hidden w-full mb-6 relative">
            <select
              title="Selecione a linguagem"
              value={activeTab.id}
              onChange={(e) => {
                const found = [...TABS, ...DB_TABS].find((t) => t.id === e.target.value);
                if (found) setActiveTab(found);
              }}
              className="glass-input w-full px-4 py-3 rounded-xl appearance-none bg-[#18181b]"
            >
              <optgroup label="Tecnologias">
                {TABS.map((tab) => (
                  <option key={tab.id} value={tab.id}>{tab.name}</option>
                ))}
              </optgroup>
              <optgroup label="Bancos de Dados">
                {DB_TABS.map((tab) => (
                  <option key={tab.id} value={tab.id}>{tab.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Main Context Window */}
          <div className="flex flex-col gap-6">
            
            {/* Context Box - Instruções específicas por contexto */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {activeTab.name}
                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-zinc-300 font-mono">
                      {activeTab.file}
                    </span>
                  </h3>
                  <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                    Copie a função abaixo ou faça o download direto do arquivo para integrar em seu projeto.
                    Nenhuma biblioteca externa é necessária (funciona puro/nativo).
                  </p>
                </div>
                <a
                  href={`/codigos/${activeTab.file}`}
                  download={activeTab.file}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-sm font-medium transition shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Arquivo .{activeTab.file.split('.').pop()}
                </a>
              </div>
            </div>

            {/* Code Window */}
            <div className="code-window">
              <div className="code-window-header flex justify-between">
                <div className="flex gap-2">
                  <span className="mac-btn mac-close"></span>
                  <span className="mac-btn mac-min"></span>
                  <span className="mac-btn mac-max"></span>
                </div>
                <div className="text-zinc-500 text-xs font-mono tracking-wider">
                  {activeTab.file}
                </div>
              </div>
              
              <div className="min-h-[500px] relative">
                <pre className={`language-${activeTab.lang}`}>
                  <code className={`language-${activeTab.lang}`}>{code}</code>
                </pre>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
