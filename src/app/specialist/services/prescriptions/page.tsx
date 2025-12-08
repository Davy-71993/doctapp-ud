
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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { patients } from '@/lib/mock-data';
import { format } from 'date-fns';

const mockPrescriptions = [
    { id: 'presc1', patient: patients[0], date: new Date(), medication: 'Amoxicillin 500mg' },
    { id: 'presc2', patient: patients[1], date: new Date(new Date().setDate(new Date().getDate() - 2)), medication: 'Loratadine 10mg' },
    { id: 'presc3', patient: patients[3], date: new Date(new Date().setDate(new Date().getDate() - 5)), medication: 'Amlodipine 5mg' },
];

export default function PrescriptionsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Prescriptions</h1>
                    <p className="text-muted-foreground">
                        Create, view, and manage patient prescriptions.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Prescription
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Prescriptions</CardTitle>
                    <CardDescription>A list of recently issued prescriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Date Issued</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPrescriptions.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">{p.patient.name}</TableCell>
                                    <TableCell>{format(p.date, 'MMMM dd, yyyy')}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
