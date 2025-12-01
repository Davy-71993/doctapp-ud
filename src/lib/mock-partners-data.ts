
import type { Partner } from "@/lib/types";
import { Hospital, Activity, Pill } from "lucide-react";

export const partnerCategories = [
    { name: "Hospitals", href: "/admin/partners/hospitals", icon: Hospital, description: "Manage partner hospitals." },
    { name: "Clinics", href: "/admin/partners/clinics", icon: Activity, description: "Manage partner clinics." },
    { name: "Pharmacies", href: "/admin/partners/pharmacies", icon: Pill, description: "Manage partner pharmacies." },
    { name: "Drug Shops", href: "/admin/partners/drug-shops", icon: Pill, description: "Manage partner drug shops." },
];

export const pendingHospitals: Partner[] = [
    { id: 'ph1', name: 'St. Francis Hospital Nsambya', type: 'Hospital', documents: ['Registration.pdf', 'License.pdf'], location: 'Kampala' },
];

export const verifiedHospitals: Partner[] = [
    { id: 'vh1', name: 'Nakasero Hospital', type: 'Hospital', location: 'Kampala' },
    { id: 'vh2', name: 'Mulago National Referral Hospital', type: 'Hospital', location: 'Kampala' },
    { id: 'vh3', name: 'Mbarara Regional Referral Hospital', type: 'Hospital', location: 'Mbarara' },
];

export const pendingClinics: Partner[] = [
    { id: 'pc1', name: 'IMC Clinic', type: 'Clinic', documents: ['Registration.pdf'], location: 'Jinja' },
];

export const verifiedClinics: Partner[] = [
    { id: 'vc1', name: 'The Surgery', type: 'Clinic', location: 'Kampala' },
    { id: 'vc2', name: 'SAS Clinic', type: 'Clinic', location: 'Kampala' },
    { id: 'vc3', name: 'Gulu Medical Center', type: 'Clinic', location: 'Gulu' },
];

export const pendingPharmacies: Partner[] = [];

export const verifiedPharmacies: Partner[] = [
    { id: 'vp1', name: 'Ecopharm Pharmacy', type: 'Pharmacy', location: 'Kampala' },
    { id: 'vp2', name: 'C&A Pharmacy', type: 'Pharmacy', location: 'Kampala' },
    { id: 'vp3', name: 'Goodlife Pharmacy', type: 'Pharmacy', location: 'Jinja' },
];

export const pendingDrugShops: Partner[] = [
    { id: 'pds1', name: 'Central Drug Shop', type: 'Drug Shop', documents: ['License.pdf'], location: 'Mbale' }
];

export const verifiedDrugShops: Partner[] = [
    { id: 'vds1', name: 'Your Health Drug Shop', type: 'Drug Shop', location: 'Mbarara' }
];
