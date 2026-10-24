import React, { useState } from 'react';
import { Hand, Eye, Sparkles, CheckCircle2, Info, Compass } from 'lucide-react';

interface PalmistrySamudrikTabProps {
  lang: 'hi' | 'en';
}

export const PalmistrySamudrikTab: React.FC<PalmistrySamudrikTabProps> = ({ lang }) => {
  const [selectedFeature, setSelectedFeature] = useState<'fish' | 'triangle' | 'forehead' | 'toes'>('fish');

  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-[#220a0a] to-amber-950 border border-amber-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Hand className="w-4 h-4 text-amber-400" />
          <span>अरुण संहिता - इल्म सामुद्रिक व हस्त रेखा विज्ञान (पृष्ठ 58-63, 356-425)</span>
        </div>
        <h2 className="text-2xl font-bold font-devanagari text-amber-100">
          {lang === 'hi' ? 'हथेली व शरीर लक्षणों से कुण्डली की दुरुस्ती' : 'Lal Kitab Palmistry & Ilm Samudrik Correlations'}
        </h2>
        <p className="mt-1 text-xs text-amber-200/80 font-devanagari max-w-3xl">
          "इल्म सामुद्रिक की ज्ञान की नींव पर आधारित ज्योतिष की सहायता से हाथ रेखा के द्वारा दुरुस्त की हुई जन्म कुण्डली से ज़िन्दगी के हालात देखने के लिए।"
        </p>
      </div>

      {/* Feature Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setSelectedFeature('fish')}
          className={`p-3 rounded-xl border text-center transition-all ${
            selectedFeature === 'fish'
              ? 'bg-amber-950 text-amber-200 border-amber-500 shadow-lg'
              : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
          }`}
        >
          <div className="text-xs font-bold font-devanagari">मच्छ रेखा (Fish Mark)</div>
          <div className="text-[10px] text-stone-400 mt-0.5">शनि व केतु की शुभ निशानी</div>
        </button>

        <button
          onClick={() => setSelectedFeature('triangle')}
          className={`p-3 rounded-xl border text-center transition-all ${
            selectedFeature === 'triangle'
              ? 'bg-amber-950 text-amber-200 border-amber-500 shadow-lg'
              : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
          }`}
        >
          <div className="text-xs font-bold font-devanagari">बड़ा त्रिकोण (Great Triangle)</div>
          <div className="text-[10px] text-stone-400 mt-0.5">आयु, मस्तिष्क व स्वास्थ्य रेखा</div>
        </button>

        <button
          onClick={() => setSelectedFeature('forehead')}
          className={`p-3 rounded-xl border text-center transition-all ${
            selectedFeature === 'forehead'
              ? 'bg-amber-950 text-amber-200 border-amber-500 shadow-lg'
              : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
          }`}
        >
          <div className="text-xs font-bold font-devanagari">माथे की रेखाएं (Forehead)</div>
          <div className="text-[10px] text-stone-400 mt-0.5">खाना नं० 2 व पेशानी भेद</div>
        </button>

        <button
          onClick={() => setSelectedFeature('toes')}
          className={`p-3 rounded-xl border text-center transition-all ${
            selectedFeature === 'toes'
              ? 'bg-amber-950 text-amber-200 border-amber-500 shadow-lg'
              : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
          }`}
        >
          <div className="text-xs font-bold font-devanagari">पांव के अंगूठे व उंगलियां</div>
          <div className="text-[10px] text-stone-400 mt-0.5">केतु, सफर व औलाद का रुख</div>
        </button>
      </div>

      {/* Feature Content */}
      <div className="bg-[#1b0808]/90 border border-amber-900/80 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4">
        {selectedFeature === 'fish' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-devanagari text-amber-200 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>मच्छ रेखा (Fish Mark) - अरुण संहिता पृष्ठ 62, 204, 386</span>
            </h3>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              लाल किताब में मच्छ रेखा को सबसे शुभ व चमत्कारी चिन्ह माना गया है। यदि यह केतु के पर्वत (कलाई के ऊपर) या शनि के पर्वत पर स्थित हो, तो व्यक्ति गरीब घर में भी जन्म लेकर राजा अथवा करोड़पति बन जाता है।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1.5">
                <span className="font-bold text-amber-300">शुभ प्रभाव (Nek Asar):</span>
                <p className="text-stone-300 font-devanagari">
                  अकाल मृत्यु से रक्षा, शत्रुओं के षड्यंत्रों का स्वतः खंडन, और 48वें वर्ष में अपार संपदा का आगमन।
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1.5">
                <span className="font-bold text-amber-300">काग रेखा से अंतर (Vs Crow Mark):</span>
                <p className="text-stone-300 font-devanagari">
                  काग रेखा होने पर धन की फिजूलखर्ची और भटकन होती है, जबकि मच्छ रेखा दौलत को तिजोरी में बांधकर रखती है।
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedFeature === 'triangle' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-devanagari text-amber-200 flex items-center space-x-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>बड़ा त्रिकोण - आयु, सिर व स्वास्थ्य रेखा (पृष्ठ 405-407)</span>
            </h3>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              हथेली के मध्य में सिर रेखा (Head Line), आयु रेखा (Life Line) और स्वास्थ्य/व्यापार रेखा (Mercury Line) मिलकर जो महा-त्रिकोण बनाते हैं, वह जातक के जीवन, बुद्धि और धन की सुरक्षा का दुर्ग है।
            </p>
            <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 text-xs text-amber-200 font-devanagari">
              यदि यह त्रिकोण पूर्णतः बंद हो और कोई रेखा टूटी न हो, तो जातक कभी कर्जदार नहीं होता और अपनी बचत से विशाल साम्राज्य खड़ा करता है।
            </div>
          </div>
        )}

        {selectedFeature === 'forehead' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-devanagari text-amber-200 flex items-center space-x-2">
              <Eye className="w-5 h-5 text-amber-400" />
              <span>माथे की रेखाएं (Forehead Lines) - पृष्ठ 44-45, 435</span>
            </h3>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              लाल किताब में मस्तक (पेशानी) को खाना नं० 2 और गुरु का स्थान माना गया है।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                <span className="font-bold text-yellow-300 block mb-1">1 से 2 स्पष्ट रेखाएं:</span>
                <span className="text-stone-300">स्वाभिमानी, 30 से 60 वर्ष तक अखंड सुख।</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                <span className="font-bold text-yellow-300 block mb-1">3 से 4 रेखाएं:</span>
                <span className="text-stone-300">दीर्घायु (80 से 100 वर्ष), विद्वान एवं समाज सुधारक।</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800">
                <span className="font-bold text-yellow-300 block mb-1">टूटी-फूटी रेखाएं:</span>
                <span className="text-stone-300">अल्पायु भय व मानसिक चिंताएं - केसर तिलक नित्य लगाएं।</span>
              </div>
            </div>
          </div>
        )}

        {selectedFeature === 'toes' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-devanagari text-amber-200 flex items-center space-x-2">
              <Info className="w-5 h-5 text-amber-400" />
              <span>पांव के लक्षण व केतु का संबंध - पृष्ठ 247, 360</span>
            </h3>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              "पांव की उंगलियां बराबर हों तो हुक्मरान हो, एक दूसरे से बड़ी हों तो साहिबे संतान हो।"
            </p>
            <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 text-xs text-stone-300 font-devanagari">
              पांव के अंगूठे के पास की तर्जनी उंगली यदि अंगूठे से बड़ी हो, तो जातक साहसी और जीवनसाथी पर अपना अधिकार रखने वाला होता है। यदि अंगूठा छोटा हो तो केतु का मंदा असर हो सकता है, जिसके लिए कान में सोना पहनना चाहिए।
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
