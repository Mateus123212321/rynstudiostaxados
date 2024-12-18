'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getScammers } from '../services/api';

interface Scammer {
  id: string;
  username: string;
  discordId: string;
  description: string;
  date: string;
  status: 'active' | 'banned';
  reportCount: number;
}

export default function Scammers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [loading, setLoading] = useState(true);
  const scammersPerPage = 3;
  const router = useRouter();

  useEffect(() => {
    async function loadScammers() {
      const data = await getScammers();
      setScammers(data);
      setLoading(false);
    }
    loadScammers();
  }, []);

  const filteredScammers = scammers.filter((scammer) =>
    scammer.discordId.includes(searchQuery) || 
    scammer.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredScammers.length / scammersPerPage);
  const currentScammers = filteredScammers.slice(
    (currentPage - 1) * scammersPerPage,
    currentPage * scammersPerPage
  );

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
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/scammers"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Scammers
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-mono">Lista de Scammers</h1>
          <p className="text-gray-400">
            Encontre e verifique usuários reportados como scammers
          </p>
        </div>

        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar por ID do Discord ou username..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-white">Carregando...</div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentScammers.map((scammer) => (
                <div
                  key={scammer.id}
                  onClick={() => router.push(`/scammer/${scammer.id}`)}
                  className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-red-500/50 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-lg font-semibold font-mono">
                          {scammer.username}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          scammer.status === 'banned' 
                            ? 'bg-red-500/10 text-red-500' 
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {scammer.status === 'banned' ? 'Banido' : 'Ativo'}
                        </span>
                      </div>
                      <p className="text-gray-400 font-mono">ID: {scammer.discordId}</p>
                      <p className="text-gray-400 mt-2">{scammer.description}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="text-gray-500 text-sm">
                          {scammer.reportCount} reportes
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm font-mono">{scammer.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm group-hover:text-white transition-colors">
                    <span>Clique para ver mais detalhes</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4 mt-8 pb-8">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>
              <span className="text-white flex items-center font-mono">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-white/10 bg-black mt-20">
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