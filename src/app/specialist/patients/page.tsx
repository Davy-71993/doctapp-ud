
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
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import type { Patient } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const statusColors: { [key: string]: string } = {
    Stable: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Needs Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await fetch('/api/patients');
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error("Failed to fetch patients:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Patients</h1>
        <p className="text-muted-foreground">
          View and manage your patient records.
        </p>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>All Patients</CardTitle>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search patients..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <CardDescription>A list of all patients under your care.</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
                 <div className="space-y-2">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
            ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Checkup</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
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
                    <Badge className={cn(statusColors[patient.status])}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{patient.lastCheckup}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/specialist/patients/${patient.id}`}>
                       <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
