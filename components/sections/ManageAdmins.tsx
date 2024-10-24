"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Admin } from "@/type/template";
import { Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import useFindUser from "@/hooks/useFindUser";
import useTemplate from "@/hooks/useTemplate";
import { toast } from "sonner";

type Props = {
  admins: Admin[];
  templateId: string;
};

const AdminCard = ({
  admin,
  handleRemoveAdmin,
}: {
  admin: Admin;
  handleRemoveAdmin: () => void;
}) => {
  return (
    <div className="flex items-center justify-between border px-2 py-2 rounded-lg">
      <div className="flex gap-2 items-center">
        <p className="font-bold">{admin.name}</p>
        <p className="text-muted-foreground">{admin.email}</p>
      </div>
      <Button
        variant="outline"
        className="hover:bg-red-500 hover:text-white transition-all duration-300"
        size="icon"
        onClick={handleRemoveAdmin}
      >
        <Trash2 />
      </Button>
    </div>
  );
};

const ManageAdmins = ({ admins, templateId }: Props) => {
  const [adminList, setAdminList] = useState<Admin[]>(admins);
  const [newAdmin, setNewAdmin] = useState<boolean>(false);
  const { users, loading, findUser, error } = useFindUser();
  const { updateTemplateAdmins, isLoading } = useTemplate();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleRemoveAdmin = (adminId: string) => {
    setAdminList(adminList.filter((admin) => admin.id !== adminId));
  };

  const handleAddAdmin = (admin: Admin) => {
    if (!adminList.some((a) => a.id === admin.id)) {
      setAdminList([...adminList, admin]);
    }
  };

  const handleFindAdmin = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      await findUser(e.target.value);
    }
  };

  const handleSaveAdmins = async () => {
    await updateTemplateAdmins(adminList, templateId);
    setNewAdmin(false);
    setDialogOpen(false);
    toast.success("Admins updated successfully!");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Admins</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Admins</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Add or remove admins from this template
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {adminList.map((admin) => (
            <AdminCard
              admin={admin}
              handleRemoveAdmin={() => handleRemoveAdmin(admin.id)}
            />
          ))}
          <div>
            {newAdmin && (
              <>
                <Input
                  placeholder="Enter Email Or Name"
                  onChange={handleFindAdmin}
                />
                {loading && <p>Loading...</p>}
                {users.length > 0 && !loading && (
                  <div className="border rounded mt-1">
                    {users.map((user) => (
                      <div
                        onClick={() => handleAddAdmin(user)}
                        className="flex items-center justify-between border-b px-2 py-1 hover:bg-gray-200 hover:cursor-pointer text-sm"
                      >
                        <p className="text-sm">{user.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {user.email}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <Button variant="outline" onClick={() => setNewAdmin(true)}>
            Add Admin
          </Button>
          <Button
            variant="default"
            disabled={adminList.length === admins.length}
            className="transition-all duration-300"
            onClick={handleSaveAdmins}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAdmins;
