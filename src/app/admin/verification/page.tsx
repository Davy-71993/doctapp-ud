
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Check, X } from 'lucide-react';
import {
  pendingSpecialists,
  verifiedSpecialists,
  pendingPartners,
  verifiedPartners,
  pendingServices,
  verifiedServices,
} from '@/lib/mock-data';


function PendingItem({ item, type }: { item: any, type: string }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.specialty || item.type || item.category}</p>
                {item.documents && (
                     <div className="flex items-center gap-2 mt-2">
                        {item.documents.map((doc: string) => (
                             <Button key={doc} variant="outline" size="sm" className="gap-2">
                                <FileText className="h-4 w-4" />
                                {doc}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex gap-2 self-end sm:self-center">
                <Button variant="outline" size="sm" className="gap-1">
                    <X className="h-4 w-4" />
                    Reject
                </Button>
                <Button size="sm" className="gap-1">
                    <Check className="h-4 w-4" />
                    Approve
                </Button>
            </div>
        </div>
    )
}

function VerifiedItem({ item }: { item: any }) {
    return (
         <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.specialty || item.type || item.category}</p>
            </div>
            <Badge variant="secondary">Verified</Badge>
        </div>
    )
}

export default function VerificationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Center</h1>
        <p className="text-muted-foreground">
          Review and manage pending and verified items on the platform.
        </p>
      </div>

      <Tabs defaultValue="specialists" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specialists">Specialists</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specialists" className="space-y-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Specialist Approvals</CardTitle>
                    <CardDescription>These specialists are awaiting for their documents and profile to be verified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pendingSpecialists.map(specialist => (
                        <PendingItem key={specialist.id} item={specialist} type="Specialist" />
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Verified Specialists</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {verifiedSpecialists.map(specialist => (
                        <VerifiedItem key={specialist.id} item={specialist} />
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Partner Approvals</CardTitle>
                    <CardDescription>These partners are awaiting for their documents and profile to be verified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pendingPartners.map(partner => (
                        <PendingItem key={partner.id} item={partner} type="Partner" />
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Verified Partners</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {verifiedPartners.map(partner => (
                        <VerifiedItem key={partner.name} item={partner} />
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Service Approvals</CardTitle>
                    <CardDescription>These services are awaiting review before being published.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pendingServices.map(service => (
                        <PendingItem key={service.id} item={service} type="Service" />
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Verified Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {verifiedServices.map(service => (
                        <VerifiedItem key={service.name} item={service} />
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
