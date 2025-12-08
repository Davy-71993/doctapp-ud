
"use client";

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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import type { Complaint } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function PatientComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const response = await fetch('/api/complaints/patient');
                const data = await response.json();
                setComplaints(data);
            } catch (error) {
                console.error("Failed to fetch complaints:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchComplaints();
    }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Complaints</h1>
        <p className="text-muted-foreground">
          Review and manage complaints submitted about patients.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Patient Complaints</CardTitle>
          <CardDescription>A list of all patient-related complaints requiring review.</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
            ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.patientName}</TableCell>
                  <TableCell>{complaint.reportedBy}</TableCell>
                  <TableCell className="max-w-xs truncate">{complaint.reason}</TableCell>
                  <TableCell>{format(new Date(complaint.date), 'MMMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={complaint.status === 'Pending' ? 'destructive' : 'secondary'}>
                        {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
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
