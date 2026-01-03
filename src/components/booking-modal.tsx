"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import type { Appointment, Doctor, Facility } from "@/lib/types";
import { addDays, format, set } from "date-fns";
import { CheckCircle, Clock, LoaderCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { addAppointment, updateAppointment } from "@/server-actions/fetch";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
];

export function BookingModal({
  doctor,
  facility,
  triggerText,
  appointment,
}: {
  doctor?: Doctor;
  facility?: Facility;
  triggerText?: string;
  appointment?: Appointment;
}) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    appointment?.appointment_date
      ? new Date(appointment.appointment_date)
      : new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(
    appointment
      ? new Date(appointment.appointment_date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : undefined
  );
  const [reason, setReason] = useState(appointment?.reason ?? "");
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const { toast } = useToast();

  const handleBooking = async () => {
    setBooking(true);
    if (!selectedDate || !selectedSlot || !reason) {
      setBooking(false);
      return;
    }
    const pm = selectedSlot.includes("PM");
    const appointment_date = selectedDate;
    appointment_date.setHours(
      pm
        ? parseInt(selectedSlot.split(":")[0], 10) + 12
        : parseInt(selectedSlot.split(":")[0], 10)
    );
    appointment_date.setMinutes(
      parseInt(selectedSlot.split(":")[1].split(" ")[0], 10)
    );
    appointment_date.setSeconds(0);
    appointment_date.setMilliseconds(0);

    const appointmentData = {
      doctor_id: doctor?.id ?? null,
      facility_id: facility?.id ?? null,
      appointment_date: appointment_date.toISOString(),
      reason,
    };

    const { error } = await (appointment
      ? updateAppointment(appointment.id, appointmentData)
      : addAppointment(appointmentData));
    if (error) {
      console.log(error.message);
      toast({
        title: "Booking Failed",
        description:
          "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
      setBooking(false);
      return;
    }
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${
        doctor?.name ?? facility?.name
      } on ${format(selectedDate!, "PPP")} at ${selectedSlot} is confirmed.`,
      variant: "default",
    });
    setBooking(false);
    setStep(4);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedDate(new Date());
    setSelectedSlot(undefined);
    setReason("");
    setOpen(false);
  };

  const disableTimeSlot = (slot: string) => {
    if (
      new Date(selectedDate!.toDateString()) >
      new Date(new Date().toDateString())
    ) {
      return false;
    }
    const pm = slot.includes("PM");
    const hours = parseInt(slot.split(":")[0], 10);
    const now = new Date().getHours();
    return (pm ? hours + 12 : hours) <= now;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Select a Date</DialogTitle>
              <DialogDescription>
                Choose a date for your appointment with{" "}
                {doctor?.profile?.first_name} {doctor?.profile?.last_name}.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < addDays(new Date(), -1) ||
                  date < new Date("1900-01-01")
                }
                initialFocus
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setStep(2)} disabled={!selectedDate}>
                Next
              </Button>
            </DialogFooter>
          </>
        );
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Choose a Time Slot</DialogTitle>
              <DialogDescription>
                Available slots for {format(selectedDate!, "PPP")}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? "default" : "outline"}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={disableTimeSlot(slot)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot}
                </Button>
              ))}
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedSlot}>
                Next
              </Button>
            </DialogFooter>
          </>
        );
      case 3:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Your Appointment</DialogTitle>
              <DialogDescription>
                Review the details and provide a reason for your visit.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2 text-sm p-4 rounded-md border bg-muted/50">
                {doctor && (
                  <>
                    <p>
                      <strong>Doctor:</strong> {doctor?.profile?.first_name}{" "}
                      {doctor?.profile?.last_name}
                    </p>
                    <p>
                      <strong>Specialty:</strong> {doctor?.specialty}
                    </p>
                  </>
                )}
                {facility && (
                  <p>
                    <strong>Facility:</strong> {facility?.name}
                  </p>
                )}

                <p>
                  <strong>Date:</strong> {format(selectedDate!, "PPP")}
                </p>
                <p>
                  <strong>Time:</strong> {selectedSlot}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Briefly describe the reason for your appointment..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                onClick={handleBooking}
                disabled={!reason.trim()}
                className="w-40"
              >
                {booking ? (
                  <>
                    <LoaderCircle className="animate-spin" size={24} />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </DialogFooter>
          </>
        );
      case 4: // Success step
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <DialogTitle className="mb-2">Appointment Confirmed!</DialogTitle>
            <DialogDescription>
              Your appointment with{" "}
              {doctor
                ? `${doctor?.profile?.first_name} ${doctor?.profile?.last_name}`
                : facility?.name}{" "}
              on {format(selectedDate!, "PPP")} at {selectedSlot} has been
              successfully booked.
            </DialogDescription>
            <Button onClick={resetAndClose} className="mt-6">
              Done
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetAndClose();
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex-1 w-20">{triggerText || "Book Now"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}
