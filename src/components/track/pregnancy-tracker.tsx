"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { healthData } from '@/lib/mock-data';
import { Baby } from 'lucide-react';

export function PregnancyTracker() {
  const [isPregnant, setIsPregnant] = useState(healthData.pregnancy.status === 'Pregnant');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Baby className="w-5 h-5 text-pink-500" />
          <CardTitle>Pregnancy Status</CardTitle>
        </div>
        <CardDescription>Track pregnancy status for tailored advice.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Are you currently pregnant?
            </p>
            <p className="text-sm text-muted-foreground">
              This helps us provide relevant information for this stage.
            </p>
          </div>
          <Switch
            checked={isPregnant}
            onCheckedChange={setIsPregnant}
            id="pregnancy-status"
            aria-label="Pregnancy status"
          />
        </div>
         {isPregnant && (
            <div className="mt-4 text-center p-4 bg-secondary rounded-lg">
                <p className="font-semibold text-primary">Congratulations!</p>
                <p className="text-sm text-muted-foreground">Remember to schedule regular check-ups with your gynecologist.</p>
            </div>
         )}
      </CardContent>
    </Card>
  );
}
