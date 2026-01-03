"use client";

import type { Appointment } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { updateAppointmentStatus } from "@/server-actions/fetch";
import { BookingModal } from "./booking-modal";

type AppointmentCardProps = {
  appointment: Appointment;
  userType: "patient" | "specialist" | "Admin";
  onStatusChange?: (
    status: "upcoming" | "past" | "cancelled" | "deleted",
    appid: string
  ) => void;
};

export function AppointmentCard({
  appointment,
  userType,
  onStatusChange,
}: AppointmentCardProps) {
  const { toast } = useToast();

  const handleCancel = async () => {
    const { error } = await updateAppointmentStatus(
      appointment.id,
      "cancelled"
    );
    if (error) {
      toast({
        title: "Error",
        description: "Failed to cancel the appointment. Please try again.",
        variant: "destructive",
      });
      return;
    }
    onStatusChange?.("cancelled", appointment.id);
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment with ${appointment.doctor?.profile?.first_name} ${appointment.doctor?.profile?.last_name} has been cancelled.`,
    });
  };

  const handleDelete = async () => {
    const { error } = await updateAppointmentStatus(appointment.id, "deleted");
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete the appointment. Please try again.",
        variant: "destructive",
      });
      return;
    }
    onStatusChange?.("deleted", appointment.id);
    toast({
      title: "Appointment Deleted",
      description: `Your past appointment with ${appointment.doctor?.profile?.first_name} ${appointment.doctor?.profile?.last_name} has been removed.`,
    });
  };

  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    past: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    deleted: "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <ImagePlaceholder
                id={
                  appointment.doctor?.image ??
                  appointment.facility?.image?.url ??
                  ""
                }
              />
              <AvatarFallback>
                {appointment.doctor?.profile?.first_name.charAt(0) ||
                  appointment.facility?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {(userType === "patient"
                  ? appointment.doctor
                  : appointment.patient
                )?.profile?.first_name ?? appointment.facility?.name}{" "}
                {
                  (userType === "patient"
                    ? appointment.doctor
                    : appointment.patient
                  )?.profile?.last_name
                }
              </CardTitle>
              <CardDescription>
                {appointment.doctor?.specialty}{" "}
                {appointment.doctor && `(${appointment.doctor?.hospital})`}
              </CardDescription>
            </div>
          </div>
          <Badge
            className={cn(
              "whitespace-nowrap",
              statusColors[appointment.status]
            )}
          >
            {appointment.status.charAt(0).toUpperCase() +
              appointment.status.slice(1)}
          </Badge>
        </div>
        <div className="pt-4 space-y-2 text-sm">
          {appointment.reason && (
            <div>
              <p>
                <strong>Reason for visit:</strong>
              </p>
              <p className="text-muted-foreground">{appointment.reason}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {appointment.appointment_date &&
                  format(
                    new Date(appointment.appointment_date),
                    "MMMM dd, yyyy"
                  )}{" "}
                at{" "}
                {new Date(appointment.appointment_date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardFooter className="gap-2">
        {appointment.status === "upcoming" && (
          <div className="flex gap-2 w-full md:w-60">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <BookingModal
              doctor={appointment.doctor}
              facility={appointment.facility}
              triggerText="Reschedule"
              appointment={appointment}
            />
          </div>
        )}
        {appointment.status !== "upcoming" && (
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
