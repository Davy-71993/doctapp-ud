
'use client';

import { useEffect, useState } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import type { User, Contact, Message } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function InboxPage() {
    const [adminUser, setAdminUser] = useState<User | null>(null);
    const [specialists, setSpecialists] = useState<Contact[] | null>(null);
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchChatData() {
            try {
                const [userRes, specialistsRes, messagesRes] = await Promise.all([
                    fetch('/api/user-profile'), // Mocking admin profile
                    fetch('/api/chat/specialists'),
                    fetch('/api/chat/messages')
                ]);
                const adminData = { ...(await userRes.json()), id: 'admin-user', name: 'Admin' };
                setAdminUser(adminData);
                setSpecialists(await specialistsRes.json());
                setMessages(await messagesRes.json());
            } catch (error) {
                console.error("Failed to fetch chat data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchChatData();
    }, []);

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
        avatar: adminUser.firstName?.charAt(0) || 'A'
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
