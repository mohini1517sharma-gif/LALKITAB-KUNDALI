import React from 'react';
import { WealthPrediction, PlanetPosition } from '../../types/astrology';
import { Coins, TrendingUp, ShieldCheck, Briefcase, Award, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PLANETS_METADATA } from '../../data/lalKitabKnowledge';

interface FinancialGrowthTabProps {
  prediction: WealthPrediction;
  planets: Record<string, PlanetPosition>;
  lang: 'hi' | 'en';
}

export const FinancialGrowthTab: React.FC<FinancialGrowthTabProps> = ({
  prediction,
  planets,
  lang,
}) => {
  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner with Maya ke Teen Naam */}
      <div className="bg-gradient-to-r from-amber-950 via-[#260f06] to-stone-950 border border-amber-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>अरुण संहिता (पृष्ठ 403-404 / 424-427) - आय व माया का भेद</span>
            </div>
            <h2 className="text-2xl font-bold font-devanagari text-amber-100">
              {lang === 'hi' ? 'आर्थिक उन्नति, धन संचय व माया श्रेणी' : 'Financial Growth & Wealth Capacity Analysis'}
            </h2>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xs text-stone-300 font-devanagari">माया के तीन नाम श्रेणी:</span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-yellow-500 text-stone-950 font-extrabold text-sm shadow">
                {prediction.mayaName} ({prediction.mayaTitle})
              </span>
            </div>
          </div>

          {/* Income Rupee Index Card */}
          <div className="bg-black/50 border border-amber-700/60 rounded-xl p-4 text-center min-w-[160px] shadow-inner">
            <span className="text-xs text-stone-400 block font-devanagari">लाल किताब आय सूचकांक</span>
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-amber-500 font-cinzel">
              {prediction.incomeRupeeIndex} / 70
            </span>
            <span className="text-[11px] text-amber-300 block font-medium mt-0.5">
              (पृष्ठ 424 रुपया तालिका)
            </span>
          </div>
        </div>
      </div>

      {/* Maya ke Teen Naam & 35-year cycle grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-[#1b0808]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-amber-900/40">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-devanagari text-amber-200">
              {lang === 'hi' ? 'दौलत की हैसियत व 35 साला चक्र' : 'Wealth Capacity & 35-Year Cycle Status'}
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/70 border border-amber-900/50">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              वर्तमान भाग्य चक्र स्थिति:
            </h4>
            <div className="text-base font-bold text-amber-200 font-devanagari">
              {prediction.currentCyclePhase}
            </div>
            <p className="text-xs text-stone-300 mt-1 font-devanagari leading-relaxed">
              {prediction.wealthCapacity}
            </p>
          </div>

          {/* Peak Wealth Earning Ages */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-stone-400 tracking-wider mb-2">
              लाल किताब के अनुसार विशेष धन प्राप्ति व उन्नति के वर्ष:
            </h4>
            <div className="flex flex-wrap gap-2">
              {prediction.peakAges.map((age) => (
                <div
                  key={age}
                  className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-700/60 text-amber-300 text-xs font-bold font-cinzel flex items-center space-x-1"
                >
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{age}वां वर्ष</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Career Sectors */}
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>ग्रह स्थिति अनुसार सर्वाधिक लाभप्रद व्यापार व कार्यक्षेत्र:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {prediction.careerFields.map((field, idx) => (
                <div key={idx} className="p-2 rounded bg-black/40 border border-amber-900/30 text-amber-200 font-devanagari">
                  ✓ {field}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wealth Planets Value Table from PDF Page 424 */}
        <div className="bg-[#1b0808]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-sm font-bold uppercase text-amber-400 tracking-wider pb-2 border-b border-amber-900/40">
              लाल किताब ग्रह आय तालिका
            </h3>
            <p className="text-[11px] text-stone-400 mb-2 font-devanagari">
              अरुण संहिता पृष्ठ 402/424 के अनुसार 9 ग्रहों का मूल आय मान:
            </p>
            <div className="space-y-1.5 text-xs">
              {Object.keys(planets).map((pName) => {
                const p = planets[pName];
                const meta = PLANETS_METADATA[p.name];
                return (
                  <div
                    key={p.name}
                    className="flex justify-between items-center px-2.5 py-1.5 rounded bg-stone-900/70 border border-stone-800/80"
                  >
                    <span className="font-semibold text-amber-200">{meta.hindi.split(' ')[0]}</span>
                    <span className="text-stone-400 text-[11px]">खाना नं० {p.house}</span>
                    <span className="font-bold text-yellow-300 font-cinzel">
                      {meta.rupeeValue} रु०
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-[11px] text-amber-300 font-devanagari">
            <strong>सिद्धांत:</strong> जब सूर्य व गुरु, अथवा गुरु व चन्द्र इकट्ठे हों, तो आय का योग 21 रुपये (अत्युत्तम) हो जाता है।
          </div>
        </div>
      </div>

      {/* Wealth Precautions & Authentic Lal Kitab Remedies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#190606]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <span>धन हानि से बचाव हेतु लाल किताब सावधानियां</span>
          </div>

          <div className="space-y-2 text-xs">
            {prediction.precautions.map((prec, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-amber-200 font-devanagari">
                • {prec}
              </div>
            ))}
            <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300 font-devanagari">
              • घर की तिजोरी कभी खाली न रखें, उसमें सदैव कुछ नकदी और चांदी का सिक्का रखें।
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300 font-devanagari">
              • रात के समय कभी किसी को दूध अथवा सफेद वस्तुएं दान में न दें।
            </div>
          </div>
        </div>

        <div className="bg-[#190606]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>स्थायी बरकत व धन वृद्धि के अचूक लाल किताब टोटके</span>
          </div>

          <div className="space-y-2 text-xs">
            {prediction.wealthRemedies.map((rem, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-amber-100 flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span className="font-devanagari">{rem}</span>
              </div>
            ))}
            <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300 flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span className="font-devanagari">
                <strong>तांबे का सिक्का:</strong> किसी नदी या नहर में लगातार 43 दिन तांबे का सिक्का बिना छेद वाला प्रवाहित करें।
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
