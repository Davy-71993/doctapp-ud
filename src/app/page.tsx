import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Calendar, Activity, Pill, ChevronRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: Stethoscope,
    title: 'Find a Doctor',
    description: 'Easily search for doctors by specialty and location. Read reviews and book appointments with top-rated professionals in your area.',
    color: 'text-emerald-500',
  },
  {
    icon: Calendar,
    title: 'Manage Appointments',
    description: 'Keep track of all your upcoming and past appointments in one place. Get reminders and reschedule with ease.',
    color: 'text-sky-500',
  },
  {
    icon: Activity,
    title: 'Health Tracking',
    description: 'Monitor your vital signs, track your health cycles, and gain insights into your well-being with our easy-to-use tracking tools.',
    color: 'text-amber-500',
  },
  {
    icon: Pill,
    title: 'Order Medicine',
    description: 'Upload your prescription and get your medication delivered to your doorstep quickly and conveniently.',
    color: 'text-rose-500',
  },
];

export default function LandingPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container max-w-7xl flex items-center">
            <Link href="/" className="flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-semibold">DoctApp UG</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                    href="/login"
                    className="text-sm font-medium hover:underline underline-offset-4"
                >
                    Login
                </Link>
                <Button asChild>
                    <Link href="/register">Register</Link>
                </Button>
            </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/50">
          <div className="container max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                {heroImage && (
                    <div className="relative mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last">
                        <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={heroImage.imageHint}
                        />
                    </div>
                )}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Health, One Tap Away
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DoctApp UG is the all-in-one health super-app for Uganda. Find doctors, manage appointments, track your health, and order medicine seamlessly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  A Better Way to Manage Your Health
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide you with the tools to take control of your healthcare journey, from finding the right specialist to getting your medication delivered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="h-full border-0 shadow-none">
                  <CardHeader className="flex flex-col items-center text-center p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground p-6 pt-0">
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>
      <footer className="border-t">
        <div className="container max-w-7xl flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6">
            <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DoctApp UG. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
                Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
                Privacy
            </Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}
