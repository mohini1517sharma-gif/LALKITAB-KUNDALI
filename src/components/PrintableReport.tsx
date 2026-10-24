import React from 'react';
import {
  KundaliInput,
  PlanetPosition,
  HouseInfo,
  KarmicDebt,
  MarriagePrediction,
  WealthPrediction,
  BlackMagicAudit,
  PlanetName,
} from '../types/astrology';
import { PLANETS_METADATA, HOUSES_KNOWLEDGE } from '../data/lalKitabKnowledge';

interface PrintableReportProps {
  input: KundaliInput;
  lagnaSign: number;
  lagnaDegree: number;
  planets: Record<PlanetName, PlanetPosition>;
  houses: HouseInfo[];
  debts: KarmicDebt[];
  marriage: MarriagePrediction;
  wealth: WealthPrediction;
  blackMagic: BlackMagicAudit;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  input,
  lagnaSign,
  lagnaDegree,
  planets,
  houses,
  debts,
  marriage,
  wealth,
  blackMagic,
}) => {
  const activeDebts = debts.filter((d) => d.isActive);

  return (
    <div className="hidden print:block p-8 bg-white text-stone-900 font-sans text-xs max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center pb-4 border-b-2 border-red-900">
        <div className="text-2xl font-bold font-devanagari text-red-900">ॐ</div>
        <h1 className="text-xl font-bold font-devanagari uppercase tracking-wide text-red-950">
          अरुण संहिता - लाल किताब ज्योतिष महा-दस्तावेज
        </h1>
        <p className="text-xs text-stone-600 font-devanagari mt-0.5">
          सॉफ्टवेयर व विश्लेषण: मोहिनी शर्मा | आधारित: 1999 संशोधित संस्करण (हरे कृष्ण ट्रस्ट)
        </p>
      </div>

      {/* Seeker Profile Table */}
      <div className="border border-stone-400 rounded-lg p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50">
        <div>
          <span className="font-bold block text-stone-600">जातक का नाम:</span>
          <span className="text-sm font-semibold">{input.name}</span>
        </div>
        <div>
          <span className="font-bold block text-stone-600">जन्म विवरण:</span>
          <span>{input.dob} ({input.tob})</span>
        </div>
        <div>
          <span className="font-bold block text-stone-600">जन्म स्थान:</span>
          <span>{input.pob}</span>
        </div>
        <div>
          <span className="font-bold block text-stone-600">वर्तमान आयु / लग्न:</span>
          <span>{input.currentAge || 30} वर्ष | {houses[0].signName} ({lagnaDegree}°)</span>
        </div>
      </div>

      {/* 9 Planets Placement Table */}
      <div>
        <h3 className="text-sm font-bold text-red-900 border-b border-stone-300 pb-1 mb-2 font-devanagari">
          1. लाल किताब ग्रह स्थिति व खाना विवरण
        </h3>
        <table className="w-full text-left border-collapse border border-stone-300 text-[11px]">
          <thead>
            <tr className="bg-stone-200">
              <th className="border border-stone-300 p-1.5">ग्रह</th>
              <th className="border border-stone-300 p-1.5">खाना नं०</th>
              <th className="border border-stone-300 p-1.5">राशि / अंश</th>
              <th className="border border-stone-300 p-1.5">हैसियत (Dignity)</th>
              <th className="border border-stone-300 p-1.5">सोया/जागता</th>
              <th className="border border-stone-300 p-1.5">आय मान (रु०)</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(planets) as PlanetName[]).map((pName) => {
              const p = planets[pName];
              const meta = PLANETS_METADATA[pName];
              return (
                <tr key={pName} className="odd:bg-white even:bg-stone-50">
                  <td className="border border-stone-300 p-1.5 font-bold">{meta.hindi}</td>
                  <td className="border border-stone-300 p-1.5">खाना {p.house}</td>
                  <td className="border border-stone-300 p-1.5">{p.signName} ({p.degree}°)</td>
                  <td className="border border-stone-300 p-1.5 font-semibold">
                    {p.dignity === 'Uch' ? 'उच्च' : p.dignity === 'Neech' ? 'नीच' : p.dignity === 'Pakka Ghar' ? 'पक्का घर' : 'सामान्य'}
                  </td>
                  <td className="border border-stone-300 p-1.5">{p.isSleeping ? 'सोया ग्रह' : 'जागता'}</td>
                  <td className="border border-stone-300 p-1.5">{meta.rupeeValue} रु०</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Marriage Timing Section */}
      <div>
        <h3 className="text-sm font-bold text-red-900 border-b border-stone-300 pb-1 mb-2 font-devanagari">
          2. विवाह समय व दांपत्य सुख (फरमान 17)
        </h3>
        <div className="border border-stone-300 rounded p-3 bg-stone-50 space-y-1.5">
          <div>
            <strong>सर्वाधिक प्रबल विवाह काल:</strong> {marriage.probableYearRange} (सौहार्द स्कोर: {marriage.maritalHarmonyScore}%)
          </div>
          <div>
            <strong>जीवनसाथी का स्वभाव व स्वरूप:</strong> {marriage.partnerCharacteristics}
          </div>
          {marriage.doshas.length > 0 && (
            <div>
              <strong>दोष व सावधानियां:</strong> {marriage.doshas.join(' | ')}
            </div>
          )}
          <div>
            <strong>शीघ्र विवाह उपाय:</strong> {marriage.specificRemedies.join('; ')}
          </div>
        </div>
      </div>

      {/* Financial Growth & Wealth Section */}
      <div>
        <h3 className="text-sm font-bold text-red-900 border-b border-stone-300 pb-1 mb-2 font-devanagari">
          3. आर्थिक उन्नति व दौलत की हैसियत (पृष्ठ 424-427)
        </h3>
        <div className="border border-stone-300 rounded p-3 bg-stone-50 space-y-1.5">
          <div>
            <strong>माया के तीन नाम श्रेणी:</strong> {wealth.mayaName} - {wealth.mayaTitle} (कुल आय सूचकांक: {wealth.incomeRupeeIndex} / 70)
          </div>
          <div>
            <strong>दौलत की क्षमता:</strong> {wealth.wealthCapacity}
          </div>
          <div>
            <strong>उन्नति के मुख्य वर्ष:</strong> {wealth.peakAges.map((a) => `${a}वां वर्ष`).join(', ')}
          </div>
          <div>
            <strong>धन बरकत उपाय:</strong> {wealth.wealthRemedies.join('; ')}
          </div>
        </div>
      </div>

      {/* Black Magic & Evil Eye Section */}
      <div>
        <h3 className="text-sm font-bold text-red-900 border-b border-stone-300 pb-1 mb-2 font-devanagari">
          4. नजर दोष व ऊपरी बाधा सुरक्षा (पृष्ठ 54, 245-262)
        </h3>
        <div className="border border-stone-300 rounded p-3 bg-stone-50 space-y-1.5">
          <div>
            <strong>जोखिम स्तर:</strong> {blackMagic.riskLevel} (राहु/केतु/शनि स्थिति अनुसार)
          </div>
          <div>
            <strong>ज्योतिषीय कारक:</strong> {blackMagic.planetaryRoots.join('; ')}
          </div>
          <div>
            <strong>सुरक्षा कवच व तावीज:</strong> {blackMagic.protectionAmulets.join('; ')}
          </div>
          <div>
            <strong>अचूक 43-दिवसीय काट:</strong> {blackMagic.unbreakableRemedies.join('; ')}
          </div>
        </div>
      </div>

      {/* Muhurat & Daily Hours Section */}
      <div>
        <h3 className="text-sm font-bold text-red-900 border-b border-stone-300 pb-1 mb-2 font-devanagari">
          5. लाल किताब दैनिक शुभ मुहूर्त व गतिविधि काल (पृष्ठ 27, 409, 440)
        </h3>
        <div className="border border-stone-300 rounded p-3 bg-stone-50 space-y-1.5 text-[11px]">
          <div>
            <strong>सर्वोत्तम दैनिक प्रहर:</strong> गुरु काल (प्रातः 6-8 AM - ज्ञान व सोना), सूर्य काल (8-10 AM - सरकारी व पद), शुक्र काल (1-3 PM - विवाह व आभूषण), बुध काल (4-6 PM - व्यापार व अनुबंध)।
          </div>
          <div>
            <strong>सफ़र हुक्मनामा (दिशा):</strong> मंगल/बुधवार उत्तर, शुक्रवार/रविवार पश्चिम, सोमवार/शनिवार पूर्व, गुरुवार दक्षिण दिशा में यात्रा विशेष फलदायी होती है।
          </div>
          <div>
            <strong>रिक्ता तिथि निषेध:</strong> चतुर्थी (4), नवमी (9) और चतुर्दशी (14) तिथियों में नए मांगलिक या व्यापारिक कार्यों का आरंभ न करें।
          </div>
        </div>
      </div>

      {/* Karmic Debts Section */}
      <div>
        <h3 className="text-sm font-bold text-red-900 border-b border-stone-300 pb-1 mb-2 font-devanagari">
          6. पितृ व पूर्व जन्म ऋण (ऋण पितु)
        </h3>
        {activeDebts.length === 0 ? (
          <div className="p-2 border border-emerald-300 bg-emerald-50 rounded text-emerald-800">
            आपकी कुण्डली में किसी गंभीर पितृ ऋण का प्रभाव नहीं पाया गया है।
          </div>
        ) : (
          <div className="space-y-2">
            {activeDebts.map((debt) => (
              <div key={debt.id} className="border border-stone-300 rounded p-2.5 bg-stone-50">
                <div className="font-bold text-red-900">{debt.hindiName}</div>
                <div><strong>पूर्वज पाप कारण:</strong> {debt.reason}</div>
                <div><strong>सामूहिक उपाय:</strong> {debt.remedy}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sign-off & Golden Rule */}
      <div className="pt-4 border-t-2 border-stone-300 flex justify-between items-end">
        <div className="text-[11px] text-stone-600 max-w-lg">
          <strong>लाल किताब स्वर्ण नियम:</strong> उपाय सूर्योदय से सूर्यास्त के मध्य ही करें। किसी उपाय को 43 दिन तक बिना नागा (unbroken) पूर्ण करें।
        </div>
        <div className="text-right">
          <div className="font-bold font-devanagari text-red-950 text-sm">मोहिनी शर्मा</div>
          <div className="text-[10px] text-stone-500">लाल किताब ज्योतिष विशारद</div>
        </div>
      </div>
    </div>
  );
};
