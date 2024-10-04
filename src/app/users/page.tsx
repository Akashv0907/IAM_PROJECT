'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from 'lucide-react';
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

export default function UsersPage() {
  return (
    <div className="p-4 sm:p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-1">Users</h1>
        <p className="text-gray-600">View and manage users</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <ul className="flex flex-wrap space-x-4 sm:space-x-6 border-b">
          <li className="pb-2 border-b-2 border-black">
            <Link href="#" className="text-black font-medium">All</Link>
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
              className="pl-8 w-full"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by: Joined" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="joined">Joined</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="last-signed-in">Last signed in</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CreateUserDialog />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg border mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 p-4 border-b text-sm font-medium text-gray-500">
          <div>User</div>
          <div className="hidden sm:block">Last signed in</div>
          <div className="flex items-center">
            Joined <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>

        {/* User Row */}
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=AkashV" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Akash V</div>
                <div className="text-sm text-gray-500">akashv0907@gmail.com</div>
              </div>
            </div>
            <div className="text-gray-600 hidden sm:block">Today at 3:49 PM</div>
            <div className="text-gray-600">Today at 3:49 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
