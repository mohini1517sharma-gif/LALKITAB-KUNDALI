export type PlanetName = 
  | 'Surya' // Sun
  | 'Chandra' // Moon
  | 'Mangal' // Mars
  | 'Budh' // Mercury
  | 'Guru' // Jupiter
  | 'Shukra' // Venus
  | 'Shani' // Saturn
  | 'Rahu' // Rahu
  | 'Ketu'; // Ketu

export type Dignity = 'Uch' | 'Neech' | 'Pakka Ghar' | 'Sama' | 'Mitra' | 'Shatru';

export interface PlanetPosition {
  name: PlanetName;
  hindiName: string;
  house: number; // 1 to 12
  sign: number; // 1 to 12 (Aries = 1, Pisces = 12)
  signName: string;
  isRetrograde?: boolean;
  dignity: Dignity;
  isSleeping: boolean; // Soya Grah
  isDharmi?: boolean; // Dharmi Grah (turned protective)
  isKayam?: boolean; // Established planet
  degree: number;
}

export interface HouseInfo {
  houseNumber: number; // 1 to 12
  zodiacSign: number; // In Lal Kitab, House 1 = Aries (Mesh)
  signName: string;
  karakaPlanets: PlanetName[];
  pakkaGharOf: PlanetName[];
  isSleeping: boolean; // Soya Ghar
  awakenerPlanet: PlanetName; // Grah jo jagayega
  planets: PlanetPosition[];
  ruler: PlanetName;
}

export interface AspectRelation {
  fromHouse: number;
  toHouse: number;
  percentage: 100 | 50 | 25;
  type: 'Purna' | 'Aadhi' | 'Chauthai' | 'Takrav' | 'Buniyad' | 'Dhokha' | 'Baaham Madad';
  description: string;
}

export interface KarmicDebt {
  id: string;
  name: string;
  hindiName: string;
  causingPlanet: PlanetName;
  afflictedHouses: number[];
  isActive: boolean;
  reason: string;
  symptoms: string[];
  remedy: string;
  precaution: string;
}

export interface MarriagePrediction {
  probableMarriageAges: number[];
  primaryAuspiciousAge: number;
  probableYearRange: string;
  partnerCharacteristics: string;
  maritalHarmonyScore: number; // 0 - 100
  doshas: string[];
  auspiciousYears: number[];
  cautions: string[];
  specificRemedies: string[];
  verse: string;
}

export interface WealthPrediction {
  incomeRupeeIndex: number; // From Lal Kitab page 424
  mayaName: 'परसू' | 'परसा' | 'परसराम'; // Parsu, Parsa, Parasram
  mayaTitle: string;
  wealthCapacity: string;
  careerFields: string[];
  peakAges: number[];
  currentCyclePhase: string;
  wealthRemedies: string[];
  precautions: string[];
}

export interface BlackMagicAudit {
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  evilEyeIndicators: string[];
  planetaryRoots: string[];
  protectionAmulets: string[];
  unbreakableRemedies: string[];
  dailyShieldDisciplines: string[];
}

export interface KundaliInput {
  name: string;
  gender: 'male' | 'female' | 'other';
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm
  pob: string; // City name
  lat?: number;
  lng?: number;
  currentAge?: number;
  majorObstacle?: string;
}

export interface VarshphalRecord {
  ageYear: number;
  calendarYear: number;
  rulingPlanet: PlanetName;
  houseRotations: Record<number, number>; // natalHouse -> varshphalHouse
  keyForecast: string;
  yearlyUpay: string;
}
