import Link from 'next/link';
import {
  Stethoscope,
  Calendar,
  Activity,
  Pill,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { recentActivities } from '@/lib/mock-data';

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

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
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
                    <CardTitle className="pt-4 text-lg md:text-xl">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{card.description}</CardDescription>
                    </CardContent>
                </Card>
                </Link>
            ))}
        </div>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              An overview of your latest health activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
               <div key={activity.id} className="flex items-center gap-4">
               <Avatar className="h-10 w-10">
                 <div className="w-full h-full flex items-center justify-center bg-secondary rounded-full">
                   <activity.icon className="h-5 w-5 text-muted-foreground" />
                 </div>
               </Avatar>
               <div className="flex-1">
                 <p className="text-sm font-medium leading-none">{activity.title}</p>
                 <p className="text-sm text-muted-foreground">{activity.description}</p>
               </div>
               <div className="text-right">
                   <p className="text-sm text-muted-foreground">{activity.time}</p>
               </div>
             </div>
            ))}
          </CardContent>
        </Card>
    </div>
  );
}
