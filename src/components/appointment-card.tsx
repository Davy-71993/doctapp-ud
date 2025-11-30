
"use client";

import type { Appointment } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

type AppointmentCardProps = {
  appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const { toast } = useToast();

  const handleCancel = () => {
    toast({
      title: "Appointment Cancelled",
      description: `Your appointment with ${appointment.doctor.name} has been cancelled.`,
    });
  };

  const handleReschedule = () => {
    toast({
      title: "Reschedule Appointment",
      description: `Please contact the hospital to reschedule your appointment.`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Appointment Deleted",
      description: `Your past appointment with ${appointment.doctor.name} has been removed.`,
    });
  }

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    past: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <ImagePlaceholder id={appointment.doctor.image} />
              <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{appointment.doctor.name}</CardTitle>
              <CardDescription>{appointment.doctor.specialty}</CardDescription>
              <p className="text-sm text-muted-foreground">{appointment.doctor.hospital}</p>
            </div>
          </div>
          <Badge className={cn('whitespace-nowrap', statusColors[appointment.status])}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
        <div className="pt-4 space-y-2 text-sm">
          <div>
            <p><strong>Date:</strong> {format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
          </div>
          {appointment.reason && (
            <div>
                <p><strong>Reason for visit:</strong></p>
                <p className="text-muted-foreground">{appointment.reason}</p>
            </div>
          )}
        </div>
      </CardHeader>
      <CardFooter className="gap-2">
        {appointment.status === 'upcoming' && (
            <>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleReschedule}>Reschedule</Button>
            </>
        )}
        {appointment.status !== 'upcoming' && (
            <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
