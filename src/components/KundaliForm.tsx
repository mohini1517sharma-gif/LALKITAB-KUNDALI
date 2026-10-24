import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Sparkles, AlertCircle, HelpCircle, Bookmark } from 'lucide-react';
import { KundaliInput } from '../types/astrology';
import { POPULAR_CITIES, CityLocation } from '../utils/astronomicalCalculator';
import { useAuth } from '../context/AuthContext';

interface KundaliFormProps {
  initialValues: KundaliInput;
  onSubmit: (values: KundaliInput) => void;
  lang: 'hi' | 'en';
}

export const KundaliForm: React.FC<KundaliFormProps> = ({ initialValues, onSubmit, lang }) => {
  const [formData, setFormData] = useState<KundaliInput>(initialValues);
  const [selectedCity, setSelectedCity] = useState<string>(initialValues.pob || 'Chandigarh');
  const { currentUser, saveKundali, signIn } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const city = POPULAR_CITIES.find((c) => c.name === cityName);
    if (city) {
      setFormData((prev) => ({
        ...prev,
        pob: city.name,
        lat: city.lat,
        lng: city.lng,
      }));
    }
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    let age = formData.currentAge || 30;
    if (dob) {
      const birthYear = new Date(dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (!isNaN(birthYear) && birthYear > 1900) {
        age = Math.max(1, currentYear - birthYear);
      }
    }
    setFormData((prev) => ({
      ...prev,
      dob: dob,
      currentAge: age,
    }));
  };

  const handlePreset = (presetType: 'demo' | 'marriage' | 'wealth') => {
    if (presetType === 'demo') {
      const city = POPULAR_CITIES.find((c) => c.name === 'Chandigarh')!;
      const data: KundaliInput = {
        name: 'मोहिनी शर्मा (Mohini Sharma)',
        gender: 'female',
        dob: '1992-08-15',
        tob: '10:15',
        pob: city.name,
        lat: city.lat,
        lng: city.lng,
        currentAge: 34,
        majorObstacle: 'जीवन के मुख्य मार्ग में स्थायी आर्थिक समृद्धि, विवाह सुख और परिवार की सुरक्षा',
      };
      setFormData(data);
      setSelectedCity(city.name);
      onSubmit(data);
    } else if (presetType === 'marriage') {
      const city = POPULAR_CITIES.find((c) => c.name === 'New Delhi')!;
      const data: KundaliInput = {
        name: 'रोहित वर्मा (Rohit Verma)',
        gender: 'male',
        dob: '1996-03-24',
        tob: '18:45',
        pob: city.name,
        lat: city.lat,
        lng: city.lng,
        currentAge: 30,
        majorObstacle: 'विवाह में अप्रत्याशित विलंब, रिश्ते बनते-बनते टूटना और मांगलिक प्रभाव',
      };
      setFormData(data);
      setSelectedCity(city.name);
      onSubmit(data);
    } else if (presetType === 'wealth') {
      const city = POPULAR_CITIES.find((c) => c.name === 'Jaipur')!;
      const data: KundaliInput = {
        name: 'अजय सिंघानिया (Ajay Singhania)',
        gender: 'male',
        dob: '1987-11-12',
        tob: '05:30',
        pob: city.name,
        lat: city.lat,
        lng: city.lng,
        currentAge: 39,
        majorObstacle: 'व्यापार में अचानक भारी घाटा, ऋण का बोझ और दुकान पर नजर दोष (ऊपरी बाधा)',
      };
      setFormData(data);
      setSelectedCity(city.name);
      onSubmit(data);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-[#1e0a0a]/90 backdrop-blur border border-amber-900/70 rounded-2xl p-5 sm:p-7 shadow-xl text-amber-100">
      {/* Header & Quick Preset buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-amber-900/50 gap-3">
        <div>
          <h2 className="text-xl font-bold font-devanagari text-amber-300 flex items-center space-x-2">
            <span>जन्म विवरण एवं प्रश्न दर्ज करें</span>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
              {lang === 'hi' ? 'स्वचालित गणना' : 'Automated Kundali'}
            </span>
          </h2>
          <p className="text-xs text-amber-300/70 font-devanagari">
            {lang === 'hi'
              ? 'अरुण संहिता - लाल किताब (1999) के अनुसार शुद्ध टेवा, वर्षफल व अचूक उपाय'
              : 'Authentic Lal Kitab Teva & Annual Chart calculation based on 1999 Arun Samhita'}
          </p>
        </div>

        {/* Preset buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-400 text-[11px] mr-1">{lang === 'hi' ? 'उदाहरण टेवा:' : 'Sample Profiles:'}</span>
          <button
            type="button"
            onClick={() => handlePreset('demo')}
            className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-amber-300 border border-amber-700/50 transition-all font-devanagari text-xs"
          >
            मोहिनी शर्मा
          </button>
          <button
            type="button"
            onClick={() => handlePreset('marriage')}
            className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-800/50 transition-all font-devanagari text-xs"
          >
            विवाह विलंब
          </button>
          <button
            type="button"
            onClick={() => handlePreset('wealth')}
            className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-800/50 transition-all font-devanagari text-xs"
          >
            धन व नजर दोष
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari">
              {lang === 'hi' ? 'जातक का नाम (Name)' : 'Seeker Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-amber-600" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-sm text-amber-100 placeholder-stone-600 focus:outline-none"
                placeholder="नाम दर्ज करें"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari">
              {lang === 'hi' ? 'लिंग (Gender)' : 'Gender'}
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
              className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl px-3 py-2 text-sm text-amber-100 focus:outline-none"
            >
              <option value="male">{lang === 'hi' ? 'पुरुष (Male / नर)' : 'Male'}</option>
              <option value="female">{lang === 'hi' ? 'महिला (Female / स्त्री)' : 'Female'}</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari">
              {lang === 'hi' ? 'जन्म तिथि (Date of Birth)' : 'Date of Birth'}
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-amber-600" />
              <input
                type="date"
                required
                value={formData.dob}
                onChange={handleDobChange}
                className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-sm text-amber-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari">
              {lang === 'hi' ? 'जन्म समय (Time of Birth)' : 'Time of Birth'}
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 absolute left-3 top-2.5 text-amber-600" />
              <input
                type="time"
                required
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-sm text-amber-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Place of Birth (City selection) */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari">
              {lang === 'hi' ? 'जन्म स्थान / नगर (Birth City)' : 'Birth Place'}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-amber-600" />
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-sm text-amber-100 focus:outline-none"
              >
                {POPULAR_CITIES.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name} ({city.state}) [Lat: {city.lat}, Lng: {city.lng}]
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Current Age */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari">
              {lang === 'hi' ? 'वर्तमान आयु (Current Age in Yrs)' : 'Current Age'}
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={formData.currentAge || 30}
              onChange={(e) => setFormData({ ...formData, currentAge: parseInt(e.target.value, 10) || 30 })}
              className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl px-3 py-2 text-sm text-amber-100 focus:outline-none"
            />
          </div>

          {/* Specific Concern / Obstacle category */}
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari">
              {lang === 'hi' ? 'प्राथमिक समस्या वर्ग' : 'Primary Concern Category'}
            </label>
            <select
              onChange={(e) => {
                const map: Record<string, string> = {
                  marriage: 'विवाह में विलंब, रिश्ते न जुड़ना, दांपत्य कलह अथवा मांगलिक दोष',
                  wealth: 'व्यापार में घाटा, कर्ज का बोझ, आर्थिक रुकावटें व धन संचय की समस्या',
                  nazar: 'अज्ञात भय, ऊपरी बाधा, बुरी नजर, तंत्र संकट व रात को डरावने सपने',
                  health: 'असाध्य शारीरिक रोग, मानसिक अशांति व परिवार में लगातार बीमारियां',
                  career: 'नौकरी में पदोन्नति न होना, उच्चाधिकारियों से विरोध व कोर्ट-कचहरी',
                };
                if (map[e.target.value]) {
                  setFormData({ ...formData, majorObstacle: map[e.target.value] });
                }
              }}
              className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl px-3 py-2 text-sm text-amber-100 focus:outline-none"
            >
              <option value="marriage">💍 विवाह व दांपत्य (Marriage & Timing)</option>
              <option value="wealth">💰 आर्थिक उन्नति व कर्ज (Wealth & Debts)</option>
              <option value="nazar">🧿 नजर दोष व तंत्र रक्षा (Black Magic & Evil Eye)</option>
              <option value="health">🌿 रोग व स्वास्थ्य (Health & Vitality)</option>
              <option value="career">⚔️ करियर व शत्रु बाधा (Career & Enemies)</option>
            </select>
          </div>
        </div>

        {/* Detailed question / obstacle textarea */}
        <div>
          <label className="block text-xs font-semibold text-amber-300 mb-1 font-devanagari flex items-center justify-between">
            <span>{lang === 'hi' ? 'विशेष जीवन बाधा या व्यक्तिगत प्रश्न (Personal Life Obstacle)' : 'Describe Your Life Obstacle / Specific Question'}</span>
            <span className="text-[11px] text-amber-400/80">लाल किताब परामर्श हेतु</span>
          </label>
          <textarea
            rows={2}
            value={formData.majorObstacle}
            onChange={(e) => setFormData({ ...formData, majorObstacle: e.target.value })}
            placeholder="जैसे: मेरी शादी कब होगी? आर्थिक रुकावटें कब दूर होंगी? या मुझे नजर दोष और बुरे स्वप्नों से मुक्ति के लाल किताब उपाय चाहिए..."
            className="w-full bg-[#130606] border border-amber-900/80 focus:border-amber-500 rounded-xl px-3 py-2 text-sm text-amber-100 placeholder-stone-600 focus:outline-none"
          />
        </div>

        {/* Submit & Save Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {currentUser ? (
            <button
              type="button"
              disabled={isSaving}
              onClick={async () => {
                setIsSaving(true);
                try {
                  await saveKundali(formData);
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 3000);
                } catch (e) {
                  console.error(e);
                } finally {
                  setIsSaving(false);
                }
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-800/80 hover:border-amber-500 text-amber-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>{isSaving ? 'सहेज रहे हैं...' : saveSuccess ? '✓ क्लाउड में सुरक्षित' : 'क्लाउड में सहेजें'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={signIn}
              className="text-xs text-amber-400/80 hover:text-amber-300 font-devanagari underline"
            >
              गूगल लॉगिन करें (टेवा ऑनलाइन सुरक्षित रखने हेतु)
            </button>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-700 hover:from-red-500 hover:to-amber-500 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-red-950/60 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer ml-auto"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span className="font-devanagari">
              {lang === 'hi' ? 'लाल किताब कुण्डली व संपूर्ण विश्लेषण तैयार करें' : 'Generate Lal Kitab Kundali & Full Report'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};
