import { NextResponse } from 'next/server';
import { recentActivities } from '@/lib/mock-data';
import { Stethoscope, Calendar as CalendarIcon, Pill, FileText } from 'lucide-react';

// We need to handle the fact that icons are components and can't be serialized.
// So we map them to strings and the frontend will map them back.
const iconMap: { [key: string]: any } = {
    Stethoscope: Stethoscope,
    CalendarIcon: CalendarIcon,
    Pill: Pill,
    FileText: FileText
};

export async function GET() {
  const activitiesWithIconNames = recentActivities.map(activity => {
    // Find the icon name from the map
    const iconName = Object.keys(iconMap).find(key => iconMap[key] === activity.icon);
    return { ...activity, icon: iconName || 'Stethoscope' }; // Default to Stethoscope if not found
  });
  return NextResponse.json(activitiesWithIconNames);
}
