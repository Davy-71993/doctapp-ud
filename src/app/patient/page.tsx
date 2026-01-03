import Link from "next/link";
import {
  Stethoscope,
  Calendar,
  Activity,
  Pill,
  LayoutGrid,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import BloodPressureCard from "@/components/parts/cards/blood-pressure-card";
import RecentActivitiesCard from "@/components/parts/cards/recent-activities-card";
import BloodSugarCard from "@/components/parts/cards/blood-sugar-card";
import { getHealthData, getRecentActivities } from "@/server-actions/fetch";
import { act, Suspense } from "react";

const actionCards = [
  {
    title: "My Specialists",
    description: "View your connected specialists",
    icon: Stethoscope,
    href: "/patient/my-specialists",
    color: "bg-emerald-100 dark:bg-emerald-900",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "My Appointments",
    description: "View upcoming and past visits",
    icon: Calendar,
    href: "/patient/appointments",
    color: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-700 dark:text-sky-300",
  },
  {
    title: "Track Health",
    description: "Log allergies, blood pressure, and more",
    icon: Activity,
    href: "/patient/track",
    color: "bg-amber-100 dark:bg-amber-900",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  {
    title: "Order Medicine",
    description: "Upload prescription and order",
    icon: Pill,
    href: "/patient/order-medicine",
    color: "bg-rose-100 dark:bg-rose-900",
    textColor: "text-rose-700 dark:text-rose-300",
  },
  {
    title: "Browse Services",
    description: "Ambulance, home care, and more",
    icon: LayoutGrid,
    href: "/patient/services",
    color: "bg-indigo-100 dark:bg-indigo-900",
    textColor: "text-indigo-700 dark:text-indigo-300",
  },
];

export default async function DashboardPage() {
  const healthDataPromise = getHealthData();
  const activitiesPromise = getRecentActivities();
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {actionCards.map((card) => (
          <Link href={card.href} key={card.title}>
            <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
                  >
                    <card.icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                </div>
                <CardTitle className="pt-4 text-lg md:text-xl">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Suspense>
          <BloodPressureCard healthDataPromise={healthDataPromise} />
        </Suspense>
        <Suspense>
          <BloodSugarCard healthDataPromise={healthDataPromise} />
        </Suspense>
        <Suspense>
          <RecentActivitiesCard activitiesPromise={activitiesPromise} />
        </Suspense>
      </div>
    </div>
  );
}
