"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { register } from "@/server-actions/auth";

export default function RegisterPage() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPAssword] = useState("");
  const [role, setRole] = useState<"patient" | "specialist">();
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error.",
        description:
          "The two passwords didn't mutch. Please check and try again.",
        variant: "destructive",
      });

      return;
    }

    setLoading(true);
    // Registration logic
    const { data, error } = await register({
      firstName,
      lastName,
      email,
      password,
      role: role as "patient" | "specialist",
      gender,
      dob,
      phone,
      district,
    });

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const userRole = data?.role;
    if (!userRole || !["admin", "specialist", "patient"].includes(userRole)) {
      toast({
        title: "Error:",
        description: `Unsupported role, ${userRole}.`,
        variant: "destructive",
      });
      return;
    }
    setLoading(false);
    redirect(`/${userRole}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background py-5">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Alex"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
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
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPAssword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex gap-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={setGender}
                    value={gender}
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
                  <Label htmlFor="role">Role</Label>
                  <Select
                    onValueChange={(e) =>
                      setRole(e as "patient" | "specialist")
                    }
                    value={role}
                    disabled={loading}
                  >
                    <SelectTrigger
                      id="role"
                      className="ring-0 active:ring-0 focus:ring-0"
                    >
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="specialist">Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid gap-2 w-full">
                  <Label htmlFor="dob">Date of birth</Label>
                  <Input
                    type="date"
                    id="dob"
                    value={dob ?? ""}
                    placeholder="Select your date of birth"
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-2 w-full">
                  <Label htmlFor="district">district</Label>
                  <Input
                    id="district"
                    placeholder="Your district"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                    }}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Create an account"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
