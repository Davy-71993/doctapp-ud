
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { allFacilities } from '@/lib/mock-service-providers-data';
import { serviceTypes } from '@/lib/service-types';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServiceTypePage() {
    const params = useParams();
    const serviceTypeSlug = params.serviceType as string;

    const serviceType = serviceTypes.find(st => st.href === `/services/${serviceTypeSlug}`);

    const facilities = allFacilities.filter(p => p.type === serviceType?.providerType);

    if (!serviceType) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Service Type Not Found</h2>
                <p className="text-muted-foreground">The requested service category does not exist.</p>
                <Link href="/services">
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
                <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                     <ArrowLeft className="mr-2 h-4 w-4" />
                     Back to All Services
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">{serviceType.title}</h1>
                <p className="text-muted-foreground">
                    Browse all available {serviceType.title.toLowerCase()} on the platform.
                </p>
            </div>

             <div className="space-y-4">
                {facilities.length > 0 ? facilities.map(facility => (
                    <Link href={`/service-providers/${facility.id}`} key={facility.id}>
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
