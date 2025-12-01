
'use client';

import { ChatLayout } from '@/components/chat/chat-layout';
import { doctors } from '@/lib/mock-data';
import { patients, messages as allMessages } from '@/lib/chat-data';

export default function InboxPage() {
    const specialist = doctors.find(d => d.name === 'Dr. Amina Nakigudde');
    const contacts = patients;
    const currentUser = {
        id: specialist?.id || 'specialist-1',
        name: specialist?.name || 'Dr. Amina',
        avatar: specialist?.image || 'doctor-1'
    }

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={contacts}
                messages={allMessages}
                defaultSelectedUser={contacts[1]}
            />
        </div>
    )
}
