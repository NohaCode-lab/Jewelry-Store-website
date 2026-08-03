import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Check, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('mg_cookie_consent');
    if (!consent) {
      // Show consent banner if not previously saved
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleAcceptAll = () => {
    const allConsent = { essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    localStorage.setItem('mg_cookie_consent', JSON.stringify(allConsent));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const customConsent = { ...preferences, timestamp: new Date().toISOString() };
    localStorage.setItem('mg_cookie_consent', JSON.stringify(customConsent));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-[#0b132b]/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 shadow-2xl shadow-black/80 text-slate-200">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-white tracking-wide">Privacy & Cookie Preferences</h4>
              <p className="text-xs text-amber-400/80">GDPR / EU ePrivacy Compliant</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Mangata & Gallo uses cookies and essential data processing to deliver a tailored luxury shopping experience, ensure secure transactions, and analyze site performance.
        </p>

        {/* Preference Toggles */}
        <div className="space-y-2 mb-5 text-xs">
          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-not-allowed">
            <span className="flex items-center gap-2 text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Essential Cookies (Strictly Necessary)
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Always Active</span>
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <span className="text-slate-300 font-medium">Performance & Analytics</span>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) => setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))}
              className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500/40 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
            <span className="text-slate-300 font-medium">Personalized Recommendations</span>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))}
              className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500/40 w-4 h-4"
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSavePreferences}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium text-xs transition-colors"
          >
            Save Choices
          </button>
          <button
            onClick={handleAcceptAll}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
