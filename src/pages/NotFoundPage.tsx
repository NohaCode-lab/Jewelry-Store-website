import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#020617] text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg bg-[#090d1a]/80 backdrop-blur-xl p-10 rounded-3xl border border-amber-500/20 shadow-2xl">
        <div className="w-16 h-16 bg-amber-500/10 rounded-full border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400">
          <Compass size={32} />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">404 Error</span>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mt-2 mb-4">
          Atelier Destination Not Found
        </h1>
        <div className="w-16 h-[1px] bg-amber-500 mx-auto mb-6" />

        <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
          The jewelry collection or private page you are seeking does not exist or has been relocated within our gallery.
        </p>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs tracking-widest uppercase hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20"
        >
          Return to Atelier Home
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
