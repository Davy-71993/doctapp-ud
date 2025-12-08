
'use client';

import { useEffect, useState } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import type { Doctor, Contact, Message } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function InboxPage() {
    const [currentUser, setCurrentUser] = useState<Doctor | null>(null);
    const [contacts, setContacts] = useState<Contact[] | null>(null);
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChatData() {
            try {
                // Mock fetching the current user (specialist)
                const specialistId = '1'; 
                const [userRes, contactsRes, messagesRes] = await Promise.all([
                    fetch(`/api/doctors/${specialistId}`),
                    fetch('/api/patients'), // Specialists chat with patients
                    fetch('/api/chat/messages')
                ]);
                setCurrentUser(await userRes.json());
                setContacts(await contactsRes.json());
                setMessages(await messagesRes.json());
            } catch (error) {
                console.error("Failed to fetch chat data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchChatData();
    }, []);

    if (loading || !currentUser) {
        return (
             <div className="h-[calc(100vh_-_8rem)] flex">
                <Skeleton className="w-1/4 h-full" />
                <Skeleton className="w-3/4 h-full" />
             </div>
        );
    }
    
    const typedProfile = {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.image
    }

    const defaultContact = contacts?.find(c => c.id === 'patient-1');

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={typedProfile}
                contacts={contacts || []}
                messages={messages || []}
                defaultSelectedUser={defaultContact}
            />
        </div>
    )
}
