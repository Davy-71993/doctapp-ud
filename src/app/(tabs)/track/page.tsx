import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PeriodTracker } from '@/components/track/period-tracker';
import { ChartTracker } from '@/components/track/chart-tracker';
import { AiAdvice } from '@/components/track/ai-advice';
import { healthData } from '@/lib/mock-data';

export default function TrackPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Trackers</h1>
        <p className="text-muted-foreground">
          Monitor your health metrics and get personalized insights.
        </p>
      </div>

      <AiAdvice healthData={healthData} />

      <Tabs defaultValue="period" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="period">Period</TabsTrigger>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="blood-sugar">Blood Sugar</TabsTrigger>
        </TabsList>
        <TabsContent value="period" className="mt-4">
          <PeriodTracker />
        </TabsContent>
        <TabsContent value="temperature" className="mt-4">
          <ChartTracker
            title="Body Temperature"
            description="Daily basal body temperature readings."
            data={healthData.temperature}
            dataKey="temperature"
            unit="°C"
          />
        </TabsContent>
        <TabsContent value="blood-sugar" className="mt-4">
          <ChartTracker
            title="Blood Sugar"
            description="Blood glucose levels."
            data={healthData.bloodSugar.map(d => ({date: d.date, level: d.level}))}
            dataKey="level"
            unit="mg/dL"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
