import { NextResponse } from 'next/server';
import { mockPrescriptions } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(mockPrescriptions);
}
