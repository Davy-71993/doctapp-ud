
'use client';

import { useEffect, useState } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import type { User, Contact, Message } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function InboxPage() {
    const [adminUser, setAdminUser] = useState<User | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChatData() {
            try {
                const [usersRes, specialistsRes, messagesRes] = await Promise.all([
                    fetch('/api/users'),
                    fetch('/api/specialists'),
                    fetch('/api/chat/messages')
                ]);
                const usersData: User[] = await usersRes.json();
                const specialistsData: Contact[] = await specialistsRes.json();
                const messagesData: Message[] = await messagesRes.json();
                
                const admin = usersData.find(u => u.role === 'admin');
                setAdminUser(admin || null);
                setContacts(specialistsData);
                setMessages(messagesData);
            } catch (error) {
                console.error("Failed to fetch chat data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchChatData();
    }, []);

    if (loading || !adminUser || contacts.length === 0) {
        return (
             <div className="h-[calc(100vh_-_8rem)] flex">
                <Skeleton className="w-1/4 h-full" />
                <Skeleton className="w-3/4 h-full" />
             </div>
        );
    }
    
    const currentUser = {
        id: 'admin',
        name: `${adminUser.firstName} ${adminUser.lastName}`.trim(),
        avatar: adminUser.firstName.charAt(0) || 'A'
    }

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={contacts}
                messages={messages}
                defaultSelectedUser={contacts[0]}
            />
        </div>
    )
}
