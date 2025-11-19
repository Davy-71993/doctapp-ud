import Link from 'next/link';
import {
  Stethoscope,
  Calendar,
  Activity,
  Pill,
  ChevronRight,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { recentActivities, userProfile } from '@/lib/mock-data';
import { ImagePlaceholder } from '@/components/image-placeholder';

const actionCards = [
  {
    title: 'Find a Doctor',
    description: 'Search by specialty or location',
    icon: Stethoscope,
    href: '/search',
    color: 'bg-emerald-100 dark:bg-emerald-900',
    textColor: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    title: 'My Appointments',
    description: 'View upcoming and past visits',
    icon: Calendar,
    href: '/appointments',
    color: 'bg-sky-100 dark:bg-sky-900',
    textColor: 'text-sky-700 dark:text-sky-300',
  },
  {
    title: 'Track Health',
    description: 'Monitor your vitals and cycles',
    icon: Activity,
    href: '/track',
    color: 'bg-amber-100 dark:bg-amber-900',
    textColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    title: 'Order Medicine',
    description: 'Upload prescription and order',
    icon: Pill,
    href: '/order-medicine',
    color: 'bg-rose-100 dark:bg-rose-900',
    textColor: 'text-rose-700 dark:text-rose-300',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Your Health, One Tap Away
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome back, {userProfile.name.split(' ')[0]}!
        </p>
      </section>

      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actionCards.map((card) => (
            <Link href={card.href} key={card.title}>
              <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
                  >
                    <card.icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                  <CardTitle className="pt-2 text-base md:text-lg">{card.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                   <Avatar className="h-10 w-10">
                    <div className="w-full h-full flex items-center justify-center bg-secondary rounded-full">
                      <activity.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
