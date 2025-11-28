import { healthData } from '@/lib/mock-data';
import { PeriodTracker } from '@/components/track/period-tracker';
import { ChartTracker } from '@/components/track/chart-tracker';
import { ListTracker } from '@/components/track/list-tracker';
import { PregnancyTracker } from '@/components/track/pregnancy-tracker';
import { BloodPressureTracker } from '@/components/track/blood-pressure-tracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Droplets, CircleAlert } from 'lucide-react';
import { userProfile } from '@/lib/mock-data';

export default function TrackPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Trackers</h1>
        <p className="text-muted-foreground">
          Monitor your health metrics and get personalized insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PeriodTracker />
        
        <BloodPressureTracker
            title="Blood Pressure"
            description="Systolic and Diastolic readings."
            data={healthData.bloodPressure}
            unit="mmHg"
          />

        <ChartTracker
          title="Blood Sugar"
          description="Blood glucose levels."
          data={healthData.bloodSugar.map(d => ({date: d.date, value: d.level}))}
          dataKey="value"
          unit="mg/dL"
        />

        <ChartTracker
          title="Body Temperature"
          description="Daily basal body temperature readings."
          data={healthData.temperature.map(t => ({ date: t.date, value: t.temperature}))}
          dataKey="value"
          unit="°C"
        />

        <ListTracker 
          title="Allergies"
          description="Medication, food, or environmental allergies."
          data={healthData.allergies}
        />
        
        <PregnancyTracker />
        
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-red-500" />
                    <CardTitle>Blood Group</CardTitle>
                </div>
                <CardDescription>Your registered blood type.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{userProfile.bloodGroup}</p>
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
