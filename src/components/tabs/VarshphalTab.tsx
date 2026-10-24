import React, { useState } from 'react';
import { PlanetPosition, HouseInfo, PlanetName } from '../../types/astrology';
import { calculateVarshphal, ZODIAC_SIGNS } from '../../utils/astronomicalCalculator';
import { PLANETS_METADATA, HOUSES_KNOWLEDGE } from '../../data/lalKitabKnowledge';
import { DiamondKundali } from '../DiamondKundali';
import { Calendar, RotateCcw, Sparkles, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';

interface VarshphalTabProps {
  planets: Record<PlanetName, PlanetPosition>;
  currentAge: number;
  lang: 'hi' | 'en';
}

export const VarshphalTab: React.FC<VarshphalTabProps> = ({ planets, currentAge, lang }) => {
  const [selectedAge, setSelectedAge] = useState<number>(currentAge || 30);

  const varshphalData = calculateVarshphal(planets, selectedAge);
  const rulingMeta = PLANETS_METADATA[varshphalData.rulingPlanet];

  // Build Varshphal houses based on rotation
  const varshphalHouses: HouseInfo[] = [];
  for (let h = 1; h <= 12; h++) {
    const originalHouse = varshphalData.houseRotations[h] || h;
    const housePlanets = (Object.values(planets) as PlanetPosition[]).filter(
      (p) => p.house === originalHouse
    );

    varshphalHouses.push({
      houseNumber: h,
      zodiacSign: h,
      signName: ZODIAC_SIGNS[h - 1],
      karakaPlanets: HOUSES_KNOWLEDGE[h].pakkaGharOf,
      pakkaGharOf: HOUSES_KNOWLEDGE[h].pakkaGharOf,
      isSleeping: housePlanets.length === 0,
      awakenerPlanet: HOUSES_KNOWLEDGE[h].kismatJagaaneWala,
      planets: housePlanets,
      ruler: HOUSES_KNOWLEDGE[h].kismatJagaaneWala,
    });
  }

  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-[#270b0b] to-amber-950 border border-amber-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>अरुण संहिता (पृष्ठ 71, 91-93) - 35 साला वर्षफल चक्र</span>
            </div>
            <h2 className="text-2xl font-bold font-devanagari text-amber-100">
              {lang === 'hi' ? 'लाल किताब वर्षफल टेवा (वार्षिक भविष्यफल)' : 'Lal Kitab Varshphal (Annual Progressed Chart)'}
            </h2>
            <p className="mt-1 text-xs text-amber-200/80 font-devanagari">
              हर वर्ष जन्मदिन से कुंडली के 12 घरों की ग्रह-शक्तियां नए चक्र में घूमती हैं।
            </p>
          </div>

          {/* Age Selector */}
          <div className="bg-black/60 border border-amber-700/60 rounded-xl p-3 flex items-center space-x-3 shadow-inner">
            <div>
              <span className="text-[11px] text-stone-400 block font-devanagari">आयु वर्ष चुनें</span>
              <span className="text-xl font-bold text-amber-300 font-cinzel">{selectedAge} वर्ष</span>
            </div>
            <input
              type="range"
              min="1"
              max="90"
              value={selectedAge}
              onChange={(e) => setSelectedAge(parseInt(e.target.value, 10))}
              className="accent-amber-500 cursor-pointer w-28 sm:w-36"
            />
          </div>
        </div>
      </div>

      {/* Varshphal Ruler & Forecast */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#1b0808]/90 border border-amber-900/70 shadow-lg space-y-2">
          <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
            इस वर्ष का अधिपति ग्रह (Year Ruler):
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg font-devanagari shadow"
              style={{ backgroundColor: `${rulingMeta.color}30`, color: rulingMeta.color, border: `2px solid ${rulingMeta.color}` }}
            >
              {rulingMeta.hindi.slice(0, 2)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-amber-200 font-devanagari">{rulingMeta.hindi}</h4>
              <p className="text-xs text-stone-400">{rulingMeta.symbolicMeaning.slice(0, 35)}...</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 p-5 rounded-2xl bg-[#1b0808]/90 border border-amber-900/70 shadow-lg space-y-2 flex flex-col justify-center">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>आयु {selectedAge}वें वर्ष का लाल किताब फलादेश:</span>
          </h4>
          <p className="text-xs sm:text-sm text-stone-200 font-devanagari leading-relaxed">
            {varshphalData.keyForecast}
          </p>
        </div>
      </div>

      {/* Interactive Varshphal Diamond Kundali */}
      <DiamondKundali
        houses={varshphalHouses}
        title={`आयु ${selectedAge} वर्ष का लाल किताब वर्षफल टेवा (${varshphalData.calendarYear})`}
        chartType="varshphal"
        lang={lang}
      />

      {/* Yearly Remedy */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#2c0909] to-amber-950/70 border border-amber-700/60 shadow-lg space-y-2">
        <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>इस वर्ष हेतु विशेष लाल किताब संकल्प उपाय (Yearly Upay):</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-100 font-devanagari leading-relaxed">
          {varshphalData.yearlyUpay}
        </p>
      </div>
    </div>
  );
};
