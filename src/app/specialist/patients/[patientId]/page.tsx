
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { useToast } from '@/hooks/use-toast';
import { patients, doctors } from '@/lib/mock-data';
import { allFacilities } from '@/lib/mock-service-providers-data';
import { ArrowLeft, Send, BarChart, Droplet, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const statusColors: { [key: string]: string } = {
    Stable: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Needs Review': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};


function ReferPatientDialog({ patientName }: { patientName: string }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleRefer = () => {
        toast({
            title: "Referral Sent",
            description: `${patientName} has been referred successfully.`,
        });
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Refer Patient
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Refer Patient</DialogTitle>
                    <DialogDescription>
                        Refer {patientName} to another specialist for further consultation.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="referral-specialist">Specialist</Label>
                        <Select>
                            <SelectTrigger id="referral-specialist">
                                <SelectValue placeholder="Select a specialist" />
                            </SelectTrigger>
                            <SelectContent>
                                {doctors.filter(d => d.name !== 'Dr. Amina Nakigudde').map(doctor => (
                                    <SelectItem key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="referral-facility">Facility</Label>
                        <Select>
                            <SelectTrigger id="referral-facility">
                                <SelectValue placeholder="Select a facility" />
                            </SelectTrigger>
                            <SelectContent>
                                {allFacilities.map(facility => (
                                    <SelectItem key={facility.id} value={facility.id}>{facility.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="referral-reason">Reason for Referral</Label>
                        <Textarea id="referral-reason" placeholder="State the reason for referral..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleRefer}>Send Referral</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function PatientDetailsPage() {
    const params = useParams();
    const patientId = params.patientId;
    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Patient Not Found</h2>
                <p className="text-muted-foreground">The requested patient does not exist.</p>
                 <Link href="/specialist/patients">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Patients
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/specialist/patients">
                        <Button variant="outline" size="icon" className="hidden sm:inline-flex">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Avatar className="h-20 w-20">
                        <ImagePlaceholder id={patient.avatar} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                             <h1 className="text-3xl font-bold tracking-tight">{patient.name}</h1>
                             <Badge className={cn('whitespace-nowrap mt-1', statusColors[patient.status])}>
                                {patient.status}
                             </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            Last checkup: {patient.lastCheckup}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                    <ReferPatientDialog patientName={patient.name} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex-row items-center gap-2 space-y-0">
                        <BarChart className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-base">Blood Pressure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{patient.vitals?.bloodPressure} mmHg</p>
                        <p className="text-xs text-muted-foreground">Normal: 120/80 mmHg</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-2 space-y-0">
                        <Droplet className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-base">Blood Sugar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{patient.vitals?.bloodSugar}</p>
                         <p className="text-xs text-muted-foreground">Normal: 70-100 mg/dL</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-2 space-y-0">
                        <Thermometer className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-base">Temperature</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{patient.vitals?.temperature}</p>
                         <p className="text-xs text-muted-foreground">Normal: 36.5-37.5°C</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of the patient's recent health data entries and appointments.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">No recent activity to display.</p>
                </CardContent>
            </Card>

        </div>
    );
}
