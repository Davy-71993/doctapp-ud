"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Chat, ChatMessage as ChatMessageType } from "@/components/chat";
import type { HealthData } from "@/lib/types";

export function AiAdvice() {
  const [isLoading, setIsLoading] = useState(false);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "initial-message",
      sender: "ai",
      content:
        "Hello! I'm your AI health assistant. Ask me for advice based on your tracked data.",
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    async function fetchHealthData() {}
    fetchHealthData();
  }, []);

  const handleGetAdvice = async (userQuery: string) => {
    setIsLoading(true);

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      sender: "user",
      content: userQuery,
      timestamp: new Date(),
    };

    const newMessages: ChatMessageType[] = [...messages, userMessage];
    setMessages(newMessages);

    if (!healthData) {
      toast({
        title: "Health Data Not Loaded",
        description:
          "Please wait a moment for your health data to load before asking for advice.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const input = {
        chatHistory: newMessages.map(({ sender, content }) => ({
          sender,
          content,
        })),
        userQuery: userQuery,
        periodData: healthData.period.map((p) => ({
          date: format(new Date(p.date), "yyyy-MM-dd"),
        })),
        temperatureData: healthData.temperature.map((t) => ({
          date: t.date,
          temperature: t.temperature,
        })),
        bloodSugarData: healthData.bloodSugar.map((bs) => ({
          date: bs.date,
          bloodSugar: bs.level,
        })),
        bloodPressureData: healthData.bloodPressure.map((bp) => ({
          date: bp.date,
          systolic: bp.systolic,
          diastolic: bp.diastolic,
        })),
        allergies: healthData.allergies,
        pregnancyStatus: healthData.pregnancy.status,
      };

      // AI prompt result to be implemented correctly.
      const result: any = {};

      const aiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: result.advice,
        isSuggestion: result.recommendProfessionalConsultation,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error getting advice",
        description:
          "Could not fetch AI-powered health advice. Please try again later.",
        variant: "destructive",
      });
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content:
          "Sorry, I was unable to get advice for you. Please try again later.",
        isSuggestion: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full w-14 h-14 shadow-lg"
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Lightbulb className="h-6 w-6" />
                  )}
                  <span className="sr-only">Get AI Health Advice</span>
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get AI Health Advice</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent
          side="top"
          align="end"
          className="w-[400px] h-[500px] flex flex-col p-0 mr-4"
        >
          <div className="flex items-center gap-2 p-4 border-b">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">AI Health Assistant</h3>
          </div>
          <Chat
            messages={messages}
            onSendMessage={handleGetAdvice}
            isLoading={isLoading}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
