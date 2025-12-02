
import type { ServiceProvider } from "@/lib/types";
import { Hospital, Activity, Pill, Home } from "lucide-react";
import { specialistServices } from "./mock-data";

export const serviceProviderCategories = [
    { name: "Hospitals", href: "/admin/service-providers/hospitals", icon: Hospital, description: "Manage partner hospitals." },
    { name: "Clinics", href: "/admin/service-providers/clinics", icon: Activity, description: "Manage partner clinics." },
    { name: "Pharmacies", href: "/admin/service-providers/pharmacies", icon: Pill, description: "Manage partner pharmacies." },
    { name: "Drug Shops", href: "/admin/service-providers/drug-shops", icon: Pill, description: "Manage partner drug shops." },
    { name: "Home-Based Care", href: "/admin/service-providers/home-based-care", icon: Home, description: "Manage home-based care providers." },
];

export const pendingHospitals: ServiceProvider[] = [
    { id: 'ph1', name: 'St. Francis Hospital Nsambya', type: 'Hospital', documents: ['Registration.pdf', 'License.pdf'], location: 'Kampala', specialistId: '2', services: [] },
];

export const verifiedHospitals: ServiceProvider[] = [
    { id: 'vh1', name: 'Nakasero Hospital', type: 'Hospital', location: 'Kampala', specialistId: '1', services: [specialistServices[0], specialistServices[2]] },
    { id: 'vh2', name: 'Mulago National Referral Hospital', type: 'Hospital', location: 'Kampala', specialistId: '1', services: [] },
    { id: 'vh3', name: 'Mbarara Regional Referral Hospital', type: 'Hospital', location: 'Mbarara', specialistId: '6', services: [] },
];

export const pendingClinics: ServiceProvider[] = [
    { id: 'pc1', name: 'IMC Clinic', type: 'Clinic', documents: ['Registration.pdf'], location: 'Jinja', specialistId: '17', services: [] },
];

export const verifiedClinics: ServiceProvider[] = [
    { id: 'vc1', name: 'The Surgery', type: 'Clinic', location: 'Kampala', specialistId: '10', services: [] },
    { id: 'vc2', name: 'SAS Clinic', type: 'Clinic', location: 'Kampala', specialistId: '18', services: [] },
    { id: 'vc3', name: 'Gulu Medical Center', type: 'Clinic', location: 'Gulu', specialistId: '4', services: [] },
];

export const pendingPharmacies: ServiceProvider[] = [];

export const verifiedPharmacies: ServiceProvider[] = [
    { id: 'vp1', name: 'Ecopharm Pharmacy', type: 'Pharmacy', location: 'Kampala', specialistId: '21', services: [] },
    { id: 'vp2', name: 'C&A Pharmacy', type: 'Pharmacy', location: 'Kampala', specialistId: '21', services: [] },
    { id: 'vp3', name: 'Goodlife Pharmacy', type: 'Pharmacy', location: 'Jinja', specialistId: '21', services: [] },
];

export const pendingDrugShops: ServiceProvider[] = [
    { id: 'pds1', name: 'Central Drug Shop', type: 'Drug Shop', documents: ['License.pdf'], location: 'Mbale', specialistId: '24', services: [] }
];

export const verifiedDrugShops: ServiceProvider[] = [
    { id: 'vds1', name: 'Your Health Drug Shop', type: 'Drug Shop', location: 'Mbarara', specialistId: '24', services: [] }
];

export const allServiceProviders = [
    ...pendingHospitals,
    ...verifiedHospitals,
    ...pendingClinics,
    ...verifiedClinics,
    ...pendingPharmacies,
    ...verifiedPharmacies,
    ...pendingDrugShops,
    ...verifiedDrugShops,
]
