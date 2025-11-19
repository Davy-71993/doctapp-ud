"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { healthData } from '@/lib/mock-data';

export function PeriodTracker() {
  const [dates, setDates] = useState<Date[]>(healthData.period.map(p => new Date(p.date)));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Period Cycle</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={(d) => setDates(d || [])}
          className="rounded-md border"
          modifiers={{
            predicted: [new Date(new Date().setDate(new Date().getDate() + 25)), new Date(new Date().setDate(new Date().getDate() + 26)), new Date(new Date().setDate(new Date().getDate() + 27))],
          }}
          modifiersStyles={{
            selected: { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' },
            predicted: { backgroundColor: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--primary))' },
          }}
        />
      </CardContent>
    </Card>
  );
}
