import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { userProfile } from '@/lib/mock-data';
import { ImagePlaceholder } from '@/components/image-placeholder';
import { ChevronRight, User, Bell, LogOut, Moon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const settingsItems = [
  { icon: User, text: 'Edit Profile' },
  { icon: Bell, text: 'Notifications' },
  { icon: LogOut, text: 'Sign Out' },
];

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and settings.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <ImagePlaceholder id={userProfile.avatar} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
            <p className="text-muted-foreground">{userProfile.phone}</p>
            <p className="text-muted-foreground">{userProfile.district} | Blood Group: {userProfile.bloodGroup}</p>
          </div>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-base font-medium">Dark Mode</span>
                </div>
                <ThemeToggle />
            </div>
            <Separator className="my-4" />
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
