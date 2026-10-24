import React, { useState } from 'react';
import { KarmicDebt } from '../../types/astrology';
import { AlertCircle, CheckCircle2, ShieldAlert, Users, Info, ChevronRight } from 'lucide-react';
import { PLANETS_METADATA } from '../../data/lalKitabKnowledge';

interface KarmicDebtsTabProps {
  debts: KarmicDebt[];
  lang: 'hi' | 'en';
}

export const KarmicDebtsTab: React.FC<KarmicDebtsTabProps> = ({ debts, lang }) => {
  const [selectedDebtId, setSelectedDebtId] = useState<string>(debts[0]?.id || 'pitru_rin');
  const activeDebts = debts.filter((d) => d.isActive);
  const selectedDebt = debts.find((d) => d.id === selectedDebtId) || debts[0];

  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-[#2a0c0c] to-stone-950 border border-amber-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>अरुण संहिता (पृष्ठ 53 से 58) - ऋण पितु व कर्म दोष</span>
            </div>
            <h2 className="text-2xl font-bold font-devanagari text-amber-100">
              {lang === 'hi' ? 'लाल किताब 8 पूर्व जन्म ऋण व निवारण' : '8 Lal Kitab Ancestral Karmic Debts (Rin)'}
            </h2>
            <p className="mt-1 text-xs text-amber-200/80 font-devanagari">
              "बड़ों के पाप का प्रभाव खुद पर हो... ऋण पितु उस घर से होगा, असर ग्रह सब निष्फल हो।"
            </p>
          </div>

          {/* Active Debt Badge */}
          <div className="bg-black/50 border border-amber-700/60 rounded-xl p-4 text-center min-w-[170px] shadow-inner">
            <span className="text-xs text-stone-400 block font-devanagari">सक्रिय ऋण (Active Debts)</span>
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-yellow-400 font-cinzel">
              {activeDebts.length} / 8
            </span>
            <span className="text-[11px] text-amber-300 block font-medium mt-0.5">
              {activeDebts.length === 0 ? 'कुण्डली दोषमुक्त है' : 'परिवारिक उपाय अनिवार्य'}
            </span>
          </div>
        </div>
      </div>

      {/* 8 Debts Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {debts.map((debt) => {
          const isSelected = debt.id === selectedDebtId;
          const meta = PLANETS_METADATA[debt.causingPlanet];
          return (
            <button
              key={debt.id}
              onClick={() => setSelectedDebtId(debt.id)}
              className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-950 text-amber-200 border-amber-500 shadow-lg'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
              }`}
            >
              {debt.isActive && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
              <div className="text-[11px] font-bold truncate font-devanagari">
                {debt.hindiName.split(' ')[0]}
              </div>
              <div className="text-[10px] text-stone-400 mt-1">
                {meta.hindi.split(' ')[0]}
              </div>
              <div className="mt-2 text-[10px]">
                {debt.isActive ? (
                  <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 font-bold border border-red-800">
                    सक्रिय
                  </span>
                ) : (
                  <span className="text-emerald-400 font-medium">मुक्त</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Debt Detailed Dossier */}
      <div className="bg-[#1c0808]/90 border border-amber-900/80 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-amber-900/50 gap-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
              विस्तृत लाल किताब ऋण विवरण
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-devanagari text-amber-200 mt-1">
              {selectedDebt.hindiName}
            </h3>
          </div>
          <div>
            {selectedDebt.isActive ? (
              <span className="px-3 py-1 rounded-full bg-red-950 text-red-200 text-xs font-bold border border-red-800 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                <span>आपकी कुण्डली में यह ऋण सक्रिय है</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-200 text-xs font-bold border border-emerald-800 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>आपकी कुण्डली में यह ऋण निष्क्रीय है</span>
              </span>
            )}
          </div>
        </div>

        {/* Cause & Affected Relatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-stone-900/70 border border-amber-900/40 space-y-2">
            <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>पूर्वजों द्वारा पाप का मूल कारण (Paternal/Maternal Cause):</span>
            </h4>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              {selectedDebt.reason}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/70 border border-amber-900/40 space-y-2">
            <h4 className="text-xs font-bold uppercase text-rose-400 tracking-wider flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>जीवन में दिखाई देने वाली आम निशानियां (Observed Symptoms):</span>
            </h4>
            <ul className="text-xs text-stone-200 font-devanagari space-y-1">
              {selectedDebt.symptoms.map((sym, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <span className="text-rose-400 font-bold shrink-0">•</span>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Authentic Lal Kitab Remedy Protocol */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-[#2c0909] to-amber-950/70 border border-amber-700/60 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>अरुण संहिता विहित सामूहिक कुल उपाय (Collective Family Remedy):</span>
          </div>
          <p className="text-xs text-amber-100 font-devanagari leading-relaxed">
            {selectedDebt.remedy}
          </p>
          <div className="pt-2 border-t border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-amber-300/80 gap-1 font-devanagari">
            <span>
              <strong>विशेष नियम:</strong> परिवार के सभी रक्त संबंधियों (खून के रिश्ते) से बराबर राशि एकत्र करके ही यह उपाय एक दिन में संपन्न करें।
            </span>
            <span className="text-amber-400 font-semibold">{selectedDebt.precaution}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
