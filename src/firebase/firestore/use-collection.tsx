'use client';
import {
  FirestoreError,
  Query,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useCollection = <T>(
  query: Query | null,
  options: {
    parseData?: (data: any) => T;
  }
) => {
  const { parseData } = options || {};
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const result: T[] = [];
        snapshot.forEach((doc) => {
          const docData = doc.data();
          const parsed = parseData ? parseData(docData) : docData;
          result.push({ ...(parsed as T), id: doc.id });
        });
        setData(result);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query, parseData]);

  return { data, loading, error };
};
