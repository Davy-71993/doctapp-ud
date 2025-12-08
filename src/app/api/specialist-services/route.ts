import { NextResponse } from 'next/server';
import { specialistServices } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(specialistServices);
}
