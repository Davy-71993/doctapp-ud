
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import type { SpecialistService, Facility } from '@/lib/types';
import { Clock, DollarSign, Stethoscope, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function PublicServiceDetailPage() {
    const params = useParams();
    const serviceId = params.serviceId as string;
    const [service, setService] = useState<SpecialistService | null>(null);
    const [providers, setProviders] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!serviceId) return;
        async function fetchServiceDetails() {
            try {
                const [serviceRes, facilitiesRes] = await Promise.all([
                    fetch(`/api/specialist-services/${serviceId}`),
                    fetch('/api/facilities')
                ]);

                if (!serviceRes.ok) {
                    throw new Error("Service not found");
                }
                
                const serviceData: SpecialistService = await serviceRes.json();
                const facilitiesData: Facility[] = await facilitiesRes.json();

                setService(serviceData);
                
                const serviceProviders = facilitiesData.filter(provider => 
                    provider.services.some(s => s.id === serviceId)
                );
                setProviders(serviceProviders);

            } catch (error) {
                console.error("Failed to fetch service details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchServiceDetails();
    }, [serviceId]);

    if (loading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

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
                            <Link href={`/patient/service-providers/${provider.id}`}>
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
