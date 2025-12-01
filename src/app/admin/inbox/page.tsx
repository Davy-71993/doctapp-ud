
'use client';

import { ChatLayout } from '@/components/chat/chat-layout';
import { users } from '@/lib/mock-data';
import { specialists, messages as allMessages } from '@/lib/chat-data';

export default function InboxPage() {
    const adminUser = users.find(u => u.role === 'admin');
    const contacts = specialists;
    const currentUser = {
        id: 'admin',
        name: `${adminUser?.firstName} ${adminUser?.lastName}`.trim(),
        avatar: adminUser?.firstName.charAt(0) || 'A'
    }

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={contacts}
                messages={allMessages}
                defaultSelectedUser={contacts[0]}
            />
        </div>
    )
}
