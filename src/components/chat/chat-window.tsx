
"use client";

import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type Chat, type Contact, type Message } from '@/lib/chat-data';
import { Send, ArrowLeft } from 'lucide-react';
import { ImagePlaceholder } from '../image-placeholder';
import { format } from 'date-fns';


interface ChatWindowProps {
    chat: Chat;
    currentUser: Contact;
    onSendMessage: (message: Omit<Message, 'id'>) => void;
    isMobile: boolean;
    onBack: () => void;
}

export function ChatWindow({ chat, currentUser, onSendMessage, isMobile, onBack }: ChatWindowProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [chat.messages]);

    const handleSend = () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            onSendMessage({
                senderId: currentUser.id,
                receiverId: chat.contact.id,
                text: inputRef.current.value,
                timestamp: new Date().toISOString(),
            });
            inputRef.current.value = '';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-4 border-b p-4">
                {isMobile && (
                    <Button variant="ghost" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                )}
                <Avatar className="h-10 w-10">
                     <ImagePlaceholder id={chat.contact.avatar} />
                    <AvatarFallback>{chat.contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{chat.contact.name}</h2>
            </div>
            <ScrollArea className="flex-1" viewportRef={scrollAreaRef}>
                <div className="p-4 space-y-4">
                    {chat.messages.map((message) => {
                         const isCurrentUser = message.senderId === currentUser.id;
                         const messageSender = isCurrentUser ? currentUser : chat.contact;

                        return (
                            <div key={message.id} className={cn('flex items-end gap-3', isCurrentUser && 'justify-end')}>
                                {!isCurrentUser && (
                                    <Avatar className="h-8 w-8">
                                         <ImagePlaceholder id={messageSender.avatar} />
                                        <AvatarFallback>{messageSender.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-xs rounded-lg p-3 text-sm",
                                    isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                )}>
                                    <p className="break-words">{message.text}</p>
                                     <p className={cn("text-xs mt-1", isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground/70')}>
                                        {format(new Date(message.timestamp), 'p')}
                                    </p>
                                </div>
                                 {isCurrentUser && (
                                    <Avatar className="h-8 w-8">
                                        <ImagePlaceholder id={messageSender.avatar} />
                                        <AvatarFallback>{messageSender.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
            <div className="border-t p-4">
                <div className="flex items-center gap-2">
                    <Input
                        ref={inputRef}
                        placeholder="Type a message..."
                        onKeyDown={handleKeyDown}
                    />
                    <Button onClick={handleSend} size="icon">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
