import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building, Syringe, Plus } from 'lucide-react';

const connections = [
    { name: 'Nakasero Hospital', type: 'Hospital', avatar: 'CH' },
    { name: 'Ecopharm Pharmacy', type: 'Pharmacy', avatar: 'EP' },
    { name: 'The Surgery', type: 'Clinic', avatar: 'TS' },
    { name: 'Lancet Laboratories', type: 'Laboratory', avatar: 'LL' },
];

const requests = [
    { name: 'IMC Clinic', type: 'Clinic', avatar: 'IC' },
    { name: 'St. Francis Hospital Nsambya', type: 'Hospital', avatar: 'SF' },
]

export default function ConnectionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Connections</h1>
                <p className="text-muted-foreground">
                    Manage your professional network of clinics and pharmacies.
                </p>
            </div>
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Connection
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>My Network</CardTitle>
            <CardDescription>Your current professional connections.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connections.map((conn) => (
              <div key={conn.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{conn.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{conn.name}</p>
                    <p className="text-sm text-muted-foreground">{conn.type}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Requests</CardTitle>
            <CardDescription>New requests to join your network.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.map((req) => (
              <div key={req.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{req.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{req.name}</p>
                    <p className="text-sm text-muted-foreground">{req.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Decline</Button>
                    <Button size="sm">Accept</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
