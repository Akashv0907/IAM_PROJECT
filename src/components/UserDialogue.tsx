'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the Organization type for organization names
interface Organization {
  name: string; // organization name only
}

export function CreateUserDialog({ fetchUsers }: { fetchUsers: () => void }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [ignorePolicies, setIgnorePolicies] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]); // Array of organizations

  // Fetch organizations from the API
  const fetchOrganizations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_organizations');
      if (!response.ok) {
        throw new Error('Failed to fetch organizations');
      }
      const data = await response.json();
      setOrganizations(data.organizations.map((name: string) => ({ name }))); // Create objects with name field
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchOrganizations(); // Fetch organizations when the dialog opens
    }
  }, [open]);

  const handleCreateUser = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    const userData = {
      username,
      email_id: email,
      user_password: password,
      organizations_name: organization,
      ignore_policies: ignorePolicies,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating user');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      setOrganization('');
      setIgnorePolicies(false);
      setOpen(false);
      fetchUsers();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px] bg-white shadow-lg rounded-lg p-6">
        <DialogHeader>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Create New User</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setOpen(false)}
              className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-200"
            >
              {/* Close icon can be added here */}
            </Button>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="Enter username"
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com"
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="organization">Organization</Label>
            <Select value={organization || "default"} onValueChange={setOrganization}>
              <SelectTrigger className="w-full border border-gray-300 shadow-sm rounded-lg p-2">
                <SelectValue placeholder="Select an organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.length === 0 ? (
                  <SelectItem value="no-orgs" disabled>No organizations available</SelectItem>
                ) : (
                  organizations.map((org) => (
                    <SelectItem key={org.name} value={org.name}>
                      {org.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ignore-policies" 
              checked={ignorePolicies} 
              onChange={(e) => setIgnorePolicies((e.target as HTMLInputElement).checked)} 
            />
            <Label 
              htmlFor="ignore-policies" 
              className="text-sm text-gray-500 leading-none"
            >
              Ignore password policies
            </Label>
          </div>
          <div className="text-sm text-gray-500">
            If checked, password policies will not be enforced on this password.
          </div>
        </div>
        {errorMessage && (
          <div className="text-red-600 mt-2">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-600 mt-2">{successMessage}</div>
        )}
        <div className="flex justify-end gap-4 mt-4">
          <Button 
            variant="outline"
            className="w-full sm:w-auto text-gray-500 border border-gray-300 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleCreateUser}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
