"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ChevronRight, User, Bell } from "lucide-react";
import type { User as UserProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfile } from "@/server-actions/auth";

const settingsItems = [
  { icon: User, text: "Edit Profile Information" },
  { icon: Bell, text: "Notification Settings" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await getProfile();
      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }
      setProfile(data ?? null);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  return (
    <div className="space-y-8">
      {loading || !profile ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
              <ImagePlaceholder id={profile.avatar ?? ""} />
              <AvatarFallback>{profile.first_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-muted-foreground">{profile.phone}</p>
              <p className="text-muted-foreground">
                {profile.district} | Blood Group:{" "}
                {profile.bloodGroup ?? "No blood group specified"}
              </p>
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
              {index < settingsItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
