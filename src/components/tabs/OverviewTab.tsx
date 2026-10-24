import React from 'react';
import { KundaliInput, PlanetPosition, HouseInfo, AspectRelation, KarmicDebt, MarriagePrediction, WealthPrediction, BlackMagicAudit } from '../../types/astrology';
import { DiamondKundali } from '../DiamondKundali';
import { Sparkles, Heart, Coins, ShieldAlert, Eye, Moon, Compass, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { PLANETS_METADATA, HOUSES_KNOWLEDGE } from '../../data/lalKitabKnowledge';

interface OverviewTabProps {
  input: KundaliInput;
  lagnaSign: number;
  lagnaDegree: number;
  planets: Record<string, PlanetPosition>;
  houses: HouseInfo[];
  aspects: AspectRelation[];
  debts: KarmicDebt[];
  marriage: MarriagePrediction;
  wealth: WealthPrediction;
  blackMagic: BlackMagicAudit;
  onTabChange: (tab: string) => void;
  lang: 'hi' | 'en';
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  input,
  lagnaSign,
  lagnaDegree,
  planets,
  houses,
  aspects,
  debts,
  marriage,
  wealth,
  blackMagic,
  onTabChange,
  lang,
}) => {
  const sleepingHouses = houses.filter((h) => h.isSleeping);
  const sleepingPlanets = Object.values(planets).filter((p) => p.isSleeping);
  const activeDebts = debts.filter((d) => d.isActive);

  return (
    <div className="space-y-6 text-amber-100">
      {/* 4 Core Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Marriage KPI */}
        <div
          onClick={() => onTabChange('marriage')}
          className="bg-gradient-to-br from-red-950/70 to-stone-900/90 border border-amber-900/80 hover:border-amber-500 rounded-2xl p-4 shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
              <span className="flex items-center space-x-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>विवाह योग काल</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
            </div>
            <div className="text-xl font-bold font-cinzel text-amber-200 mt-1">
              {marriage.primaryAuspiciousAge} वर्ष आयु
            </div>
            <p className="text-xs text-stone-300 font-devanagari mt-1 line-clamp-1">
              {marriage.probableYearRange}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-900/40 text-[11px] text-emerald-400 flex items-center justify-between">
            <span>दांपत्य सौहार्द: {marriage.maritalHarmonyScore}%</span>
            <span className="text-[10px] text-amber-300">विवरण देखें →</span>
          </div>
        </div>

        {/* Wealth & Maya KPI */}
        <div
          onClick={() => onTabChange('wealth')}
          className="bg-gradient-to-br from-amber-950/70 to-stone-900/90 border border-amber-900/80 hover:border-amber-500 rounded-2xl p-4 shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
              <span className="flex items-center space-x-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>दौलत की हैसियत</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
            </div>
            <div className="text-xl font-bold font-devanagari text-yellow-300 mt-1">
              {wealth.mayaName}
            </div>
            <p className="text-xs text-stone-300 font-devanagari mt-1">
              आय सूचकांक: {wealth.incomeRupeeIndex} / 70 रु०
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-900/40 text-[11px] text-amber-300 flex items-center justify-between">
            <span>{wealth.mayaTitle.slice(0, 18)}...</span>
            <span className="text-[10px] text-amber-300">विवरण देखें →</span>
          </div>
        </div>

        {/* Black Magic / Evil Eye KPI */}
        <div
          onClick={() => onTabChange('blackmagic')}
          className="bg-gradient-to-br from-purple-950/70 to-stone-900/90 border border-purple-900/80 hover:border-purple-500 rounded-2xl p-4 shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-purple-300 font-semibold mb-1">
              <span className="flex items-center space-x-1">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                <span>नजर दोष व तंत्र जोखिम</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
            </div>
            <div className="text-xl font-bold font-cinzel text-purple-200 mt-1">
              {blackMagic.riskLevel} Risk
            </div>
            <p className="text-xs text-stone-300 font-devanagari mt-1 line-clamp-1">
              {blackMagic.riskLevel === 'Low' ? 'आभा मंडल सुरक्षित' : 'राहु/शनि दोष निवारण जरूरी'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-purple-900/40 text-[11px] text-purple-300 flex items-center justify-between">
            <span>सुरक्षा तावीज व उपाय</span>
            <span className="text-[10px] text-purple-200">विवरण देखें →</span>
          </div>
        </div>

        {/* Karmic Debts (Rin) KPI */}
        <div
          onClick={() => onTabChange('debts')}
          className="bg-gradient-to-br from-red-950/70 to-stone-900/90 border border-amber-900/80 hover:border-amber-500 rounded-2xl p-4 shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
              <span className="flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>पितृ व कर्म ऋण (Rin)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
            </div>
            <div className="text-xl font-bold font-cinzel text-red-300 mt-1">
              {activeDebts.length} सक्रिय ऋण
            </div>
            <p className="text-xs text-stone-300 font-devanagari mt-1 line-clamp-1">
              {activeDebts.length > 0 ? activeDebts.map((d) => d.hindiName.split(' ')[0]).join(', ') : 'कोई पितृ ऋण नहीं'}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-amber-900/40 text-[11px] text-amber-300 flex items-center justify-between">
            <span>सामूहिक उपाय प्रोटोकॉल</span>
            <span className="text-[10px] text-amber-300">विवरण देखें →</span>
          </div>
        </div>
      </div>

      {/* Quick Muhurat Highlight Banner */}
      <div
        onClick={() => onTabChange('muhurat')}
        className="p-4 rounded-2xl bg-gradient-to-r from-[#2c0d0d] via-amber-950/60 to-[#1e0808] border border-amber-600/60 hover:border-amber-400 shadow-xl cursor-pointer transition-all hover:scale-[1.01] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Compass className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-devanagari">
                दैनिक लाल किताब शुभ मुहूर्त व गतिविधि काल
              </span>
              <span className="px-2 py-0.2 rounded-full bg-red-950 text-amber-200 border border-amber-800 text-[10px] font-bold">
                नया
              </span>
            </div>
            <p className="text-xs text-stone-300 font-devanagari mt-0.5">
              अपनी कुण्डली के अनुसार आज के 9 ग्रह काल, विवाह वार्ता, व्यापारिक सौदे, गृह निर्माण व सफ़र के शुभ मुहूर्त देखें।
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300 shrink-0 self-end sm:self-center bg-black/40 px-3 py-1.5 rounded-lg border border-amber-900/40">
          <span>मुहूर्त सारिणी देखें</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Main Kundali Chart Display */}
      <DiamondKundali
        houses={houses}
        title="लाल किताब लग्न टेवा (Fixed 12 Houses / Kalpurush)"
        chartType="lagna"
        lang={lang}
      />

      {/* Soya Grah & Soya Ghar Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Sleeping Houses (Soya Ghar) */}
        <div className="bg-[#1b0808]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-900/40">
            <h3 className="font-bold text-sm font-devanagari text-amber-200 flex items-center space-x-2">
              <Moon className="w-4 h-4 text-stone-400" />
              <span>सोए हुए घर (Sleeping Houses) - {sleepingHouses.length}</span>
            </h3>
            <span className="text-[11px] text-stone-400">फारमान नं० 8 (पृष्ठ 46)</span>
          </div>

          <p className="text-xs text-stone-300 font-devanagari leading-relaxed">
            "जिस घर में कोई ग्रह न हो या जिस घर पर किसी ग्रह की दृष्टि न हो वह घर सोया होगा।"
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {sleepingHouses.map((h) => (
              <div
                key={h.houseNumber}
                className="p-2.5 rounded-xl bg-stone-900/70 border border-stone-800 text-xs space-y-1"
              >
                <div className="font-bold text-amber-300">खाना नं० {h.houseNumber}</div>
                <div className="text-[10px] text-stone-400">
                  जगाने वाला: <span className="text-emerald-400 font-semibold">{PLANETS_METADATA[h.awakenerPlanet].hindi.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lal Kitab Drishti (Aspects) Overview */}
        <div className="bg-[#1b0808]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-900/40">
            <h3 className="font-bold text-sm font-devanagari text-amber-200 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>लाल किताब दृष्टि संबंध (Aspect Rules)</span>
            </h3>
            <span className="text-[11px] text-stone-400">फारमान (पृष्ठ 47-51)</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-stone-900/70 border border-stone-800 flex justify-between items-center">
              <span className="text-amber-300 font-semibold font-devanagari">100% पूर्ण दृष्टि:</span>
              <span className="text-stone-300 font-devanagari">खाना 1 से 7, एवं खाना 4 से 10</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-900/70 border border-stone-800 flex justify-between items-center">
              <span className="text-yellow-300 font-semibold font-devanagari">50% बाहम मदद दृष्टि:</span>
              <span className="text-stone-300 font-devanagari">खाना 5 से 9, एवं खाना 3 से 11</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-900/70 border border-stone-800 flex justify-between items-center">
              <span className="text-stone-400 font-semibold font-devanagari">25% चौथाई दृष्टि:</span>
              <span className="text-stone-300 font-devanagari">खाना 2 से 6, 6 से 12, 8 से 2 (टकराव)</span>
            </div>
            <div className="p-2 rounded-lg bg-stone-900/70 border border-stone-800 flex justify-between items-center">
              <span className="text-rose-400 font-semibold font-devanagari">धोखा व बुनियाद:</span>
              <span className="text-stone-300 font-devanagari">खाना 10 देखता है 2 को (धोखा), खाना 9 बुनियाद</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
