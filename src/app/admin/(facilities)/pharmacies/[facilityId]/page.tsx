"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  File,
  Hospital,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { Facility } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getFacilities } from "@/server-actions/fetch";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Description } from "@radix-ui/react-dialog";
import { ImagePlaceholder } from "@/components/image-placeholder";

export default function SpecialistFacilityDetailsPage() {
  const params = useParams();
  const facilityId = params.facilityId as string;
  const [facility, setFacility] = useState<Facility | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!facilityId) {
      setLoading(false);
      return;
    }
    async function fetchFacility() {
      const { data, error } = await getFacilities({ id: facilityId });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch the facility details from the server.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      setFacility(data);
      setLoading(false);
    }
    fetchFacility();
  }, [facilityId]);

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!facility) {
    return <div className="text-center py-12">Facility not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <Hospital className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {facility.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{facility.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {facility.verified ? (
            <>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Facility
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary">
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Details</CardTitle>
          <CardDescription>
            Internal management view of your facility.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <p>
              <strong>Type:</strong> {facility.type}
            </p>
            <Badge variant={facility.verified ? "secondary" : "destructive"}>
              Status: {facility.verified ? "Verified" : "Pending"}
            </Badge>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Verification Documents:</strong>
            </p>
            <div className="flex flex-wrap gap-3">
              {facility.documents?.map((doc, i) => (
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Services Offered</CardTitle>
            <CardDescription>
              Manage the services available at this facility.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Duration (mins)</TableHead>
                {/* <TableHead>Price (UGX)</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facility.services.length > 0 ? (
                facility.services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      {service.name}
                    </TableCell>
                    <TableCell>{service.duration}</TableCell>
                    {/* <TableCell>{service.price.toLocaleString()}</TableCell> */}
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-8"
                  >
                    No services added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
