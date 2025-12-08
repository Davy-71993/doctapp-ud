'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../provider';
import { useEffect, useMemo, useState } from 'react';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '../provider';

export function useUser() {
  const auth = useAuth();
  const db = useFirestore();
  const [user, loading, error] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState(null);

  const userRef = useMemo(
    () => (user ? doc(db, 'users', user.uid) : null),
    [user, db]
  );

  useEffect(() => {
    const fetchUserProfile = async (userDocRef: DocumentReference) => {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as any);
      }
    };
    if (userRef) {
      fetchUserProfile(userRef);
    }
  }, [userRef]);

  return { user, userProfile, userRef, loading, error };
}
