import { NextResponse } from 'next/server';
import { verifiedSpecialists } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(verifiedSpecialists);
}
