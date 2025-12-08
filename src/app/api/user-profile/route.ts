import { NextResponse } from 'next/server';
import { userProfile } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(userProfile);
}
