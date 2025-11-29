import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AdminPartnersPage() {
  const partners = [
    { name: 'Nakasero Hospital', type: 'Hospital' },
    { name: 'Ecopharm Pharmacy', type: 'Pharmacy' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Partners</h1>
          <p className="text-muted-foreground">
            Add, view, and manage all healthcare partners on the platform.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Partner
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Partners</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-semibold">{partner.name}</p>
                <p className="text-sm text-muted-foreground">{partner.type}</p>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
