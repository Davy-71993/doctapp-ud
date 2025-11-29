import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function VerificationPage() {
  const pendingSpecialists = [
    { id: '1', name: 'Dr. Ben Muwonge', specialty: 'Pediatrician' },
    { id: '2', name: 'Dr. Charity Atim', specialty: 'Dermatologist' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Specialist Verification</h1>
        <p className="text-muted-foreground">
          Review and approve new specialist accounts.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>These specialists are waiting for verification.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingSpecialists.map(specialist => (
            <div key={specialist.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-semibold">{specialist.name}</p>
                <p className="text-sm text-muted-foreground">{specialist.specialty}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Reject</Button>
                <Button>Approve</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
