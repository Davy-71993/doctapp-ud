import { NextResponse } from 'next/server';
import { appointments } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(appointments);
}
