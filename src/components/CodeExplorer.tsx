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
  { id: "lang-ts", name: "TypeScript", file: "cnpj.ts", lang: "typescript", doc: "Exporta os métodos isValid() e calculaDV() de forma estática. Basta importar a classe CNPJ em seu projeto." },
  { id: "lang-js", name: "JavaScript", file: "cnpj.js", lang: "javascript", doc: "Função vanilla/nativa 'validaCnpjAlfa()'. Pronto para colar no client-side ou Node.js legado." },
  { id: "lang-python", name: "Python", file: "cnpj.py", lang: "python", doc: "Implementa POO com a classe CNPJ e property functions. Use ascii values via método ord()." },
  { id: "lang-php", name: "PHP", file: "cnpj.php", lang: "php", doc: "Função global php 'valida_cnpj_alfa()'. Ideal para frameworks antigos ou Laravel Helpers." },
  { id: "lang-java", name: "Java", file: "CNPJ.java", lang: "java", doc: "Classe CNPJ contendo métodos estáticos validador e calculador de Base. Utiliza charAt." },
  { id: "lang-csharp", name: "C#", file: "CNPJ.cs", lang: "csharp", doc: "Classe CNPJUtils em .NET/C#. Extremamente otimizado usando conversões explícitas de char." },
  { id: "lang-go", name: "Go", file: "cnpj.go", lang: "go", doc: "Pacote 'cnpj' em Go. Validação rápida aproveitando strings nativas imutáveis iteradas em runes." },
  { id: "lang-rust", name: "Rust", file: "cnpj.rs", lang: "rust", doc: "Módulo seguro de validação cnpj via crate custom. Verifica arrays de bytes para converter UTF-8." },
  { id: "lang-ruby", name: "Ruby", file: "cnpj.rb", lang: "ruby", doc: "Módulo Ruby para validação simples com .ord para acessar tabela ASCII de forma pythonesca." },
];

const DB_TABS = [
  { id: "db-postgres", name: "PostgreSQL", file: "postgres.sql", lang: "sql", doc: "Criação de Function nativa para PG usando loop e cast ASCII via Função nativa SQL." },
  { id: "db-mysql", name: "MySQL", file: "mysql.sql", lang: "sql", doc: "Routine/Function MySQL pronta para rodar como UDF nativa na sua Stored Procedure ou Query." },
  { id: "db-sqlserver", name: "SQL Server", file: "sqlserver.sql", lang: "sql", doc: "Criação de um Scalar Function no T-SQL para você filtrar queries nativamente com 'dbo.valida_cnpj'." },
  { id: "db-oracle", name: "Oracle", file: "oracle.sql", lang: "sql", doc: "PL/SQL robusto usando Arrays de Memória e loop ASCII nativo." },
  { id: "db-mongodb", name: "MongoDB", file: "mongodb.js", lang: "javascript", doc: "Aggregation Pipeline que cria um Stage com uma função JS embutida nativamente nas Queries NoSQL." },
  { id: "db-sqlite", name: "SQLite", file: "sqlite.sql", lang: "sql", doc: "Guia via comentário para inserir UDF (User Defined Functions) via sua linguagem Base (ex: Python/Node)." },
  { id: "db-firebase", name: "Firebase (Cloud Functions)", file: "firebase.js", lang: "javascript", doc: "Google Cloud Function Http trigger para validar o CNPJ sem expor a lógica no Frontend." },
  { id: "db-cassandra", name: "Cassandra (CQL)", file: "cassandra.cql", lang: "sql", doc: "Criação de User Defined Function direto em Java nativo rodando dentro do Motor do Cassandra." },
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
    <section id="codigos" className="py-24 relative z-10 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">
              Bibliotecas & <span className="text-indigo-600 dark:text-purple-400">Snippets</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mt-4 mb-4">
              Abaixo você encontrará os códigos prontos para cada linguagem e os scripts para os Bancos de Dados 
              mais utilizados, além de instruções personalizadas pra cada stack.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-8 items-start relative">
          
          {/* Sidebar Nav */}
          <div className="glass-card p-4 sticky top-28 hidden lg:block max-h-[80vh] overflow-y-auto custom-scrollbar bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10">
            
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4 mt-2">Tecnologias</h4>
            <nav className="flex flex-col space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/10 ${
                    activeTab.id === tab.id ? "active bg-indigo-50/80 dark:bg-purple-500/10 text-indigo-700 dark:text-purple-400 font-medium" : ""
                  }`}
                >
                  <span className="flex items-center gap-3">{tab.name}</span>
                </button>
              ))}
            </nav>

            <div className="my-4 border-t border-black/10 dark:border-white/5 mx-4"></div>
            
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4">Banco de Dados</h4>
            <nav className="flex flex-col space-y-1">
              {DB_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/10 ${
                    activeTab.id === tab.id ? "active bg-indigo-50/80 dark:bg-purple-500/10 text-indigo-700 dark:text-purple-400 font-medium" : ""
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
              className="glass-input w-full px-4 py-3 rounded-xl appearance-none bg-zinc-100 dark:bg-[#18181b] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
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
            <div className="bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl p-6 mb-2 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    {activeTab.name}
                    <span className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10 text-zinc-500 dark:text-zinc-300 font-mono">
                      {activeTab.file}
                    </span>
                  </h3>
                  <div className="mt-4 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
                    <p className="text-indigo-900 dark:text-indigo-200 text-sm leading-relaxed font-medium">
                      💡 {activeTab.doc}
                    </p>
                  </div>
                </div>
                <a
                  href={`/codigos/${activeTab.file}`}
                  download={activeTab.file}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 bg-indigo-100/50 hover:bg-indigo-200/50 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 rounded-lg text-sm font-semibold transition shrink-0"
                >
                  <Download className="w-5 h-5 sm:w-4 sm:h-4" />
                  Baixar Arquivo
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
