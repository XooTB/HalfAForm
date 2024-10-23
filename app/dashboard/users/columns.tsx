"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/type/user";
import { Circle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUsers from "@/hooks/useUsers";
import { table } from "console";
import { useState } from "react";

export const columns: ColumnDef<User>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.original.role;
      return <Badge variant="outline">{role}</Badge>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant="secondary" className="gap-1 items-center">
          <Circle
            size={10}
            fill={status === "active" ? "#00C012" : "red"}
            stroke="0"
          />
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row, table }) => {
      const user = row.original;
      const { updateUser, deleteUser } = useUsers();
      const [isUpdating, setIsUpdating] = useState(false);
      const [open, setOpen] = useState(false);

      const handleUpdateUser = async (updatedUser: User) => {
        setIsUpdating(true);
        try {
          const result = await updateUser(updatedUser);
          // Update the table data
          // @ts-ignore
          table.options.meta?.updateData?.(result);
        } catch (error) {
          console.error("Failed to update user:", error);
        } finally {
          setIsUpdating(false);
        }
      };

      const handleChange = (key: string, value: string) => {
        const updatedUser = { ...user, [key]: value };
        handleUpdateUser(updatedUser);
      };

      const handleDelete = async () => {
        const deletedUser = await deleteUser(user.id);
        // @ts-ignore
        table.options.meta?.deleteData?.(deletedUser);
        setOpen(false);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"ghost"} className="w-full justify-start">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                  <DialogDescription>
                    Edit the user role and status
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <div className="flex gap-5 justify-between">
                    <div className="flex flex-col gap-1 w-1/2">
                      <Label className="font-medium text-sm">Name</Label>
                      <p className="text-muted-foreground">{user.name}</p>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                      <Label className="font-medium text-sm">Email</Label>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="grid gap-2 py-4 w-1/2">
                      <Label className="font-medium text-sm">Role</Label>
                      <Select
                        onValueChange={(value) => handleChange("role", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="regular">Regular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2 py-4 w-1/2">
                      <Label className="font-medium text-sm">Status</Label>
                      <Select
                        onValueChange={(value) => handleChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="restricted">Restricted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"ghost"} className="w-full justify-start">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete User</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this user?
                  </DialogDescription>
                </DialogHeader>
                <Button variant={"destructive"} onClick={handleDelete}>
                  Yes, Delete
                </Button>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
