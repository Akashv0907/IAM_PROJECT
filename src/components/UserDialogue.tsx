'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CreateUserDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-pink-500 hover:bg-pink-600">
          Create user
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded">
                Development
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setOpen(false)}
              className="h-6 w-6 p-0"
            >
              {/* <X className="h-4 w-4" /> */}
            </Button>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com"
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              className="w-full"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="organization">Organization</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="org1">Organization 1</SelectItem>
                <SelectItem value="org2">Organization 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ignore-policies" />
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
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline"
            className="w-full sm:w-auto text-gray-500"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
