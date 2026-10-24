import React, { useState } from 'react';
import { KundaliInput, PlanetPosition, KarmicDebt, MarriagePrediction, WealthPrediction } from '../../types/astrology';
import { Sparkles, Send, Bot, ShieldCheck, RefreshCw, AlertCircle, BookOpen } from 'lucide-react';

interface PersonalizedGuidanceTabProps {
  input: KundaliInput;
  planets: Record<string, PlanetPosition>;
  debts: KarmicDebt[];
  marriage: MarriagePrediction;
  wealth: WealthPrediction;
  lang: 'hi' | 'en';
}

export const PersonalizedGuidanceTab: React.FC<PersonalizedGuidanceTabProps> = ({
  input,
  planets,
  debts,
  marriage,
  wealth,
  lang,
}) => {
  const [question, setQuestion] = useState<string>(
    input.majorObstacle || 'मेरे जीवन की मुख्य बाधा, विवाह की निश्चित तारीख व आर्थिक संपन्नता हेतु लाल किताब मार्गदर्शन प्रदान करें।'
  );
  const [guidanceResponse, setGuidanceResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const activeDebtsList = debts.filter((d) => d.isActive).map((d) => d.hindiName);

  const fetchGuidance = async () => {
    setLoading(true);
    setError(null);

    // Form planetary mapping
    const planetHouses: Record<string, number> = {};
    Object.entries(planets).forEach(([pName, pos]) => {
      planetHouses[pName] = pos.house;
    });

    try {
      const res = await fetch('/api/guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: input.name,
          gender: input.gender,
          dob: input.dob,
          tob: input.tob,
          pob: input.pob,
          currentAge: input.currentAge || 30,
          majorObstacle: question,
          planetaryPositions: planetHouses,
          debts: activeDebtsList,
          marriageYear: marriage.probableYearRange,
          wealthIndex: `${wealth.incomeRupeeIndex} रु० (${wealth.mayaName})`,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate guidance');
      }

      const data = await res.json();
      if (data.guidance) {
        setGuidanceResponse(data.guidance);
      } else {
        throw new Error('Empty response');
      }
    } catch (err: unknown) {
      console.error(err);
      setError('परामर्श प्राप्त करने में समस्या हुई। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-[#2d0909] to-amber-950 border border-amber-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>अरुण संहिता - लाल किताब व्यक्तिगत परामर्श केंद्र | मोहिनी शर्मा</span>
        </div>
        <h2 className="text-2xl font-bold font-devanagari text-amber-100">
          {lang === 'hi' ? 'जीवन बाधा निवारण व अचूक मार्गदर्शन' : 'Personalized Obstacle Resolution & Divine Guidance'}
        </h2>
        <p className="mt-1 text-xs text-amber-200/80 font-devanagari max-w-3xl">
          आपकी जन्म कुण्डली, सक्रिय ऋणों, विवाह काल और धन सूचकांक के आधार पर लाल किताब सिद्धांतों के अनुसार व्यक्तिगत अचूक मार्गदर्शन प्राप्त करें।
        </p>
      </div>

      {/* Input Consultation Box */}
      <div className="bg-[#1b0808]/90 border border-amber-900/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-devanagari">
            आप अपनी किस मुख्य बाधा या जीवन प्रश्न का समाधान चाहते हैं?
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <textarea
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="अपनी समस्या विस्तार से लिखें..."
              className="w-full bg-[#110505] border border-amber-900/80 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-stone-600 focus:outline-none font-devanagari"
            />
            <button
              onClick={fetchGuidance}
              disabled={loading}
              className="sm:w-48 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-700 hover:from-red-500 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-red-950/60 flex items-center justify-center space-x-2 transition-all disabled:opacity-60 cursor-pointer self-stretch sm:self-auto shrink-0"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                  <span>परामर्श जारी...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-stone-950" />
                  <span>समाधान प्राप्त करें</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
          <span className="text-stone-400 text-[11px]">त्वरित प्रश्न:</span>
          {[
            'विवाह की निश्चित तिथि व दांपत्य सुख',
            'व्यापार में अचानक रुकावट व धन वृद्धि',
            'नजर दोष, ऊपरी बाधा व बुरे स्वप्न से मुक्ति',
            'कोर्ट केस, शत्रु भय व मानसिक अशांति',
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuestion(suggestion);
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-800 text-[11px] font-devanagari transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Response Box */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center space-x-2 font-devanagari">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {guidanceResponse && (
        <div className="bg-[#180606] border-2 border-amber-600/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-amber-900/60">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-amber-700 flex items-center justify-center text-amber-100 font-bold">
                <BookOpen className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-devanagari text-amber-200">
                  लाल किताब विशेष परामर्श संदेश | मोहिनी शर्मा
                </h3>
                <span className="text-[11px] text-stone-400 font-devanagari">
                  जातक: {input.name} | आयु: {input.currentAge || 30} वर्ष
                </span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="text-xs px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-900"
            >
              प्रिंट करें
            </button>
          </div>

          {/* Formatted Markdown Content */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-stone-200 font-devanagari leading-relaxed space-y-4">
            {guidanceResponse.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('###') || paragraph.startsWith('**') && paragraph.includes(':')) {
                return (
                  <h4 key={idx} className="text-base font-bold text-amber-300 pt-2 border-t border-amber-900/30">
                    {paragraph.replace(/###|\*\*/g, '')}
                  </h4>
                );
              }
              return (
                <p key={idx} className="text-stone-300">
                  {paragraph.replace(/\*\*/g, '')}
                </p>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/50 text-xs text-amber-200/90 font-devanagari">
            <strong>लाल किताब नियम (43 दिन की मियाद):</strong> "हर उपाय की मियाद 40 या अधिक से अधिक 43 दिन है। कुल की बेहतरी के लिए उपाय की अवधि 40-43 हफ्तेवार करना है। उपाय बीच में हटना नहीं चाहिए।" (अरुण संहिता पृष्ठ 44)
          </div>
        </div>
      )}
    </div>
  );
};
