import { NextResponse } from 'next/server';
import { mockPatientComplaints, mockSpecialistComplaints } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const type = params.type;

  if (type === 'patient') {
    return NextResponse.json(mockPatientComplaints);
  }

  if (type === 'specialist') {
    return NextResponse.json(mockSpecialistComplaints);
  }

  return NextResponse.json({ error: 'Invalid complaint type' }, { status: 400 });
}
