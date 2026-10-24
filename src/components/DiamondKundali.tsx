import React, { useState } from 'react';
import { PlanetPosition, HouseInfo, PlanetName } from '../types/astrology';
import { PLANETS_METADATA, HOUSES_KNOWLEDGE } from '../data/lalKitabKnowledge';
import { Info, Sparkles, Eye, ShieldAlert, Moon } from 'lucide-react';

interface DiamondKundaliProps {
  houses: HouseInfo[];
  title?: string;
  chartType?: 'lagna' | 'chandra' | 'varshphal';
  onHouseSelect?: (houseNum: number) => void;
  lang: 'hi' | 'en';
}

export const DiamondKundali: React.FC<DiamondKundaliProps> = ({
  houses,
  title = 'लाल किताब जन्म कुण्डली (लग्न टेवा)',
  chartType = 'lagna',
  onHouseSelect,
  lang,
}) => {
  const [selectedHouse, setSelectedHouse] = useState<number>(1);
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);

  // House coordinates for rendering in SVG 400x400
  // Standard North Indian Vedic Kundali geometry:
  // (0,0) to (400,400)
  // House 1: (200,0) -> (100,100) -> (200,200) -> (300,100)
  // House 2: (0,0) -> (200,0) -> (100,100)
  // House 3: (0,0) -> (100,100) -> (0,200)
  // House 4: (0,200) -> (100,100) -> (200,200) -> (100,300)
  // House 5: (0,200) -> (100,300) -> (0,400)
  // House 6: (0,400) -> (100,300) -> (200,400)
  // House 7: (200,200) -> (100,300) -> (200,400) -> (300,300)
  // House 8: (200,400) -> (300,300) -> (400,400)
  // House 9: (400,200) -> (300,300) -> (400,400)
  // House 10: (200,200) -> (300,100) -> (400,200) -> (300,300)
  // House 11: (400,0) -> (300,100) -> (400,200)
  // House 12: (200,0) -> (300,100) -> (400,0)

  const housePolygons: Record<number, string> = {
    1: '200,0 100,100 200,200 300,100',
    2: '0,0 200,0 100,100',
    3: '0,0 100,100 0,200',
    4: '0,200 100,100 200,200 100,300',
    5: '0,200 100,300 0,400',
    6: '0,400 100,300 200,400',
    7: '200,200 100,300 200,400 300,300',
    8: '200,400 300,300 400,400',
    9: '400,200 300,300 400,400',
    10: '200,200 300,100 400,200 300,300',
    11: '400,0 300,100 400,200',
    12: '200,0 300,100 400,0',
  };

  // Center coordinates for labels and planet list placement
  const houseTextPos: Record<number, { x: number; y: number; numX: number; numY: number }> = {
    1: { x: 200, y: 110, numX: 200, numY: 45 },
    2: { x: 100, y: 55, numX: 165, numY: 30 },
    3: { x: 45, y: 100, numX: 30, numY: 165 },
    4: { x: 105, y: 200, numX: 165, numY: 200 },
    5: { x: 45, y: 300, numX: 30, numY: 235 },
    6: { x: 100, y: 345, numX: 165, numY: 375 },
    7: { x: 200, y: 290, numX: 200, numY: 355 },
    8: { x: 300, y: 345, numX: 235, numY: 375 },
    9: { x: 355, y: 300, numX: 370, numY: 235 },
    10: { x: 295, y: 200, numX: 235, numY: 200 },
    11: { x: 355, y: 100, numX: 370, numY: 165 },
    12: { x: 300, y: 55, numX: 235, numY: 30 },
  };

  const getPlanetAbbr = (name: PlanetName): string => {
    switch (name) {
      case 'Surya': return 'सू';
      case 'Chandra': return 'चं';
      case 'Mangal': return 'मं';
      case 'Budh': return 'बु';
      case 'Guru': return 'बृ';
      case 'Shukra': return 'शु';
      case 'Shani': return 'श';
      case 'Rahu': return 'रा';
      case 'Ketu': return 'के';
      default: return name;
    }
  };

  const currentHouseDetails = houses.find((h) => h.houseNumber === selectedHouse) || houses[0];

  return (
    <div className="bg-[#1b0808]/90 border border-amber-900/80 rounded-2xl p-4 sm:p-6 shadow-2xl">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-900/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
          <h3 className="font-bold text-lg font-devanagari text-amber-200">{title}</h3>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
            {chartType === 'lagna' ? '12 पक्के खाने' : chartType === 'chandra' ? 'चन्द्र लग्न (Farman 13)' : '35 साला वर्षफल'}
          </span>
          <span className="text-stone-400 hidden sm:inline">क्लिक कर खाने का भेद जानें</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Diamond Chart Canvas */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-square bg-[#0f0404] p-2 sm:p-3 rounded-2xl border-2 border-amber-600/60 shadow-inner">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-md select-none font-sans"
            >
              {/* Defs for gradients & patterns */}
              <defs>
                <linearGradient id="kundaliBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#220909" />
                  <stop offset="50%" stopColor="#180505" />
                  <stop offset="100%" stopColor="#2e0c0c" />
                </linearGradient>
                <linearGradient id="selectedGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>

              {/* Background */}
              <rect width="400" height="400" fill="url(#kundaliBg)" />

              {/* Outer boundary */}
              <rect x="0" y="0" width="400" height="400" fill="none" stroke="url(#goldBorder)" strokeWidth="3" />

              {/* Diagonals */}
              <line x1="0" y1="0" x2="400" y2="400" stroke="#b45309" strokeWidth="1.5" strokeOpacity="0.8" />
              <line x1="400" y1="0" x2="0" y2="400" stroke="#b45309" strokeWidth="1.5" strokeOpacity="0.8" />

              {/* Inner Diamond */}
              <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.9" />

              {/* 12 House Interactive Polygons */}
              {Object.entries(housePolygons).map(([hNumStr, points]) => {
                const hNum = parseInt(hNumStr, 10);
                const isSelected = selectedHouse === hNum;
                const isHovered = hoveredHouse === hNum;
                const house = houses.find((h) => h.houseNumber === hNum);
                const hasPlanets = house && house.planets.length > 0;
                const isSleeping = house?.isSleeping;

                return (
                  <polygon
                    key={hNum}
                    points={points}
                    onClick={() => {
                      setSelectedHouse(hNum);
                      if (onHouseSelect) onHouseSelect(hNum);
                    }}
                    onMouseEnter={() => setHoveredHouse(hNum)}
                    onMouseLeave={() => setHoveredHouse(null)}
                    fill={
                      isSelected
                        ? 'url(#selectedGlow)'
                        : isHovered
                        ? '#450a0a'
                        : isSleeping
                        ? '#140606'
                        : '#1c0808'
                    }
                    stroke={isSelected ? '#fbbf24' : isHovered ? '#f59e0b' : '#92400e'}
                    strokeWidth={isSelected ? '2.5' : '1.2'}
                    className="cursor-pointer transition-all duration-200"
                  />
                );
              })}

              {/* House Number and Planets overlay */}
              {houses.map((house) => {
                const pos = houseTextPos[house.houseNumber];
                const isSelected = selectedHouse === house.houseNumber;

                return (
                  <g key={house.houseNumber} className="pointer-events-none">
                    {/* House number (Rashi in Lal Kitab fixed chart) */}
                    <text
                      x={pos.numX}
                      y={pos.numY}
                      fill={isSelected ? '#fef08a' : '#fbbf24'}
                      fontSize="13"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="opacity-90 drop-shadow"
                    >
                      {house.houseNumber}
                    </text>

                    {/* Planets sitting in house */}
                    {house.planets.length > 0 ? (
                      <g transform={`translate(${pos.x}, ${pos.y})`}>
                        {house.planets.map((p, idx) => {
                          const yOffset = (idx - (house.planets.length - 1) / 2) * 16;
                          const meta = PLANETS_METADATA[p.name];
                          return (
                            <g key={p.name} transform={`translate(0, ${yOffset})`}>
                              <text
                                x="0"
                                y="0"
                                fill={meta.color}
                                fontSize={house.planets.length > 3 ? '11' : '13'}
                                fontWeight="800"
                                textAnchor="middle"
                                dominantBaseline="central"
                                className="drop-shadow-md font-devanagari"
                              >
                                {getPlanetAbbr(p.name)}
                                {p.isRetrograde ? '(व)' : ''}
                                {p.dignity === 'Uch' ? '↑' : p.dignity === 'Neech' ? '↓' : ''}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    ) : (
                      // Sleeping House badge
                      <g transform={`translate(${pos.x}, ${pos.y})`}>
                        <text
                          x="0"
                          y="0"
                          fill="#78716c"
                          fontSize="10"
                          fontWeight="normal"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="italic font-devanagari opacity-60"
                        >
                          (सोया)
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected House Interactive Insight Card */}
        <div className="lg:col-span-5 bg-[#140505]/95 border border-amber-900/60 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-amber-900/40">
              <span className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
                लाल किताब खाना विश्लेषण
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-950 text-amber-300 border border-amber-700 font-bold">
                खाना नं० {currentHouseDetails.houseNumber}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold font-devanagari text-amber-200 mt-2">
              {HOUSES_KNOWLEDGE[currentHouseDetails.houseNumber].nameHindi}
            </h4>

            {/* Pakka Ghar and Awakening details */}
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-stone-800/60">
                <span className="text-stone-400">पक्का घर (Permanent Home):</span>
                <span className="font-semibold text-amber-300">
                  {HOUSES_KNOWLEDGE[currentHouseDetails.houseNumber].pakkaGharOf
                    .map((p) => PLANETS_METADATA[p].hindi)
                    .join(', ')}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-stone-800/60">
                <span className="text-stone-400">किस्मत जगाने वाला ग्रह:</span>
                <span className="font-semibold text-emerald-400">
                  {PLANETS_METADATA[HOUSES_KNOWLEDGE[currentHouseDetails.houseNumber].kismatJagaaneWala].hindi}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-stone-800/60">
                <span className="text-stone-400">शरीर व सामुद्रिक अंग:</span>
                <span className="text-amber-200">{HOUSES_KNOWLEDGE[currentHouseDetails.houseNumber].bodyPart}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-stone-400">स्वाभाविक जागरण आयु:</span>
                <span className="text-yellow-300 font-medium">
                  {HOUSES_KNOWLEDGE[currentHouseDetails.houseNumber].soyaAwakeningAge} वर्ष की उम्र में
                </span>
              </div>
            </div>

            {/* Planets in this House */}
            <div className="mt-4">
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-2 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>इस खाने में उपस्थित ग्रह ({currentHouseDetails.planets.length}):</span>
              </h5>
              {currentHouseDetails.planets.length === 0 ? (
                <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-400 text-xs">
                  यह खाना अभी <strong>सोया हुआ (Sleeping House)</strong> है। इसे जगाने के लिए{' '}
                  <span className="text-amber-300 font-semibold">
                    {PLANETS_METADATA[currentHouseDetails.awakenerPlanet].hindi}
                  </span>{' '}
                  की वस्तुओं का सदुपयोग व उपाय करें।
                </div>
              ) : (
                <div className="space-y-2">
                  {currentHouseDetails.planets.map((p) => {
                    const meta = PLANETS_METADATA[p.name];
                    return (
                      <div
                        key={p.name}
                        className="p-2.5 rounded-lg bg-[#240b0b] border border-amber-800/50 text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-amber-200 text-sm">{meta.hindi}</span>
                          <span className="ml-2 text-stone-400 text-[11px] font-mono">
                            {p.degree}° ({p.signName})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          {p.dignity === 'Uch' && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                              उच्च
                            </span>
                          )}
                          {p.dignity === 'Neech' && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 text-[10px] font-bold border border-rose-800">
                              नीच
                            </span>
                          )}
                          {p.dignity === 'Pakka Ghar' && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-800">
                              पक्का घर
                            </span>
                          )}
                          {p.isDharmi && (
                            <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-bold border border-indigo-800">
                              धर्मी
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick House Selector */}
          <div className="pt-2 border-t border-amber-900/40">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
              <span>अन्य खाने देखें:</span>
              <span className="text-[11px] text-amber-400">1 से 12 तक</span>
            </div>
            <div className="grid grid-cols-6 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setSelectedHouse(num);
                    if (onHouseSelect) onHouseSelect(num);
                  }}
                  className={`py-1 text-xs rounded transition-all font-semibold ${
                    selectedHouse === num
                      ? 'bg-amber-600 text-stone-950 font-bold shadow'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
