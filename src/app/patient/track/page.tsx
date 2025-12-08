
"use client";

import type { HealthData, UserProfile } from '@/lib/types';
import { PeriodTracker } from '@/components/track/period-tracker';
import { ChartTracker } from '@/components/track/chart-tracker';
import { ListTracker } from '@/components/track/list-tracker';
import { PregnancyTracker } from '@/components/track/pregnancy-tracker';
import { BloodPressureTracker } from '@/components/track/blood-pressure-tracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Droplets, CircleAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

export default function TrackPage() {
    const db = useFirestore();
    const { user, userProfile, loading: userLoading } = useUser();
    const typedProfile = userProfile as UserProfile | null;

    const { data: healthData, loading: healthLoading } = useCollection<HealthData>(
        user ? query(collection(db, 'healthData'), where('userId', '==', user.uid)) : null
    );
    const loading = userLoading || healthLoading;
    const userHealthData = healthData?.[0];

  if (loading || !userHealthData || !typedProfile) {
    return (
        <div className="space-y-8">
             <div>
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[...Array(8)].map((_, i) => (
                    <Skeleton key={i} className="h-80 w-full" />
                ))}
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Trackers</h1>
        <p className="text-muted-foreground">
          Monitor your health metrics and get personalized insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PeriodTracker initialDates={userHealthData.period.map(p => new Date(p.date))} />
        
        <BloodPressureTracker
            title="Blood Pressure"
            description="Systolic and Diastolic readings."
            data={userHealthData.bloodPressure}
            unit="mmHg"
          />

        <ChartTracker
          title="Blood Sugar"
          description="Blood glucose levels."
          data={userHealthData.bloodSugar.map(d => ({date: d.date, value: d.level}))}
          dataKey="value"
          unit="mg/dL"
        />

        <ChartTracker
          title="Body Temperature"
          description="Daily basal body temperature readings."
          data={userHealthData.temperature.map(t => ({ date: t.date, value: t.temperature}))}
          dataKey="value"
          unit="°C"
        />

        <ListTracker 
          title="Allergies"
          description="Medication, food, or environmental allergies."
          data={userHealthData.allergies}
        />
        
        <PregnancyTracker isPregnantInitially={userHealthData.pregnancy.status === 'Pregnant'} />
        
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-red-500" />
                    <CardTitle>Blood Group</CardTitle>
                </div>
                <CardDescription>Your registered blood type.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{typedProfile.bloodGroup}</p>
                <p className="text-sm text-muted-foreground mt-2">This information is critical in emergencies. Ensure it is up to date in your profile.</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CircleAlert className="w-5 h-5 text-amber-500" />
                     <CardTitle>Kidney Health</CardTitle>
                </div>
                <CardDescription>Notes related to kidney health.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">
                    Use this space to log any specific notes, symptoms, or test results related to your kidney health as advised by your doctor.
                 </p>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
