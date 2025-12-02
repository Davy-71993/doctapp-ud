
"use client";

import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { specialistServices } from '@/lib/mock-data';
import type { SpecialistService } from '@/lib/types';
import { Clock, DollarSign, Stethoscope, MapPin } from 'lucide-react';
import { allServiceProviders } from '@/lib/mock-service-providers-data';
import Link from 'next/link';

export default function PublicServiceDetailPage() {
    const params = useParams();
    const serviceId = params.serviceId as string;
    const service: SpecialistService | undefined = specialistServices.find(s => s.id === serviceId);

    // Find providers who offer this service
    const providers = allServiceProviders.filter(provider => 
        provider.services.some(s => s.id === serviceId)
    );

    if (!service) {
        return <div className="text-center py-12">Service not found.</div>;
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <div className="p-3 bg-muted rounded-lg">
                           <Stethoscope className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                             <CardTitle className="text-2xl">{service.name}</CardTitle>
                             <CardDescription>{service.description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>Duration: {service.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-5 w-5" />
                        <span>Price: {service.price.toLocaleString()} UGX</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full">Book This Service</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Available At</CardTitle>
                    <CardDescription>
                        You can get this service from the following verified facilities.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {providers.length > 0 ? providers.map(provider => (
                        <div key={provider.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
                            <div>
                                <h3 className="font-semibold">{provider.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{provider.location}</span>
                                </div>
                            </div>
                            <Link href={`/service-providers/${provider.id}`}>
                                <Button variant="outline" className="self-end sm:self-center">
                                    View Facility
                                </Button>
                            </Link>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-muted-foreground">
                            This service is not currently offered by any of our partner facilities.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
