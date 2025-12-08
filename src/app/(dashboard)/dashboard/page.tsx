
'use client';

import Link from 'next/link';
import {
  Stethoscope,
  Calendar,
  Activity,
  Pill,
  LayoutGrid,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, LineChart, Line } from 'recharts';
import { useEffect, useState } from 'react';
import type { HealthData, Activity as ActivityType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


const actionCards = [
  {
    title: 'My Specialists',
    description: 'View your connected specialists',
    icon: Stethoscope,
    href: '/my-specialists',
    color: 'bg-emerald-100 dark:bg-emerald-900',
    textColor: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    title: 'My Appointments',
    description: 'View upcoming and past visits',
    icon: Calendar,
    href: '/appointments',
    color: 'bg-sky-100 dark:bg-sky-900',
    textColor: 'text-sky-700 dark:text-sky-300',
  },
  {
    title: 'Track Health',
    description: 'Log allergies, blood pressure, and more',
    icon: Activity,
    href: '/track',
    color: 'bg-amber-100 dark:bg-amber-900',
    textColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    title: 'Order Medicine',
    description: 'Upload prescription and order',
    icon: Pill,
    href: '/order-medicine',
    color: 'bg-rose-100 dark:bg-rose-900',
    textColor: 'text-rose-700 dark:text-rose-300',
  },
  {
    title: 'Browse Services',
    description: 'Ambulance, home care, and more',
    icon: LayoutGrid,
    href: '/services',
    color: 'bg-indigo-100 dark:bg-indigo-900',
    textColor: 'text-indigo-700 dark:text-indigo-300',
  },
];

export default function DashboardPage() {
    const [healthData, setHealthData] = useState<HealthData | null>(null);
    const [recentActivities, setRecentActivities] = useState<ActivityType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [healthRes, activitiesRes] = await Promise.all([
                    fetch('/api/health-data'),
                    fetch('/api/recent-activities')
                ]);
                const healthData = await healthRes.json();
                const recentActivities = await activitiesRes.json();
                setHealthData(healthData);
                setRecentActivities(recentActivities);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {actionCards.map((card) => (
              <Link href={card.href} key={card.title}>
              <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg flex flex-col justify-between">
                  <CardHeader>
                  <div className="flex items-center justify-between">
                      <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
                      >
                      <card.icon className={`w-6 h-6 ${card.textColor}`} />
                      </div>
                  </div>
                  <CardTitle className="pt-4 text-lg md:text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <CardDescription>{card.description}</CardDescription>
                  </CardContent>
              </Card>
              </Link>
          ))}
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {loading || !healthData ? (
                <>
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                </>
            ) : (
             <>
             <Card>
                <CardHeader>
                    <CardTitle>Blood Pressure</CardTitle>
                    <CardDescription>Recent systolic & diastolic readings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 w-full">
                         <ResponsiveContainer>
                            <BarChart data={healthData.bloodPressure.slice(-7)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} unit=" mmHg" />
                                <Tooltip
                                    contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="systolic" fill="hsl(var(--chart-1))" name="Systolic" />
                                <Bar dataKey="diastolic" fill="hsl(var(--chart-2))" name="Diastolic" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Blood Sugar</CardTitle>
                    <CardDescription>Recent glucose level readings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <LineChart data={healthData.bloodSugar.slice(-7)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    unit=" mg/dL"
                                    domain={['dataMin - 5', 'dataMax + 5']}
                                 />
                                <Tooltip
                                    contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="level" stroke="hsl(var(--chart-3))" name="Level" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    An overview of your latest health activities.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                    <div className="w-full h-full flex items-center justify-center bg-secondary rounded-full">
                        <activity.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    </Avatar>
                    <div className="flex-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                </div>
                ))}
                </CardContent>
            </Card>
            </>
            )}
      </div>
    </div>
  );
}
