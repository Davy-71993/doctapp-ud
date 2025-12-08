import { NextResponse } from 'next/server';
import { pendingHospitals, pendingClinics, pendingPharmacies, pendingDrugShops } from '@/lib/mock-service-providers-data';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    let data = [...pendingHospitals, ...pendingClinics, ...pendingPharmacies, ...pendingDrugShops];

    if (type) {
        data = data.filter(facility => facility.type === type);
    }
    
    return NextResponse.json(data);
}
