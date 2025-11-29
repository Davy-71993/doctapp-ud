import type { Partner } from "@/lib/types";
import { Hospital, Activity, Pill, Truck, Siren } from "lucide-react";

export const partnerCategories = [
    { name: "Hospitals", href: "/admin/partners/hospitals", icon: Hospital, description: "Manage partner hospitals." },
    { name: "Clinics", href: "/admin/partners/clinics", icon: Activity, description: "Manage partner clinics." },
    { name: "Pharmacies", href: "/admin/partners/pharmacies", icon: Pill, description: "Manage partner pharmacies." },
    { name: "Drug Shops", href: "/admin/partners/drug-shops", icon: Pill, description: "Manage partner drug shops." },
    { name: "Ambulance", href: "/admin/partners/ambulance", icon: Truck, description: "Manage ambulance services." },
    { name: "Emergencies", href: "/admin/partners/emergencies", icon: Siren, description: "Manage emergency services." },
];

export const pendingHospitals: Partner[] = [
    { id: 'ph1', name: 'St. Francis Hospital Nsambya', type: 'Hospital', documents: ['Registration.pdf', 'License.pdf'] },
];

export const verifiedHospitals: Partner[] = [
    { id: 'vh1', name: 'Nakasero Hospital', type: 'Hospital' },
    { id: 'vh2', name: 'Mulago National Referral Hospital', type: 'Hospital' },
];

export const pendingClinics: Partner[] = [
    { id: 'pc1', name: 'IMC Clinic', type: 'Clinic', documents: ['Registration.pdf'] },
];

export const verifiedClinics: Partner[] = [
    { id: 'vc1', name: 'The Surgery', type: 'Clinic' },
    { id: 'vc2', name: 'SAS Clinic', type: 'Clinic' },
];

export const pendingPharmacies: Partner[] = [];

export const verifiedPharmacies: Partner[] = [
    { id: 'vp1', name: 'Ecopharm Pharmacy', type: 'Pharmacy' },
    { id: 'vp2', name: 'C&A Pharmacy', type: 'Pharmacy' },
];

// Mock data for other categories can be added here
export const pendingDrugShops: Partner[] = [];
export const verifiedDrugShops: Partner[] = [];
export const pendingAmbulance: Partner[] = [];
export const verifiedAmbulance: Partner[] = [];
export const pendingEmergencies: Partner[] = [];
export const verifiedEmergencies: Partner[] = [];
