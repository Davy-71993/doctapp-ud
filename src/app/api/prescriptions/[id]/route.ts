import { NextResponse } from 'next/server';
import { mockPrescriptions } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prescription = mockPrescriptions.find(p => p.id === params.id);
  if (prescription) {
    return NextResponse.json(prescription);
  }
  return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
}
