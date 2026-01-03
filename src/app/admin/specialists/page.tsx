"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Check, X, LoaderCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Doctor } from "@/lib/types";
import { getDoctors, verifySpecialist } from "@/server-actions/fetch";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

function PendingItem({
  item,
  onVerificationSuccess,
}: {
  item: Doctor;
  onVerificationSuccess: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const handleVerify = async () => {
    setLoading(true);
    const { error } = await verifySpecialist(item.id);
    if (error) {
      toast({
        title: "Error.",
        description: "Verification failed.",
        variant: "destructive",
      });

      setLoading(false);
      return;
    }
    onVerificationSuccess(item.id);
    setLoading(false);
  };
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
      <div>
        <p className="font-semibold">
          {item.profile?.first_name} {item.profile?.last_name}
        </p>
        <p className="text-sm text-muted-foreground">{item.specialty}</p>
        {item.documents && (
          <div className="w-full flex flex-wrap items-center gap-2 mt-2">
            {item.documents.map((doc: string, i: number) => (
              <Link key={i} href={doc} target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  {doc.split("/").pop()}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 self-end sm:self-center">
        <Button variant="outline" size="sm" className="gap-1">
          <X className="h-4 w-4" />
          Reject
        </Button>
        <Button onClick={handleVerify} size="sm" className="gap-1">
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Approving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Approve
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function VerifiedItem({ item }: { item: any }) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
      <div>
        <p className="font-semibold">
          {item.profile.first_name} {item.profile.last_name}
        </p>
        <p className="text-sm text-muted-foreground">{item.specialty}</p>
      </div>
      <Badge variant="secondary">Verified</Badge>
    </div>
  );
}

export default function SpecialistsPage() {
  const [pendingSpecialists, setPendingSpecialists] = useState<Doctor[]>([]);
  const [verifiedSpecialists, setVerifiedSpecialists] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecialists() {
      const { data } = await getDoctors();
      setVerifiedSpecialists(data?.filter((d) => d.verified) ?? []);
      setPendingSpecialists(data?.filter((d) => !d.verified) ?? []);
      setLoading(false);
    }
    fetchSpecialists();
  }, []);

  const onVerify = (id: string) => {
    const t = pendingSpecialists.find((ps) => ps.id === id);
    if (!t) return;
    setVerifiedSpecialists([...verifiedSpecialists, t]);
    setPendingSpecialists(pendingSpecialists.filter((ps) => ps.id !== t.id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Manage Specialists
        </h1>
        <p className="text-muted-foreground">
          Review and manage pending and verified specialists on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Specialist Approvals</CardTitle>
          <CardDescription>
            These specialists are awaiting for their documents and profile to be
            verified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            pendingSpecialists.map((specialist) => (
              <PendingItem
                key={specialist.id}
                item={specialist}
                onVerificationSuccess={onVerify}
              />
            ))
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Verified Specialists</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading
            ? [...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))
            : verifiedSpecialists.map((specialist) => (
                <VerifiedItem key={specialist.id} item={specialist} />
              ))}
        </CardContent>
      </Card>
    </div>
  );
}
