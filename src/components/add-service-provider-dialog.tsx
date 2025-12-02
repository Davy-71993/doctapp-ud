
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { ServiceProvider } from '@/lib/types';

type AddServiceProviderDialogProps = {
    children: React.ReactNode;
    onAddProvider: (provider: Omit<ServiceProvider, 'id' | 'specialistId' | 'services'>) => void;
};

export function AddServiceProviderDialog({ children, onAddProvider }: AddServiceProviderDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState<ServiceProvider['type'] | ''>('');
    const [location, setLocation] = useState('');
    const { toast } = useToast();

    const handleSave = () => {
        if (!name || !type || !location) {
            toast({
                title: "Missing Information",
                description: "Please fill out all fields to register a provider.",
                variant: "destructive"
            });
            return;
        }

        onAddProvider({
            name,
            type: type as ServiceProvider['type'],
            location,
            documents: ['License.pdf', 'Registration.pdf'] // Mock documents
        });

        toast({
            title: "Provider Submitted",
            description: `"${name}" has been submitted for verification.`,
        });
        
        // Reset form and close dialog
        setName('');
        setType('');
        setLocation('');
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Register a New Service Provider</DialogTitle>
                    <DialogDescription>
                        Fill in the details of the facility you manage. It will be submitted for admin verification.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="provider-name">Facility Name</Label>
                        <Input id="provider-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Nakasero Hospital" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="provider-type">Facility Type</Label>
                        <Select onValueChange={(value) => setType(value as ServiceProvider['type'])} value={type}>
                            <SelectTrigger id="provider-type">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Hospital">Hospital</SelectItem>
                                <SelectItem value="Clinic">Clinic</SelectItem>
                                <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                                <SelectItem value="Drug Shop">Drug Shop</SelectItem>
                                <SelectItem value="Home-Based Care">Home-Based Care</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="provider-location">Location / District</Label>
                        <Input id="provider-location" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Kampala" />
                    </div>
                    <div className="grid gap-2">
                        <Label>Required Documents</Label>
                        <p className="text-sm text-muted-foreground">
                            You will be required to upload documents like your license and registration in the next step.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Submit for Verification</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
