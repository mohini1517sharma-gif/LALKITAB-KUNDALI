import React, { useState } from 'react';
import { PlanetName, PlanetPosition } from '../../types/astrology';
import { PLANETS_METADATA, PLANET_HOUSE_DATA } from '../../data/lalKitabKnowledge';
import { Sparkles, ShieldCheck, AlertTriangle, BookOpen, Star, Info } from 'lucide-react';

interface PlanetaryAnalysisTabProps {
  planets: Record<PlanetName, PlanetPosition>;
  lang: 'hi' | 'en';
}

export const PlanetaryAnalysisTab: React.FC<PlanetaryAnalysisTabProps> = ({ planets, lang }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetName>('Guru');

  const planetPos = planets[selectedPlanet];
  const meta = PLANETS_METADATA[selectedPlanet];
  const houseData = PLANET_HOUSE_DATA[selectedPlanet]?.[planetPos.house] || {
    farmanPoem: 'कुदरत से किस्मत किस तरह पाई, हुक्म विधाता जन्म मिले तो।',
    nekHalat: 'ग्रह की स्थिति अनुकूल फल देने में समर्थ है।',
    mandiHalat: 'शत्रु ग्रहों के प्रभाव से सतर्क रहें।',
    authenticRemedy: 'प्रतिदिन इष्ट देव का स्मरण करें और पक्षियों को दाना डालें।',
    precautions: 'नियम व संयम का पालन करें।',
  };

  const planetList: PlanetName[] = [
    'Surya',
    'Chandra',
    'Mangal',
    'Budh',
    'Guru',
    'Shukra',
    'Shani',
    'Rahu',
    'Ketu',
  ];

  return (
    <div className="space-y-6 text-amber-100">
      {/* 9 Planets Quick Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {planetList.map((pName) => {
          const p = planets[pName];
          const pMeta = PLANETS_METADATA[pName];
          const isSelected = selectedPlanet === pName;

          return (
            <button
              key={pName}
              onClick={() => setSelectedPlanet(pName)}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-red-950 to-amber-950 text-amber-200 border-amber-500 shadow-lg scale-105'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
              }`}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-devanagari shadow"
                style={{ backgroundColor: `${pMeta.color}25`, color: pMeta.color, border: `1px solid ${pMeta.color}60` }}
              >
                {pMeta.hindi.slice(0, 1)}
              </div>
              <div className="text-xs font-bold mt-1.5 font-devanagari">{pMeta.hindi.split(' ')[0]}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">खाना {p.house}</div>
              <div className="mt-1 text-[9px]">
                {p.dignity === 'Uch' && <span className="text-emerald-400 font-bold">उच्च ↑</span>}
                {p.dignity === 'Neech' && <span className="text-red-400 font-bold">नीच ↓</span>}
                {p.dignity === 'Pakka Ghar' && <span className="text-amber-400 font-bold">पक्का</span>}
                {p.dignity === 'Sama' && <span className="text-stone-400">सम</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Planet Comprehensive Report */}
      <div className="bg-[#1b0808]/90 border border-amber-900/80 rounded-2xl p-5 sm:p-7 shadow-xl space-y-5">
        {/* Planet Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-900/50 gap-3">
          <div className="flex items-center space-x-3.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl font-devanagari shadow-lg"
              style={{ backgroundColor: `${meta.color}30`, color: meta.color, border: `2px solid ${meta.color}` }}
            >
              {meta.hindi.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl sm:text-2xl font-bold font-devanagari text-amber-200">
                  {meta.hindi}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700 font-medium">
                  खाना नं० {planetPos.house} में
                </span>
                {planetPos.isRetrograde && (
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                    वक्री (R)
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-400 font-devanagari mt-0.5">
                राशि: {planetPos.signName} ({planetPos.degree}°) | धातु: {meta.metal} | रत्न: {meta.gem}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 border border-stone-800">
              तत्व: {meta.element}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 border border-stone-800">
              प्रकृति: {meta.gender}
            </span>
          </div>
        </div>

        {/* Verbatim Farman Poem from Arun Samhita */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 via-black to-stone-950 border border-amber-800/60 relative">
          <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider mb-1 flex items-center space-x-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>अरुण संहिता लाल किताब फरमान (मूल पद्यांश)</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-yellow-200 font-devanagari italic leading-relaxed">
            "{houseData.farmanPoem}"
          </p>
        </div>

        {/* Nek Halat (Good) and Mandi Halat (Adverse) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 sm:p-5 rounded-xl bg-[#142214]/60 border border-emerald-900/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>नेक हालत (Auspicious Effects in House {planetPos.house}):</span>
            </h4>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              {houseData.nekHalat}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#260f0f]/60 border border-rose-900/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>मंदी हालत (Adverse Indications & Warning Signs):</span>
            </h4>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              {houseData.mandiHalat}
            </p>
          </div>
        </div>

        {/* Authentic Remedy Protocol & Precaution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/40 to-stone-900 border border-amber-700/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>अचूक लाल किताब टोटका व उपाय (Authentic 43-Day Remedy):</span>
            </h4>
            <p className="text-xs text-amber-100 font-devanagari leading-relaxed">
              {houseData.authenticRemedy}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-yellow-400" />
              <span>विशेष सावधानी व आचार-नियम (Vital Precaution):</span>
            </h4>
            <p className="text-xs text-stone-300 font-devanagari leading-relaxed">
              {houseData.precautions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
