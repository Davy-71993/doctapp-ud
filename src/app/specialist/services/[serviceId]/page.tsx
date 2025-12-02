
"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { specialistServices as initialServices } from '@/lib/mock-data';
import type { SpecialistService as Service } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function SpecialistServiceDetailsPage() {
    const params = useParams();
    const serviceId = params.serviceId as string;
    const initialService = initialServices.find(s => s.id === serviceId);

    const [service, setService] = useState<Service | undefined>(initialService);
    const { toast } = useToast();

    if (!service) {
        return <div className="text-center py-12">Service not found.</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setService(prev => prev ? { ...prev, [id]: value } : undefined);
    };
    
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setService(prev => prev ? { ...prev, [id]: parseInt(value, 10) || 0 } : undefined);
    }

    const handleSaveChanges = () => {
        toast({
            title: "Service Updated",
            description: `Details for "${service.name}" have been saved.`,
        });
    }

    return (
        <div className="space-y-8">
             <div className="flex items-center gap-4">
                <Link href="/specialist/services">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
                    <p className="text-muted-foreground">
                        Update the details for {service.name}.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Service Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Service Name</Label>
                        <Input id="name" value={service.name} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={service.description} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input id="duration" type="number" value={service.duration} onChange={handleNumberChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (UGX)</Label>
                            <Input id="price" type="number" value={service.price} onChange={handleNumberChange} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-between">
                    <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Service
                    </Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

