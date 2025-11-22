import type {
  User,
  Doctor,
  Appointment,
  Activity,
  UserProfile,
  HealthData,
} from '@/lib/types';
import { Pill, Stethoscope, FileText, Calendar as CalendarIcon } from 'lucide-react';

export const users: User[] = [
    { id: '1', email: 'm@example.com', password: 'password123', firstName: 'Alex', lastName: 'Mukisa' }
]

export const doctors: Doctor[] = [
  { id: '1', name: 'Dr. Amina Nakigudde', specialty: 'Cardiologist', hospital: 'Nakasero Hospital', rating: 4.9, reviews: 215, image: 'doctor-1', location: 'Kampala' },
  { id: '2', name: 'Dr. Ben Muwonge', specialty: 'Pediatrician', hospital: 'Mulago Hospital', rating: 4.8, reviews: 189, image: 'doctor-2', location: 'Kampala' },
  { id: '3', name: 'Dr. Charity Atim', specialty: 'Dermatologist', hospital: 'Case Medical Centre', rating: 4.9, reviews: 150, image: 'doctor-3', location: 'Kampala' },
  { id: '4', name: 'Dr. David Okello', specialty: 'Neurologist', hospital: 'Gulu Regional Hospital', rating: 4.7, reviews: 98, image: 'doctor-4', location: 'Gulu' },
  { id: '5', name: 'Dr. Esther Nabatanzi', specialty: 'Gynecologist', hospital: 'Jinja Regional Hospital', rating: 4.9, reviews: 302, image: 'doctor-5', location: 'Jinja' },
  { id: '6', name: 'Dr. Frank Tumwebaze', specialty: 'Orthopedist', hospital: 'Mbarara Regional Hospital', rating: 4.6, reviews: 112, image: 'doctor-6', location: 'Mbarara' },
  { id: '7', name: 'Dr. Grace Lwanga', specialty: 'Oncologist', hospital: 'Uganda Cancer Institute', rating: 4.8, reviews: 134, image: 'doctor-7', location: 'Kampala' },
  { id: '8', name: 'Dr. Henry Ssenyonga', specialty: 'ENT Specialist', hospital: 'International Hospital Kampala', rating: 4.7, reviews: 105, image: 'doctor-8', location: 'Kampala' },
  { id: '9', name: 'Dr. Irene Kizza', specialty: 'Psychiatrist', hospital: 'Butabika Hospital', rating: 4.8, reviews: 201, image: 'doctor-9', location: 'Kampala' },
  { id: '10', name: 'Dr. James Otim', specialty: 'General Practitioner', hospital: 'The Surgery', rating: 4.9, reviews: 412, image: 'doctor-10', location: 'Kampala' },
  { id: '11', name: 'Dr. Ketty Wambede', specialty: 'Endocrinologist', hospital: 'Mbale Regional Hospital', rating: 4.7, reviews: 88, image: 'doctor-11', location: 'Mbale' },
  { id: '12', name: 'Dr. Lydia Nanteza', specialty: 'Dentist', hospital: 'Pan Dental Surgery', rating: 4.9, reviews: 250, image: 'doctor-12', location: 'Kampala' },
  { id: '13', name: 'Dr. Moses Byaruhanga', specialty: 'Urologist', hospital: 'Mengo Hospital', rating: 4.7, reviews: 94, image: 'doctor-13', location: 'Kampala' },
  { id: '14', name: 'Dr. Norah Mirembe', specialty: 'Ophthalmologist', hospital: 'Ruharo Eye Centre', rating: 4.8, reviews: 120, image: 'doctor-14', location: 'Mbarara' },
  { id: '15', name: 'Dr. Peter Mugisha', specialty: 'Radiologist', hospital: 'St. Francis Hospital Nsambya', rating: 4.6, reviews: 78, image: 'doctor-15', location: 'Kampala' },
  { id: '16', name: 'Dr. Rachel Namubiru', specialty: 'General Practitioner', hospital: 'IMC Clinic, Wandegeya', rating: 4.8, reviews: 350, image: 'doctor-16', location: 'Kampala' },
  { id: '17', name: 'Dr. Sam Kiwanuka', specialty: 'Pediatrician', hospital: 'Victoria Medical Centre', rating: 4.9, reviews: 195, image: 'doctor-17', location: 'Jinja' },
  { id: '18', name: 'Dr. Tendo Nagenda', specialty: 'Dermatologist', hospital: 'SAS Clinic', rating: 4.8, reviews: 130, image: 'doctor-18', location: 'Kampala' },
  { id: '19', name: 'Dr. Victoria Achen', specialty: 'Gynecologist', hospital: 'St. Mary\'s Hospital Lacor', rating: 4.9, reviews: 280, image: 'doctor-19', location: 'Gulu' },
  { id: '20', name: 'Dr. William Kato', specialty: 'Cardiologist', hospital: 'Uganda Heart Institute', rating: 4.9, reviews: 220, image: 'doctor-20', location: 'Kampala' },
];

export const appointments: Appointment[] = [
  { id: '1', doctor: doctors[4], date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), time: '10:00 AM', status: 'upcoming' },
  { id: '2', doctor: doctors[2], date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), time: '02:30 PM', status: 'upcoming' },
  { id: '3', doctor: doctors[0], date: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(), time: '09:00 AM', status: 'past' },
  { id: '4', doctor: doctors[9], date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(), time: '11:00 AM', status: 'past' },
  { id: '5', doctor: doctors[6], date: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString(), time: '03:00 PM', status: 'past' },
];

export const recentActivities: Activity[] = [
  { id: '1', title: 'Appointment Booked', description: `With ${doctors[4].name}`, time: '2 days ago', icon: CalendarIcon },
  { id: '2', title: 'Prescription Uploaded', description: 'For Malaria medication', time: '5 days ago', icon: FileText },
  { id: '3', title: 'New Specialist Found', description: `${doctors[0].name} - Cardiologist`, time: '1 week ago', icon: Stethoscope },
  { id: '4', title: 'Medicine Ordered', description: 'Painkillers and vitamins', time: '2 weeks ago', icon: Pill },
];

export const userProfile: UserProfile = {
  name: 'Alex Mukisa',
  phone: '+256 772 123456',
  district: 'Kampala',
  bloodGroup: 'O+',
  avatar: 'user-avatar'
};

const today = new Date();
export const healthData: HealthData = {
  period: [
    { date: new Date(today.getFullYear(), today.getMonth(), 2) },
    { date: new Date(today.getFullYear(), today.getMonth(), 3) },
    { date: new Date(today.getFullYear(), today.getMonth(), 4) },
    { date: new Date(today.getFullYear(), today.getMonth(), 5) },
    { date: new Date(today.getFullYear(), today.getMonth() -1, 4) },
    { date: new Date(today.getFullYear(), today.getMonth() -1, 5) },
    { date: new Date(today.getFullYear(), today.getMonth() -1, 6) },
    { date: new Date(today.getFullYear(), today.getMonth() -1, 7) },
  ],
  temperature: [
    { date: '2023-10-01', temperature: 36.8 },
    { date: '2023-10-02', temperature: 36.9 },
    { date: '2023-10-03', temperature: 37.0 },
    { date: '2023-10-04', temperature: 36.8 },
    { date: '2023-10-05', temperature: 37.1 },
    { date: '2023-10-06', temperature: 36.9 },
    { date: '2023-10-07', temperature: 37.2 },
  ],
  bloodSugar: [
    { date: '2023-10-01', level: 95 },
    { date: '2023-10-02', level: 102 },
    { date: '2023-10-03', level: 98 },
    { date: '2023-10-04', level: 110 },
    { date: '2023-10-05', level: 105 },
    { date: '2023-10-06', level: 99 },
    { date: '2023-10-07', level: 108 },
  ]
};
