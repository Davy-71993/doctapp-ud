import { Ambulance, Home, Hospital, Stethoscope, Pill } from "lucide-react";

export const serviceTypes = [
  {
    title: "Ambulance Services",
    slug: "ambulance",
    description:
      "24/7 emergency ambulance services to get you to the nearest medical facility.",
    icon: Ambulance,
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-700 dark:text-red-300",
    providerType: "Ambulance",
  },
  {
    title: "Home-Based Care",
    slug: "home-based-care",
    description:
      "Professional medical care and assistance in the comfort of your own home.",
    icon: Home,
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-700 dark:text-blue-300",
    providerType: "Home-Based Care",
  },
  {
    title: "Clinics",
    slug: "clinics",
    description:
      "Find and book appointments at general and specialized clinics near you.",
    icon: Stethoscope,
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
    providerType: "Clinic",
  },
  {
    title: "Hospitals",
    slug: "hospitals",
    description:
      "Access a wide network of partner hospitals for comprehensive medical treatment.",
    icon: Hospital,
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-700 dark:text-purple-300",
    providerType: "Hospital",
  },
  {
    title: "Pharmacies",
    slug: "pharmacies",
    description: "Find licensed pharmacies to get your prescribed medication.",
    icon: Pill,
    color: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-700 dark:text-orange-300",
    providerType: "Pharmacy",
  },
  {
    title: "Drug Shops",
    slug: "drug-shops",
    description: "Find licensed drug shops for over-the-counter medication.",
    icon: Pill,
    color: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-700 dark:text-yellow-300",
    providerType: "Drug Shop",
  },
];
