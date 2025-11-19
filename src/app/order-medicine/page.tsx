import Link from 'next/link';
import { ArrowLeft, UploadCloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImagePlaceholder } from '@/components/image-placeholder';

export default function OrderMedicinePage() {
  return (
    <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-xl font-semibold ml-4">Order Medicine</h1>
            </div>
        </header>

        <main className="container py-8 space-y-8">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center">
                        <UploadCloud className="w-12 h-12 text-muted-foreground" />
                        <p className="mt-4 font-semibold">Upload Prescription</p>
                        <p className="text-sm text-muted-foreground">Drag & drop or click to upload your file</p>
                        <Button variant="outline" className="mt-4">Browse Files</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Or Show a Previous Prescription
                    </span>
                </div>
            </div>

            <Card>
                 <CardContent className="p-4">
                    <ImagePlaceholder id="prescription-upload" className="w-full h-auto rounded-md" />
                 </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6 space-y-4">
                    <h2 className="text-lg font-semibold">Delivery Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Alex Mukisa" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="+256 772 123456" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Plot 123, Makerere Hill Rd, Kampala" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="district">District</Label>
                            <Input id="district" placeholder="Kampala" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="parish">Parish / Ward</Label>
                            <Input id="parish" placeholder="Wandegeya" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Button className="w-full text-lg py-6">Pay with Mobile Money</Button>
        </main>
    </div>
  );
}
