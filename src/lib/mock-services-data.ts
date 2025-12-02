
import type { Service } from "@/lib/types";
import { Briefcase, Truck, Siren, Home } from "lucide-react";

export const serviceCategories = [
    { name: "General Services", href: "/admin/services/general", icon: Briefcase, description: "Manage general medical and consultation services." },
    { name: "Ambulance", href: "/admin/services/ambulance", icon: Truck, description: "Manage ambulance services." },
    { name: "Emergencies", href: "/admin/services/emergencies", icon: Siren, description: "Manage emergency services." },
    { name: "Home-Based Care", href: "/admin/services/home-based-care", icon: Home, description: "Manage home-based care services." },
];

export const pendingServices: Service[] = [
    { id: 'psv1', name: 'Advanced MRI Scan', category: 'Radiology', description: 'High-resolution magnetic resonance imaging.' },
];

export const verifiedServices: Service[] = [
    { id: 'vsv1', name: 'ECG Test', category: 'Cardiology' },
    { id: 'vsv2', name: 'Dental Cleaning', category: 'Dentistry' },
];

export const pendingAmbulance: Service[] = [];
export const verifiedAmbulance: Service[] = [
    { id: 'va1', name: 'City Ambulance', category: 'Ambulance', description: '24/7 Ambulance service in Kampala.' }
];

export const pendingEmergencies: Service[] = [];
export const verifiedEmergencies: Service[] = [
    { id: 've1', name: 'National Emergency Hotline', category: 'Emergency', description: 'Toll-free number for all medical emergencies.' }
];
