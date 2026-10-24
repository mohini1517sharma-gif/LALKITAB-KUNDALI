import React, { useState, useMemo } from 'react';
import { PlanetPosition, PlanetName } from '../../types/astrology';
import { PLANETS_METADATA } from '../../data/lalKitabKnowledge';
import {
  Clock,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sun,
  ShieldCheck,
  Briefcase,
  Heart,
  Home,
  Car,
  Activity,
  Award,
} from 'lucide-react';

interface MuhuratTabProps {
  planets: Record<PlanetName, PlanetPosition>;
  lang: 'hi' | 'en';
}

interface HoraSlot {
  planet: PlanetName;
  nameHi: string;
  nameEn: string;
  timeRange: string;
  startHour: number;
  endHour: number;
  idealActivities: string[];
  avoidActivities: string[];
  arunSamhitaRef: string;
}

export const MuhuratTab: React.FC<MuhuratTabProps> = ({ planets, lang }) => {
  const [selectedActivity, setSelectedActivity] = useState<string>('marriage');

  // 9 Lal Kitab Planetary Time Windows as detailed in Arun Samhita Page 27
  const HORA_SCHEDULE: HoraSlot[] = [
    {
      planet: 'Ketu',
      nameHi: 'केतु काल (ऊषा काल)',
      nameEn: 'Ketu Kaal (Dawn / Brahma Muhurat)',
      timeRange: 'सूर्योदय से 2 घंटे पहले (लगभग 4:00 - 6:00 AM)',
      startHour: 4,
      endHour: 6,
      idealActivities: [
        'आध्यात्मिक साधना, ध्यान, इष्ट स्मरण',
        'संतान सुख व पितृ शांति प्रार्थना',
        'अध्ययन व शोध कार्य का शुभारंभ',
      ],
      avoidActivities: [
        'विवाद, कटु संवाद या यात्रा में जल्दबाजी',
        'कुत्तों या पक्षियों को दुत्कारना',
      ],
      arunSamhitaRef: 'पृष्ठ 27: दिन चढ़ने से दो घण्टे पहले केतु का काल',
    },
    {
      planet: 'Guru',
      nameHi: 'बृहस्पति काल (पहला हिस्सा)',
      nameEn: 'Guru Kaal (Early Morning)',
      timeRange: 'सूर्योदय से प्रातः 8:00 AM तक',
      startHour: 6,
      endHour: 8,
      idealActivities: [
        'शिक्षा, दीक्षा, उच्च अध्ययन',
        'मंदिर दर्शन, पूजा-पाठ, गुरु आशीर्वाद',
        'सोना खरीदना, धार्मिक संकल्प व दान',
      ],
      avoidActivities: [
        'बड़ों से असहमति, अहंकारपूर्ण आचरण',
        'पीपल या मंदिर का अनादर',
      ],
      arunSamhitaRef: 'पृष्ठ 27: दिन निकलने के बाद 8 बजे तक गुरु',
    },
    {
      planet: 'Surya',
      nameHi: 'सूर्य काल (दूसरा हिस्सा)',
      nameEn: 'Surya Kaal (Mid-Morning)',
      timeRange: 'प्रातः 8:00 AM से 10:00 AM तक',
      startHour: 8,
      endHour: 10,
      idealActivities: [
        'सरकारी कार्य, अधिकारियों से भेंट, आवेदन पत्र',
        'नौकरी ज्वाइनिंग, पिता का आशीर्वाद',
        'तांबा व गेहूं का दान, लाल किताब उपाय प्रारंभ',
      ],
      avoidActivities: [
        'झूठ बोलना, कर चोरी या घमंड',
        'नमक का अधिक सेवन',
      ],
      arunSamhitaRef: 'पृष्ठ 27: 8 से 10 बजे तक सूर्य',
    },
    {
      planet: 'Chandra',
      nameHi: 'चन्द्र काल (अमृत बेला)',
      nameEn: 'Chandra Kaal (Late Morning)',
      timeRange: 'प्रातः 10:00 AM से 11:00 AM तक',
      startHour: 10,
      endHour: 11,
      idealActivities: [
        'माता का आशीर्वाद, मानसिक शांति के कार्य',
        'जल व तरल पदार्थों से जुड़ा व्यवसाय',
        'चांदी खरीदना, यात्रा का टिकट व योजना',
      ],
      avoidActivities: [
        'दूध या जल का अनादर करना',
        'माता अथवा वृद्ध स्त्रियों का दिल दुखाना',
      ],
      arunSamhitaRef: 'पृष्ठ 27: चन्द्र 10-11 बजे तक',
    },
    {
      planet: 'Mangal',
      nameHi: 'मंगल काल (पक्की दोपहर 1)',
      nameEn: 'Mangal Kaal (Noon / Energy)',
      timeRange: 'पूर्वाह्न 11:00 AM से दोपहर 1:00 PM तक',
      startHour: 11,
      endHour: 13,
      idealActivities: [
        'साहसिक कार्य, पुलिस/प्रशासनिक वार्ता',
        'मशीनरी परीक्षण, निर्माण स्थल का दौरा',
        'भूमि/मकान का निरीक्षण, व्यायाम व खेल',
      ],
      avoidActivities: [
        'सगे भाइयों से कहा-सुनी, उग्र क्रोध',
        'क्रूरता व हिंसक विचार',
      ],
      arunSamhitaRef: 'पृष्ठ 27: मं० 11 से 1 तक, पक्की दोपहर',
    },
    {
      planet: 'Shukra',
      nameHi: 'शुक्र काल (सुख-ऐश्वर्य बेला)',
      nameEn: 'Shukra Kaal (Afternoon Bliss)',
      timeRange: 'दोपहर 1:00 PM से 3:00 PM तक',
      startHour: 13,
      endHour: 15,
      idealActivities: [
        'विवाह वार्ता, सगाई की चर्चा, सौंदर्य प्रसाधन',
        'वस्त्र व आभूषण क्रय, संगीत व कला प्रदर्शन',
        'गौ-सेवा, सुगंधित द्रव्यों का उपयोग',
      ],
      avoidActivities: [
        'स्त्री का अपमान, मैले वस्त्र पहनना',
        'गृहस्थी में कटुता फैलाना',
      ],
      arunSamhitaRef: 'पृष्ठ 27: शुक्र 1-3 बजे तक',
    },
    {
      planet: 'Budh',
      nameHi: 'बुध काल (वाणी व व्यापार)',
      nameEn: 'Budh Kaal (Late Afternoon / Trade)',
      timeRange: 'अपराह्न 4:00 PM से शाम 6:00 PM तक',
      startHour: 16,
      endHour: 18,
      idealActivities: [
        'व्यापारिक सौदे, अनुबंध हस्ताक्षर, खाता-बही',
        'सट्टेबाजी से दूर सात्विक व्यापारिक निर्णय',
        'बहन, बेटी, बुआ को उपहार देना, कन्या पूजन',
      ],
      avoidActivities: [
        'चुगली करना, जुबान से कटु वचन निकालना',
        'चौड़े पत्ते वाले पौधे काटना',
      ],
      arunSamhitaRef: 'पृष्ठ 27: बुध 4-6 बजे तक',
    },
    {
      planet: 'Rahu',
      nameHi: 'राहु काल (सांयकाल / पक्की शाम)',
      nameEn: 'Rahu Kaal (Twilight / Dusk)',
      timeRange: 'दिन छिपते समय / गोधूलि बेला (सूर्यास्त के आसपास)',
      startHour: 18,
      endHour: 20,
      idealActivities: [
        'सफाई कार्य, घर के द्वार पर दीपक जलाना',
        'राहु का दान (सफाई कर्मचारी को भोजन, कच्चा कोयला जल प्रवाह)',
        'रसोई में बैठकर भोजन करना',
      ],
      avoidActivities: [
        'किसी नए शुभ कार्य की नींव रखना',
        'विवाह या धन का लेन-देन शुरू करना',
      ],
      arunSamhitaRef: 'पृष्ठ 27: राहु सायंकाल / पक्की शाम',
    },
    {
      planet: 'Shani',
      nameHi: 'शनि काल (तमाम रात / अंधेरा दिन)',
      nameEn: 'Shani Kaal (Night & Focus)',
      timeRange: 'तारे निकलने के बाद रात भर',
      startHour: 20,
      endHour: 24,
      idealActivities: [
        'गंभीर चिंतन, योजना निर्माण, एकांत ध्यान',
        'मजदूरों की सेवा, काले कुत्ते को चुपड़ी रोटी',
        'लोहे व तेल संबंधी कार्यों की समीक्षा',
      ],
      avoidActivities: [
        'शराब या मांसाहार का सेवन (लाल किताब में पूर्ण वर्जित)',
        'झूठ बोलना, अनैतिक रात्रि भ्रमण',
      ],
      arunSamhitaRef: 'पृष्ठ 27: शनि दिन छुपने तारे निकलने के बाद',
    },
  ];

  // Activities mapping with auspicious conditions & page citations
  const ACTIVITIES_DATA: Record<string, {
    titleHi: string;
    titleEn: string;
    rulingPlanets: PlanetName[];
    bestDays: string[];
    bestHour: string;
    favDirection: string;
    pageRef: string;
    guideline: string;
    precaution: string;
    remedyBeforeStarting: string;
  }> = {
    marriage: {
      titleHi: 'विवाह, सगाई व दांपत्य वार्ता',
      titleEn: 'Marriage Talks, Engagement & Matchmaking',
      rulingPlanets: ['Shukra', 'Budh', 'Guru'],
      bestDays: ['शुक्रवार (Friday)', 'गुरुवार (Thursday)', 'बुधवार (Wednesday)'],
      bestHour: 'शुक्र काल (1:00 PM - 3:00 PM) अथवा गुरु काल (प्रातः 8:00 AM से पूर्व)',
      favDirection: 'पश्चिम या उत्तर दिशा (West / North)',
      pageRef: 'अरुण संहिता पृष्ठ 390-394 (फरमान 17)',
      guideline:
        'लाल किताब के अनुसार शादी की बातचीत हमेशा शुक्र अथवा बुध के पक्के काल में करनी चाहिए। यदि वर अथवा वधू के टेवे में शुक्र उच्च हो, तो बातचीत के दिन मीठी वस्तु (मिश्री या शहद) खिलाना शुभ फल देता है।',
      precaution:
        '4, 9, 14 चन्द्र तिथियों (रिक्ता तिथियां) पर शादी की बातचीत या सगाई न करें। राहु के समय (शाम) वार्ता से बचें।',
      remedyBeforeStarting:
        'घर से निकलते समय थोड़ा सा मीठा खाकर और पानी पीकर निकलें। चांदी का चौकोर टुकड़ा जेब में रखें।',
    },
    wealth: {
      titleHi: 'व्यापारिक सौदे, निवेश व धन संचय',
      titleEn: 'Business Deals, Investments & Signing Contracts',
      rulingPlanets: ['Budh', 'Guru', 'Surya'],
      bestDays: ['बुधवार (Wednesday)', 'गुरुवार (Thursday)', 'रविवार (Sunday)'],
      bestHour: 'बुध काल (4:00 PM - 6:00 PM) अथवा सूर्य काल (8:00 AM - 10:00 AM)',
      favDirection: 'उत्तर अथवा पूर्व दिशा (North / East)',
      pageRef: 'अरुण संहिता पृष्ठ 402, 424 (आय व माया के नाम)',
      guideline:
        'व्यापार में स्थायित्व व बरकत हेतु बुध व सूर्य का संयोग अत्यंत उत्तम है। कलम का धनी बनने हेतु बुधवार को हरे वस्त्र या साबुत मूंग का दान करके कार्य प्रारंभ करें।',
      precaution:
        'शनिवार या राहु के मंदे वक्त में कर्ज लेने या देने से बचें। ब्याज का अनुचित लालच न करें।',
      remedyBeforeStarting:
        'अपनी तिजोरी या कार्यस्थल पर शुद्ध केसर का स्वस्तिक बनाएं और माता-पिता के चरण छूकर निकलें।',
    },
    property: {
      titleHi: 'मकान निर्माण, नींव व गृह प्रवेश',
      titleEn: 'House Construction, Foundation & Griha Pravesh',
      rulingPlanets: ['Shani', 'Mangal', 'Surya'],
      bestDays: ['सोमवार (Monday)', 'गुरुवार (Thursday)', 'रविवार (Sunday)'],
      bestHour: 'सूर्य काल (8:00 AM - 10:00 AM) अथवा गुरु काल (प्रातः 6:00 - 8:00 AM)',
      favDirection: 'पूर्व या उत्तर-पूर्व (East / North-East)',
      pageRef: 'अरुण संहिता पृष्ठ 419-424, 442 (मकान कुण्डली)',
      guideline:
        'लाल किताब के अनुसार मकान की नींव रखते समय 40-43 दिन तक किसी चांदी के बर्तन में गंगाजल भरकर भूमि में सुरक्षित दबाने से मकान सदैव शांत व धन-धान्य पूर्ण रहता है।',
      precaution:
        'दक्षिण दिशा का मुख्य दरवाजा रखने से लाल किताब में सख्त मना किया गया है। शनि 6 या 8 के मंदे प्रभाव में नया मकान न बनाएं।',
      remedyBeforeStarting:
        'नींव रखने से पूर्व मजदूरों को गुड़-चना वितरित करें और एक चौकोर चांदी का पत्तर स्थापित करें।',
    },
    vehicle: {
      titleHi: 'वाहन क्रय व लंबी यात्रा (सफ़र)',
      titleEn: 'Vehicle Purchase & Auspicious Travel',
      rulingPlanets: ['Chandra', 'Shukra', 'Ketu'],
      bestDays: ['सोमवार (Monday)', 'शुक्रवार (Friday)'],
      bestHour: 'चन्द्र काल (10:00 AM - 11:00 AM) अथवा शुक्र काल (1:00 PM - 3:00 PM)',
      favDirection: 'पृष्ठ 440: मंगलवार/बुधवार उत्तर, शुक्र/रवि पश्चिम, सोम/शनि पूर्व, गुरु दक्षिण',
      pageRef: 'अरुण संहिता पृष्ठ 440-441 (सफ़र का हुक्मनामा)',
      guideline:
        'दरियाई व लंबी यात्रा का स्वामी चन्द्र व केतु है। नया वाहन खरीदते समय सफेद गाय को रोटी खिलाना और वाहन में चांदी का छोटा सिक्का रखना दुर्घटनाओं से रक्षा करता है।',
      precaution:
        '100 दिन से कम की यात्रा को लाल किताब में सामान्य माना गया है, परंतु दिशा शूल का ध्यान रखें।',
      remedyBeforeStarting:
        'यात्रा प्रारंभ करने से पूर्व तांबे के सिक्के को सिर से वारकर चलते पानी में प्रवाहित करें।',
    },
    medical: {
      titleHi: 'रोगोपचार, औषधि सेवन व स्वास्थ्य सुधार',
      titleEn: 'Medical Treatment, Healing & Surgery',
      rulingPlanets: ['Surya', 'Guru', 'Chandra'],
      bestDays: ['रविवार (Sunday)', 'गुरुवार (Thursday)', 'सोमवार (Monday)'],
      bestHour: 'सूर्य काल (8:00 AM - 10:00 AM) अथवा गुरु काल (प्रातः 6:00 - 8:00 AM)',
      favDirection: 'पूर्व दिशा (East / Sunward)',
      pageRef: 'अरुण संहिता पृष्ठ 448-450 (रोग व स्वास्थ्य संबंध)',
      guideline:
        'सूर्य आत्मा व आरोग्य का स्वामी है। दवाइयों का प्रारंभ सूर्योदय के समय तांबे के बर्तन में रखे जल के साथ करना शीघ्र स्वास्थ्य लाभ कराता है।',
      precaution:
        'रात के अंधेरे में गंभीर शल्य चिकित्सा (सर्जरी) की योजना यदि संभव हो तो टालें; सूर्य के प्रकाश में आरंभ करें।',
      remedyBeforeStarting:
        'रोगी के सिरहाने तांबे के लोटे में जल भरकर रखें और सुबह उसे कांटेदार वृक्ष की जड़ में अर्पित करें।',
    },
    interview: {
      titleHi: 'राजदरबार, नौकरी, इंटरव्यू व कोर्ट-कचहरी',
      titleEn: 'Job Interview, Govt Affairs & Legal Matters',
      rulingPlanets: ['Surya', 'Mangal', 'Guru'],
      bestDays: ['रविवार (Sunday)', 'मंगलवार (Tuesday)', 'गुरुवार (Thursday)'],
      bestHour: 'सूर्य काल (8:00 AM - 10:00 AM) अथवा मंगल काल (11:00 AM - 1:00 PM)',
      favDirection: 'पूर्व दिशा (East)',
      pageRef: 'अरुण संहिता पृष्ठ 101, 163, 417 (राजदरबार हुकूमत)',
      guideline:
        'साक्षात्कार अथवा न्याय संबंधी मामलों में सफलता हेतु सूर्य का प्रबल होना आवश्यक है। लाल किताब कहती है कि राजदरबार में जाने से पहले मीठा भोजन करके निकलें।',
      precaution:
        'शत्रु से वार्ता करते समय नीले या काले रंग के वस्त्र न पहनें। सफेद या बादामी रंग श्रेष्ठ है।',
      remedyBeforeStarting:
        'तांबे का सिक्का बिना छेद वाला जेब में रखें और सूर्य भगवान को अर्घ्य देकर प्रस्थान करें।',
    },
    remedy: {
      titleHi: 'लाल किताब 43-दिवसीय उपाय का शुभारंभ',
      titleEn: 'Commencing 40-43 Days Lal Kitab Remedies',
      rulingPlanets: ['Surya', 'Guru'],
      bestDays: ['रविवार (Sunday)', 'गुरुवार (Thursday)'],
      bestHour: 'सूर्योदय के पश्चात प्रातः 7:00 AM से 10:00 AM के मध्य',
      favDirection: 'मंदिर अथवा बहते जल (नदी/नहर) की ओर',
      pageRef: 'अरुण संहिता पृष्ठ 44 (रियायती 40-43 दिन नियम)',
      guideline:
        '"हर उपाय की मियाद 40 या अधिक से अधिक 43 दिन है। उपाय बीच में हटना नहीं चाहिए। यदि किसी कारणवश नागा हो जाए, तो चावल दूध में धोकर पास रख लें।" (पृष्ठ 44)',
      precaution:
        'रात को कभी कोई लाल किताब उपाय न करें (क्योंकि रात को शनि का राज्य होता है)। उपाय सदैव दिन के उजाले में ही संपन्न करें।',
      remedyBeforeStarting:
        'उपाय प्रारंभ करने से पूर्व संकल्प लें और मन में पूर्ण सात्विकता व श्रद्धा धारण करें।',
    },
  };

  const currentActivityData = ACTIVITIES_DATA[selectedActivity] || ACTIVITIES_DATA.marriage;

  // Evaluate each hora against seeker's chart
  const evaluatedHoras = useMemo(() => {
    return HORA_SCHEDULE.map((slot) => {
      const pPos = planets[slot.planet];
      let status: 'auspicious' | 'favorable' | 'neutral' | 'caution' = 'neutral';
      let reason = 'सामान्य फलदायक';

      if (pPos) {
        if (pPos.dignity === 'Uch' || pPos.dignity === 'Pakka Ghar') {
          status = 'auspicious';
          reason = `आपकी कुण्डली में ${PLANETS_METADATA[slot.planet].hindi} ${pPos.dignity === 'Uch' ? 'उच्च' : 'पक्के घर'} में है - यह काल आपके लिए सर्वश्रेष्ठ है!`;
        } else if (pPos.dignity === 'Neech') {
          status = 'caution';
          reason = `आपकी कुण्डली में ${PLANETS_METADATA[slot.planet].hindi} नीच का है - इस समय महत्वपूर्ण निर्णय टालें या सावधानी रखें।`;
        } else if (pPos.isDharmi) {
          status = 'favorable';
          reason = `${PLANETS_METADATA[slot.planet].hindi} धर्मी अवस्था में है - सकारात्मक परिणाम मिलेंगे।`;
        } else if (pPos.isSleeping) {
          status = 'neutral';
          reason = `${PLANETS_METADATA[slot.planet].hindi} अभी सोया हुआ है - साधारण फल रहेगा।`;
        } else {
          status = 'favorable';
          reason = 'मित्र व शुभ प्रभावयुक्त काल।';
        }
      }

      return {
        ...slot,
        status,
        reason,
        house: pPos?.house || 1,
      };
    });
  }, [planets]);

  // Current active hora based on real client time
  const currentHour = new Date().getHours();
  const currentActiveHora = evaluatedHoras.find(
    (h) => currentHour >= h.startHour && currentHour < h.endHour
  ) || evaluatedHoras[evaluatedHoras.length - 1];

  return (
    <div className="space-y-6 text-amber-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-[#2a0e0e] to-amber-950 border border-amber-800/80 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>अरुण संहिता (पृष्ठ 27, 44, 409 व 440) - काल समय व मुहूर्त विधान</span>
            </div>
            <h2 className="text-2xl font-bold font-devanagari text-amber-100">
              {lang === 'hi'
                ? 'लाल किताब दैनिक शुभ मुहूर्त व गतिविधि काल'
                : 'Lal Kitab Daily Muhurat & Activity Timings'}
            </h2>
            <p className="mt-1 text-xs text-amber-200/80 font-devanagari max-w-3xl">
              आपकी व्यक्तिगत कुण्डली के उच्च, पक्के व मित्र ग्रहों के आधार पर दैनिक कार्यों, विवाह, व्यापार, गृह निर्माण, यात्रा व 43-दिवसीय उपायों का शास्त्रोक्त समय निर्धारण।
            </p>
          </div>

          {/* Current Real-time Active Hora Badge */}
          <div className="bg-black/60 border border-amber-700/60 rounded-xl p-3.5 text-center min-w-[170px] shadow-inner">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-devanagari">
              वर्तमान समय सक्रिय काल
            </span>
            <span className="text-base font-bold text-amber-300 font-devanagari mt-0.5 block">
              {currentActiveHora.nameHi.split(' ')[0]}
            </span>
            <span className="text-[10px] text-stone-300 font-mono block mt-0.5">
              {currentActiveHora.timeRange.slice(0, 22)}...
            </span>
            <span className={`text-[10px] font-bold block mt-1 ${
              currentActiveHora.status === 'auspicious' ? 'text-emerald-400' :
              currentActiveHora.status === 'caution' ? 'text-rose-400' : 'text-yellow-400'
            }`}>
              {currentActiveHora.status === 'auspicious' ? '✓ अति शुभ' :
               currentActiveHora.status === 'caution' ? '⚠ सावधानी रखें' : '✦ अनुकूल'}
            </span>
          </div>
        </div>
      </div>

      {/* Activity Selector & Personalized Recommendation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Activity Chooser */}
        <div className="lg:col-span-5 bg-[#1b0808]/90 border border-amber-900/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-amber-900/50">
            <Compass className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base font-devanagari text-amber-200">
              शुभ मुहूर्त हेतु कार्य का चयन करें:
            </h3>
          </div>

          <div className="space-y-1.5">
            {[
              { id: 'marriage', label: '💍 विवाह व सगाई वार्ता (Marriage)', icon: Heart },
              { id: 'wealth', label: '💰 व्यापार, निवेश व अनुबंध (Business)', icon: Briefcase },
              { id: 'property', label: '🏠 मकान की नींव व गृह प्रवेश (Property)', icon: Home },
              { id: 'vehicle', label: '🚗 वाहन क्रय व सफ़र (Travel & Vehicle)', icon: Car },
              { id: 'medical', label: '🩺 रोगोपचार व औषधि (Health)', icon: Activity },
              { id: 'interview', label: '📜 नौकरी, इंटरव्यू व कोर्ट (Govt/Job)', icon: Award },
              { id: 'remedy', label: '📿 लाल किताब 43-दिन उपाय (Remedy Start)', icon: ShieldCheck },
            ].map((act) => {
              const isSelected = selectedActivity === act.id;
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedActivity(act.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold font-devanagari transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-700 via-amber-700 to-yellow-600 text-stone-950 font-bold shadow-md shadow-red-950/60'
                      : 'bg-stone-900/70 hover:bg-stone-800 text-stone-300 border border-stone-800'
                  }`}
                >
                  <span className="truncate">{act.label}</span>
                  {isSelected && <ArrowRight className="w-3.5 h-3.5 text-stone-950 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-amber-900/40 text-[11px] text-stone-400 font-devanagari leading-relaxed">
            <strong>लाल किताब नियम (फरमान 17):</strong> किसी भी कार्य के लिए उस ग्रह का काल चुनें जो आपकी कुण्डली में पक्के घर अथवा उच्च का हो।
          </div>
        </div>

        {/* Right Side: Selected Activity Muhurat Blueprint */}
        <div className="lg:col-span-7 bg-[#1c0909]/95 border-2 border-amber-600/70 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-amber-900/50 gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold">
                लाल किताब मुहूर्त निर्देश
              </span>
              <h3 className="text-xl font-bold font-devanagari text-amber-100 mt-0.5">
                {currentActivityData.titleHi}
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-950 text-amber-300 border border-amber-800 font-medium">
              {currentActivityData.pageRef}
            </span>
          </div>

          {/* Best Day & Hour Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-900/40 space-y-1">
              <span className="text-[11px] text-stone-400 block font-devanagari">सर्वश्रेष्ठ वार (Best Days):</span>
              <span className="text-xs font-bold text-amber-300 font-devanagari">
                {currentActivityData.bestDays.join(', ')}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-900/40 space-y-1">
              <span className="text-[11px] text-stone-400 block font-devanagari">सर्वोत्तम काल व समय (Best Hour):</span>
              <span className="text-xs font-bold text-emerald-400 font-devanagari">
                {currentActivityData.bestHour}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-900/40 space-y-1">
              <span className="text-[11px] text-stone-400 block font-devanagari">शुभ दिशा (Page 440):</span>
              <span className="text-xs font-bold text-yellow-300 font-devanagari">
                {currentActivityData.favDirection}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-900/80 border border-amber-900/40 space-y-1">
              <span className="text-[11px] text-stone-400 block font-devanagari">कारक ग्रह (Ruling Planets):</span>
              <span className="text-xs font-bold text-amber-200 font-devanagari">
                {currentActivityData.rulingPlanets.map((p) => PLANETS_METADATA[p].hindi.split(' ')[0]).join(', ')}
              </span>
            </div>
          </div>

          {/* Detailed Guidance & Remedies */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-black to-stone-950 border border-amber-800/50 space-y-2">
            <div className="text-xs font-bold text-amber-300 font-devanagari flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>शास्त्रोक्त विधान व फलादेश:</span>
            </div>
            <p className="text-xs text-stone-200 font-devanagari leading-relaxed">
              {currentActivityData.guideline}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50 space-y-1">
              <span className="text-rose-400 font-bold block flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>वर्जित व सावधानियां:</span>
              </span>
              <p className="text-stone-300 font-devanagari leading-relaxed text-[11px]">
                {currentActivityData.precaution}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/50 space-y-1">
              <span className="text-emerald-400 font-bold block flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>कार्य आरंभ पूर्व रक्षा टोटका:</span>
              </span>
              <p className="text-stone-300 font-devanagari leading-relaxed text-[11px]">
                {currentActivityData.remedyBeforeStarting}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 9 Daily Horas / Planetary Time Windows (अरुण संहिता पृष्ठ 27 तालिका) */}
      <div className="bg-[#1b0808]/90 border border-amber-900/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-amber-900/40 gap-2">
          <div>
            <h3 className="text-lg font-bold font-devanagari text-amber-200 flex items-center space-x-2">
              <Sun className="w-5 h-5 text-amber-400" />
              <span>दैनिक 9 ग्रह काल सारिणी (Daily Planetary Hours)</span>
            </h3>
            <p className="text-xs text-stone-400 font-devanagari mt-0.5">
              अरुण संहिता पृष्ठ 27 के अनुसार दिन के 9 विशिष्ट प्रहर व आपकी जन्म कुण्डली अनुसार शुभ-अशुभ स्थिति:
            </p>
          </div>
          <span className="text-[11px] text-amber-400 font-medium bg-stone-900 px-3 py-1 rounded-lg border border-stone-800">
            कुण्डली अनुसार व्यक्तिगत मूल्यांकन
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {evaluatedHoras.map((slot) => {
            const pMeta = PLANETS_METADATA[slot.planet];
            const isCurrent = currentActiveHora.planet === slot.planet;

            return (
              <div
                key={slot.planet}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? 'bg-gradient-to-br from-amber-950 via-[#290a0a] to-stone-900 border-amber-500 shadow-xl ring-2 ring-amber-500/30'
                    : 'bg-stone-900/70 border-stone-800 hover:border-amber-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-devanagari shadow"
                        style={{ backgroundColor: `${pMeta.color}25`, color: pMeta.color, border: `1px solid ${pMeta.color}50` }}
                      >
                        {pMeta.hindi.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-amber-200 font-devanagari">{slot.nameHi}</h4>
                        <span className="text-[10px] text-stone-400">{slot.timeRange}</span>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-extrabold text-[9px] uppercase tracking-wide">
                        अभी
                      </span>
                    )}
                  </div>

                  {/* Chart Suitability Badge */}
                  <div className="mt-2.5 p-2 rounded-lg bg-black/40 border border-stone-800 text-[11px]">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-stone-400">आपकी कुण्डली में:</span>
                      <span className="font-semibold text-amber-300">खाना नं० {slot.house}</span>
                    </div>
                    <span className={`block font-medium ${
                      slot.status === 'auspicious' ? 'text-emerald-400' :
                      slot.status === 'caution' ? 'text-rose-400' : 'text-amber-300'
                    }`}>
                      {slot.reason}
                    </span>
                  </div>

                  {/* Ideal Tasks */}
                  <div className="mt-2 text-[11px] space-y-1">
                    <span className="text-emerald-400 font-semibold block">उपयुक्त कार्य:</span>
                    <ul className="text-stone-300 font-devanagari space-y-0.5">
                      {slot.idealActivities.map((act, i) => (
                        <li key={i} className="flex items-start space-x-1">
                          <span className="text-emerald-500">✓</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 italic border-t border-stone-800/60 pt-1.5 font-devanagari">
                  {slot.arunSamhitaRef}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lal Kitab Essential Golden Rules for Timings */}
      <div className="bg-[#180505] border border-amber-900/60 rounded-2xl p-5 shadow-lg space-y-3">
        <h4 className="text-sm font-bold text-amber-300 font-devanagari flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>अरुण संहिता लाल किताब मुहूर्त के सर्वोपरि स्वर्ण नियम:</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-300 font-devanagari">
          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
            <span className="font-bold text-amber-400 block">1. दिन के उजाले का नियम (Daylight):</span>
            <p className="text-[11px] text-stone-300">
              लाल किताब का कोई भी शुभ उपाय या मंगल कार्य सूर्यास्त के बाद न करें। रात को शनि का राज्य होता है; सभी उपाय सूर्योदय से सूर्यास्त के मध्य ही फलित होते हैं।
            </p>
          </div>
          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
            <span className="font-bold text-amber-400 block">2. रिक्ता तिथियों का त्याग (Page 409):</span>
            <p className="text-[11px] text-stone-300">
              चतुर्थी (4), नवमी (9) और चतुर्दशी (14) तिथियों में शुरू किए गए कार्यों में अनावश्यक विलंब और फिजूलखर्ची होती है। नया उद्यम इन तिथियों में न छेड़ें।
            </p>
          </div>
          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
            <span className="font-bold text-amber-400 block">3. दिशा शूल व सफ़र हुक्मनामा (Page 440):</span>
            <p className="text-[11px] text-stone-300">
              यात्रा प्रारंभ करते समय केतु की अनुकूल दिशा का ध्यान रखें। किसी भी नए शहर में प्रस्थान से पूर्व तांबे का सिक्का जल में प्रवाहित करें।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
