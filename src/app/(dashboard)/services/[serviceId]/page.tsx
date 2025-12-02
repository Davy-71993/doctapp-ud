
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Ambulance, Home, Hospital, Stethoscope, Phone, MapPin, Pill } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const servicesData = {
  "ambulance-services": {
    title: "Ambulance Services",
    description: "24/7 emergency ambulance services to get you to the nearest medical facility.",
    icon: Ambulance,
    providers: [
      { id: "p1", name: "City Ambulance Service", location: "Kampala", phone: "0800 111 222", avatar: "CA" },
      { id: "p2", name: "Red Cross Uganda", location: "Countrywide", phone: "101", avatar: "RC" },
    ],
  },
  "home-based-care": {
    title: "Home-Based Care",
    description: "Professional medical care and assistance in the comfort of your own home.",
    icon: Home,
    providers: [
        { id: "p3", name: "HomeCare UG", location: "Kampala, Wakiso", phone: "0772 333 444", avatar: "HC" },
        { id: "p4", name: "Pro-Care Health Services", location: "Kampala", phone: "0755 999 888", avatar: "PC" },
    ],
  },
  "clinics": {
    title: "Clinics",
    description: "Find and book appointments at general and specialized clinics near you.",
    icon: Stethoscope,
    providers: [
      { id: "vc1", name: "The Surgery", location: "Kampala", phone: "0312 264 011", avatar: "TS" },
      { id: "vc2", name: "IMC Clinic, Wandegeya", location: "Kampala", phone: "0772 123 789", avatar: "IC" },
      { id: "vc3", name: "SAS Clinic", location: "Kampala", phone: "0414 531 641", avatar: "SC" },
    ],
  },
  "hospitals": {
    title: "Hospitals",
    description: "Access a wide network of partner hospitals for comprehensive medical treatment.",
    icon: Hospital,
    providers: [
      { id: "vh1", name: "Nakasero Hospital", location: "Kampala", phone: "0414 346 150", avatar: "NH" },
      { id: "vh2", name: "Mulago National Referral Hospital", location: "Kampala", phone: "0414 554 001", avatar: "MH" },
      { id: "vh3", name: "Mengo Hospital", location: "Kampala", phone: "0414 270 272", avatar: "MH" },
    ],
  },
  "pharmacies": {
    title: "Pharmacies",
    description: "Find licensed pharmacies to get your prescribed medication.",
    icon: Pill,
    providers: [
      { id: "vp1", name: "Ecopharm Pharmacy", location: "Kampala", phone: "0772 111 222", avatar: "EP" },
      { id: "vp2", name: "C&A Pharmacy", location: "Kampala", phone: "0703 333 444", avatar: "CA" },
    ],
  },
  "drug-shops": {
    title: "Drug Shops",
    description: "Find licensed drug shops for over-the-counter medication.",
    icon: Pill,
    providers: [
      { id: "vds1", name: "Goodlife Pharmacy", location: "Kampala", phone: "0800 211 011", avatar: "GP" },
    ],
  },
};

type ServiceProvider = {
  id: string;
  name: string;
  location: string;
  phone: string;
  avatar: string;
};

type ServiceDetails = {
    title: string;
    description: string;
    icon: React.ElementType;
    providers: ServiceProvider[];
};


export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const service: ServiceDetails | undefined = (servicesData as Record<string, ServiceDetails>)[serviceId];

  if (!service) {
    return <div>Service not found</div>;
  }

  const ServiceIcon = service.icon;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4">
            <ServiceIcon className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">{service.title}</h1>
        </div>
        <p className="text-muted-foreground mt-2">{service.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Providers</CardTitle>
          <CardDescription>
            Contact any of the providers below to access this service.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {service.providers.map((provider) => (
            <div key={provider.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{provider.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{provider.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 self-end sm:self-center">
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
                <Link href={`/service-providers/${provider.id}`}>
                    <Button variant="outline">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
