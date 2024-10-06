'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { CreateUserDialog } from '@/components/UserDialogue';

// Define the User type
interface User {
  id: string; // Changed to string since it's UUID
  username: string;
  email_id: string; // Changed to match your database column
  organizations_name: string; // Changed to match your database column
  created_on: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users); // Adjust this based on your API response structure
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users initially when the component mounts
  }, []);

  return (
    <div className="p-4 sm:p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Users</h1>
        <p className="text-gray-600">View and manage users</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <ul className="flex flex-wrap space-x-4 sm:space-x-6 border-b border-gray-300 pb-2">
          <li className="pb-2 border-b-2 text-indigo-600 hover:bg-indigo-700">
            <Link href="#" className="text-indigo-600 font-medium">All</Link>
          </li>
          <li className="pb-2">
            <Link href="#" className="text-gray-500 hover:text-gray-700">Invitations</Link>
          </li>
        </ul>
      </div>

      {/* Search and Sort Options */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4 sm:gap-0">
        <div className="flex gap-4 flex-1 w-full sm:max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              className="pl-8 w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
        </div>
        <CreateUserDialog fetchUsers={fetchUsers} />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg border border-gray-300 mt-6 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-4 p-4 border-b text-sm font-medium text-gray-500">
          <div>User</div>
          <div>Role</div>
          <div>Organization</div>
          <div>Created</div>
        </div>

        {/* User Rows */}
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-800">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email_id}</div>
                  </div>
                </div>
                <div className="text-gray-600 text-center sm:text-left">{user.role}</div>
                <div className="text-gray-600 text-center sm:text-left">{user.organizations_name}</div>
                <div className="text-gray-600 text-center sm:text-left">{user.created_on}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-600">No users found.</div>
        )}
      </div>
    </div>
  );
}
