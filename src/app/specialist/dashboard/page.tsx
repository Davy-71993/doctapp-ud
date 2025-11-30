
'use client';

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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { patients } from '@/lib/mock-data';
import { Users, AlertTriangle, CheckCircle2, Inbox, Link as LinkIcon, Building, Syringe, Network } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const statusIcons = {
  Stable: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  Critical: <AlertTriangle className="h-4 w-4 text-red-500" />,
  'Needs Review': <AlertTriangle className="h-4 w-4 text-yellow-500" />,
};

const statusColors = {
    Stable: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Needs Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};


export default function SpecialistDashboardPage() {
  const patientCount = patients.length;
  const criticalCount = patients.filter(p => p.status === 'Critical').length;
  const needsReviewCount = patients.filter(p => p.status === 'Needs Review').length;

  const patientStatusData = [
    { name: 'Stable', value: patients.filter(p => p.status === 'Stable').length },
    { name: 'Needs Review', value: needsReviewCount },
    { name: 'Critical', value: criticalCount },
  ];

  const PIE_COLORS = ['hsl(var(--chart-2))', 'hsl(var(--chart-4))', 'hsl(var(--chart-1))'];


  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientCount}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{needsReviewCount}</div>
            <p className="text-xs text-muted-foreground">
              New data available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalCount}</div>
            <p className="text-xs text-muted-foreground">
              Immediate attention required
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Patient Activity</CardTitle>
            <CardDescription>An overview of your patients who need attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Last Checkup</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.slice(0, 5).map(patient => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <ImagePlaceholder id={patient.avatar} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('whitespace-nowrap', statusColors[patient.status])}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{patient.lastCheckup}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
            <Card>
              <CardHeader>
                  <CardTitle>Patient Overview</CardTitle>
                  <CardDescription>Distribution of patient statuses.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="h-52 w-full">
                      <ResponsiveContainer>
                          <PieChart>
                              <Pie
                                  data={patientStatusData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                              >
                                  {patientStatusData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                  ))}
                              </Pie>
                              <Tooltip
                                  contentStyle={{
                                      backgroundColor: 'hsl(var(--background))',
                                      border: '1px solid hsl(var(--border))',
                                  }}
                              />
                              <Legend />
                          </PieChart>
                      </ResponsiveContainer>
                  </div>
              </CardContent>
            </Card>
        </div>
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Link href="/specialist/patients">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2">
                            <Users className="h-6 w-6"/>
                            <span>View Patients</span>
                        </Button>
                    </Link>
                     <Link href="/specialist/inbox">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2">
                            <Inbox className="h-6 w-6"/>
                            <span>Check Inbox</span>
                        </Button>
                    </Link>
                     <Link href="/specialist/partners">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2">
                            <Network className="h-6 w-6"/>
                            <span>Partners</span>
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Your Network</CardTitle>
                    <CardDescription>Connect with pharmacies and clinics.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <Building className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">Nakasero Hospital</p>
                            <p className="text-sm text-muted-foreground">Primary Affiliation</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <Syringe className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <p className="font-semibold">Ecopharm Pharmacy</p>
                            <p className="text-sm text-muted-foreground">Partner Pharmacy</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
