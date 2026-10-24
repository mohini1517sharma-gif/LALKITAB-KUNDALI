import React from 'react';
import { MarriagePrediction, PlanetPosition } from '../../types/astrology';
import { Heart, Calendar, AlertTriangle, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

interface MarriageReportTabProps {
  prediction: MarriagePrediction;
  planets: Record<string, PlanetPosition>;
  lang: 'hi' | 'en';
}

export const MarriageReportTab: React.FC<MarriageReportTabProps> = ({
  prediction,
  planets,
  lang,
}) => {
  const shukra = planets.Shukra;
  const budh = planets.Budh;
  const guru = planets.Guru;
  const rahu = planets.Rahu;
  const shani = planets.Shani;

  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner with Verse */}
      <div className="bg-gradient-to-r from-red-950 via-[#2d0909] to-amber-950 border border-amber-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>अरुण संहिता - फरमान नं० 17 (शादी व गृहस्थी)</span>
            </div>
            <h2 className="text-2xl font-bold font-devanagari text-amber-100">
              {lang === 'hi' ? 'विवाह समय, तारीख व दांपत्य जीवन रिपोर्ट' : 'Marriage Timing, Date & Marital Life Analysis'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-amber-200/80 italic font-devanagari max-w-2xl bg-black/40 p-2.5 rounded-lg border border-amber-900/40">
              "{prediction.verse}"
            </p>
          </div>

          {/* Harmony Score Meter */}
          <div className="bg-black/50 border border-amber-700/60 rounded-xl p-4 text-center min-w-[150px] shadow-inner">
            <span className="text-xs text-stone-400 block font-devanagari">दांपत्य सौहार्द स्कोर</span>
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400 font-cinzel">
              {prediction.maritalHarmonyScore}%
            </span>
            <span className="text-[11px] text-emerald-400 block font-medium mt-0.5">
              {prediction.maritalHarmonyScore >= 80 ? 'अति उत्तम योग' : 'मध्यम - उपाय आवश्यक'}
            </span>
          </div>
        </div>
      </div>

      {/* Probable Marriage Timing Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 bg-[#1b0808]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-amber-900/40">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-devanagari text-amber-200">
              {lang === 'hi' ? 'विवाह का सर्वाधिक प्रबल समय व तारीख काल' : 'Most Auspicious Marriage Age & Year Window'}
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 via-red-950/40 to-stone-950 border border-amber-700/50">
            <div className="text-xs text-amber-400 font-semibold mb-1">
              लाल किताब वर्षफल एवं ग्रह गोचर गणना के अनुसार:
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-200 font-cinzel tracking-wide">
              {prediction.probableYearRange}
            </div>
            <p className="text-xs text-amber-300/80 mt-1 font-devanagari">
              इस अवधि में शुक्र, बुध अथवा गुरु की शुभ दृष्टि सक्रिय होगी। रिश्ते तय होने और विवाह संपन्न होने का यह सर्वश्रेष्ठ काल है।
            </p>
          </div>

          {/* Auspicious Ages Pill Grid */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-stone-400 tracking-wider mb-2">
              लाल किताब के अनुसार शुभ विवाह आयु चक्र:
            </h4>
            <div className="flex flex-wrap gap-2">
              {prediction.probableMarriageAges.map((age) => (
                <div
                  key={age}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 ${
                    age === prediction.primaryAuspiciousAge
                      ? 'bg-amber-600 text-stone-950 border-amber-400 shadow-md shadow-amber-900/50'
                      : 'bg-stone-900 text-amber-300 border-amber-900/70'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{age} वर्ष की आयु</span>
                  {age === prediction.primaryAuspiciousAge && <span className="text-[10px] bg-red-950 text-amber-200 px-1 rounded">(मुख्य)</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Partner Qualities */}
          <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>जीवनसाथी का स्वरूप एवं स्वभाव (Partner Attributes):</span>
            </h4>
            <p className="text-xs text-stone-300 font-devanagari leading-relaxed">
              {prediction.partnerCharacteristics}
            </p>
          </div>
        </div>

        {/* Planet Significance in Marriage */}
        <div className="bg-[#1b0808]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-sm font-bold uppercase text-amber-400 tracking-wider pb-2 border-b border-amber-900/40">
              विवाह कारक ग्रह स्थिति
            </h3>
            <div className="mt-3 space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-2 rounded bg-stone-900/70 border border-stone-800">
                <span className="text-stone-400">शुक्र (पत्नी/पति कारक):</span>
                <span className="font-bold text-amber-300">
                  खाना नं० {shukra.house} ({shukra.dignity})
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-stone-900/70 border border-stone-800">
                <span className="text-stone-400">बुध (शादी की रेखा):</span>
                <span className="font-bold text-emerald-400">
                  खाना नं० {budh.house}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-stone-900/70 border border-stone-800">
                <span className="text-stone-400">गुरु (वैवाहिक धर्म):</span>
                <span className="font-bold text-yellow-400">
                  खाना नं० {guru.house}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-stone-900/70 border border-stone-800">
                <span className="text-stone-400">राहु (7वें घर की स्थिति):</span>
                <span className={`font-bold ${rahu.house === 7 ? 'text-red-400' : 'text-stone-300'}`}>
                  खाना नं० {rahu.house} {rahu.house === 7 ? '(सावधानी)' : ''}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-stone-900/70 border border-stone-800">
                <span className="text-stone-400">शनि (7वें घर की स्थिति):</span>
                <span className={`font-bold ${shani.house === 7 ? 'text-yellow-400' : 'text-stone-300'}`}>
                  खाना नं० {shani.house}
                </span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-900/60 text-[11px] text-amber-200">
            <strong>लाल किताब नियम:</strong> 22वें या 25वें वर्ष में यदि शुक्र का दौरा हो, तो विवाह में देरी नहीं करनी चाहिए।
          </div>
        </div>
      </div>

      {/* Cautions and Authentic Lal Kitab Marriage Remedies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Doshas & Cautions */}
        <div className="bg-[#190606]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>विवाह में सावधानियां व दोष निवारण (Cautions & Doshas)</span>
          </div>

          <div className="space-y-2 text-xs">
            {prediction.doshas.map((dosha, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/50 text-amber-200">
                • {dosha}
              </div>
            ))}
            {prediction.cautions.map((caution, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300">
                • {caution}
              </div>
            ))}
          </div>
        </div>

        {/* Prescribed Lal Kitab Marriage Remedies */}
        <div className="bg-[#190606]/90 border border-amber-900/70 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>शीघ्र व सुखी विवाह हेतु लाल किताब अचूक टोटके</span>
          </div>

          <div className="space-y-2 text-xs">
            {prediction.specificRemedies.map((rem, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 text-amber-100 flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{rem}</span>
              </div>
            ))}
            <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300 flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>चांदी का चौकोर टुकड़ा:</strong> बिना टांके की शुद्ध चांदी का 1 इंच चौकोर टुकड़ा हमेशा अपने पास रखें।
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-300 flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>कन्या पूजन:</strong> नवरात्र अथवा बुधवार को छोटी कन्याओं को हरे वस्त्र या फल भेंट करें।
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
