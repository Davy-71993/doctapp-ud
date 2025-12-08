import { NextResponse, NextRequest } from 'next/server';
import { pendingServices, pendingAmbulance, pendingEmergencies } from '@/lib/mock-services-data';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    let allPending = [...pendingServices, ...pendingAmbulance, ...pendingEmergencies];

    if (category) {
        allPending = allPending.filter(s => s.category === category);
    }

    return NextResponse.json(allPending);
}
