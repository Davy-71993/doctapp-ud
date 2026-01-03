"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { useToast } from "@/hooks/use-toast";
import type { Patient, Doctor, Facility } from "@/lib/types";
import {
  ArrowLeft,
  Send,
  BarChart,
  Droplet,
  Thermometer,
  ShieldAlert,
  LoaderCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { getPatientDetails, getProfile } from "@/server-actions/auth";
import {
  createRefferal,
  getDoctors,
  getFacilities,
  reportUser,
} from "@/server-actions/fetch";

const statusColors: { [key: string]: string } = {
  Stable: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  "Needs Review":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

function ReferPatientDialog({
  patientName,
  patient_id,
}: {
  patientName: string;
  patient_id: string;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);

  const [reason, setReason] = useState<string>();
  const [reffered_facility_id, setRefferedFacilityId] = useState<string>();
  const [reffered_doctor_id, setRefferedDoctorId] = useState<string>();

  useEffect(() => {
    if (open) {
      Promise.all([getDoctors, getFacilities]).then(
        async ([docRes, facRes]) => {
          setDoctors((await docRes()).data ?? []);
          setFacilities((await facRes()).data ?? []);
        }
      );
    }
  }, [open]);

  const handleRefer = async () => {
    if (!reason) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "The reason for refferal is required.",
      });
      return;
    }

    if (!reffered_doctor_id && !reffered_facility_id) {
      toast({
        title: "Error",
        variant: "destructive",
        description:
          "Atleast one of the reffered doctor or facility or both is required.",
      });
      return;
    }
    const refferal = {
      patient_id,
      reffered_doctor_id,
      reffered_facility_id,
      reason,
    };

    console.log(refferal);
    const { error } = await createRefferal(refferal);
    if (error) {
      console.log(error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to create a refferal.",
      });
      return;
    }
    toast({
      title: "Referral sent",
      description: `${patientName} has been referred successfully.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Refer Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refer Patient</DialogTitle>
          <DialogDescription>
            Refer {patientName} to another specialist for further consultation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="referral-specialist">Specialist</Label>
            <Select
              value={reffered_doctor_id}
              onValueChange={(v) => setRefferedDoctorId(v)}
            >
              <SelectTrigger id="referral-specialist">
                <SelectValue placeholder="Select a specialist" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.profile?.first_name} {doctor.profile?.last_name} -{" "}
                    {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="referral-facility">Facility</Label>
            <Select
              value={reffered_facility_id}
              onValueChange={(v) => setRefferedFacilityId(v)}
            >
              <SelectTrigger id="referral-facility">
                <SelectValue placeholder="Select a facility" />
              </SelectTrigger>
              <SelectContent>
                {facilities.map((facility) => (
                  <SelectItem key={facility.id} value={facility.id}>
                    {facility.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="referral-reason">Reason for Referral</Label>
            <Textarea
              id="referral-reason"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              placeholder="State the reason for referral..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleRefer}>Send Referral</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReportPatientDialog({
  patientName,
  profile,
}: {
  patientName: string;
  profile?: string;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReport = async () => {
    if (description.length < 5 || !profile) {
      toast({
        title: "Error:",
        description: `Failed to submit your report. Mising profile or description.`,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { data } = await getProfile();
    if (!data?.id) {
      setSubmitting(false);
      toast({
        title: "Error:",
        description: `Failed to submit your report. Identification failed.`,
        variant: "destructive",
      });
      return;
    }
    const { error } = await reportUser({
      reason: description,
      reporter_id: data.id,
      target_id: profile,
    });

    if (error) {
      toast({
        title: "Error:",
        description: `Failed to submit your report.`,
        variant: "destructive",
      });

      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    toast({
      title: "Report Submitted",
      description: `Your report concerning ${patientName} has been submitted for review.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ShieldAlert className="mr-2 h-4 w-4" />
          Report Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Patient</DialogTitle>
          <DialogDescription>
            Report {patientName}. This will be reviewed by an administrator.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="report-reason">Reason for report</Label>
            <Textarea
              id="report-reason"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Describe the issue or reason for this report..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReport}>
            {submitting ? (
              <>
                <LoaderCircle className="animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PatientDetailsPage() {
  const params = useParams();
  const patientId = params.patientId as string;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    async function fetchPatient() {
      const { data } = await getPatientDetails(patientId);

      setPatient(data);
      setLoading(false);
    }
    fetchPatient();
  }, [patientId]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-start">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Patient Not Found</h2>
        <p className="text-muted-foreground">
          The requested patient does not exist.
        </p>
        <Link href="/specialist/patients">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Patients
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex items-center gap-4">
          <Link href="/specialist/patients">
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Avatar className="h-20 w-20">
            <ImagePlaceholder id={patient.avatar} />
            <AvatarFallback>
              {patient.profile?.first_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {patient.profile?.first_name} {patient.profile?.last_name}
              </h1>
              <Badge
                className={cn(
                  "whitespace-nowrap mt-1",
                  statusColors[patient.status]
                )}
              >
                {patient.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Last checkup: {new Date(patient.last_checkup).toDateString()} |{" "}
              {new Date(patient.last_checkup).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-2 self-end sm:self-start">
          <ReportPatientDialog
            profile={patient.profile?.id}
            patientName={patient.profile?.first_name ?? ""}
          />
          <ReferPatientDialog
            patientName={patient.profile?.first_name ?? ""}
            patient_id={patient?.id ?? ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <BarChart className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Blood Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {patient.vitals?.bloodPressure} mmHg
            </p>
            <p className="text-xs text-muted-foreground">Normal: 120/80 mmHg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <Droplet className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Blood Sugar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{patient.vitals?.bloodSugar}</p>
            <p className="text-xs text-muted-foreground">
              Normal: 70-100 mg/dL
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0">
            <Thermometer className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{patient.vitals?.temperature}</p>
            <p className="text-xs text-muted-foreground">Normal: 36.5-37.5°C</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            A log of the patient's recent health data entries and appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No recent activity to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
