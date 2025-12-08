
'use client';

import { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import type { Contact, Message } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function InboxPage() {
    const [currentUser, setCurrentUser] = useState<Contact | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChatData() {
            try {
                const [specialistRes, patientsRes, messagesRes] = await Promise.all([
                    fetch('/api/doctors/1'), // Assuming current specialist is Dr. Amina with id '1'
                    fetch('/api/patients'),
                    fetch('/api/chat/messages')
                ]);
                const specialistData = await specialistRes.json();
                const patientsData = await patientsRes.json();
                const messagesData = await messagesRes.json();

                setCurrentUser({
                    id: specialistData.id,
                    name: specialistData.name,
                    avatar: specialistData.image
                });

                setContacts(patientsData.map((p: any) => ({ id: p.id, name: p.name, avatar: p.avatar })));
                setMessages(messagesData);
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

    const defaultContact = contacts.find(c => c.id === 'patient-1');

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={contacts}
                messages={messages}
                defaultSelectedUser={defaultContact}
            />
        </div>
    )
}
