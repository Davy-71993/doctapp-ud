
'use client';

import { useEffect, useState } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import type { User, Contact, Message } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query } from 'firebase/firestore';

export default function InboxPage() {
    const db = useFirestore();
    const { userProfile, loading: userLoading } = useUser();
    const adminUser = userProfile as User | null;

    const { data: specialists, loading: specialistsLoading } = useCollection<Contact>(
        query(collection(db, 'doctors'))
    );
    const { data: messages, loading: messagesLoading } = useCollection<Message>(
        query(collection(db, 'messages'))
    );

    const loading = userLoading || specialistsLoading || messagesLoading;

    if (loading || !adminUser || !specialists) {
        return (
             <div className="h-[calc(100vh_-_8rem)] flex">
                <Skeleton className="w-1/4 h-full" />
                <Skeleton className="w-3/4 h-full" />
             </div>
        );
    }
    
    const currentUser = {
        id: adminUser.id,
        name: `${adminUser.firstName} ${adminUser.lastName}`.trim(),
        avatar: adminUser.firstName.charAt(0) || 'A'
    }

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={specialists}
                messages={messages || []}
                defaultSelectedUser={specialists[0]}
            />
        </div>
    )
}
