
import type { Doctor } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { BookingModal } from '@/components/booking-modal';
import Link from 'next/link';
import { Button } from './ui/button';

type DoctorCardProps = {
  doctor: Doctor;
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/specialists/${doctor.id}`} className="block group">
      <Card className="relative overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        <div className="relative h-40 w-full">
          <ImagePlaceholder id={doctor.image} fill imageClassName="object-cover" />
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex-grow pb-12">
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            <p className="text-sm text-muted-foreground mt-1">{doctor.hospital}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-muted-foreground">({doctor.reviews})</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{doctor.location}</span>
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <BookingModal doctor={doctor} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
