
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { serviceTypes } from '@/lib/service-types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import type { Facility } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServiceTypePage() {
    const params = useParams();
    const serviceTypeSlug = params.serviceType as string;

    const serviceType = serviceTypes.find(st => st.href === `/patient/services/${serviceTypeSlug}`);
    
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!serviceType) return;
        
        async function fetchFacilities() {
            try {
                const response = await fetch('/api/facilities');
                const allFacilities: Facility[] = await response.json();
                const filteredFacilities = allFacilities.filter(p => p.type === serviceType?.providerType);
                setFacilities(filteredFacilities);
            } catch (error) {
                console.error("Failed to fetch facilities:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchFacilities();
    }, [serviceType]);

    if (!serviceType) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Service Type Not Found</h2>
                <p className="text-muted-foreground">The requested service category does not exist.</p>
                <Link href="/patient/services">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Services
                    </Button>
                </Link>
            </div>
        );
    }
    
    return (
        <div className="space-y-8">
            <div>
                <Link href="/patient/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Back to All Services
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">{serviceType.title}</h1>
                <p className="text-muted-foreground">
                    Browse all available {serviceType.title.toLowerCase()} on the platform.
                </p>
            </div>

             <div className="space-y-4">
                {loading ? (
                     [...Array(3)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
                ) : facilities.length > 0 ? facilities.map(facility => (
                    <Link href={`/patient/service-providers/${facility.id}`} key={facility.id}>
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-base">{facility.name}</CardTitle>
                                <CardDescription>{facility.location}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                )) : (
                    <div className="text-center py-16 text-muted-foreground rounded-lg bg-muted/30">
                        <p className="font-semibold">No Facilities Found</p>
                        <p className="text-sm mt-1">There are currently no verified facilities for this service type.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
