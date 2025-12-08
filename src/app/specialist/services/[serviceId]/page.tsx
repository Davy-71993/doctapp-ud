
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { SpecialistService as Service } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function SpecialistServiceDetailsPage() {
    const params = useParams();
    const serviceId = params.serviceId as string;
    const [service, setService] = useState<Service | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!serviceId) return;
        async function fetchService() {
            try {
                const response = await fetch(`/api/specialist-services/${serviceId}`);
                if (!response.ok) throw new Error('Service not found');
                const data = await response.json();
                setService(data);
            } catch (error) {
                console.error("Failed to fetch service:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchService();
    }, [serviceId]);

    if (loading) {
        return (
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <div>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </div>
                </div>
                <Skeleton className="h-96 w-full" />
            </div>
        )
    }

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
        // In a real app, this would be a PUT/PATCH request
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
