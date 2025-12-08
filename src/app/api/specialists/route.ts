import { NextResponse } from 'next/server';
import { specialists } from '@/lib/chat-data';

export async function GET() {
  return NextResponse.json(specialists);
}
