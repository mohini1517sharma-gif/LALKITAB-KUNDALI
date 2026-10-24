import React from 'react';
import { BlackMagicAudit, PlanetPosition } from '../../types/astrology';
import { ShieldAlert, ShieldCheck, Flame, Moon, Sparkles, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';

interface BlackMagicProtectionTabProps {
  audit: BlackMagicAudit;
  planets: Record<string, PlanetPosition>;
  lang: 'hi' | 'en';
}

export const BlackMagicProtectionTab: React.FC<BlackMagicProtectionTabProps> = ({
  audit,
  planets,
  lang,
}) => {
  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'Severe':
        return {
          bg: 'bg-red-950 text-red-200 border-red-700',
          label: 'अत्यधिक संवेदनशीलता (Severe Risk) - तत्काल उपाय करें',
          color: 'text-red-400',
        };
      case 'High':
        return {
          bg: 'bg-rose-950 text-rose-200 border-rose-800',
          label: 'उच्च जोखिम (High Risk) - नजर दोष व ऊपरी साया सक्रिय',
          color: 'text-rose-400',
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-950 text-amber-200 border-amber-700',
          label: 'मध्यम संवेदनशीलता (Moderate Risk) - सतर्कता आवश्यक',
          color: 'text-amber-400',
        };
      default:
        return {
          bg: 'bg-emerald-950 text-emerald-200 border-emerald-800',
          label: 'न्यूनतम जोखिम (Safe / Protected) - सुरक्षित आभा मंडल',
          color: 'text-emerald-400',
        };
    }
  };

  const badge = getRiskBadge(audit.riskLevel);

  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-[#270b20] to-red-950 border border-purple-900/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              <span>अरुण संहिता - राहु, केतु व ऊपरी हवा रहस्य (पृष्ठ 54, 245-262, 341)</span>
            </div>
            <h2 className="text-2xl font-bold font-devanagari text-amber-100">
              {lang === 'hi'
                ? 'नजर दोष, ऊपरी हवा व तंत्र-बाधा सुरक्षा कवच'
                : 'Black Magic, Evil Eye (Buri Nazar) & Aura Protection Audit'}
            </h2>
            <p className="mt-1 text-xs text-purple-200/80 font-devanagari">
              लाल किताब के अनुसार राहु-केतु, श्मशानी असर, नजर दोष व नकारात्मक शक्तियों का प्रमाणिक विश्लेषण एवं अचूक काट।
            </p>
          </div>

          {/* Risk Level Badge */}
          <div className={`p-4 rounded-xl border text-center min-w-[180px] shadow-lg ${badge.bg}`}>
            <span className="text-[11px] uppercase tracking-wider block opacity-80 font-devanagari">
              तंत्र व नजर दोष स्तर
            </span>
            <span className="text-2xl font-black font-cinzel mt-0.5 block">{audit.riskLevel}</span>
            <span className="text-[10px] font-medium block mt-1">{badge.label}</span>
          </div>
        </div>
      </div>

      {/* Planetary Root Cause & Symptoms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Astrological Causes in Teva */}
        <div className="bg-[#190812]/90 border border-purple-950 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-purple-300 font-bold text-sm pb-2 border-b border-purple-900/40">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>आपकी कुण्डली में तंत्र/नजर दोष के ज्योतिषीय कारक:</span>
          </div>
          <div className="space-y-2 text-xs">
            {audit.planetaryRoots.map((root, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/40 border border-purple-900/40 text-amber-200 font-devanagari">
                • {root}
              </div>
            ))}
          </div>
        </div>

        {/* Real life symptoms */}
        <div className="bg-[#190812]/90 border border-purple-950 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-rose-300 font-bold text-sm pb-2 border-b border-purple-900/40">
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            <span>संभावित लक्षण व अनुभव (Warning Symptoms):</span>
          </div>
          <div className="space-y-2 text-xs">
            {audit.evilEyeIndicators.map((symptom, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/40 border border-purple-900/40 text-stone-300 font-devanagari">
                • {symptom}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protection Amulets & Sacred Lal Kitab Talismans */}
      <div className="bg-[#150610]/95 border border-purple-900/60 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2.5 pb-2 border-b border-purple-900/40">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold font-devanagari text-amber-200">
            {lang === 'hi' ? 'लाल किताब सिद्ध सुरक्षा यंत्र व तावीज' : 'Authentic Lal Kitab Protective Talismans'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {audit.protectionAmulets.map((amulet, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gradient-to-br from-purple-950/40 to-stone-900/80 border border-purple-800/50 shadow space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-900/60 flex items-center justify-center text-amber-300 font-bold text-xs border border-purple-500/40">
                0{idx + 1}
              </div>
              <p className="text-xs text-amber-100 font-devanagari leading-relaxed">
                {amulet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Unbreakable Remedies & Daily Disciplines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 43 Days Unbroken Remedies */}
        <div className="bg-[#190812]/90 border border-purple-950 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>40-43 दिन के अचूक लाल किताब महा-उपाय</span>
          </div>
          <div className="space-y-2.5 text-xs">
            {audit.unbreakableRemedies.map((rem, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 text-stone-200 flex items-start space-x-2">
                <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                <span className="font-devanagari leading-relaxed">{rem}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Protective Shield Rules */}
        <div className="bg-[#190812]/90 border border-purple-950 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-yellow-400 font-bold text-sm">
            <Moon className="w-4 h-4 text-yellow-400" />
            <span>दैनिक सुरक्षा नियम (Daily Protection Discipline)</span>
          </div>
          <div className="space-y-2.5 text-xs">
            {audit.dailyShieldDisciplines.map((rule, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 text-stone-200 flex items-start space-x-2">
                <span className="text-yellow-400 font-bold shrink-0">✦</span>
                <span className="font-devanagari leading-relaxed">{rule}</span>
              </div>
            ))}
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/60 text-amber-200 font-devanagari text-[11px]">
              <strong>अरुण संहिता चेतावनी:</strong> लाल किताब का कोई भी उपाय रात के अंधेरे में न करें। सभी उपाय सूर्योदय से सूर्यास्त के मध्य ही किए जाने चाहिए (सिवाय विशेष हिदायतों के)।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
