"use client";

import { useState } from 'react';
import { getPersonalizedHealthAdvice } from '@/ai/flows/personalized-health-advice';
import type { HealthData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, ShieldAlert, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function AiAdvice({ healthData }: { healthData: HealthData }) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [recommendConsult, setRecommendConsult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetAdvice = async () => {
    setIsLoading(true);
    setAdvice(null);
    try {
      const input = {
        periodData: healthData.period.map(p => ({ date: format(p.date, 'yyyy-MM-dd') })),
        temperatureData: healthData.temperature.map(t => ({ date: t.date, temperature: t.temperature })),
        bloodSugarData: healthData.bloodSugar.map(bs => ({ date: bs.date, bloodSugar: bs.level }))
      };
      const result = await getPersonalizedHealthAdvice(input);
      setAdvice(result.advice);
      setRecommendConsult(result.recommendProfessionalConsultation);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error getting advice",
        description: "Could not fetch AI-powered health advice. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleGetAdvice} disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Getting Advice...
          </>
        ) : (
          <>
            <Lightbulb className="mr-2 h-4 w-4" />
            Get AI Health Advice
          </>
        )}
      </Button>

      {advice && (
        <Alert variant={recommendConsult ? "destructive" : "default"}>
          {recommendConsult ? (
            <ShieldAlert className="h-4 w-4" />
          ) : (
            <Lightbulb className="h-4 w-4" />
          )}
          <AlertTitle>{recommendConsult ? "Consult a Professional" : "Personalized Advice"}</AlertTitle>
          <AlertDescription>
            {advice}
            {recommendConsult && (
              <p className="mt-2 font-semibold">
                This AI recommendation suggests you see a healthcare professional.
              </p>
            )}
             <p className="mt-2 text-xs text-muted-foreground">
              Disclaimer: This AI advice is not a substitute for professional medical advice.
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
