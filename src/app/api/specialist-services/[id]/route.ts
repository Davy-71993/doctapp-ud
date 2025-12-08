import { NextResponse } from 'next/server';
import { specialistServices } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const service = specialistServices.find(s => s.id === params.id);
  if (service) {
    return NextResponse.json(service);
  }
  return NextResponse.json({ error: 'Service not found' }, { status: 404 });
}
