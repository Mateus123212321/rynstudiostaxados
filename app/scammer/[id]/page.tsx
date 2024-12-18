'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flag } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getScammers, reportScammer } from '../../services/api';

type ScammerStatus = 'active' | 'banned';

interface Scammer {
  id: string;
  username: string;
  discordId: string;
  description: string;
  date: string;
  status: 'active' | 'banned';
  reportCount: number;
}

export default function ScammerDetail() {
  const params = useParams();
  const [isReporting, setIsReporting] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    async function loadScammer() {
      const scammers = await getScammers();
      const found = scammers.find((s: Scammer) => s.id === params.id);
      setScammer(found || null);
      setLoading(false);
      
      const reported = localStorage.getItem(`reported-${params.id}`);
      setHasReported(!!reported);
    }
    loadScammer();
  }, [params.id]);

  const handleReport = async () => {
    if (!isReporting || !scammer) {
      setIsReporting(true);
      return;
    }

    if (hasReported) {
      alert('Você já reportou este scammer');
      return;
    }
    
    const updated = await reportScammer(scammer.id);
    if (updated) {
      setScammer(updated);
      localStorage.setItem(`reported-${scammer.id}`, 'true');
      setHasReported(true);
    }
    
    setIsReporting(false);
    setReportMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!scammer) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Scammer não encontrado
      </div>
    );
  }

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
          <Link
            href="/scammers"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para lista
          </Link>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 font-mono">
                  {scammer.username}
                </h1>
                <p className="text-gray-400 font-mono">ID: {scammer.discordId}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scammer.status === 'banned'
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {scammer.status === 'banned' ? 'Banido' : 'Ativo'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="text-white font-medium mb-4">Descrição do Golpe</h3>
                  <p className="text-gray-400">{scammer.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    Reportado em: {scammer.date}
                  </div>
                </div>

                <div className="mt-6 bg-white/5 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Flag className="w-5 h-5 text-red-500" />
                      <span className="text-white">Reports</span>
                    </div>
                    <span className="text-gray-400">{scammer.reportCount}</span>
                  </div>

                  {isReporting ? (
                    <div className="space-y-4">
                      <textarea
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 font-mono resize-none"
                        placeholder="Descreva o motivo do report..."
                        rows={4}
                        value={reportMessage}
                        onChange={(e) => setReportMessage(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleReport}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Enviar Report
                        </button>
                        <button
                          onClick={() => setIsReporting(false)}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleReport}
                      className="w-full bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <Flag className="w-4 h-4" />
                      Reportar Scammer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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