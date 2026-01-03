"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type PeriodTrackerProps = {
  initialDates?: Date[];
};

export function PeriodTracker({ initialDates = [] }: PeriodTrackerProps) {

  const [dates, setDates] = useState<Date[]>(initialDates);
  const handleSelectDate = (dates?: Date[]) => {
    const oldDates: Date[] = JSON.parse(
      localStorage.getItem("healthDataPeriod") || "[]"
    ).map((d: Date) => {
      return new Date(new Date(d).setHours(12, 0, 0, 0));
    });
    const newDates = dates?.map((d) => {
      return new Date(new Date(d).setHours(12, 0, 0, 0));
    });
    const combinedDates = [...oldDates, ...(newDates ?? [])];
    localStorage.setItem(
      "healthDataPeriod",
      JSON.stringify(
        Array.from(new Set(combinedDates.map((d) => d.toISOString())))
      )
    );
    setDates(newDates || []);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Period Cycle</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={handleSelectDate}
          className="rounded-md border"
          modifiers={{
            predicted: [
              new Date(new Date().setDate(new Date().getDate() + 25)),
              new Date(new Date().setDate(new Date().getDate() + 26)),
              new Date(new Date().setDate(new Date().getDate() + 27)),
            ],
          }}
          modifiersStyles={{
            selected: {
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            },
            predicted: {
              backgroundColor: "hsl(var(--primary) / 0.2)",
              color: "hsl(var(--primary))",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
