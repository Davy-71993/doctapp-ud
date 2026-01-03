"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, DollarSign, Pencil, FileText } from "lucide-react";
import type { SpecialistService } from "@/lib/types";
import { AddServiceDialog } from "@/components/add-service-dialog";
import { Skeleton } from "@/components/ui/skeleton";

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
  );
}

export default function SpecialistServicesPage() {
  const [services, setServices] = useState<SpecialistService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(false);
    }
    fetchServices();
  }, []);

  const handleAddService = (newService: Omit<SpecialistService, "id">) => {
    const serviceToAdd: SpecialistService = {
      id: (services.length + 1).toString(),
      ...newService,
    };
    // This is a mock implementation. In a real app, you'd POST to an API.
    setServices((prev) => [...prev, serviceToAdd]);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
          <p className="text-muted-foreground">
            Manage the medical services and prescriptions you offer to patients.
          </p>
        </div>
        <AddServiceDialog onAddService={handleAddService}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </AddServiceDialog>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create and manage all patient prescriptions.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link
                href={`/specialist/services/prescriptions`}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Prescriptions
                </Button>
              </Link>
            </CardFooter>
          </Card> */}
          {services.length === 0 && !loading && (
            <Card className="flex flex-col items-center justify-center p-12 text-center md:col-span-2 lg:col-span-3">
              <CardTitle className="text-xl">No Services Found</CardTitle>
              <CardDescription className="mt-2">
                You have not added any services yet. Click the button above to
                add your first service.
              </CardDescription>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
