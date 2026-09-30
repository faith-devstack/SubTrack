import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';

export interface UserProfile {
  user_id: string;
  email: string;
  display_name?: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  created_at: string;
  last_login_at?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  isSuspended: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  isAdmin: false,
  isSuspended: false,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfileAndRole = useCallback(async (currentUser: User) => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      const isOwnerEmail = currentUser.email?.toLowerCase() === 'abejidefaith110@gmail.com';

      let profileData: UserProfile;

      if (!userSnap.exists()) {
        profileData = {
          user_id: currentUser.uid,
          email: currentUser.email || '',
          display_name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
          role: isOwnerEmail ? 'admin' : 'user',
          status: 'active',
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
        };
        await setDoc(userDocRef, profileData);
      } else {
        profileData = userSnap.data() as UserProfile;
      }

      setUserProfile(profileData);

      // Check admin status in /admins/{currentUser.uid}
      let adminVerified = false;
      try {
        const adminDocRef = doc(db, 'admins', currentUser.uid);
        const adminSnap = await getDoc(adminDocRef);

        if (adminSnap.exists() && adminSnap.data()?.role === 'admin') {
          adminVerified = true;
        } else if (isOwnerEmail) {
          // Bootstrap verified admin in database
          await setDoc(adminDocRef, {
            user_id: currentUser.uid,
            email: currentUser.email,
            role: 'admin',
            granted_at: new Date().toISOString(),
            granted_by: 'system_bootstrap',
          });
          adminVerified = true;
        }
      } catch (adminErr) {
        // If query fails or is not admin, fallback to isOwnerEmail if matching
        if (isOwnerEmail) {
          adminVerified = true;
        }
      }

      setIsAdmin(adminVerified);
    } catch (error) {
      console.error('Error fetching profile or roles:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfileAndRole(currentUser);
      } else {
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchProfileAndRole]);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserProfile(null);
    setIsAdmin(false);
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchProfileAndRole(auth.currentUser);
    }
  };

  const isSuspended = userProfile?.status === 'suspended';

  return (
    <AuthContext.Provider value={{ user, userProfile, isAdmin, isSuspended, loading, signOut, refreshProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
