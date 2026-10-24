import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, loginWithGoogle, logoutUser, handleFirestoreError, OperationType } from '../services/firebase';
import { KundaliInput } from '../types/astrology';

export interface SavedKundaliRecord extends KundaliInput {
  id: string;
  userId: string;
  createdAt?: unknown;
}

export interface RemedyTrackerRecord {
  id: string;
  userId: string;
  remedyTitle: string;
  planet: string;
  targetDays: number;
  completedDays: number;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  savedKundalis: SavedKundaliRecord[];
  remedyTrackers: RemedyTrackerRecord[];
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  saveKundali: (kundali: KundaliInput) => Promise<string>;
  deleteSavedKundali: (id: string) => Promise<void>;
  startRemedyTrack: (title: string, planet: string) => Promise<void>;
  incrementRemedyDay: (trackerId: string, currentDays: number, targetDays: number) => Promise<void>;
  deleteRemedyTrack: (trackerId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedKundalis, setSavedKundalis] = useState<SavedKundaliRecord[]>([]);
  const [remedyTrackers, setRemedyTrackers] = useState<RemedyTrackerRecord[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen to user's saved Kundalis
  useEffect(() => {
    if (!currentUser) {
      setSavedKundalis([]);
      return;
    }

    const path = 'savedKundalis';
    try {
      const q = query(collection(db, path), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: SavedKundaliRecord[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as SavedKundaliRecord);
          });
          setSavedKundalis(list);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, path);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching saved kundalis:', err);
    }
  }, [currentUser]);

  // Listen to user's 43-Day Remedy Trackers
  useEffect(() => {
    if (!currentUser) {
      setRemedyTrackers([]);
      return;
    }

    const path = 'remedyTrackers';
    try {
      const q = query(collection(db, path), where('userId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: RemedyTrackerRecord[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as RemedyTrackerRecord);
          });
          setRemedyTrackers(list);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, path);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching remedy trackers:', err);
    }
  }, [currentUser]);

  const signIn = async () => {
    await loginWithGoogle();
  };

  const signOutUser = async () => {
    await logoutUser();
  };

  const saveKundali = async (kundali: KundaliInput): Promise<string> => {
    if (!currentUser) {
      throw new Error('Please sign in with Google to save your Kundali.');
    }

    const id = `k_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const path = 'savedKundalis';
    const payload = {
      id,
      userId: currentUser.uid,
      name: kundali.name.substring(0, 100),
      gender: kundali.gender || 'female',
      dob: kundali.dob,
      tob: kundali.tob || '12:00',
      pob: (kundali.pob || 'New Delhi').substring(0, 100),
      currentAge: kundali.currentAge || 30,
      majorObstacle: (kundali.majorObstacle || '').substring(0, 500),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, path, id), payload);
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${path}/${id}`);
    }
  };

  const deleteSavedKundali = async (id: string) => {
    const path = 'savedKundalis';
    try {
      await deleteDoc(doc(db, path, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${path}/${id}`);
    }
  };

  const startRemedyTrack = async (title: string, planet: string) => {
    if (!currentUser) {
      throw new Error('Please sign in to start a 43-day remedy track.');
    }

    const id = `rem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const path = 'remedyTrackers';
    const today = new Date().toISOString().split('T')[0];
    const payload = {
      id,
      userId: currentUser.uid,
      remedyTitle: title.substring(0, 200),
      planet: planet.substring(0, 50),
      targetDays: 43,
      completedDays: 1,
      status: 'active',
      startDate: today,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, path, id), payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${path}/${id}`);
    }
  };

  const incrementRemedyDay = async (trackerId: string, currentDays: number, targetDays: number) => {
    const path = 'remedyTrackers';
    const nextDays = currentDays + 1;
    const isCompleted = nextDays >= targetDays;

    try {
      await updateDoc(doc(db, path, trackerId), {
        completedDays: nextDays,
        status: isCompleted ? 'completed' : 'active',
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${path}/${trackerId}`);
    }
  };

  const deleteRemedyTrack = async (trackerId: string) => {
    const path = 'remedyTrackers';
    try {
      await deleteDoc(doc(db, path, trackerId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${path}/${trackerId}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        savedKundalis,
        remedyTrackers,
        signIn,
        signOut: signOutUser,
        saveKundali,
        deleteSavedKundali,
        startRemedyTrack,
        incrementRemedyDay,
        deleteRemedyTrack,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
