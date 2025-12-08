
'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../provider';
import { useEffect, useMemo, useState } from 'react';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '../provider';
import type { User, Patient, Doctor } from '@/lib/types';

export function useUser() {
  const auth = useAuth();
  const db = useFirestore();
  const [user, authLoading, error] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userRef = useMemo(
    () => (user ? doc(db, 'users', user.uid) : null),
    [user, db]
  );

  useEffect(() => {
    setLoading(authLoading);
    if (authLoading || !user || !userRef) {
        if(!authLoading) setLoading(false);
        setUserProfile(null);
        return;
    };

    const fetchUserProfile = async (userDocRef: DocumentReference) => {
        setLoading(true);
        try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const baseProfile = userDoc.data() as User;
                let roleProfile = {};

                if (baseProfile.role === 'patient') {
                    const patientDoc = await getDoc(doc(db, 'patients', user.uid));
                    if (patientDoc.exists()) {
                        roleProfile = patientDoc.data() as Patient;
                    }
                } else if (baseProfile.role === 'specialist') {
                    const doctorDoc = await getDoc(doc(db, 'doctors', user.uid));
                    if (doctorDoc.exists()) {
                        roleProfile = doctorDoc.data() as Doctor;
                    }
                }
                
                setUserProfile({ ...baseProfile, ...roleProfile });
            } else {
                setUserProfile(null);
            }
        } catch(e) {
            console.error("Error fetching user profile:", e);
            setUserProfile(null);
        } finally {
            setLoading(false);
        }
    };

    fetchUserProfile(userRef);
  }, [user, userRef, db, authLoading]);

  return { user, userProfile, userRef, loading, error };
}
