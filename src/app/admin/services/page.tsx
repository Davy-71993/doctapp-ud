import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AdminServicesPage() {
  const services = [
    { name: 'ECG Test', category: 'Cardiology' },
    { name: 'Dental Cleaning', category: 'Dentistry' },
  ];

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Services</h1>
          <p className="text-muted-foreground">
            Add, view, and manage all offered services on the platform.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-semibold">{service.name}</p>
                <p className="text-sm text-muted-foreground">{service.category}</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
