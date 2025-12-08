import { NextResponse } from 'next/server';
import { doctors } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const doctor = doctors.find(d => d.id === params.id);
  if (doctor) {
    return NextResponse.json(doctor);
  }
  return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
}
