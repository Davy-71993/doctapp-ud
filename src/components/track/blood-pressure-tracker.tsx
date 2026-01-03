"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BloodPressureReading = {
  date: string;
  systolic: number;
  diastolic: number;
};

type BloodPressureTrackerProps = {
  title: string;
  description: string;
  data: BloodPressureReading[];
  unit: string;
};

export function BloodPressureTracker({
  title,
  description,
  data,
  unit,
}: BloodPressureTrackerProps) {
  const [chartData, setChartData] = useState(data);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const handleAddEntry = () => {
    if (!systolic || !diastolic) return;
    const newEntry = {
      date: new Date().toLocaleDateString("en-CA"),
      systolic: parseFloat(systolic),
      diastolic: parseFloat(diastolic),
    };
    localStorage.setItem(
      "healthDataBloodPressure",
      JSON.stringify([...chartData, newEntry])
    );
    setChartData([...chartData, newEntry]);
    setSystolic("");
    setDiastolic("");
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {data.length === 0 ? (
          <div className="flex h-48 w-full flex-col items-center justify-center space-y-2">
            <p className="text-center text-sm text-muted-foreground">
              No blood pressure readings logged yet.
            </p>
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value} ${unit}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="systolic"
                  fill="hsl(var(--chart-1))"
                  name="Systolic"
                />
                <Bar
                  dataKey="diastolic"
                  fill="hsl(var(--chart-2))"
                  name="Diastolic"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Log New Reading</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log New {title} Reading</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="systolic" className="text-right">
                  Systolic ({unit})
                </Label>
                <Input
                  id="systolic"
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="diastolic" className="text-right">
                  Diastolic ({unit})
                </Label>
                <Input
                  id="diastolic"
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddEntry}>Save Reading</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
