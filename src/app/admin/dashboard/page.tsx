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
import { users, doctors } from '@/lib/mock-data';
import { Users, ShieldCheck, UserCheck, Activity } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const patientCount = users.filter(u => u.role === 'patient').length;
  const specialistCount = users.filter(u => u.role === 'specialist').length;
  const pendingVerificationCount = 5; // Mock data

  const recentActivities = [
    { id: 1, user: 'Dr. Amina Nakigudde', action: 'Joined', timestamp: '2 hours ago' },
    { id: 2, user: 'Ecopharm Pharmacy', action: 'Added as partner', timestamp: '1 day ago' },
    { id: 3, user: 'Alex Mukisa', action: 'Registered', timestamp: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
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
