
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Service } from '@/lib/types';


function PendingItem({ item }: { item: Service }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                 <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
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

function VerifiedItem({ item }: { item: Service }) {
    return (
         <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary">Verified</Badge>
                <Button variant="outline" size="sm">Edit</Button>
            </div>
        </div>
    )
}

type ServiceListProps = {
    title: string;
    description: string;
    pendingData: Service[];
    verifiedData: Service[];
    type: 'Service' | 'Ambulance' | 'Emergency';
}

export default function ServiceListPageTemplate({ title, description, pendingData, verifiedData, type }: ServiceListProps) {
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
          Add New {type}
        </Button>
      </div>

       {pendingData.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>Pending {title} Approvals</CardTitle>
                <CardDescription>These services are awaiting review before being published.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingData.map(service => (
                    <PendingItem key={service.id} item={service} />
                ))}
            </CardContent>
        </Card>
       )}
      
      <Card>
        <CardHeader>
          <CardTitle>All {title}</CardTitle>
          <CardDescription>A list of all verified services on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifiedData.length > 0 ? verifiedData.map((service) => (
            <VerifiedItem key={service.id} item={service} />
          )) : (
            <p className="text-sm text-muted-foreground text-center py-8">No verified {title.toLowerCase()} found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
