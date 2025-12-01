
'use client';

import { ChatLayout } from '@/components/chat/chat-layout';
import { userProfile } from '@/lib/mock-data';
import { specialists, messages as allMessages } from '@/lib/chat-data';

export default function InboxPage() {
    const contacts = specialists;
    const currentUser = {
        id: userProfile.avatar,
        name: userProfile.name,
        avatar: userProfile.avatar
    }

    return (
        <div className="h-[calc(100vh_-_8rem)]">
            <ChatLayout 
                currentUser={currentUser}
                contacts={contacts}
                messages={allMessages}
            />
        </div>
    )
}
