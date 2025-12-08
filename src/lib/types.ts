
import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'specialist' | 'admin';
  dateJoined: string;
};

export type DoctorComment = {
    id: string;
    author: string;
    avatar: string;
    date: string;
    comment: string;
    rating: number;
}

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  comments?: DoctorComment[];
};

export type Appointment = {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  status: 'upcoming' | 'past' | 'cancelled';
  reason?: string;
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
    vitals?: {
        bloodPressure: string;
        bloodSugar: string;
        temperature: string;
    }
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

export type Service = {
    id: string;
    name: string;
    category: string;
    description?: string;
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

export type Facility = {
    id: string;
    name: string;
    type: 'Hospital' | 'Clinic' | 'Pharmacy' | 'Drug Shop' | 'Home-Based Care';
    specialistId: string; // The ID of the specialist in charge
    documents?: string[];
    location?: string;
    services: SpecialistService[];
};

export type TimeBlock = {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  type: 'appointment' | 'unavailable';
};

export type Medicine = {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
};

export type Prescription = {
    id: string;
    patient: Patient;
    date: Date;
    medicines: Medicine[];
};
