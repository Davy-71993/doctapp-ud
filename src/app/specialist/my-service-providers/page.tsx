
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin } from 'lucide-react';
import type { Facility } from '@/lib/types';
import { AddFacilityDialog } from '@/components/add-service-provider-dialog';
import { verifiedHospitals, pendingHospitals } from '@/lib/mock-service-providers-data';
import { cn } from '@/lib/utils';

// Assuming authenticated specialist has id '1' (Dr. Amina Nakigudde)
const SPECIALIST_ID = '1';

const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    verified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};


function FacilityCard({ facility, status }: { facility: Facility; status: 'verified' | 'pending' }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-3">
            <div>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{facility.name}</p>
                     <Badge className={cn(statusColors[status], 'capitalize')}>{status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{facility.type}</span>
                    {facility.location && (
                        <>
                            <span className="h-4 border-l"></span>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{facility.location}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex gap-2 self-end sm:self-center">
                <Link href={`/specialist/my-service-providers/${facility.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                </Link>
            </div>
        </div>
    );
}

export default function MyFacilitiesPage() {
    // Combine and filter facilities for the current specialist
    const [myFacilities, setMyFacilities] = useState([
        ...verifiedHospitals.filter(p => p.specialistId === SPECIALIST_ID),
        ...pendingHospitals.filter(p => p.specialistId === SPECIALIST_ID)
    ]);

    const handleAddFacility = (newFacilityData: Omit<Facility, 'id' | 'specialistId'>) => {
        const newFacility: Facility = {
            id: `new-${Date.now()}`,
            specialistId: SPECIALIST_ID,
            ...newFacilityData,
            services: [],
        };
        setMyFacilities(prev => [...prev, newFacility]);
    };

    const pending = myFacilities.filter(p => pendingHospitals.some(ph => ph.id === p.id));
    const verified = myFacilities.filter(p => verifiedHospitals.some(vh => vh.id === p.id) && !pending.some(ph => ph.id === p.id));


    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Facilities</h1>
                    <p className="text-muted-foreground">
                        Manage the clinics, hospitals, or pharmacies you operate.
                    </p>
                </div>
                <AddFacilityDialog onAddFacility={handleAddFacility}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Register New Facility
                    </Button>
                </AddFacilityDialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Registered Facilities</CardTitle>
                    <CardDescription>A list of all facilities you have registered on the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {myFacilities.length > 0 ? (
                        <>
                            {verified.map(facility => (
                                <FacilityCard key={facility.id} facility={facility} status="verified" />
                            ))}
                            {pending.map(facility => (
                                <FacilityCard key={facility.id} facility={facility} status="pending" />
                            ))}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="font-semibold">No facilities found.</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Click the button above to register your first facility.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
