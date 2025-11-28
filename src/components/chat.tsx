"use client";

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot, Loader2, Lightbulb, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export type ChatMessage = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  isSuggestion?: boolean;
  timestamp: Date;
};

type ChatMessageProps = {
  message: ChatMessage;
};

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  return (
    <div className={cn('flex items-start gap-3', isUser ? 'justify-end' : '')}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback><Bot /></AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        "max-w-xs rounded-lg p-3 text-sm",
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      )}>
        <p>{message.content}</p>
        {message.isSuggestion && (
            <div className="mt-2 flex items-center gap-2 text-xs text-destructive-foreground/80 bg-destructive/80 rounded p-2">
                <ShieldAlert className="h-4 w-4" />
                <span>Consult a professional</span>
            </div>
        )}
        <p className={cn("text-xs mt-1", isUser ? 'text-primary-foreground/70' : 'text-muted-foreground/70')}>
            {format(message.timestamp, 'p')}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 border-t p-4">
      <Input
        placeholder="Ask for health advice..."
        className="flex-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        <span className="sr-only">Send Message</span>
      </Button>
    </div>
  );
}

type ChatProps = {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

export function Chat({ messages, onSendMessage, isLoading }: ChatProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);


  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
            {messages.length === 0 && !isLoading && (
                <div className="text-center text-muted-foreground p-8">
                    <Lightbulb className="mx-auto h-10 w-10 mb-4" />
                    <p>Ask a question to get personalized health advice based on your tracked data.</p>
                </div>
            )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
           {isLoading && messages[messages.length-1]?.sender === 'user' && (
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs rounded-lg p-3 text-sm bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
           )}
        </div>
      </ScrollArea>
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
}
