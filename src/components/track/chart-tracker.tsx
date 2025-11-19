"use client";

import { useState } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ChartData = {
  date: string;
  [key: string]: any;
};

type ChartTrackerProps = {
  title: string;
  description: string;
  data: ChartData[];
  dataKey: string;
  unit: string;
};

export function ChartTracker({ title, description, data, dataKey, unit }: ChartTrackerProps) {
  const [chartData, setChartData] = useState(data);
  const [newValue, setNewValue] = useState('');

  const handleAddEntry = () => {
    if (!newValue) return;
    const newEntry = {
      date: new Date().toLocaleDateString('en-CA'),
      [dataKey]: parseFloat(newValue),
    };
    setChartData([...chartData, newEntry]);
    setNewValue('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} ${unit}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <Line type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Log New Entry</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log New {title} Entry</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Value ({unit})
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddEntry}>Save Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
