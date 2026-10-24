/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { KundaliForm } from './components/KundaliForm';
import { OverviewTab } from './components/tabs/OverviewTab';
import { MarriageReportTab } from './components/tabs/MarriageReportTab';
import { FinancialGrowthTab } from './components/tabs/FinancialGrowthTab';
import { BlackMagicProtectionTab } from './components/tabs/BlackMagicProtectionTab';
import { KarmicDebtsTab } from './components/tabs/KarmicDebtsTab';
import { PlanetaryAnalysisTab } from './components/tabs/PlanetaryAnalysisTab';
import { VarshphalTab } from './components/tabs/VarshphalTab';
import { PalmistrySamudrikTab } from './components/tabs/PalmistrySamudrikTab';
import { MuhuratTab } from './components/tabs/MuhuratTab';
import { PersonalizedGuidanceTab } from './components/tabs/PersonalizedGuidanceTab';
import { PrintableReport } from './components/PrintableReport';
import { SavedKundalisModal } from './components/modals/SavedKundalisModal';
import { RemedyTrackerModal } from './components/modals/RemedyTrackerModal';
import { KundaliInput, PlanetName } from './types/astrology';
import {
  computePlanetaryPositions,
  buildHousesInfo,
  calculateLalKitabAspects,
  evaluateKarmicDebts,
  evaluateMarriageReport,
  evaluateWealthReport,
  evaluateBlackMagicDefense,
  POPULAR_CITIES,
} from './utils/astronomicalCalculator';
import {
  Sparkles,
  Heart,
  Coins,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Hand,
  Bot,
  Layers,
  BookOpen,
  Calendar,
  Clock,
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState<boolean>(false);

  // Initial Seeker Input (Default demo for Mohini Sharma or configurable)
  const defaultCity = POPULAR_CITIES.find((c) => c.name === 'Chandigarh')!;
  const [seekerInput, setSeekerInput] = useState<KundaliInput>({
    name: 'मोहिनी शर्मा (Mohini Sharma)',
    gender: 'female',
    dob: '1992-08-15',
    tob: '10:15',
    pob: defaultCity.name,
    lat: defaultCity.lat,
    lng: defaultCity.lng,
    currentAge: 34,
    majorObstacle: 'जीवन के मुख्य मार्ग में स्थायी आर्थिक समृद्धि, विवाह सुख और परिवार की सुरक्षा',
  });

  // Calculate Astronomical & Lal Kitab Chart Data
  const chartData = useMemo(() => {
    const { lagnaSign, lagnaDegree, planets } = computePlanetaryPositions(
      seekerInput.dob,
      seekerInput.tob,
      seekerInput.lat || defaultCity.lat,
      seekerInput.lng || defaultCity.lng
    );

    const houses = buildHousesInfo(planets, false);
    const aspects = calculateLalKitabAspects(houses);
    const debts = evaluateKarmicDebts(planets);

    const birthYear = parseInt(seekerInput.dob.split('-')[0], 10) || 1990;
    const marriage = evaluateMarriageReport(planets, birthYear);
    const wealth = evaluateWealthReport(planets, seekerInput.currentAge || 30);
    const blackMagic = evaluateBlackMagicDefense(planets);

    return {
      lagnaSign,
      lagnaDegree,
      planets,
      houses,
      aspects,
      debts,
      marriage,
      wealth,
      blackMagic,
    };
  }, [seekerInput, defaultCity]);

  const handleFormSubmit = (values: KundaliInput) => {
    setSeekerInput(values);
    setActiveTab('overview');
  };

  const handlePrint = () => {
    window.print();
  };

  const tabList = [
    { id: 'overview', nameHi: 'कुण्डली सारांश', nameEn: 'Overview', icon: Layers },
    { id: 'muhurat', nameHi: 'शुभ मुहूर्त व काल', nameEn: 'Muhurat', icon: Clock, badge: 'पंचांग' },
    { id: 'marriage', nameHi: 'विवाह तारीख व समय', nameEn: 'Marriage Date', icon: Heart, badge: 'विशेष' },
    { id: 'wealth', nameHi: 'आर्थिक उन्नति व माया', nameEn: 'Financial Growth', icon: Coins, badge: 'रुपया' },
    { id: 'blackmagic', nameHi: 'नजर दोष व तंत्र रक्षा', nameEn: 'Black Magic Defense', icon: ShieldAlert, badge: 'अचूक' },
    { id: 'debts', nameHi: '8 पितृ ऋण निवारण', nameEn: '8 Karmic Debts', icon: AlertTriangle },
    { id: 'planets', nameHi: '9 ग्रह फरमान विश्लेषण', nameEn: '9 Planets', icon: BookOpen },
    { id: 'varshphal', nameHi: '35 साला वर्षफल', nameEn: 'Varshphal', icon: RotateCcw },
    { id: 'samudrik', nameHi: 'सामुद्रिक व हस्त रेखा', nameEn: 'Palmistry', icon: Hand },
    { id: 'guidance', nameHi: 'व्यक्तिगत AI मार्गदर्शन', nameEn: 'AI Guidance', icon: Bot, badge: 'लाइव' },
  ];

  return (
    <div className="min-h-screen bg-[#110404] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black font-devanagari">
      {/* Top Header Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onPrint={handlePrint}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenTrackerModal={() => setIsTrackerModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 no-print">
        {/* Hero Banner with Heritage Seal */}
        <div className="bg-gradient-to-r from-red-950 via-[#220707] to-stone-950 border border-amber-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-900/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>अरुण संहिता - लाल किताब (1999 संस्करण) सॉफ्टवेयर</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-300">
              LAL KITAB ASTROLOGY SYSTEM
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-2xl leading-relaxed font-devanagari">
              ज्योतिष मोहिनी शर्मा द्वारा विकसित यह संपूर्ण सॉफ्टवेयर स्वचालित कुण्डली निर्माण, वर्षफल चक्र, विवाह की तिथि व आयु, आर्थिक उन्नति (माया के नाम), नजर दोष व तांत्रिक बाधा निवारण तथा जीवन की प्रमुख बाधाओं का अचूक लाल किताब समाधान प्रस्तुत करता है।
            </p>
          </div>

          <div className="z-10 shrink-0 flex flex-col items-center p-4 bg-stone-950/70 border border-amber-700/60 rounded-2xl shadow-xl text-center min-w-[200px]">
            <div className="text-3xl text-amber-400 font-bold font-devanagari">ॐ श्री गणेशाय नमः</div>
            <span className="text-[11px] text-amber-300 font-semibold mt-1">हरे कृष्ण ट्रस्ट परंपरा</span>
            <div className="mt-2 text-[10px] text-stone-400 border-t border-amber-900/60 pt-1.5">
              43 दिवसीय अचूक उपाय विधान
            </div>
          </div>
        </div>

        {/* Input Form Section */}
        <KundaliForm
          initialValues={seekerInput}
          onSubmit={handleFormSubmit}
          lang={lang}
        />

        {/* Modern Astrological Tabs Header */}
        <div className="bg-[#180505]/95 backdrop-blur border border-amber-900/70 rounded-2xl p-1.5 shadow-xl overflow-x-auto">
          <nav className="flex space-x-1 min-w-max">
            {tabList.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-red-700 via-amber-700 to-yellow-600 text-stone-950 font-bold shadow-lg shadow-red-950/80'
                      : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{lang === 'hi' ? tab.nameHi : tab.nameEn}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-red-950 text-amber-200'
                          : 'bg-red-950/80 text-amber-300 border border-amber-800/60'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Tab Content Area */}
        <div className="pt-2">
          {activeTab === 'overview' && (
            <OverviewTab
              input={seekerInput}
              lagnaSign={chartData.lagnaSign}
              lagnaDegree={chartData.lagnaDegree}
              planets={chartData.planets}
              houses={chartData.houses}
              aspects={chartData.aspects}
              debts={chartData.debts}
              marriage={chartData.marriage}
              wealth={chartData.wealth}
              blackMagic={chartData.blackMagic}
              onTabChange={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'muhurat' && (
            <MuhuratTab
              planets={chartData.planets}
              lang={lang}
            />
          )}

          {activeTab === 'marriage' && (
            <MarriageReportTab
              prediction={chartData.marriage}
              planets={chartData.planets}
              lang={lang}
            />
          )}

          {activeTab === 'wealth' && (
            <FinancialGrowthTab
              prediction={chartData.wealth}
              planets={chartData.planets}
              lang={lang}
            />
          )}

          {activeTab === 'blackmagic' && (
            <BlackMagicProtectionTab
              audit={chartData.blackMagic}
              planets={chartData.planets}
              lang={lang}
            />
          )}

          {activeTab === 'debts' && (
            <KarmicDebtsTab
              debts={chartData.debts}
              lang={lang}
            />
          )}

          {activeTab === 'planets' && (
            <PlanetaryAnalysisTab
              planets={chartData.planets}
              lang={lang}
            />
          )}

          {activeTab === 'varshphal' && (
            <VarshphalTab
              planets={chartData.planets}
              currentAge={seekerInput.currentAge || 30}
              lang={lang}
            />
          )}

          {activeTab === 'samudrik' && (
            <PalmistrySamudrikTab
              lang={lang}
            />
          )}

          {activeTab === 'guidance' && (
            <PersonalizedGuidanceTab
              input={seekerInput}
              planets={chartData.planets}
              debts={chartData.debts}
              marriage={chartData.marriage}
              wealth={chartData.wealth}
              lang={lang}
            />
          )}
        </div>
      </main>

      {/* Printable Report Component (hidden on screen, visible only when printing / saving PDF) */}
      <PrintableReport
        input={seekerInput}
        lagnaSign={chartData.lagnaSign}
        lagnaDegree={chartData.lagnaDegree}
        planets={chartData.planets}
        houses={chartData.houses}
        debts={chartData.debts}
        marriage={chartData.marriage}
        wealth={chartData.wealth}
        blackMagic={chartData.blackMagic}
      />

      {/* Cloud Storage & Remedy Tracker Modals */}
      <SavedKundalisModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onLoadKundali={(loaded) => setSeekerInput(loaded)}
        currentKundali={seekerInput}
      />

      <RemedyTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-amber-950 bg-[#0c0303] text-stone-400 text-xs no-print text-center space-y-2">
        <p className="font-devanagari text-amber-300/80">
          अरुण संहिता - लाल किताब (1999 संशोधित संस्करण) | सॉफ्टवेयर परिकल्पना व निर्माण: <strong>मोहिनी शर्मा</strong>
        </p>
        <p className="text-[11px] text-stone-500">
          © {new Date().getFullYear()} Lal Kitab Amrit Software. "नेकी खुद करते रहो, मदद मालिक अपनी देगा।" (फरमान 18)
        </p>
      </footer>
    </div>
  );
}
