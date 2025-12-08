
'use client';
import { DocumentReference, onSnapshot } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

export const useDoc = <T>(
  docRef: DocumentReference | null,
  options?: {
    parseData?: (data: any) => T;
  }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!docRef) {
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = options?.parseData
            ? options.parseData(snapshot.data())
            : snapshot.data();
          setData({ ...(data as T), id: snapshot.id });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [docRef, options]);
  return { data, loading, error };
};
