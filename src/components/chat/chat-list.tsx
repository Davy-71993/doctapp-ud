
"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type Chat, type Contact } from '@/lib/chat-data';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { ImagePlaceholder } from '../image-placeholder';

interface ChatListProps {
    chats: Chat[];
    selectedChat: Chat | null;
    onSelectChat: (chat: Chat) => void;
    currentUser: Contact;
    contacts: Contact[];
    onNewChat: (chat: Chat) => void;
}

export function ChatList({ chats, selectedChat, onSelectChat, currentUser, contacts, onNewChat }: ChatListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [contactSearchTerm, setContactSearchTerm] = useState('');

    const filteredChats = chats.filter(chat =>
        chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredContacts = contacts.filter(contact =>
        contact.id !== currentUser.id &&
        contact.name.toLowerCase().includes(contactSearchTerm.toLowerCase())
    );

    const handleSelectContact = (contact: Contact) => {
        const existingChat = chats.find(c => c.id === contact.id);
        if (existingChat) {
            onSelectChat(existingChat);
        } else {
            onNewChat({ id: contact.id, contact, messages: [] });
        }
        setContactSearchTerm('');
        setDialogOpen(false);
    }
    
    return (
        <div className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-bold">Inbox</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Plus className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Chat</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Search contacts..."
                                    className="pl-10"
                                    value={contactSearchTerm}
                                    onChange={(e) => setContactSearchTerm(e.target.value)}
                                />
                            </div>
                            <ScrollArea className="mt-4 h-[300px]">
                                {filteredContacts.map(contact => (
                                    <div
                                        key={contact.id}
                                        className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted"
                                        onClick={() => handleSelectContact(contact)}
                                    >
                                        <Avatar className="h-10 w-10">
                                            <ImagePlaceholder id={contact.avatar} />
                                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-medium">{contact.name}</p>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search chats..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <ScrollArea className="flex-1">
                {filteredChats.map(chat => {
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    return (
                        <div
                            key={chat.id}
                            className={cn(
                                'flex cursor-pointer items-center gap-3 p-4',
                                selectedChat?.id === chat.id ? 'bg-muted' : 'hover:bg-muted/50'
                            )}
                            onClick={() => onSelectChat(chat)}
                        >
                            <Avatar className="h-10 w-10">
                                <ImagePlaceholder id={chat.contact.avatar} />
                                <AvatarFallback>{chat.contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-semibold truncate">{chat.contact.name}</p>
                                <p className="text-sm text-muted-foreground truncate">
                                    {lastMessage ? `${lastMessage.senderId === currentUser.id ? 'You: ' : ''}${lastMessage.text}` : "No messages yet"}
                                </p>
                            </div>
                            {lastMessage && (
                                <p className="text-xs text-muted-foreground">
                                    {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            )}
                        </div>
                    );
                })}
            </ScrollArea>
        </div>
    );
}
