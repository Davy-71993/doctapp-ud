
import type { Facility } from "@/lib/types";
import { Hospital, Activity, Pill } from "lucide-react";
import { specialistServices } from "./mock-data";

export const facilityCategories = [
    { name: "Hospitals", href: "/admin/service-providers/hospitals", icon: Hospital, description: "Manage partner hospitals." },
    { name: "Clinics", href: "/admin/service-providers/clinics", icon: Activity, description: "Manage partner clinics." },
    { name: "Pharmacies", href: "/admin/service-providers/pharmacies", icon: Pill, description: "Manage partner pharmacies." },
    { name: "Drug Shops", href: "/admin/service-providers/drug-shops", icon: Pill, description: "Manage partner drug shops." },
];

export const pendingHospitals: Facility[] = [
    { id: 'ph1', name: 'St. Francis Hospital Nsambya', type: 'Hospital', documents: ['Registration.pdf', 'License.pdf'], location: 'Kampala', specialistId: '2', services: [] },
];

export const verifiedHospitals: Facility[] = [
    { id: 'vh1', name: 'Nakasero Hospital', type: 'Hospital', location: 'Kampala', specialistId: '1', services: [specialistServices[0], specialistServices[2]] },
    { id: 'vh2', name: 'Mulago National Referral Hospital', type: 'Hospital', location: 'Kampala', specialistId: '1', services: [] },
    { id: 'vh3', name: 'Mbarara Regional Referral Hospital', type: 'Hospital', location: 'Mbarara', specialistId: '6', services: [] },
];

export const pendingClinics: Facility[] = [
    { id: 'pc1', name: 'IMC Clinic', type: 'Clinic', documents: ['Registration.pdf'], location: 'Jinja', specialistId: '17', services: [] },
];

export const verifiedClinics: Facility[] = [
    { id: 'vc1', name: 'The Surgery', type: 'Clinic', location: 'Kampala', specialistId: '10', services: [] },
    { id: 'vc2', name: 'SAS Clinic', type: 'Clinic', location: 'Kampala', specialistId: '18', services: [] },
    { id: 'vc3', name: 'Gulu Medical Center', type: 'Clinic', location: 'Gulu', specialistId: '4', services: [] },
];

export const pendingPharmacies: Facility[] = [];

export const verifiedPharmacies: Facility[] = [
    { id: 'vp1', name: 'Ecopharm Pharmacy', type: 'Pharmacy', location: 'Kampala', specialistId: '21', services: [] },
    { id: 'vp2', name: 'C&A Pharmacy', type: 'Pharmacy', location: 'Kampala', specialistId: '21', services: [] },
    { id: 'vp3', name: 'Goodlife Pharmacy', type: 'Pharmacy', location: 'Jinja', specialistId: '21', services: [] },
];

export const pendingDrugShops: Facility[] = [
    { id: 'pds1', name: 'Central Drug Shop', type: 'Drug Shop', documents: ['License.pdf'], location: 'Mbale', specialistId: '24', services: [] }
];

export const verifiedDrugShops: Facility[] = [
    { id: 'vds1', name: 'Your Health Drug Shop', type: 'Drug Shop', location: 'Mbarara', specialistId: '24', services: [] }
];

export const allFacilities = [
    ...pendingHospitals,
    ...verifiedHospitals,
    ...pendingClinics,
    ...verifiedClinics,
    ...pendingPharmacies,
    ...verifiedPharmacies,
    ...pendingDrugShops,
    ...verifiedDrugShops,
]
