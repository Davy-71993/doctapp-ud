'use client';
import { useEffect, useState } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider, FirebaseContextValue } from './provider';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebase, setFirebase] = useState<FirebaseContextValue>({
    app: null,
    db: null,
    auth: null,
  });

  useEffect(() => {
    const { app, db, auth } = initializeFirebase();
    setFirebase({ app, db, auth });
  }, []);

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
