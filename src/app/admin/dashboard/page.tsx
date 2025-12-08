
'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, ShieldCheck, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { User, Doctor } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const userGrowthData = [
  { month: 'Jan', users: 150, specialists: 20 },
  { month: 'Feb', users: 200, specialists: 25 },
  { month: 'Mar', users: 220, specialists: 30 },
  { month: 'Apr', users: 270, specialists: 35 },
  { month: 'May', users: 310, specialists: 40 },
  { month: 'Jun', users: 350, specialists: 45 },
];

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [usersRes, doctorsRes] = await Promise.all([
                    fetch('/api/users'),
                    fetch('/api/doctors')
                ]);
                const usersData = await usersRes.json();
                const doctorsData = await doctorsRes.json();
                setUsers(usersData);
                setDoctors(doctorsData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

  const patientCount = users.filter(u => u.role === 'patient').length;
  const specialistCount = users.filter(u => u.role === 'specialist').length;
  const pendingVerificationCount = 5; // Mock data

  const recentActivities = [
    { id: 1, user: 'Dr. Amina Nakigudde', action: 'Joined', timestamp: '2 hours ago' },
    { id: 2, user: 'Ecopharm Pharmacy', action: 'Added as service provider', timestamp: '1 day ago' },
    { id: 3, user: 'Alex Mukisa', action: 'Registered', timestamp: '2 days ago' },
  ];

  const specialistDistribution = doctors.reduce((acc, doctor) => {
    acc[doctor.specialty] = (acc[doctor.specialty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const specialistDistributionData = Object.entries(specialistDistribution).map(([name, count]) => ({ name, count }));


  return (
    <div className="space-y-8">
      {loading ? (
         <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
         </div>
      ) : (
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Specialists</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{specialistCount}</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVerificationCount}</div>
            <p className="text-xs text-muted-foreground">
              New specialists awaiting approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientCount}</div>
            <p className="text-xs text-muted-foreground">
              +50 from last month
            </p>
          </CardContent>
        </Card>
      </div>
      )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>New users and specialists over the past 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="hsl(var(--chart-1))" name="Users" />
                                <Line type="monotone" dataKey="specialists" stroke="hsl(var(--chart-2))" name="Specialists" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Specialist Distribution</CardTitle>
                    <CardDescription>Number of specialists per specialty.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 w-full">
                        {loading ? <Skeleton className="h-full w-full" /> : (
                        <ResponsiveContainer>
                             <BarChart data={specialistDistributionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} interval={0} angle={-45} textAnchor="end" height={60} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                    }}
                                />
                                <Bar dataKey="count" fill="hsl(var(--chart-1))" name="Count" />
                            </BarChart>
                        </ResponsiveContainer>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>


      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>An overview of recent platform activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User / Entity</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map(activity => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{activity.action}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{activity.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
