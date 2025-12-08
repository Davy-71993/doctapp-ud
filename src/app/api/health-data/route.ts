import { NextResponse } from 'next/server';
import { healthData } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(healthData);
}
