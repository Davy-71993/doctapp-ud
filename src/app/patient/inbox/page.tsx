
'use client';

import { ChatLayout } from '@/components/chat/chat-layout';
import type { Contact, Message } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function InboxPage() {
    const db = useFirestore();
    const { userProfile, loading: userLoading } = useUser();
    
    const { data: contacts, loading: contactsLoading } = useCollection<Contact>(
        query(collection(db, 'doctors'))
    );
    const { data: messages, loading: messagesLoading } = useCollection<Message>(
        query(collection(db, 'messages'))
    );

    const loading = userLoading || contactsLoading || messagesLoading;

    if (loading || !userProfile) {
        return (
             <div className="h-[calc(100vh_-_8rem)] flex">
                <Skeleton className="w-1/4 h-full" />
                <Skeleton className="w-3/4 h-full" />
             </div>
        );
    }
    
    const typedProfile = userProfile as Contact;

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={typedProfile}
                contacts={contacts || []}
                messages={messages || []}
            />
        </div>
    )
}
