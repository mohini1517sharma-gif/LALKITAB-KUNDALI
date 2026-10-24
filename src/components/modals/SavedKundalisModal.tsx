import React from 'react';
import { useAuth, SavedKundaliRecord } from '../../context/AuthContext';
import { KundaliInput } from '../../types/astrology';
import { Bookmark, Trash2, Calendar, MapPin, X, ArrowRight, UserCheck } from 'lucide-react';

interface SavedKundalisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadKundali: (kundali: KundaliInput) => void;
  currentKundali: KundaliInput;
}

export const SavedKundalisModal: React.FC<SavedKundalisModalProps> = ({
  isOpen,
  onClose,
  onLoadKundali,
  currentKundali,
}) => {
  const { savedKundalis, deleteSavedKundali, saveKundali, currentUser } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  if (!isOpen) return null;

  const handleSaveCurrent = async () => {
    setIsSaving(true);
    try {
      await saveKundali(currentKundali);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
      <div className="bg-[#1a0808] border-2 border-amber-600/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl text-amber-100 space-y-4 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/50">
          <div className="flex items-center space-x-2.5">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg font-devanagari text-amber-200">
              सहेजे गए लाल किताब टेवे (Cloud Storage)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Save Current Kundali Bar */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/60 to-amber-950/60 border border-amber-800/60 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-amber-300 font-devanagari">
              वर्तमान टेवा: {currentKundali.name}
            </div>
            <div className="text-[11px] text-stone-400">
              {currentKundali.dob} ({currentKundali.pob})
            </div>
          </div>
          <button
            onClick={handleSaveCurrent}
            disabled={isSaving}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isSaving ? 'सहेज रहे हैं...' : saveSuccess ? '✓ सहेज लिया गया' : '+ यह टेवा क्लाउड में सहेजें'}
          </button>
        </div>

        {/* List of Saved Kundalis */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {savedKundalis.length === 0 ? (
            <div className="p-8 text-center text-stone-400 text-xs font-devanagari">
              आपने अभी तक कोई टेवा सुरक्षित नहीं किया है। ऊपर दिए गए बटन से वर्तमान टेवा सहेजें।
            </div>
          ) : (
            savedKundalis.map((k) => (
              <div
                key={k.id}
                className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-900/40 hover:border-amber-600/70 flex items-center justify-between gap-3 transition-all"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-amber-200 font-devanagari flex items-center space-x-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{k.name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      <span>{k.dob} ({k.tob})</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      <span>{k.pob}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      onLoadKundali(k);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-900/80 hover:bg-red-800 text-amber-200 text-xs font-semibold flex items-center space-x-1 border border-amber-700/50"
                  >
                    <span>लोड करें</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deleteSavedKundali(k.id)}
                    title="हटाएं"
                    className="p-1.5 rounded-lg bg-stone-950 hover:bg-red-950 text-stone-500 hover:text-red-400 border border-stone-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
