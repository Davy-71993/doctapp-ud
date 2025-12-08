import { NextResponse } from 'next/server';
import { patients } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patient = patients.find(p => p.id === params.id);
  if (patient) {
    return NextResponse.json(patient);
  }
  return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
}
