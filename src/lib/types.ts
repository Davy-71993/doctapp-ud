
import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'specialist';
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
};

export type Appointment = {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  status: 'upcoming' | 'past' | 'cancelled';
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
};

export type UserProfile = {
  name: string;
  phone: string;
  district: string;
  bloodGroup: string;
  avatar: string;
};

export type Patient = {
    id: string;
    name: string;
    avatar: string;
    lastCheckup: string;
    status: 'Stable' | 'Critical' | 'Needs Review';
};

export type PeriodData = { date: Date };
export type TemperatureData = { date: string; temperature: number };
export type BloodSugarData = { date: string; level: number };
export type BloodPressureData = { date: string; systolic: number; diastolic: number };
export type AllergyData = string;
export type PregnancyData = { status: 'Not Pregnant' | 'Pregnant'; dueDate?: Date };

export type HealthData = {
  period: PeriodData[];
  temperature: TemperatureData[];
  bloodSugar: BloodSugarData[];
  bloodPressure: BloodPressureData[];
  allergies: AllergyData[];
  pregnancy: PregnancyData;
};

export type SpecialistService = {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number; // in UGX
};

export type Specialist =
  | 'Medical Officer'
  | 'Pharmacist'
  | 'Midwife'
  | 'Orthopedist'
  | 'Lab Technician'
  | 'Gynecologist'
  | 'Dentist'
  | 'ENT Specialist'
  | 'Cardiologist'
  | 'Pediatrician'
  | 'Dermatologist'
  | 'Neurologist'
  | 'Oncologist'
  | 'Psychiatrist'
  | 'General Practitioner'
  | 'Endocrinologist'
  | 'Urologist'
  | 'Ophthalmologist'
  | 'Radiologist';
