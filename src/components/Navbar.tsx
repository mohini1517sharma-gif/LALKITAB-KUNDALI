import React, { useState } from 'react';
import { BookOpen, Sparkles, Printer, Volume2, VolumeX, LogIn, LogOut, Bookmark, CheckSquare, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
  onPrint: () => void;
  onOpenSavedModal: () => void;
  onOpenTrackerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  onPrint,
  onOpenSavedModal,
  onOpenTrackerModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { currentUser, signIn, signOut, savedKundalis, remedyTrackers } = useAuth();

  // Play peaceful temple chime / Tibetan bell sound via Web Audio API
  const toggleAudio = () => {
    if (!isPlayingAudio) {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        // Sacred 432Hz Om resonant frequency
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(108, audioCtx.currentTime + 3.5);
        
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.5);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 3.6);
        setIsPlayingAudio(true);
        setTimeout(() => setIsPlayingAudio(false), 3600);
      } catch (e) {
        console.log('Audio not supported or permitted', e);
      }
    } else {
      setIsPlayingAudio(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#170505]/95 backdrop-blur-md border-b border-amber-900/60 text-amber-100 shadow-2xl no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 via-amber-600 to-red-950 p-0.5 shadow-lg shadow-red-950/80 flex items-center justify-center border border-amber-400/40">
            <span className="text-2xl font-bold font-devanagari text-amber-200 drop-shadow">ॐ</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold font-cinzel tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300">
                LAL KITAB AMRIT
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/90 text-amber-300 border border-amber-500/40 font-medium">
                1999 संस्करण
              </span>
            </div>
            <p className="text-xs text-amber-200/80 font-devanagari tracking-wide">
              {lang === 'hi' 
                ? 'अरुण संहिता - लाल किताब सॉफ्टवेयर | मोहिनी शर्मा' 
                : 'Arun Samhita Lal Kitab Software | By Mohini Sharma'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center space-x-2 sm:space-x-3 gap-y-2">
          {/* Saved Kundalis Cloud Button */}
          {currentUser && (
            <button
              onClick={onOpenSavedModal}
              title="सहेजे गए टेवे (Cloud Storage)"
              className="px-2.5 py-1.5 rounded-lg bg-stone-900/80 border border-amber-900/80 hover:border-amber-500 text-amber-300 text-xs flex items-center space-x-1.5 transition-all"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">सहेजे गए टेवे</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-200 text-[10px] font-bold border border-amber-800">
                {savedKundalis.length}
              </span>
            </button>
          )}

          {/* 43-Day Remedy Tracker Button */}
          {currentUser && (
            <button
              onClick={onOpenTrackerModal}
              title="43-दिवसीय लाल किताब उपाय डायरी"
              className="px-2.5 py-1.5 rounded-lg bg-stone-900/80 border border-amber-900/80 hover:border-amber-500 text-emerald-300 text-xs flex items-center space-x-1.5 transition-all"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">उपाय डायरी</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-200 text-[10px] font-bold border border-emerald-800">
                {remedyTrackers.filter((r) => r.status === 'active').length}
              </span>
            </button>
          )}

          {/* Audio Chime Button */}
          <button
            onClick={toggleAudio}
            title={lang === 'hi' ? 'शांति ओंकार ध्वनि' : 'Sacred Om Chime'}
            className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/80 hover:border-amber-500/80 text-amber-300 hover:text-amber-100 transition-all flex items-center space-x-1.5 text-xs"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">ॐ ध्वनि</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span className="hidden sm:inline">ॐ नाद</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <div className="bg-stone-900/90 border border-amber-900/80 rounded-lg p-0.5 flex text-xs font-semibold">
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded transition-all ${
                lang === 'hi'
                  ? 'bg-gradient-to-r from-red-700 to-amber-700 text-amber-100 shadow'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded transition-all ${
                lang === 'en'
                  ? 'bg-gradient-to-r from-red-700 to-amber-700 text-amber-100 shadow'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              English
            </button>
          </div>

          {/* Print PDF Button */}
          <button
            onClick={onPrint}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-amber-900/40 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'hi' ? 'रिपोर्ट प्रिंट' : 'Print Report'}</span>
          </button>

          {/* Firebase Google Auth Button */}
          {currentUser ? (
            <div className="flex items-center space-x-2 pl-1 border-l border-amber-900/50">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-7 h-7 rounded-full border border-amber-500/60"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-amber-800 flex items-center justify-center text-xs font-bold text-amber-200">
                  <User className="w-4 h-4" />
                </div>
              )}
              <span className="text-xs text-amber-200 hidden lg:inline max-w-[100px] truncate">
                {currentUser.displayName?.split(' ')[0]}
              </span>
              <button
                onClick={signOut}
                title="लॉगआउट"
                className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-stone-300 hover:text-white border border-red-800 text-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={signIn}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-800 to-amber-800 hover:from-red-700 hover:to-amber-700 text-amber-100 border border-amber-500/50 font-semibold text-xs flex items-center space-x-1.5 shadow transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-300" />
              <span>गूगल लॉगिन</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
