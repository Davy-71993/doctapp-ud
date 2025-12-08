import { NextResponse } from 'next/server';
import { messages } from '@/lib/chat-data';

export async function GET() {
  return NextResponse.json(messages);
}
