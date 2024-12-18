import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-white text-2xl font-bold font-mono">
                <span className="text-red-500">&gt;</span> 8M
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/scammers"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Scammers
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent pointer-events-none blur-3xl" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
            <div className="text-center">
              <div className="inline-block">
                <p className="font-mono text-red-500 mb-4">
                  <span className="bg-red-500/10 px-4 py-2 rounded-full">
                    Anti-Scam Protection
                  </span>
                </p>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 font-mono">
                Proteja-se contra
                <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent block mt-2">
                  {" "}
                  Scammers
                </span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                Identificamos e documentamos golpistas do Discord para proteger nossa comunidade.
                Juntos podemos criar um ambiente mais seguro.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/scammers"
                  className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group"
                >
                  Ver Lista de Scammers
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="bg-white/5 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  Sobre nós
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors duration-300">
              <div className="text-red-500 text-2xl mb-4 bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center">
                🔍
              </div>
              <h3 className="text-white text-xl font-semibold mb-2 font-mono">
                Identificação Rápida
              </h3>
              <p className="text-gray-400">
                Pesquise facilmente por ID do Discord para verificar se um usuário é confiável.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors duration-300">
              <div className="text-red-500 text-2xl mb-4 bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center">
                ⚡
              </div>
              <h3 className="text-white text-xl font-semibold mb-2 font-mono">
                Atualizações em Tempo Real
              </h3>
              <p className="text-gray-400">
                Nossa base de dados é atualizada constantemente com novos casos reportados.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-red-500/50 transition-colors duration-300">
              <div className="text-red-500 text-2xl mb-4 bg-red-500/10 w-12 h-12 rounded-lg flex items-center justify-center">
                🛡️
              </div>
              <h3 className="text-white text-xl font-semibold mb-2 font-mono">
                Comunidade Protegida
              </h3>
              <p className="text-gray-400">
                Ajudamos a manter sua comunidade segura através da prevenção.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 8M. Todos os direitos reservados.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Discord
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
            <div className="text-gray-500 text-sm font-mono">
              Credits: <a href="https://github.com/rela22" className="hover:text-white transition-colors">rela22</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
