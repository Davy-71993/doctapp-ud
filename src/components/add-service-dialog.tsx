
"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { SpecialistService } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type AddServiceDialogProps = {
    children: React.ReactNode;
    onAddService: (service: Omit<SpecialistService, 'id'>) => void;
};

export function AddServiceDialog({ children, onAddService }: AddServiceDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('60');
    const [price, setPrice] = useState('');
    const { toast } = useToast();

    const handleSave = () => {
        if (!name || !duration) {
            toast({
                title: "Missing Information",
                description: "Please fill out at least the title and duration.",
                variant: "destructive"
            });
            return;
        }

        onAddService({
            name,
            description,
            duration: parseInt(duration, 10),
            price: price ? parseInt(price, 10) : 0,
        });

        toast({
            title: "Schedule Updated",
            description: `The "${name}" event has been added to your calendar.`,
        });
        
        // Reset form and close dialog
        setName('');
        setDescription('');
        setDuration('60');
        setPrice('');
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Add to Schedule</DialogTitle>
                    <DialogDescription>
                        Add a new appointment or block out time in your schedule.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="service-name">Title</Label>
                        <Input id="service-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Team Meeting" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="service-description">Description (Optional)</Label>
                        <Textarea id="service-description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Add a brief description..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="service-duration">Duration (minutes)</Label>
                            <Input id="service-duration" type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 45" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="service-price">Price (UGX, Optional)</Label>
                            <Input id="service-price" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 150000" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save to Schedule</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
