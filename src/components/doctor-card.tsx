
import type { Doctor } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { BookingModal } from '@/components/booking-modal';
import Link from 'next/link';

type DoctorCardProps = {
  doctor: Doctor;
};

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/specialists/${doctor.id}`} className="block">
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
        <div className="relative h-40 w-full">
          <ImagePlaceholder id={doctor.image} fill imageClassName="object-cover" />
        </div>
        <CardContent className="p-4 flex flex-col">
          <div className="flex-grow">
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
