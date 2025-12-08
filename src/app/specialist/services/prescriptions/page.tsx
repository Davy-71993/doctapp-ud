
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import { format } from 'date-fns';
import type { Prescription } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function PrescriptionsPage() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrescriptions() {
            try {
                const response = await fetch('/api/prescriptions');
                const data = await response.json();
                setPrescriptions(data);
            } catch (error) {
                console.error("Failed to fetch prescriptions:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPrescriptions();
    }, []);

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
                    {loading ? (
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient Name</TableHead>
                                <TableHead>Date Issued</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prescriptions.map(p => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">{p.patient.name}</TableCell>
                                    <TableCell>{format(new Date(p.date), 'MMMM dd, yyyy')}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/specialist/services/prescriptions/${p.id}`}>
                                            <Button variant="outline" size="sm">View</Button>
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
    )
}
