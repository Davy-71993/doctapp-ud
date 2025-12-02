
"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, DollarSign, Pencil } from 'lucide-react';
import { specialistServices as initialServices } from '@/lib/mock-data';
import type { SpecialistService } from '@/lib/types';
import { AddServiceDialog } from '@/components/add-service-dialog';

function ServiceCard({ service }: { service: SpecialistService }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{service.description}</CardDescription>
                <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{service.price} UGX</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/specialist/services/${service.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Service
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}


export default function SpecialistServicesPage() {
  const [services, setServices] = useState<SpecialistService[]>(initialServices);

  const handleAddService = (newService: Omit<SpecialistService, 'id'>) => {
    const serviceToAdd: SpecialistService = {
        id: (services.length + 1).toString(),
        ...newService,
    };
    setServices(prev => [...prev, serviceToAdd]);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground">
            Manage the medical services you offer to patients.
          </p>
        </div>
        <AddServiceDialog onAddService={handleAddService}>
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Service
            </Button>
        </AddServiceDialog>
      </div>
      
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center">
            <CardTitle className="text-xl">No Services Found</CardTitle>
            <CardDescription className="mt-2">
                You have not added any services yet. Click the button above to add your first service.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}
