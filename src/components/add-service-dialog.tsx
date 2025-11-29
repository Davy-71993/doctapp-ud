
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
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const { toast } = useToast();

    const handleSave = () => {
        if (!name || !description || !duration || !price) {
            toast({
                title: "Missing Information",
                description: "Please fill out all fields to add a new service.",
                variant: "destructive"
            });
            return;
        }

        onAddService({
            name,
            description,
            duration: parseInt(duration, 10),
            price: parseInt(price, 10),
        });

        toast({
            title: "Service Added",
            description: `The "${name}" service has been successfully added.`,
        });
        
        // Reset form and close dialog
        setName('');
        setDescription('');
        setDuration('');
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
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the new service you want to offer.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="service-name">Service Name</Label>
                        <Input id="service-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Cardiac Consultation" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="service-description">Description</Label>
                        <Textarea id="service-description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the service..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="service-duration">Duration (minutes)</Label>
                            <Input id="service-duration" type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 45" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="service-price">Price (UGX)</Label>
                            <Input id="service-price" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 150000" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Service</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
