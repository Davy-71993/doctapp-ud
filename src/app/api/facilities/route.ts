import { NextResponse } from 'next/server';
import { allFacilities } from '@/lib/mock-service-providers-data';

export async function GET() {
  return NextResponse.json(allFacilities);
}
