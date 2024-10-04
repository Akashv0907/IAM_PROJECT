"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function OrganizationsPage() {
  const [orgName, setOrgName] = useState('');
  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreateOrganization = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validate the form
    if (!orgName || !owner) {
      setError("Organization name and owner are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/create_tenant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizations_name: orgName,
          owner,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setOrgName('');
        setOwner('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create organization.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <nav className="border-b mb-6">
        <ul className="flex flex-wrap space-x-4 sm:space-x-6">
          <li className="pb-2 border-b-2 border-black">
            <a href="#" className="text-black font-medium">Organizations</a>
          </li>
        </ul>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Organizations</h1>
        <p className="text-gray-600">View and manage organizations</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-4 flex-1 w-full max-w-xl">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search" className="pl-8 w-full" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by: Created at" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created">Created at</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="members">Members</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pink-500 hover:bg-pink-600 w-full sm:w-auto">
              Create organization
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full" aria-describedby="organization-description">
            <DialogHeader>
              <DialogTitle>Create organization</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">Organization created successfully!</p>}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner">Owner</Label>
                <Select onValueChange={setOwner}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">User 1</SelectItem>
                    <SelectItem value="user2">User 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <DialogTrigger asChild>
                <Button variant="outline" className="text-gray-500 w-full sm:w-auto">Cancel</Button>
              </DialogTrigger>
              <Button onClick={handleCreateOrganization} className="bg-pink-500 hover:bg-pink-600 w-full sm:w-auto" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-2 sm:grid-cols-4 p-4 border-b text-sm font-medium text-gray-500">
          <div>Organization</div>
          <div>ID</div>
          <div className="hidden sm:block">Members</div>
          <div className="flex items-center">
            Created <ChevronDown className="ml-1 h-4 w-4" />
          </div>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-gray-500" />
          </div>
          <h2 className="text-lg mb-1 font-medium text-gray-900">No results found</h2>
          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      </div>
    </div>
  );
}
