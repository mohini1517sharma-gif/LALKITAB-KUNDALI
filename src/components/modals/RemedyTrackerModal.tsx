import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckSquare, Plus, Trash2, Calendar, Award, X, AlertTriangle, ShieldCheck } from 'lucide-react';

interface RemedyTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RemedyTrackerModal: React.FC<RemedyTrackerModalProps> = ({ isOpen, onClose }) => {
  const { remedyTrackers, incrementRemedyDay, deleteRemedyTrack, startRemedyTrack } = useAuth();
  const [newTitle, setNewTitle] = useState('');
  const [newPlanet, setNewPlanet] = useState('बृहस्पति (गुरु)');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await startRemedyTrack(newTitle.trim(), newPlanet);
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
      <div className="bg-[#1a0808] border-2 border-amber-600/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl text-amber-100 space-y-4 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/50">
          <div className="flex items-center space-x-2.5">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg font-devanagari text-amber-200">
              43-दिवसीय लाल किताब उपाय डायरी (Journal)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 43 Days Golden Rule Banner */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/70 to-amber-950/70 border border-amber-700/60 text-xs text-amber-200 font-devanagari leading-relaxed">
          <strong>अरुण संहिता नियम (पृष्ठ 44):</strong> "हर उपाय की मियाद 40 या 43 दिन है। उपाय बिना नागा (बिना अंतराल) पूरा होना चाहिए। यदि एक भी दिन छूट जाए तो पुनः पहले दिन से शुरू करना होगा।"
        </div>

        {/* Action button to open Add Form */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-2.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/60 text-amber-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ नए उपाय का 43-दिवसीय संकल्प जोड़ें</span>
          </button>
        ) : (
          <form onSubmit={handleCreate} className="p-4 rounded-xl bg-stone-900 border border-amber-800/60 space-y-3 text-xs">
            <div className="font-bold text-amber-300">नया लाल किताब उपाय संकल्प:</div>
            <div>
              <label className="block text-stone-400 mb-1">उपाय का नाम / विवरण:</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="जैसे: 43 दिन केसर का तिलक लगाना / काले कुत्ते को मीठी रोटी देना"
                className="w-full bg-[#120505] border border-amber-900/80 rounded-lg p-2 text-amber-100 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">संबंधित ग्रह:</label>
              <select
                value={newPlanet}
                onChange={(e) => setNewPlanet(e.target.value)}
                className="w-full bg-[#120505] border border-amber-900/80 rounded-lg p-2 text-amber-100 focus:outline-none"
              >
                <option value="बृहस्पति (गुरु)">बृहस्पति (गुरु)</option>
                <option value="सूर्य (रवि)">सूर्य (रवि)</option>
                <option value="चन्द्रमा (चन्द्र)">चन्द्रमा (चन्द्र)</option>
                <option value="शुक्र (भृगु)">शुक्र (भृगु)</option>
                <option value="मंगल (भौम)">मंगल (भौम)</option>
                <option value="बुध (अतारद)">बुध (अतारद)</option>
                <option value="शनि (जुहल)">शनि (जुहल)</option>
                <option value="राहु (रास)">राहु (रास)</option>
                <option value="केतु (दुम्ब)">केतु (दुम्ब)</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold"
              >
                संकल्प सुरक्षित करें
              </button>
            </div>
          </form>
        )}

        {/* List of Trackers */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {remedyTrackers.length === 0 ? (
            <div className="p-8 text-center text-stone-400 text-xs font-devanagari">
              अभी कोई उपाय सक्रिय नहीं है। ऊपर दिए गए बटन से नया उपाय प्रारंभ करें।
            </div>
          ) : (
            remedyTrackers.map((tracker) => {
              const progressPct = Math.min(100, Math.round((tracker.completedDays / tracker.targetDays) * 100));
              const isDone = tracker.completedDays >= tracker.targetDays;

              return (
                <div
                  key={tracker.id}
                  className="p-4 rounded-xl bg-stone-900/80 border border-amber-900/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-amber-200 font-devanagari flex items-center space-x-1.5">
                        {isDone ? (
                          <Award className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        )}
                        <span>{tracker.remedyTitle}</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        ग्रह: {tracker.planet} | आरंभ: {tracker.startDate}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteRemedyTrack(tracker.id)}
                      className="text-stone-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-stone-300 font-medium">प्रगति:</span>
                      <span className="font-bold text-amber-300 font-cinzel">
                        दिन {tracker.completedDays} / {tracker.targetDays} ({progressPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-amber-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress Button */}
                  <div className="flex items-center justify-between pt-1">
                    {isDone ? (
                      <span className="text-xs text-yellow-400 font-bold flex items-center space-x-1">
                        <span>✓ 43-दिवसीय महा-उपाय पूर्ण हुआ!</span>
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          incrementRemedyDay(tracker.id, tracker.completedDays, tracker.targetDays)
                        }
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-stone-950 font-bold text-xs shadow flex items-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>आज का उपाय पूर्ण किया (+1 दिन)</span>
                      </button>
                    )}
                    <span className="text-[11px] text-stone-400">
                      {isDone ? 'मालिक कृपा' : `${tracker.targetDays - tracker.completedDays} दिन शेष`}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
