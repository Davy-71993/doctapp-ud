"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ChevronRight, User, Bell, Folder } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getProfile } from "@/server-actions/auth";
import Link from "next/link";
import { useAppStore } from "@/lib/store";

const settingsItems = [
  { icon: User, text: "Edit Profile Information", url: "" },
  { icon: Bell, text: "Notification Settings", url: "" },
  {
    icon: Folder,
    text: "View or upload documents",
    url: "/specialist/profile/documents",
  },
];

const Status = ({ verified }: { verified?: boolean }) => {
  if (verified) {
    return (
      <div className="bg-green-100 text-green-600 px-5 py-2 rounded-full">
        Verified
      </div>
    );
  }
  return (
    <div className="bg-red-100 text-red-600 px-5 py-2 rounded-full">
      Not verified
    </div>
  );
};

export default function ProfilePage() {
  const { profile, setProfile } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (profile) {
        setLoading(false);
        return;
      }
      const { data, error } = await getProfile();
      if (error) {
        setLoading(false);
        return;
      }
      setProfile(data ?? null);
      setLoading(false);
    }
    fetchProfile();
  }, [profile]);

  return (
    <div className="space-y-8">
      {loading || !profile ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-center sm:justify-normal items-center gap-4">
            <Avatar className="h-20 w-20">
              <ImagePlaceholder id={profile.avatar ?? ""} />
              <AvatarFallback>{profile.first_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full text-center sm:text-left">
              <h2 className="text-2xl font-semibold">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-muted-foreground">{profile.phone}</p>
              <p className="text-muted-foreground">
                {profile.doctor?.specialty} |{" "}
                {profile.doctor?.location ?? "No location specified"}
              </p>
            </div>
            <div className="w-60 mx-auto flex justify-center sm:justify-end items-center">
              <Status verified={profile.doctor?.verified} />
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
            <Link key={item.text} href={item.url}>
              <Button variant="ghost" className="w-full justify-between h-14">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-base font-medium">{item.text}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Button>
              {index < settingsItems.length - 1 && <Separator />}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
