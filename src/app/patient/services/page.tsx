import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { getServiceTypes } from "@/server-actions/fetch";
import Link from "next/link";
import { DynamicIcon } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";

export default async function ServicesPage() {
  const { data: serviceTypes } = await getServiceTypes();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse Services</h1>
        <p className="text-muted-foreground">
          Find the healthcare service or facility you need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceTypes?.map((service) => (
          <Link href={`/patient/services/${service.slug}`} key={service.title}>
            <Card className="flex flex-col w-full h-full hover:shadow-lg transition-shadow">
              <CardHeader className="flex-row items-center gap-4 pb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color}`}
                >
                  {/* <service.icon className={`w-6 h-6 ${service.textColor}`} /> */}
                  <DynamicIcon
                    name={service.icon.toLowerCase()}
                    className={cn("w-6 h-6", service.text_color)}
                  />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
