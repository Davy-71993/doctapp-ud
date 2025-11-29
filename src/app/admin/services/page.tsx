
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
import {
  pendingServices,
  verifiedServices,
} from '@/lib/mock-data';

function PendingItem({ item }: { item: any }) {
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

function VerifiedItem({ item }: { item: any }) {
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

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Services</h1>
          <p className="text-muted-foreground">
            Add, view, and manage all offered services on the platform.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

       <Card>
          <CardHeader>
              <CardTitle>Pending Service Approvals</CardTitle>
              <CardDescription>These services are awaiting review before being published.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              {pendingServices.map(service => (
                  <PendingItem key={service.id} item={service} />
              ))}
          </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>A list of all verified services on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifiedServices.map((service) => (
            <VerifiedItem key={service.name} item={service} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
