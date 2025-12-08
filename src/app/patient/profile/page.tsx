
"use client";

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { ChevronRight, User, Bell } from 'lucide-react';
import type { Patient } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase';


const settingsItems = [
  { icon: User, text: 'Edit Profile Information' },
  { icon: Bell, text: 'Notification Settings' },
];

export default function ProfilePage() {
    const { userProfile, loading } = useUser();
    const typedProfile = userProfile as Patient | null;

  return (
    <div className="space-y-8">
      {loading || !typedProfile ? (
        <Skeleton className="h-32 w-full" />
      ) : (
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <ImagePlaceholder id={typedProfile.avatar} />
            <AvatarFallback>{typedProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{typedProfile.name}</h2>
            <p className="text-muted-foreground">{typedProfile.phone}</p>
            <p className="text-muted-foreground">{typedProfile.district} | Blood Group: {typedProfile.bloodGroup}</p>
          </div>
        </CardHeader>
      </Card>
      )}
      
      <Card>
        <CardHeader>
            <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {settingsItems.map((item, index) => (
            <div key={item.text}>
              <Button variant="ghost" className="w-full justify-between h-14">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-base font-medium">{item.text}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Button>
              {index < settingsItems.length -1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
