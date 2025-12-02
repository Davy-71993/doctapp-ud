
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Check, X, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ServiceProvider } from '@/lib/types';


function PendingItem({ item }: { item: ServiceProvider }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
            <div>
                <p className="font-semibold">{item.name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{item.type}</span>
                    {item.location && (
                        <>
                            <span className="h-4 border-l"></span>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                            </div>
                        </>
                    )}
                </div>
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

function VerifiedItem({ item }: { item: ServiceProvider }) {
    return (
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-muted/30 rounded-lg gap-3">
            <div>
                <p className="font-semibold">{item.name}</p>
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{item.type}</span>
                    {item.location && (
                        <>
                            <span className="h-4 border-l"></span>
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
                <Badge variant="secondary">Verified</Badge>
                <Button variant="outline" size="sm">View Details</Button>
            </div>
        </div>
    )
}

type ServiceProviderListProps = {
    title: string;
    description: string;
    pendingData: ServiceProvider[];
    verifiedData: ServiceProvider[];
}

export default function ServiceProviderListPageTemplate({ title, description, pendingData, verifiedData }: ServiceProviderListProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage {title}</h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New {title}
        </Button>
      </div>

       {pendingData.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>Pending {title} Approvals</CardTitle>
                <CardDescription>These service providers are awaiting for their documents and profile to be verified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingData.map(serviceProvider => (
                    <PendingItem key={serviceProvider.id} item={serviceProvider} />
                ))}
            </CardContent>
        </Card>
       )}
      
      <Card>
        <CardHeader>
          <CardTitle>All {title}</CardTitle>
          <CardDescription>A list of all verified service providers on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifiedData.length > 0 ? verifiedData.map((serviceProvider) => (
            <VerifiedItem key={serviceProvider.id} item={serviceProvider} />
          )) : (
            <p className="text-sm text-muted-foreground text-center py-8">No verified {title.toLowerCase()} found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
