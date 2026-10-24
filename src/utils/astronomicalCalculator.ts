import {
  PlanetName,
  PlanetPosition,
  HouseInfo,
  Dignity,
  AspectRelation,
  KarmicDebt,
  MarriagePrediction,
  WealthPrediction,
  BlackMagicAudit,
  VarshphalRecord,
} from '../types/astrology';
import {
  PLANETS_METADATA,
  HOUSES_KNOWLEDGE,
  LAL_KITAB_DEBTS,
  LAL_KITAB_MARRIAGE_RULES,
  MAYA_NAMES,
} from '../data/lalKitabKnowledge';

export const ZODIAC_SIGNS = [
  'मेष (Aries)',
  'वृषभ (Taurus)',
  'मिथुन (Gemini)',
  'कर्क (Cancer)',
  'सिंह (Leo)',
  'कन्या (Virgo)',
  'तुला (Libra)',
  'वृश्चिक (Scorpio)',
  'धनु (Sagittarius)',
  'मकर (Capricorn)',
  'कुंभ (Aquarius)',
  'मीन (Pisces)',
];

export interface CityLocation {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export const POPULAR_CITIES: CityLocation[] = [
  { name: 'New Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Chandigarh', state: 'Punjab/Haryana', lat: 30.7333, lng: 76.7794 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { name: 'Haridwar', state: 'Uttarakhand', lat: 29.9457, lng: 78.1642 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'London', state: 'UK', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', state: 'USA', lat: 40.7128, lng: -74.0060 },
  { name: 'Dubai', state: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Toronto', state: 'Canada', lat: 43.6532, lng: -79.3832 },
];

// Julian Date calculation
export function calculateJulianDay(year: number, month: number, day: number, hour: number = 12): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hour / 24 + B - 1524.5;
}

// Lahiri Ayanamsha approximation
export function getLahiriAyanamsha(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  return 23.85 + 1.396 * T;
}

// Calculate Astronomical Planetary Longitudes (Tropical converted to Sidereal with Lahiri Ayanamsha)
export function computePlanetaryPositions(
  dob: string,
  tob: string,
  lat: number = 28.6139,
  lng: number = 77.2090
): {
  lagnaSign: number;
  lagnaDegree: number;
  planets: Record<PlanetName, PlanetPosition>;
} {
  const [yearStr, monthStr, dayStr] = dob.split('-');
  const [hourStr, minStr] = tob ? tob.split(':') : ['12', '00'];

  const year = parseInt(yearStr, 10) || 1990;
  const month = parseInt(monthStr, 10) || 1;
  const day = parseInt(dayStr, 10) || 1;
  const hours = (parseInt(hourStr, 10) || 12) + (parseInt(minStr, 10) || 0) / 60;

  // Local mean time offset
  const tzOffset = 5.5; // IST standard
  const utHours = hours - tzOffset;
  const jd = calculateJulianDay(year, month, day, utHours);
  const T = (jd - 2451545.0) / 36525.0;
  const ayanamsha = getLahiriAyanamsha(jd);

  // Mean motions and orbital elements (Meeus algorithm approximations)
  const norm = (deg: number) => ((deg % 360) + 360) % 360;

  // Sun
  const L0_sun = 280.46646 + 36000.76983 * T;
  const M_sun = 357.52911 + 35999.05029 * T;
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin((M_sun * Math.PI) / 180) + 0.019993 * Math.sin((2 * M_sun * Math.PI) / 180);
  const tropicalSun = norm(L0_sun + C_sun);
  const sunLong = norm(tropicalSun - ayanamsha);

  // Moon
  const L_moon = 218.3164477 + 481267.88123421 * T;
  const M_moon = 134.9633964 + 477198.8675055 * T;
  const F_moon = 93.272095 + 483202.0175233 * T;
  const moonEq = 6.289 * Math.sin((M_moon * Math.PI) / 180) - 1.274 * Math.sin(((2 * (L_moon - tropicalSun) - M_moon) * Math.PI) / 180);
  const tropicalMoon = norm(L_moon + moonEq);
  const moonLong = norm(tropicalMoon - ayanamsha);

  // Mars
  const L_mars = 355.433 + 19140.299 * T;
  const marsLong = norm(L_mars - ayanamsha);

  // Mercury
  const L_mercury = 252.251 + 149472.674 * T;
  const mercuryLong = norm(L_mercury - ayanamsha);

  // Jupiter
  const L_jupiter = 34.351 + 3034.906 * T;
  const jupiterLong = norm(L_jupiter - ayanamsha);

  // Venus
  const L_venus = 181.979 + 58517.815 * T;
  const venusLong = norm(L_venus - ayanamsha);

  // Saturn
  const L_saturn = 50.077 + 1222.114 * T;
  const saturnLong = norm(L_saturn - ayanamsha);

  // Rahu (Mean North Node)
  const L_rahu = norm(125.04452 - 1934.136261 * T);
  const rahuLong = norm(L_rahu - ayanamsha);

  // Ketu (Opposite Node)
  const ketuLong = norm(rahuLong + 180);

  // Ascendant (Lagna)
  const GMST0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0);
  const lst = norm(GMST0 + lng);
  const lstRad = (lst * Math.PI) / 180;
  const eps = 23.4392911; // Obliquity of ecliptic
  const epsRad = (eps * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  const yL = Math.cos(lstRad);
  const xL = -Math.sin(lstRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  let ascTropical = (Math.atan2(yL, xL) * 180) / Math.PI;
  ascTropical = norm(ascTropical + 90);
  const ascSidereal = norm(ascTropical - ayanamsha);

  const lagnaSign = Math.floor(ascSidereal / 30) + 1; // 1 to 12
  const lagnaDegree = ascSidereal % 30;

  // Calculate planetary house based on Nirayana Lagna
  // In Lal Kitab, House = ((PlanetSign - LagnaSign + 12) % 12) + 1
  const getHouseFromSign = (sign: number) => {
    return ((sign - lagnaSign + 12) % 12) + 1;
  };

  const getSign = (long: number) => Math.floor(long / 30) + 1;
  const getDeg = (long: number) => long % 30;

  const rawPlanets: Record<PlanetName, { long: number; retro: boolean }> = {
    Surya: { long: sunLong, retro: false },
    Chandra: { long: moonLong, retro: false },
    Mangal: { long: marsLong, retro: false },
    Budh: { long: mercuryLong, retro: false },
    Guru: { long: jupiterLong, retro: false },
    Shukra: { long: venusLong, retro: false },
    Shani: { long: saturnLong, retro: false },
    Rahu: { long: rahuLong, retro: true },
    Ketu: { long: ketuLong, retro: true },
  };

  const planetPositions = {} as Record<PlanetName, PlanetPosition>;

  (Object.keys(rawPlanets) as PlanetName[]).forEach((pName) => {
    const p = rawPlanets[pName];
    const sign = getSign(p.long);
    const house = getHouseFromSign(sign);
    const meta = PLANETS_METADATA[pName];

    // Determine Lal Kitab Dignity
    let dignity: Dignity = 'Sama';
    if (house === meta.uchGhar) {
      dignity = 'Uch';
    } else if (house === meta.neechGhar) {
      dignity = 'Neech';
    } else if (meta.pakkaGhar.includes(house)) {
      dignity = 'Pakka Ghar';
    } else if (meta.friendlyPlanets.includes(HOUSES_KNOWLEDGE[house].kismatJagaaneWala)) {
      dignity = 'Mitra';
    } else if (meta.enemyPlanets.includes(HOUSES_KNOWLEDGE[house].kismatJagaaneWala)) {
      dignity = 'Shatru';
    }

    // Check Dharmi Grah rule from Lal Kitab (Page 31):
    // Rahu / Ketu in house 4 or with Moon; Saturn in 11 with Guru in 3; Jupiter with Rahu in 2
    let isDharmi = false;
    if ((pName === 'Rahu' || pName === 'Ketu') && house === 4) isDharmi = true;
    if (pName === 'Shani' && house === 11) isDharmi = true;

    // Check Sleeping (Soya Grah)
    // Planet is sleeping if not aspected by any planet and situated in early houses without wake-up stimulus
    const isSleeping = false; // Evaluated after all houses are mapped

    planetPositions[pName] = {
      name: pName,
      hindiName: meta.hindi,
      house: house,
      sign: sign,
      signName: ZODIAC_SIGNS[sign - 1],
      isRetrograde: p.retro,
      dignity: dignity,
      isSleeping: isSleeping,
      isDharmi: isDharmi,
      isKayam: dignity === 'Pakka Ghar' || dignity === 'Uch',
      degree: Math.round(getDeg(p.long) * 10) / 10,
    };
  });

  return {
    lagnaSign,
    lagnaDegree: Math.round(lagnaDegree * 10) / 10,
    planets: planetPositions,
  };
}

// Generate the 12 Lal Kitab Houses information
export function buildHousesInfo(
  planets: Record<PlanetName, PlanetPosition>,
  fixedMeshAscendant: boolean = false
): HouseInfo[] {
  const houses: HouseInfo[] = [];

  for (let h = 1; h <= 12; h++) {
    const housePlanets = (Object.values(planets) as PlanetPosition[]).filter(
      (p) => (fixedMeshAscendant ? p.sign === h : p.house === h)
    );

    const isSleepingHouse = housePlanets.length === 0;

    houses.push({
      houseNumber: h,
      zodiacSign: h, // In Lal Kitab Kalpurush, 1=Aries, 2=Taurus etc.
      signName: ZODIAC_SIGNS[h - 1],
      karakaPlanets: HOUSES_KNOWLEDGE[h].pakkaGharOf,
      pakkaGharOf: HOUSES_KNOWLEDGE[h].pakkaGharOf,
      isSleeping: isSleepingHouse,
      awakenerPlanet: HOUSES_KNOWLEDGE[h].kismatJagaaneWala,
      planets: housePlanets,
      ruler: HOUSES_KNOWLEDGE[h].kismatJagaaneWala,
    });
  }

  // Update sleeping status of planets
  houses.forEach((house) => {
    house.planets.forEach((p) => {
      // Planet is sleeping if sitting alone in a house with no aspecting planets
      const oppositeHouseNum = ((house.houseNumber + 5) % 12) + 1;
      const oppositeHouse = houses[oppositeHouseNum - 1];
      if (oppositeHouse && oppositeHouse.planets.length === 0 && house.planets.length === 1) {
        p.isSleeping = true;
      }
    });
  });

  return houses;
}

// Generate Lal Kitab Aspects (Drishti) according to Pages 47-52
export function calculateLalKitabAspects(houses: HouseInfo[]): AspectRelation[] {
  const aspects: AspectRelation[] = [];

  houses.forEach((fromHouse) => {
    if (fromHouse.planets.length === 0) return;

    // 100% Drishti: House 1 to 7, House 4 to 10
    const h1 = fromHouse.houseNumber;
    const h7 = ((h1 + 5) % 12) + 1;
    aspects.push({
      fromHouse: h1,
      toHouse: h7,
      percentage: 100,
      type: 'Purna',
      description: `100% पूर्ण दृष्टि: खाना नं० ${h1} सीधे खाना नं० ${h7} को देखता है।`,
    });

    if (h1 === 4) {
      aspects.push({
        fromHouse: 4,
        toHouse: 10,
        percentage: 100,
        type: 'Purna',
        description: '100% पूर्ण दृष्टि: खाना नं० 4 से खाना नं० 10 को पूर्ण नजर।',
      });
    }

    // 50% Drishti: 5 to 9, 3 to 11 (Baaham Madad - Mutual Help)
    const h9 = ((h1 + 7) % 12) + 1;
    if (h1 === 5) {
      aspects.push({
        fromHouse: 5,
        toHouse: 9,
        percentage: 50,
        type: 'Baaham Madad',
        description: '50% बाहम मदद दृष्टि: 5वां और 9वां खाना एक दूसरे के सहायक हैं।',
      });
    }

    if (h1 === 3) {
      aspects.push({
        fromHouse: 3,
        toHouse: 11,
        percentage: 50,
        type: 'Baaham Madad',
        description: '50% आधी दृष्टि: 3रा खाना 11वें खाने को मददगार ताकत देता है।',
      });
    }

    // 25% Drishti: 2 to 6, 6 to 12, 8 to 2
    if (h1 === 2) {
      aspects.push({
        fromHouse: 2,
        toHouse: 6,
        percentage: 25,
        type: 'Chauthai',
        description: '25% चौथाई दृष्टि: खाना नं० 2 से खाना नं० 6 का संबंध।',
      });
    }
    if (h1 === 8) {
      aspects.push({
        fromHouse: 8,
        toHouse: 2,
        percentage: 25,
        type: 'Takrav',
        description: 'टकराव दृष्टि: खाना नं० 8 से खाना नं० 2 पर मारक टकराव।',
      });
    }
  });

  return aspects;
}

// Calculate Karmic Debts (Rin) based on exact Lal Kitab formulas
export function evaluateKarmicDebts(planets: Record<PlanetName, PlanetPosition>): KarmicDebt[] {
  return LAL_KITAB_DEBTS.map((rin) => {
    let isActive = false;
    const causing = planets[rin.causingPlanet];

    if (rin.id === 'pitru_rin') {
      // Guru afflicted by Shukra/Budh/Rahu in houses 2, 5, 9, 12
      const isAfflicted = rin.afflictedHouses.includes(causing.house);
      const enemyPresent = ['Shukra', 'Budh', 'Rahu'].some(
        (e) => planets[e as PlanetName].house === causing.house
      );
      isActive = isAfflicted || enemyPresent;
    } else if (rin.id === 'matru_rin') {
      // Moon afflicted by Ketu in 4th house or 8th house
      isActive = causing.house === 4 && planets.Ketu.house === 4;
    } else if (rin.id === 'stree_rin') {
      // Venus afflicted in 2 or 7 by Sun or Rahu
      isActive = (causing.house === 2 || causing.house === 7) && (planets.Surya.house === causing.house || planets.Rahu.house === causing.house);
    } else if (rin.id === 'bhratri_rin') {
      // Mars afflicted by Mercury or Ketu in 1 or 8
      isActive = (causing.house === 1 || causing.house === 8) && (planets.Budh.house === causing.house || planets.Ketu.house === causing.house);
    } else if (rin.id === 'bahan_rin') {
      // Mercury afflicted in 3 or 6 by Moon
      isActive = (causing.house === 3 || causing.house === 6) && planets.Chandra.house === causing.house;
    } else if (rin.id === 'zalimana_rin') {
      // Saturn afflicted in 10 or 11 by Sun/Moon/Mars
      isActive = (causing.house === 10 || causing.house === 11) && [planets.Surya.house, planets.Chandra.house, planets.Mangal.house].includes(causing.house);
    } else if (rin.id === 'aatmiya_rin') {
      // Rahu afflicted in 12 by Sun/Venus/Mars
      isActive = causing.house === 12 && [planets.Surya.house, planets.Shukra.house, planets.Mangal.house].includes(12);
    } else if (rin.id === 'kudarti_rin') {
      // Ketu afflicted in 6 by Moon/Mars
      isActive = causing.house === 6 && (planets.Chandra.house === 6 || planets.Mangal.house === 6);
    }

    return {
      ...rin,
      isActive: isActive,
    };
  });
}

// Calculate Marriage Predictions & Exact Dates / Age Windows (Pages 412-420)
export function evaluateMarriageReport(
  planets: Record<PlanetName, PlanetPosition>,
  birthYear: number
): MarriagePrediction {
  const shukra = planets.Shukra;
  const budh = planets.Budh;
  const guru = planets.Guru;
  const rahu = planets.Rahu;
  const shani = planets.Shani;
  const surya = planets.Surya;

  const doshas: string[] = [];
  const cautions: string[] = [];
  const specificRemedies: string[] = [];
  let primaryAge = 25;
  const probableAges: number[] = [];

  // Check 7th house and Venus
  if (shukra.house === 2 || shukra.house === 7) {
    primaryAge = 25;
    probableAges.push(22, 24, 25);
  } else if (budh.house === shukra.house) {
    primaryAge = 22;
    probableAges.push(21, 22, 24);
  } else if (shani.house === 7) {
    primaryAge = 28;
    probableAges.push(28, 31, 33);
    doshas.push('शनि 7वें घर में होने से विवाह में थोड़ा विलंब, परंतु वैवाहिक बंधन सुदृढ़ और गंभीर होता है।');
    cautions.push('22 वर्ष से पहले विवाह करने से बचें, यह शनि की दृष्टि को पीड़ित करता है।');
    specificRemedies.push('विवाह के समय चांदी का चौकोर टुकड़ा अपने पास रखें।');
  } else if (rahu.house === 7) {
    primaryAge = 28;
    probableAges.push(26, 28, 32);
    doshas.push('राहु 7वें घर में: लाल किताब के अनुसार 21 वर्ष से पूर्व विवाह सर्वथा वर्जित व अनिष्टकारी है।');
    cautions.push('21वें वर्ष से पूर्व विवाह न करें अन्यथा गृहस्थी में आंधी-तूफान के समान संकट आ सकते हैं।');
    specificRemedies.push('ससुराल पक्ष से विवाह के समय चांदी की ठोस ईंट या डली लेकर सुरक्षित रखें।');
  } else if (surya.house === 7) {
    primaryAge = 24;
    probableAges.push(24, 27, 30);
    doshas.push('सूर्य 7वें घर में: दांपत्य जीवन में कभी-कभी अहंकार और क्रोध का टकराव हो सकता है।');
    specificRemedies.push('भोजन करते समय रोटी का पहला ग्रास अग्नि को अर्पित करें।');
  } else {
    primaryAge = 24;
    probableAges.push(22, 24, 25, 28);
  }

  // Check if Mars is Manglik (House 1, 4, 7, 8, 12)
  if ([1, 4, 7, 8, 12].includes(planets.Mangal.house)) {
    doshas.push(`मांगलिक प्रभाव (मंगल खाना नं० ${planets.Mangal.house} में): दांपत्य जीवन में ऊर्जा का संतुलन आवश्यक है।`);
    specificRemedies.push('तंदूर की मीठी रोटी बनाकर कुत्तों या जरूरतमंदों को खिलाएं।');
  }

  // Calculate year range
  const startYear = birthYear + primaryAge;
  const endYear = startYear + 2;
  const probableYearRange = `${startYear} - ${endYear} (${primaryAge} से ${primaryAge + 2} वर्ष की आयु में)`;

  // Partner characteristics from Arun Samhita
  let partnerCharacteristics = 'सौम्य, आकर्षक व्यक्तित्व, परिवार की परंपराओं का आदर करने वाले, बुद्धिमान एवं गृहस्थी की जिम्मेदारियों को पूर्ण निष्ठा से निभाने वाले।';
  if (shukra.house === 7 || shukra.dignity === 'Uch') {
    partnerCharacteristics = 'अत्यंत रूपवान, साक्षात लक्ष्मी स्वरूप, कला-प्रिय, मधुरभाषी और विवाह के तुरंत बाद पति/परिवार के लिए अकूत भाग्यशाली सिद्ध होने वाले।';
  } else if (shukra.house === 2) {
    partnerCharacteristics = 'सदाचारी, उच्च कुल से संबंध रखने वाले, संपत्तिशाली ससुराल और धार्मिक संस्कारों से युक्त।';
  } else if (rahu.house === 7) {
    partnerCharacteristics = 'अत्यंत चतुर, आधुनिक सोच रखने वाले, तकनीकी या विदेशों से जुड़े, परंतु संवेदनशील स्वभाव।';
  }

  return {
    probableMarriageAges: probableAges.length > 0 ? probableAges : [22, 24, 25, 28],
    primaryAuspiciousAge: primaryAge,
    probableYearRange: probableYearRange,
    partnerCharacteristics: partnerCharacteristics,
    maritalHarmonyScore: doshas.length === 0 ? 92 : doshas.length === 1 ? 78 : 64,
    doshas: doshas,
    auspiciousYears: probableAges.map((a) => birthYear + a),
    cautions: cautions.length > 0 ? cautions : ['दांपत्य में विश्वास और पारदर्शिता बनाए रखें।'],
    specificRemedies: specificRemedies.length > 0 ? specificRemedies : ['प्रतिदिन गाय को एक रोटी और पक्षियों को दाना डालें।'],
    verse: 'पहले दूसरे 10 से 12, बुध शुक्र जब बैठा हो। शनि मदद दे 1 या 7 से, साल शादी का होता हो। (अरुण संहिता फरमान 17)',
  };
}

// Calculate Financial Growth & Maya ke Teen Naam (Pages 424-427)
export function evaluateWealthReport(
  planets: Record<PlanetName, PlanetPosition>,
  currentAge: number = 30
): WealthPrediction {
  let score = 0;

  // Add individual rupee values from page 424
  (Object.keys(planets) as PlanetName[]).forEach((p) => {
    const pos = planets[p];
    const meta = PLANETS_METADATA[p];
    if (pos.dignity === 'Uch' || pos.dignity === 'Pakka Ghar') {
      score += meta.rupeeValue * 1.5;
    } else if (pos.dignity === 'Neech') {
      score += meta.rupeeValue * 0.4;
    } else {
      score += meta.rupeeValue;
    }
  });

  // Conjunction bonus from page 424
  if (planets.Surya.house === planets.Guru.house) score += 5; // Shahi Dhan
  if (planets.Guru.house === planets.Chandra.house) score += 6; // Amrit Kund
  if (planets.Budh.house === planets.Shukra.house) score += 4; // Vyapar Rajyog
  if (planets.Mangal.house === planets.Shani.house) score += 3.5;

  // Determine Maya Name: Parsu, Parsa, Parasram (Page 427)
  let mayaName: 'परसू' | 'परसा' | 'परसराम' = 'परसा';
  let mayaTitle = MAYA_NAMES.Parsa.title;
  let capacity = 'मध्यम स्तर से निरंतर प्रगतिशील, आवश्यक सभी सुख-साधन उपलब्ध रहेंगे।';

  const royalHouses = [1, 5, 9, 11];
  const royalPlanets = royalHouses.flatMap((h) =>
    (Object.values(planets) as PlanetPosition[]).filter((p) => p.house === h && (p.dignity === 'Uch' || p.dignity === 'Pakka Ghar' || p.dignity === 'Mitra'))
  );

  if (royalPlanets.length >= 2 || score >= 65) {
    mayaName = 'परसराम';
    mayaTitle = MAYA_NAMES.Parasram.title;
    capacity = 'अकूत धन-संपदा, पैतृक वैभव, कई मकानों व वाहनों का स्वामित्व, समाज में उच्च आर्थिक रुतबा।';
  } else if (planets.Budh.house === 3 || planets.Shani.house === 3) {
    mayaName = 'परसू';
    mayaTitle = MAYA_NAMES.Parsu.title;
    capacity = 'अपनी कड़ी मेहनत से आजीविका, फिजूलखर्ची से सावधान रहने पर ही बचत संभव।';
  }

  // 35-year Cycle phase (Page 30 & 87)
  const cycleNum = Math.floor(currentAge / 35) + 1;
  const cycleYear = (currentAge % 35) || 35;
  const cyclePhase = `35 साला चक्र संख्या ${cycleNum} (चक्र का ${cycleYear}वां वर्ष सक्रिय)`;

  return {
    incomeRupeeIndex: Math.round(score * 10) / 10,
    mayaName: mayaName,
    mayaTitle: mayaTitle,
    wealthCapacity: capacity,
    careerFields: [
      'व्यापार, आयात-निर्यात, ई-कॉमर्स (बुध व शुक्र)',
      'सरकारी पद, प्रशासनिक सेवाएं, प्रबंधन (सूर्य व गुरु)',
      'मशीनरी, रियल एस्टेट, निर्माण व तकनीकी क्षेत्र (शनि व मंगल)',
      'शिक्षा, परामर्श, वित्त व बैंकिंग (बृहस्पति)',
    ],
    peakAges: [24, 28, 34, 36, 42, 48, 52],
    currentCyclePhase: cyclePhase,
    wealthRemedies: [
      'अपनी तिजोरी में शुद्ध केसर से रंगा पीला वस्त्र और चांदी का सिक्का रखें।',
      'शनिवार के दिन किसी सफाई कर्मचारी या मजदूर को कुछ धन या भोजन का दान करें।',
      'दशमांश (कमाई का 10वां हिस्सा) गाय, कुत्ते और जरूरतमंदों की सेवा में लगाएं।',
    ],
    precautions: [
      'मुफ्त का माल या रिश्वत कभी न लें, यह लाल किताब में धन की आग कही गई है।',
      'घर के ईशान या उत्तर दिशा में कबाड़ अथवा भारी लोहा न रखें।',
    ],
  };
}

// Evaluate Black Magic, Evil Eye (Buri Nazar) and Occult Vulnerability
export function evaluateBlackMagicDefense(
  planets: Record<PlanetName, PlanetPosition>
): BlackMagicAudit {
  const rahu = planets.Rahu;
  const ketu = planets.Ketu;
  const shani = planets.Shani;
  const chandra = planets.Chandra;

  const indicators: string[] = [];
  const roots: string[] = [];
  let riskScore = 1; // 1: Low, 2: Moderate, 3: High, 4: Severe

  // Check Rahu in House 8 (श्मशान की राख, कड़वा धुआँ)
  if (rahu.house === 8) {
    riskScore += 2;
    roots.push('राहु खाना नं० 8 में स्थित है (श्मशान का वास व कड़वे धुएं का संदेश)।');
    indicators.push('कार्यों में अंतिम क्षण पर अकारण अड़चन आना व मानसिक घबराहट होना।');
    indicators.push('अज्ञात भय, सोते समय भयानक स्वप्न या सीने पर भारीपन महसूस होना।');
  }

  // Check Rahu in House 12 (भूत-प्रेत व तंत्र आशंका)
  if (rahu.house === 12) {
    riskScore += 2;
    roots.push('राहु खाना नं० 12 में स्थित है (अस्पताल, कारागार व अनिद्रा का कारक)।');
    indicators.push('रात को बार-बार नींद टूटना, कमरे में किसी की उपस्थिति का वहम।');
    indicators.push('अस्पताल के चक्कर और शारीरिक जांच में रोग का स्पष्ट न होना।');
  }

  // Check Chandra-Rahu Conjunction (चन्द्र ग्रहण)
  if (chandra.house === rahu.house) {
    riskScore += 2;
    roots.push('चन्द्र-राहु की युति (चन्द्र ग्रहण दोष): नजर दोष और सम्मोहन से मन की शक्ति क्षीण होना।');
    indicators.push('अकारण मूड स्विंग्स, उदासी, मन में नकारात्मक विचारों का भंवर।');
  }

  // Check Shani-Rahu Conjunction (शापित योग / नाग फंदा)
  if (shani.house === rahu.house) {
    riskScore += 2;
    roots.push('शनि-राहु युति (नाग और मौत की बिजली): तांत्रिक नजर और गुप्त शत्रुओं की ईर्ष्या।');
    indicators.push('घर के पालतू पशुओं या पौधों का अचानक मुरझाना, बिजली के उपकरणों का बार-बार खराब होना।');
  }

  // Check Ketu in 6 or 8
  if (ketu.house === 6 || ketu.house === 8) {
    riskScore += 1;
    roots.push(`केतु खाना नं० ${ketu.house} में स्थित है: रीढ़, जोड़ों और गुप्त व्याधियों का संकेत।`);
  }

  let riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe' = 'Low';
  if (riskScore >= 5) riskLevel = 'Severe';
  else if (riskScore >= 4) riskLevel = 'High';
  else if (riskScore >= 2) riskLevel = 'Moderate';

  return {
    riskLevel: riskLevel,
    evilEyeIndicators:
      indicators.length > 0
        ? indicators
        : [
            'सामान्य अवस्था, कोई गंभीर तांत्रिक बाधा नहीं है।',
            'दैनिक नजर दोष से बचाव के लिए सात्विक नियमों का पालन करें।',
          ],
    planetaryRoots:
      roots.length > 0
        ? roots
        : ['राहु और केतु अनुकूल स्थिति में हैं, किसी विशेष तंत्र-बाधा का योग नहीं है।'],
    protectionAmulets: [
      'ठोस चाँदी की गोली (Solid Silver Ball): बिना जोड़ की, जेब या तकिए के नीचे रखें। यह राहु का परम शमन करती है।',
      'चाँदी का चौकोर पत्तर (Pure Silver Square Plate): अपने बटुए या तिजोरी में रखें।',
      'काला व सफेद धागा: दाहिने हाथ या पैर में अभिमंत्रित करके धारण करें।',
    ],
    unbreakableRemedies: [
      '43 दिन लगातार 8 खोटे सिक्के (खराब सिक्के) या 4 किलो कच्चा कोयला बहती नदी में प्रवाहित करें।',
      'रात को सोते समय सिराहने एक लोटे में जल रखकर सोएं और सुबह उसे कीकर या बबूल के पेड़ की जड़ में डालें।',
      'दो-रंगे या काले कुत्ते को प्रतिदिन शाम के समय मीठी रोटी खिलाएं।',
      'घर के मुख्य द्वार पर स्वस्तिक और नीम की पत्तियां लटकाएं।',
    ],
    dailyShieldDisciplines: [
      'रसोई घर में जमीन पर बैठकर ही भोजन करें (राहु का 12वां दोष नष्ट होता है)।',
      'सूर्यास्त के पश्चात किसी भी अनजान व्यक्ति से नीली, काली या फटी-पुरानी वस्तुएं उपहार में न लें।',
      'घर के दक्षिण कोने में कभी भी कूड़ा-कचरा या पुराना कबाड़ इकट्ठा न होने दें।',
    ],
  };
}

// Calculate Varshphal Progression Chart (Pages 91-93)
export function calculateVarshphal(
  planets: Record<PlanetName, PlanetPosition>,
  targetAge: number
): VarshphalRecord {
  // Lal Kitab 35-year cycle rotation:
  // House shifts based on the age modulo 35
  const cycleIndex = ((targetAge - 1) % 35) + 1;
  const shift = (cycleIndex * 7) % 12;

  const houseRotations: Record<number, number> = {};
  for (let h = 1; h <= 12; h++) {
    houseRotations[h] = ((h + shift - 1) % 12) + 1;
  }

  // Ruling planet of the year according to Lal Kitab age sequence
  const ageRulers: PlanetName[] = [
    'Guru', 'Surya', 'Chandra', 'Shukra', 'Mangal', 'Budh', 'Shani', 'Rahu', 'Ketu'
  ];
  const rulingPlanet = ageRulers[(targetAge - 1) % ageRulers.length];

  const currentYear = new Date().getFullYear();

  return {
    ageYear: targetAge,
    calendarYear: currentYear,
    rulingPlanet: rulingPlanet,
    houseRotations: houseRotations,
    keyForecast: `वर्षफल आयु ${targetAge} वर्ष में ${PLANETS_METADATA[rulingPlanet].hindi} का विशेष प्रभाव रहेगा। यह वर्ष आपके लिए कर्म क्षेत्र में नए द्वार खोलेगा और पूर्व संचित प्रारब्ध को फलित करेगा।`,
    yearlyUpay: `इस वर्ष विशेष रूप से ${PLANETS_METADATA[rulingPlanet].hindi} से संबंधित वस्तुओं का दान करें एवं वर्ष के आरंभ में 43 दिन का संकल्प लेकर नित्य इष्ट स्मरण करें।`,
  };
}
