
'use client';

import { ChatLayout } from '@/components/chat/chat-layout';
import type { Contact, Message } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useFirestore, useCollection, useDoc } from '@/firebase';
import { collection, doc, query } from 'firebase/firestore';

export default function InboxPage() {
    const db = useFirestore();
    const { user } = useUser();

    const currentUserRef = user ? doc(db, 'doctors', user.uid) : null;
    const { data: currentUser, loading: userLoading } = useDoc<Contact>(currentUserRef);
    
    const { data: contacts, loading: contactsLoading } = useCollection<Contact>(
        query(collection(db, 'patients'))
    );
    const { data: messages, loading: messagesLoading } = useCollection<Message>(
        query(collection(db, 'messages'))
    );

    const loading = userLoading || contactsLoading || messagesLoading;

    if (loading || !currentUser) {
        return (
             <div className="h-[calc(100vh_-_8rem)] flex">
                <Skeleton className="w-1/4 h-full" />
                <Skeleton className="w-3/4 h-full" />
             </div>
        );
    }

    const defaultContact = contacts?.find(c => c.id === 'patient-1');

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={contacts || []}
                messages={messages || []}
                defaultSelectedUser={defaultContact}
            />
        </div>
    )
}
