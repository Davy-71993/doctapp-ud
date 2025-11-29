
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
import type { Partner } from '@/lib/types';


function PendingItem({ item }: { item: Partner }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.type}</p>
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

function VerifiedItem({ item }: { item: Partner }) {
    return (
         <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.type}</p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="secondary">Verified</Badge>
                <Button variant="outline" size="sm">View Details</Button>
            </div>
        </div>
    )
}

type PartnerListProps = {
    title: string;
    description: string;
    pendingData: Partner[];
    verifiedData: Partner[];
}

export default function PartnerListPageTemplate({ title, description, pendingData, verifiedData }: PartnerListProps) {
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
                <CardDescription>These partners are awaiting for their documents and profile to be verified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingData.map(partner => (
                    <PendingItem key={partner.id} item={partner} />
                ))}
            </CardContent>
        </Card>
       )}
      
      <Card>
        <CardHeader>
          <CardTitle>All {title}</CardTitle>
          <CardDescription>A list of all verified partners on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verifiedData.length > 0 ? verifiedData.map((partner) => (
            <VerifiedItem key={partner.id} item={partner} />
          )) : (
            <p className="text-sm text-muted-foreground text-center py-8">No verified {title.toLowerCase()} found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
