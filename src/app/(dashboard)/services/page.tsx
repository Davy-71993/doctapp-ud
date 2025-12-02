
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Ambulance, Home, Hospital, Stethoscope, Pill } from "lucide-react";
import Link from "next/link";
import { allServiceProviders } from '@/lib/mock-service-providers-data';


const services = [
  {
    title: "Ambulance Services",
    href: "/services/ambulance-services",
    description: "24/7 emergency ambulance services to get you to the nearest medical facility.",
    icon: Ambulance,
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-700 dark:text-red-300",
    providerType: "Ambulance"
  },
  {
    title: "Home-Based Care",
    href: "/services/home-based-care",
    description: "Professional medical care and assistance in the comfort of your own home.",
    icon: Home,
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-700 dark:text-blue-300",
    providerType: "Home-Based Care"
  },
  {
    title: "Clinics",
    href: "/services/clinics",
    description: "Find and book appointments at general and specialized clinics near you.",
    icon: Stethoscope,
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
    providerType: "Clinic"
  },
  {
    title: "Hospitals",
    href: "/services/hospitals",
    description: "Access a wide network of partner hospitals for comprehensive medical treatment.",
    icon: Hospital,
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-700 dark:text-purple-300",
    providerType: "Hospital"
  },
  {
    title: "Pharmacies",
    href: "/services/pharmacies",
    description: "Find licensed pharmacies to get your prescribed medication.",
    icon: Pill,
    color: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-700 dark:text-orange-300",
    providerType: "Pharmacy"
  },
    {
    title: "Drug Shops",
    href: "/services/drug-shops",
    description: "Find licensed drug shops for over-the-counter medication.",
    icon: Pill,
    color: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-700 dark:text-yellow-300",
    providerType: "Drug Shop"
  },
];

const ProviderList = ({ type }: { type: string }) => {
    const providers = allServiceProviders.filter(p => p.type === type);
    return (
        <div className="space-y-4">
            {providers.map(provider => (
                <Link href={`/service-providers/${provider.id}`} key={provider.id}>
                    <Card className="hover:bg-muted/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-base">{provider.name}</CardTitle>
                            <CardDescription>{provider.location}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse Services</h1>
        <p className="text-muted-foreground">
          Find the healthcare service or facility you need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col w-full">
            <CardHeader className="flex-row items-center gap-4 pb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color}`}
              >
                <service.icon className={`w-6 h-6 ${service.textColor}`} />
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <CardDescription>{service.description}</CardDescription>
              <ProviderList type={service.providerType} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
