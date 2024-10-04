"use client";

import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Define the Role type
interface Role {
  id: string;
  roles_name: string;
  owner: string;
  created_on: string;
}

export default function RolesAndPermissionsPage() {
  const [roleName, setRoleName] = useState('');
  const [roleKey, setRoleKey] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  const handleCreateRole = () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validate the form
    if (!roleName || !roleKey) {
      setError("Role name and key are required.");
      setLoading(false);
      return;
    }

    // Simulate role creation
    const newRole: Role = {
      id: Date.now().toString(),
      roles_name: roleName,
      owner: roleKey,
      created_on: new Date().toLocaleString(),
    };

    setRoles(prev => [...prev, newRole]);
    setSuccess(true);
    setRoleName('');
    setRoleKey('');
    setDescription('');

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <nav className="border-b mb-6 shadow-lg">
        <ul className="flex flex-wrap space-x-4 sm:space-x-6">
          <li className="pb-2 border-b-2 border-indigo-600">
            <a href="#" className="text-indigo-600 font-semibold">Roles and Permissions</a>
          </li>
        </ul>
      </nav>

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-indigo-700">Roles and Permissions</h1>
        <p className="text-gray-700">Manage your roles and permissions efficiently</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-4 flex-1 w-full max-w-xl">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search roles..." className="pl-8 w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500" />
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto rounded-lg shadow">Create Role</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="flex justify-between items-center">
              <div>
                <DialogTitle className="text-xl font-semibold">Create new role</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">Create a custom role which can be assigned to your organization members.</p>
              </div>
              <DialogTrigger asChild>
                <Button variant="ghost" className="h-6 w-6 p-0">
                  {/* <X className="h-4 w-4" /> */}
                </Button>
              </DialogTrigger>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Database access"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="key">Key</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    org:
                  </span>
                  <Input
                    id="key"
                    placeholder="marketing_admin"
                    value={roleKey}
                    onChange={(e) => setRoleKey(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="e.g. A user who is allowed to access all marketing assets"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Select>
                  <SelectTrigger id="permissions">
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="write">Write</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateRole} className="bg-purple-600 hover:bg-purple-700 text-white">
                Create role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg border shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 p-4 border-b text-sm font-semibold text-gray-700 bg-gray-200">
          <div>Role</div>
          <div>ID</div>
          <div className="hidden sm:block">Owner</div>
          <div className="flex items-center">
            Created <ChevronDown className="ml-1 h-4 w-4 text-gray-600" />
          </div>
        </div>
        {roles.length > 0 ? (
          roles.map((role) => (
            <div key={role.id} className="grid grid-cols-2 sm:grid-cols-4 p-4 border-b text-gray-800 hover:bg-gray-100 transition duration-150 ease-in-out">
              <div>{role.roles_name}</div>
              <div>{role.id}</div>
              <div className="hidden sm:block">{role.owner}</div>
              <div>{role.created_on}</div>
            </div>
          ))
        ) : (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-gray-600" />
            </div>
            <h2 className="text-lg mb-1 font-medium text-gray-900">No results found</h2>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}