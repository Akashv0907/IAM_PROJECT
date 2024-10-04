"use client";

import React, { useEffect, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
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

// Define the Organization type
interface Organization {
  id: string;
  organizations_name: string;
  owner: string;
  created_on: string; // Assuming the date is returned as a string
}

export default function OrganizationsPage() {
  const [orgName, setOrgName] = useState('');
  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]); // Explicitly typed state

  // Fetch organizations when the component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_tenants');
        if (response.ok) {
          const data = await response.json();
          setOrganizations(data.tenants); // Update organizations state
        } else {
          setError('Failed to fetch organizations.');
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setError('An error occurred while fetching organizations.');
      }
    };

    fetchOrganizations();
  }, []); // Empty dependency array to run once on mount

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
        const newOrganization: Organization = await response.json(); // Specify the type of the new organization
        setOrganizations(prev => [...prev, newOrganization]); // Add the new organization to the list
        setSuccess(true);
        setOrgName('');
        setOwner('');

        // Redirect and refresh the page after a successful creation
        setTimeout(() => {
          window.location.reload(); // This will refresh the page
        }, 1000); // You can adjust the delay as needed
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to create organization.');
      }
    } catch (err) {
      console.error("Error during fetch:", err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <nav className="border-b mb-6 shadow-lg">
        <ul className="flex flex-wrap space-x-4 sm:space-x-6">
          <li className="pb-2 border-b-2 border-indigo-600">
            <a href="#" className="text-indigo-600 font-semibold">Organizations</a>
          </li>
        </ul>
      </nav>

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 text-indigo-700">Organizations</h1>
        <p className="text-gray-700">Manage your organizations efficiently</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-4 flex-1 w-full max-w-xl">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search organizations..." className="pl-8 w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500" />
          </div> 
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto rounded-lg shadow">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full bg-white rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {error && <p className="text-red-600">{error}</p>}
              {success && <p className="text-green-600">Organization created successfully!</p>}
              <div className="grid gap-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input id="name" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="rounded-lg border border-gray-300" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Enter owner's name" className="rounded-lg border border-gray-300" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <DialogTrigger asChild>
                <Button variant="outline" className="text-gray-500 w-full sm:w-auto border border-gray-300 rounded-lg">Cancel</Button>
              </DialogTrigger>
              <Button onClick={handleCreateOrganization} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto rounded-lg" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg border shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 p-4 border-b text-sm font-semibold text-gray-700 bg-gray-200">
          <div>Organization</div>
          <div>ID</div>
          <div className="hidden sm:block">Owner</div>
          <div className="flex items-center">
            Created <ChevronDown className="ml-1 h-4 w-4 text-gray-600" />
          </div>
        </div>
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <div key={org.id} className="grid grid-cols-2 sm:grid-cols-4 p-4 border-b text-gray-800 hover:bg-gray-100 transition duration-150 ease-in-out">
              <div>{org.organizations_name}</div>
              <div>{org.id}</div>
              <div className="hidden sm:block">{org.owner}</div>
              <div>{org.created_on}</div>
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
