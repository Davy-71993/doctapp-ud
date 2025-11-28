
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Ambulance, Home, Hospital, Stethoscope } from "lucide-react";

const services = [
  {
    title: "Ambulance Services",
    description: "24/7 emergency ambulance services to get you to the nearest medical facility.",
    icon: Ambulance,
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-700 dark:text-red-300",
  },
  {
    title: "Home-Based Care",
    description: "Professional medical care and assistance in the comfort of your own home.",
    icon: Home,
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    title: "Clinics",
    description: "Find and book appointments at general and specialized clinics near you.",
    icon: Stethoscope,
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
  },
  {
    title: "Hospitals",
    description: "Access a wide network of partner hospitals for comprehensive medical treatment.",
    icon: Hospital,
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-700 dark:text-purple-300",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="text-muted-foreground">
          Explore the range of healthcare services we offer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4 pb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color}`}
              >
                <service.icon className={`w-6 h-6 ${service.textColor}`} />
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
