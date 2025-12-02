
"use client";

import { useState, useEffect } from 'react';
import { type Chat, type Contact, type Message } from '@/lib/chat-data';
import { ChatList } from './chat-list';
import { ChatWindow } from './chat-window';
import { cn } from '@/lib/utils';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

interface ChatLayoutProps {
    currentUser: Contact;
    contacts: Contact[];
    messages: Message[];
    defaultSelectedUser?: Contact;
}

export function ChatLayout({ currentUser, contacts, messages: initialMessages, defaultSelectedUser }: ChatLayoutProps) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const uniqueContacts = Array.from(new Set(initialMessages.flatMap(m => [m.senderId, m.receiverId])));
        const relatedContacts = contacts.filter(c => uniqueContacts.includes(c.id));
        
        const groupedChats: Chat[] = relatedContacts.map(contact => {
            const contactMessages = initialMessages
                .filter(m => (m.senderId === contact.id && m.receiverId === currentUser.id) || (m.senderId === currentUser.id && m.receiverId === contact.id))
                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            return {
                id: contact.id,
                contact,
                messages: contactMessages,
            };
        }).sort((a,b) => {
            if (!a.messages.length) return 1;
            if (!b.messages.length) return -1;
            return new Date(b.messages[b.messages.length - 1].timestamp).getTime() - new Date(a.messages[a.messages.length - 1].timestamp).getTime()
        });

        setChats(groupedChats);

        if (defaultSelectedUser) {
            const defaultChat = groupedChats.find(chat => chat.contact.id === defaultSelectedUser.id);
            if (defaultChat) {
                setSelectedChat(defaultChat);
            }
        } else if(groupedChats.length > 0) {
            setSelectedChat(groupedChats[0]);
        }

    }, [initialMessages, contacts, currentUser.id, defaultSelectedUser]);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        return () => window.removeEventListener('resize', checkScreenWidth);
    }, []);

    const handleSendMessage = (newMessage: Omit<Message, 'id'>) => {
        const messageId = Date.now().toString();
        const fullMessage: Message = { id: messageId, ...newMessage };

        setChats(prevChats => {
            return prevChats.map(chat => {
                if (chat.id === selectedChat?.id) {
                    return {
                        ...chat,
                        messages: [...chat.messages, fullMessage]
                    };
                }
                return chat;
            });
        });
    };
    
    return (
         <ResizablePanelGroup
            direction="horizontal"
            className="h-full items-stretch"
        >
            <ResizablePanel
                defaultSize={25}
                minSize={20}
                maxSize={30}
                className={cn(isMobile && selectedChat ? "hidden" : "block", "sm:block")}
            >
                <ChatList
                    chats={chats}
                    selectedChat={selectedChat}
                    onSelectChat={(chat) => {
                        setSelectedChat(chat);
                    }}
                    currentUser={currentUser}
                    contacts={contacts}
                    onNewChat={(newChat) => {
                        if (!chats.find(c => c.id === newChat.id)) {
                            setChats(prev => [newChat, ...prev]);
                        }
                        setSelectedChat(newChat);
                    }}
                />
            </ResizablePanel>
            <ResizableHandle withHandle className={cn(isMobile && "hidden", "sm:flex")} />
            <ResizablePanel
                defaultSize={75}
                className={cn(isMobile && !selectedChat ? "hidden" : "block", "sm:block")}
            >
                {selectedChat ? (
                    <ChatWindow
                        chat={selectedChat}
                        currentUser={currentUser}
                        onSendMessage={handleSendMessage}
                        onBack={() => setSelectedChat(null)}
                        isMobile={isMobile}
                    />
                ) : (
                    !isMobile && (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            Select a chat to start messaging
                        </div>
                    )
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
