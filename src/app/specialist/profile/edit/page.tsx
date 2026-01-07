"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { User } from "@/lib/types";
import { editProfile, getProfile } from "@/server-actions/auth";
import { changeSpecialty } from "@/server-actions/fetch";
import React, { FormEvent, useEffect, useState } from "react";

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getProfile();
      setProfile(data ?? null);
      setSpecialty(data?.doctor?.specialty ?? "");
      setFetching(false);
    };
    fetch();
  }, []);

  const handEdit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!profile) {
      toast({
        title: "Error.",
        description: "Failed to load initial profile.",
        variant: "destructive",
      });

      setLoading(false);
      return;
    }

    const { first_name, last_name, gender, dob, district, id } = profile;

    if (specialty) {
      const { error: e } = await changeSpecialty(specialty, id);
      if (e) {
        console.log(e);
        toast({
          title: "Error.",
          description: "Failed to update your specialty.",
          variant: "destructive",
        });
      }
    }

    const { error } = await editProfile({
      first_name,
      last_name,
      gender,
      dob,
      district,
      id,
    } as User);
    if (error) {
      console.log(error);
      toast({
        title: "Error.",
        description: "Failed to update profile.",
        variant: "destructive",
      });

      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center h-fit bg-background py-5">
      <Card className="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Edit your profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handEdit}>
            <div className="grid gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Alex"
                    value={profile?.first_name ?? ""}
                    onChange={(e) => {
                      setProfile({
                        ...(profile ?? ({} as User)),
                        first_name: e.target.value,
                      });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Mukisa"
                    value={profile?.last_name ?? ""}
                    onChange={(e) => {
                      setProfile({
                        ...(profile ?? ({} as User)),
                        last_name: e.target.value,
                      });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(e) =>
                      setProfile({
                        ...(profile ?? ({} as User)),
                        gender: e as "female" | "male",
                      })
                    }
                    value={profile?.gender ?? ""}
                    disabled={loading}
                  >
                    <SelectTrigger
                      id="gender"
                      className="ring-0 active:ring-0 focus:ring-0"
                    >
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="specialty">Specailty</Label>
                  <Input
                    id="specialty"
                    placeholder="Your medical specialty"
                    value={specialty ?? ""}
                    onChange={(e) => {
                      setSpecialty(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input
                    type="date"
                    id="dob"
                    placeholder="Select your date of birth"
                    value={profile?.dob ?? ""}
                    onChange={(e) => {
                      setProfile({
                        ...(profile ?? ({} as User)),
                        dob: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="district">district</Label>
                  <Input
                    id="district"
                    placeholder="Your district"
                    value={profile?.district ?? ""}
                    onChange={(e) => {
                      setProfile({
                        ...(profile ?? ({} as User)),
                        district: e.target.value,
                      });
                    }}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
