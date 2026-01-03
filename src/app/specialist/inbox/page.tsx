"use client";

import { useEffect, useState } from "react";
import { ChatLayout } from "@/components/chat/chat-layout";
import type { Contact, Message, User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfile } from "@/server-actions/auth";
import { fetchMessages, getContacts } from "@/server-actions/fetch";

export default function InboxPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChatData() {
      setLoading(false);
      const { data } = await getProfile();

      const { data: threads } = await fetchMessages();
      const { data: contacts } = await getContacts("specialist");

      setContacts(
        contacts?.map((c) => ({
          ...c.patient.profile,
          name: `${c.patient.profile.first_name} ${c.patient.profile.last_name}`,
        })) || []
      );
      setMessages(threads || []);
      if (!data) {
        setLoading(false);
        return;
      }

      setCurrentUser(data);
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

  const typedProfile = {
    id: currentUser.id,
    name: currentUser.first_name + " " + currentUser.last_name,
    avatar: currentUser.avatar,
  };

  return (
    <div className="h-[calc(100vh_-_8rem)]">
      <ChatLayout
        currentUser={typedProfile}
        contacts={contacts || []}
        messages={messages || []}
      />
    </div>
  );
}
