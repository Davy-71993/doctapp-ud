"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Check,
  X,
  MapPin,
  File,
  LoaderCircle,
  Verified,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Facility } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Description } from "@radix-ui/react-dialog";
import { ImagePlaceholder } from "./image-placeholder";
import { verifyFacility } from "@/server-actions/fetch";
import { toast } from "@/hooks/use-toast";

function PendingItem({
  item,
  onVerify,
}: {
  item: Facility;
  onVerify: (id: string) => void;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const handleVerification = async () => {
    setLoading(true);
    const { error } = await verifyFacility(item.id);
    if (error) {
      toast({
        title: "Error.",
        description: "Failed to verify the facility.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Verified.",
      description: "The facility has been verified successifully.",
    });
    onVerify(item.id);
    setLoading(false);
  };
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between p-4 bg-muted/50 rounded-lg gap-4">
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
        {item.incharge && (
          <p className="text-xs text-muted-foreground mt-5">
            Submitted by: {item.incharge?.first_name} {item.incharge?.last_name}
          </p>
        )}
        {item.documents && (
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {item.documents.map((doc: string, i: number) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <Button size={"sm"} variant={"secondary"} key={doc}>
                    <File />
                    {doc.split("/").pop()}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle />
                  <Description />
                  <ImagePlaceholder image={{ url: doc }} id={i.toString()} />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 self-start">
        <Link href={`${pathname}/${item.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        <Button variant="outline" size="sm" className="gap-1">
          <X className="h-4 w-4" />
          Reject
        </Button>
        <Button onClick={handleVerification} size="sm" className="gap-1">
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" /> Loading ...
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

function VerifiedItem({ item }: { item: Facility }) {
  const pathname = usePathname();
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
      <div className="flex items-center gap-2 self-start">
        <Badge variant="secondary">Verified</Badge>
        <Link href={`${pathname}/${item.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

type FacilityListProps = {
  title: string;
  description: string;
  pendingData: Facility[];
  verifiedData: Facility[];
  loading: boolean;
};

export default function FacilityListPageTemplate({
  title,
  description,
  pendingData,
  verifiedData,
  loading,
}: FacilityListProps) {
  const [pending, setPending] = useState<Facility[]>([]);
  const [verified, setVerified] = useState<Facility[]>([]);
  useEffect(() => {
    setVerified(verifiedData);
    setPending(pendingData);
  }, [pendingData, verifiedData]);

  const onVerify = (id: string) => {
    const v = pending.find((p) => p.id === id);
    if (!v) {
      return;
    }
    setPending(pending.filter((p) => p.id !== id));
    setVerified([...verified, v]);
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage {title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New {title.slice(0, -1)}
        </Button>
      </div>

      {loading || pending.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Pending {title} Approvals</CardTitle>
            <CardDescription>
              These facilities are awaiting for their documents and profile to
              be verified.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              pending.map((facility) => (
                <PendingItem
                  key={facility.id}
                  item={facility}
                  onVerify={onVerify}
                />
              ))
            )}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>All {title}</CardTitle>
          <CardDescription>
            A list of all verified facilities on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))
          ) : verified.length > 0 ? (
            verified.map((facility) => (
              <VerifiedItem key={facility.id} item={facility} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Not verified {title.toLowerCase()} found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
