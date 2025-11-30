
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DoctorCard } from '@/components/doctor-card';
import { doctors } from '@/lib/mock-data';
import type { Doctor } from '@/lib/types';
import { Search as SearchIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const specialties = [
    "Medical Officer",
    "Pharmacist",
    "Midwife",
    "Orthopedist",
    "Lab Technician",
    "Gynecologist",
    "Dentist",
    "ENT Specialist",
    "Cardiologist",
    "Pediatrician",
    "Dermatologist",
    "Neurologist",
    "Oncologist",
    "Psychiatrist",
    "General Practitioner",
    "Endocrinologist",
    "Urologist",
    "Ophthalmologist",
    "Radiologist",
];
const locations = ['Kampala', 'Wakiso', 'Gulu', 'Jinja', 'Mbale', 'Mbarara'];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [location, setLocation] = useState('all');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  const handleFilterChange = () => {
    let result = doctors;

    if (searchTerm) {
      result = result.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (specialty !== 'all') {
      result = result.filter(d => d.specialty === specialty);
    }

    if (location !== 'all') {
      result = result.filter(d => d.location === location);
    }

    setFilteredDoctors(result);
  };
  
  // A simple debounce
  let timeoutId: NodeJS.Timeout;
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        handleFilterChange();
    }, 300)
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find a Specialist</h1>
        <p className="text-muted-foreground">
          Search for specialists in your area.
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-2 md:flex gap-4">
          <Select onValueChange={(val) => { setSpecialty(val); handleFilterChange(); }} defaultValue="all">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {[...new Set(specialties)].sort().map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(val) => { setLocation(val); handleFilterChange(); }} defaultValue="all">
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(l => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)
        ) : (
          <p>No specialists found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
