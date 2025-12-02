
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin } from 'lucide-react';
import type { ServiceProvider } from '@/lib/types';
import { AddServiceProviderDialog } from '@/components/add-service-provider-dialog';
import { verifiedHospitals, pendingHospitals } from '@/lib/mock-service-providers-data';
import { cn } from '@/lib/utils';

// Assuming authenticated specialist has id '1' (Dr. Amina Nakigudde)
const SPECIALIST_ID = '1';

const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    verified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};


function ServiceProviderCard({ provider, status }: { provider: ServiceProvider; status: 'verified' | 'pending' }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-3">
            <div>
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{provider.name}</p>
                     <Badge className={cn(statusColors[status], 'capitalize')}>{status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{provider.type}</span>
                    {provider.location && (
                        <>
                            <span className="h-4 border-l"></span>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{provider.location}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex gap-2 self-end sm:self-center">
                <Button variant="outline" size="sm">View Details</Button>
            </div>
        </div>
    );
}

export default function MyServiceProvidersPage() {
    // Combine and filter providers for the current specialist
    const [myProviders, setMyProviders] = useState([
        ...verifiedHospitals.filter(p => p.specialistId === SPECIALIST_ID),
        ...pendingHospitals.filter(p => p.specialistId === SPECIALIST_ID)
    ]);

    const handleAddServiceProvider = (newProviderData: Omit<ServiceProvider, 'id' | 'specialistId'>) => {
        const newProvider: ServiceProvider = {
            id: `new-${Date.now()}`,
            specialistId: SPECIALIST_ID,
            ...newProviderData,
        };
        setMyProviders(prev => [...prev, newProvider]);
    };

    const pending = myProviders.filter(p => pendingHospitals.some(ph => ph.id === p.id));
    const verified = myProviders.filter(p => verifiedHospitals.some(vh => vh.id === p.id) && !pending.some(ph => ph.id === p.id));


    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Service Providers</h1>
                    <p className="text-muted-foreground">
                        Manage the clinics, hospitals, or pharmacies you operate.
                    </p>
                </div>
                <AddServiceProviderDialog onAddProvider={handleAddServiceProvider}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Register New Provider
                    </Button>
                </AddServiceProviderDialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Registered Facilities</CardTitle>
                    <CardDescription>A list of all service providers you have registered on the platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {myProviders.length > 0 ? (
                        <>
                            {verified.map(provider => (
                                <ServiceProviderCard key={provider.id} provider={provider} status="verified" />
                            ))}
                            {pending.map(provider => (
                                <ServiceProviderCard key={provider.id} provider={provider} status="pending" />
                            ))}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="font-semibold">No service providers found.</p>
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
