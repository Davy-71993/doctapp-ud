
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import {
    serviceCategories
} from '@/lib/mock-services-data';

export default function AdminServicesPage() {
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

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map(category => (
            <Link href={category.href} key={category.name}>
                <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg flex flex-col justify-between">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted">
                                <category.icon className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                </Card>
            </Link>
        ))}
       </div>
    </div>
  );
}
