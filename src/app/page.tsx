
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Calendar, Activity, Pill, ChevronRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ImagePlaceholder } from '@/components/image-placeholder';

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

const partners = [
    { id: 'partner-1' },
    { id: 'partner-2' },
    { id: 'partner-3' },
    { id: 'partner-4' },
    { id: 'partner-5' },
    { id: 'partner-6' },
];

export default function LandingPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container max-w-7xl mx-auto flex items-center">
            <Link href="/" className="flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-semibold">DoctApp UG</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link
                    href="/login"
                    className="text-sm font-medium hover:underline underline-offset-4 block"
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
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover -z-10"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50 -z-10"></div>
            <div className="container max-w-7xl mx-auto px-4 md:px-6 text-center">
                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Your Health, One Tap Away
                        </h1>
                        <p className="max-w-[600px] mx-auto text-gray-200 md:text-xl">
                        DoctApp UG is the all-in-one health super-app for Uganda. Find doctors, manage appointments, track your health, and order medicine seamlessly.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Button size="lg" asChild>
                            <Link href="/register">
                                Get Started
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
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

        <section id="partners" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Our Trusted Partners
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We collaborate with a network of trusted healthcare providers to ensure you receive the best care.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
              {partners.map((partner) => (
                <div key={partner.id} className="flex justify-center">
                  <ImagePlaceholder id={partner.id} className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <footer className="border-t">
        <div className="container max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6">
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
