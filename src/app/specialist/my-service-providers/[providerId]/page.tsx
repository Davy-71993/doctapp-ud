
"use client";

import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allFacilities } from '@/lib/mock-service-providers-data';
import { Hospital, MapPin, Pencil, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import type { Facility } from '@/lib/types';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export default function SpecialistFacilityDetailsPage() {
    const params = useParams();
    const providerId = params.providerId as string;
    const facility: Facility | undefined = allFacilities.find(p => p.id === providerId);

    if (!facility) {
        return <div className="text-center py-12">Facility not found.</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-4">
                        <Hospital className="w-10 h-10 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{facility.name}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-5 w-5" />
                                <span>{facility.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Details
                    </Button>
                     <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Facility
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Facility Details</CardTitle>
                    <CardDescription>
                        Internal management view of your facility.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center gap-4">
                     <p><strong>Type:</strong> {facility.type}</p>
                     <Badge variant="secondary">Status: Verified</Badge>
                   </div>
                   <div className="space-y-2">
                       <p><strong>Verification Documents:</strong></p>
                       <ul className="list-disc list-inside text-muted-foreground">
                           {facility.documents?.map(doc => <li key={doc}>{doc}</li>)}
                       </ul>
                   </div>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Services Offered</CardTitle>
                        <CardDescription>
                            Manage the services available at this facility.
                        </CardDescription>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service Name</TableHead>
                                <TableHead>Duration (mins)</TableHead>
                                <TableHead>Price (UGX)</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facility.services.length > 0 ? facility.services.map(service => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>{service.duration}</TableCell>
                                    <TableCell>{service.price.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                        No services added yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
