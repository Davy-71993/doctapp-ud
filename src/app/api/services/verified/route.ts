import { NextResponse, NextRequest } from 'next/server';
import { verifiedServices, verifiedAmbulance, verifiedEmergencies } from '@/lib/mock-services-data';
import { specialistServices } from '@/lib/mock-data';

const homeBasedCare = [
    { id: 'vhc1', name: 'Pro-Care Health Services', category: 'Home-Based Care', description: 'Personalized home nursing and therapy.' }
];

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    
    let allVerified = [...verifiedServices, ...verifiedAmbulance, ...verifiedEmergencies, ...homeBasedCare];

    if (category) {
        if (category === 'Home-Based Care') {
            return NextResponse.json(homeBasedCare);
        }
        allVerified = allVerified.filter(s => s.category === category);
    }
    
    return NextResponse.json(allVerified);
}
