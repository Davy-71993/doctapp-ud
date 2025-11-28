"use client";

import { useState } from 'react';
import { getPersonalizedHealthAdvice } from '@/ai/flows/personalized-health-advice';
import type { HealthData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Lightbulb, ShieldAlert, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function AiAdvice({ healthData }: { healthData: HealthData }) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [recommendConsult, setRecommendConsult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGetAdvice = async () => {
    setIsLoading(true);
    setAdvice(null);
    try {
      const input = {
        periodData: healthData.period.map(p => ({ date: format(p.date, 'yyyy-MM-dd') })),
        temperatureData: healthData.temperature.map(t => ({ date: t.date, temperature: t.temperature })),
        bloodSugarData: healthData.bloodSugar.map(bs => ({ date: bs.date, bloodSugar: bs.level })),
        bloodPressureData: healthData.bloodPressure.map(bp => ({ date: bp.date, systolic: bp.systolic, diastolic: bp.diastolic })),
        allergies: healthData.allergies,
        pregnancyStatus: healthData.pregnancy.status,
      };
      const result = await getPersonalizedHealthAdvice(input);
      setAdvice(result.advice);
      setRecommendConsult(result.recommendProfessionalConsultation);
      setIsDialogOpen(true);
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
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleGetAdvice} disabled={isLoading} size="icon" className="rounded-full w-14 h-14 shadow-lg">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Lightbulb className="h-6 w-6" />
                )}
                <span className="sr-only">Get AI Health Advice</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get AI Health Advice</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <div className="flex items-center gap-2">
                        {recommendConsult ? <ShieldAlert className="h-6 w-6 text-destructive" /> : <Lightbulb className="h-6 w-6 text-primary" />}
                         <span>{recommendConsult ? "Consult a Professional" : "Personalized Advice"}</span>
                    </div>
                </DialogTitle>
            </DialogHeader>
          {advice && (
            <Alert variant={recommendConsult ? "destructive" : "default"} className="mt-4 border-0">
              <AlertDescription>
                {advice}
                {recommendConsult && (
                  <p className="mt-2 font-semibold">
                    This AI recommendation suggests you see a healthcare professional.
                  </p>
                )}
                <p className="mt-4 text-xs text-muted-foreground">
                  Disclaimer: This AI advice is not a substitute for professional medical advice.
                </p>
              </AlertDescription>
            </Alert>
          )}
           <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
