
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
import type { Facility } from '@/lib/types';
import { doctors } from '@/lib/mock-data';
import Link from 'next/link';


function PendingItem({ item }: { item: Facility }) {
    const specialist = doctors.find(d => d.id === item.specialistId);
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
                 {specialist && <p className="text-xs text-muted-foreground mt-1">Submitted by: {specialist.name}</p>}
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

function VerifiedItem({ item }: { item: Facility }) {
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
                <Link href={`/service-providers/${item.id}`}>
                    <Button variant="outline" size="sm">View Details</Button>
                </Link>
            </div>
        </div>
    )
}

type FacilityListProps = {
    title: string;
    description: string;
    pendingData: Facility[];
    verifiedData: Facility[];
}

export default function FacilityListPageTemplate({ title, description, pendingData, verifiedData }: FacilityListProps) {
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
                <CardDescription>These facilities are awaiting for their documents and profile to be verified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingData.map(facility => (
                    <PendingItem key={facility.id} item={facility} />
                ))}
            </CardContent>
        </Card>
       )}
      
      <Card>
        <CardHeader>
          <CardTitle>All {title}</CardTitle>
          <CardDescription>A list of all verified facilities on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifiedData.length > 0 ? verifiedData.map((facility) => (
            <VerifiedItem key={facility.id} item={facility} />
          )) : (
            <p className="text-sm text-muted-foreground text-center py-8">No verified {title.toLowerCase()} found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
