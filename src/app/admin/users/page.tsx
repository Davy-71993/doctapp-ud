
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const roleColors: { [key: string]: string } = {
    patient: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    specialist: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">
            View and manage all registered users on the platform.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>All Users</CardTitle>
                 <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name, email, or role..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
          <CardDescription>A comprehensive list of all users.</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="space-y-2">
                    {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
            ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={cn("capitalize", roleColors[user.role])}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(parseISO(user.dateJoined), 'MMMM dd, yyyy')}
                  </TableCell>
                   <TableCell className="text-right">
                    <a href="#" className="text-primary hover:underline">
                      View
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
