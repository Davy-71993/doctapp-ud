
"use client";

import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { allServiceProviders } from '@/lib/mock-service-providers-data';
import { Hospital, MapPin, Clock, DollarSign } from 'lucide-react';
import type { ServiceProvider } from '@/lib/types';
import { ImagePlaceholder } from '@/components/image-placeholder';

export default function PublicFacilityDetailsPage() {
    const params = useParams();
    const providerId = params.providerId as string;
    const provider: ServiceProvider | undefined = allServiceProviders.find(p => p.id === providerId);

    if (!provider) {
        return <div className="text-center py-12">Service provider not found.</div>;
    }

    return (
        <div className="space-y-8">
            <Card className="overflow-hidden">
                <div className="h-48 w-full bg-muted">
                    <ImagePlaceholder id="hero-image" className="h-full w-full" fill imageClassName="object-cover" />
                </div>
                 <CardHeader className="border-b">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-muted rounded-lg">
                           <Hospital className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{provider.name}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-5 w-5" />
                                <span>{provider.location}</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-muted-foreground">
                        {`Welcome to ${provider.name}, a leading ${provider.type} in ${provider.location}. We are committed to providing excellent healthcare services to our community.`}
                    </p>
                </CardContent>
            </Card>
            

            <Card>
                 <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                    <CardDescription>
                        Browse the services available at this facility.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {provider.services.length > 0 ? provider.services.map(service => (
                        <div key={service.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
                            <div>
                                <h3 className="font-semibold">{service.name}</h3>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{service.duration} mins</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        <span>{service.price.toLocaleString()} UGX</span>
                                    </div>
                                </div>
                            </div>
                            <Button className="self-end sm:self-center">Book Now</Button>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No specific services listed for this provider yet. Please call for more information.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
