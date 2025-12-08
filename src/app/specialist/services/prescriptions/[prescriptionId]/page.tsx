
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pill } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import type { Prescription } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function PrescriptionDetailsPage() {
    const params = useParams();
    const prescriptionId = params.prescriptionId as string;
    const [prescription, setPrescription] = useState<Prescription | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!prescriptionId) return;
        async function fetchPrescription() {
            try {
                const response = await fetch(`/api/prescriptions/${prescriptionId}`);
                if (!response.ok) throw new Error('Prescription not found');
                const data = await response.json();
                setPrescription(data);
            } catch (error) {
                console.error("Failed to fetch prescription:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPrescription();
    }, [prescriptionId]);

    if (loading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        )
    }

    if (!prescription) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Prescription Not Found</h2>
                <p className="text-muted-foreground">The requested prescription does not exist.</p>
                 <Link href="/specialist/services/prescriptions">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Prescriptions
                    </Button>
                </Link>
            </div>
        );
    }
    
    const handleOrder = () => {
        toast({
            title: "Order Sent to Pharmacy",
            description: "The prescription has been forwarded to the patient's preferred pharmacy.",
        });
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/specialist/services/prescriptions">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Prescription Details</h1>
                    <p className="text-muted-foreground">
                        Issued on {format(new Date(prescription.date), 'MMMM dd, yyyy')}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <ImagePlaceholder id={prescription.patient.avatar} />
                            <AvatarFallback>{prescription.patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>Patient: {prescription.patient.name}</CardTitle>
                            <CardDescription>Review the medication details below.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Medication List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Medicine</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Duration</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {prescription.medicines.map((med) => (
                                <TableRow key={med.name}>
                                    <TableCell className="font-medium">{med.name}</TableCell>
                                    <TableCell>{med.dosage}</TableCell>
                                    <TableCell>{med.frequency}</TableCell>
                                    <TableCell>{med.duration}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button onClick={handleOrder}>
                        <Pill className="mr-2 h-4 w-4" />
                        Order from Pharmacy
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
