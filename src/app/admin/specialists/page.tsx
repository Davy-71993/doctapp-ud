
"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Check, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Specialist {
    id: string;
    name: string;
    specialty: string;
    documents?: string[];
}

function PendingItem({ item }: { item: any}) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
            <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.specialty}</p>
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
                <p className="text-sm text-muted-foreground">{item.specialty}</p>
            </div>
            <Badge variant="secondary">Verified</Badge>
        </div>
    )
}

export default function SpecialistsPage() {
    const [pendingSpecialists, setPendingSpecialists] = useState<Specialist[]>([]);
    const [verifiedSpecialists, setVerifiedSpecialists] = useState<Specialist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSpecialists() {
            try {
                const [pendingRes, verifiedRes] = await Promise.all([
                    fetch('/api/specialists/pending'),
                    fetch('/api/specialists/verified')
                ]);
                const pendingData = await pendingRes.json();
                const verifiedData = await verifiedRes.json();
                setPendingSpecialists(pendingData);
                setVerifiedSpecialists(verifiedData);
            } catch (error) {
                console.error("Failed to fetch specialists:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSpecialists();
    }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Specialists</h1>
        <p className="text-muted-foreground">
          Review and manage pending and verified specialists on the platform.
        </p>
      </div>
      
        <Card>
            <CardHeader>
                <CardTitle>Pending Specialist Approvals</CardTitle>
                <CardDescription>These specialists are awaiting for their documents and profile to be verified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    <Skeleton className="h-24 w-full" />
                ) : (
                    pendingSpecialists.map(specialist => (
                        <PendingItem key={specialist.id} item={specialist} />
                    ))
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Verified Specialists</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    [...Array(2)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
                ) : (
                    verifiedSpecialists.map(specialist => (
                        <VerifiedItem key={specialist.id} item={specialist} />
                    ))
                )}
            </CardContent>
        </Card>
    </div>
  );
}
