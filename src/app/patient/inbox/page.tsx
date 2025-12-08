
'use client';

import { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import type { Contact, Message } from '@/lib/chat-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function InboxPage() {
    const [currentUser, setCurrentUser] = useState<Contact | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChatData() {
            try {
                const [userRes, contactsRes, messagesRes] = await Promise.all([
                    fetch('/api/user-profile'),
                    fetch('/api/specialists'),
                    fetch('/api/chat/messages')
                ]);
                const userData = await userRes.json();
                const contactsData = await contactsRes.json();
                const messagesData = await messagesRes.json();

                setCurrentUser({
                    id: userData.avatar,
                    name: userData.name,
                    avatar: userData.avatar
                });
                setContacts(contactsData);
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

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={contacts}
                messages={messages}
            />
        </div>
    )
}
