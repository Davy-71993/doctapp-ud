import { NextResponse } from 'next/server';
import { pendingSpecialists } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(pendingSpecialists);
}
