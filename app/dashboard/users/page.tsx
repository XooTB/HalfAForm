"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useUsers from "@/hooks/useUsers";
import UsersTable from "./users-table";
import { columns } from "./columns";
import { User } from "@/type/user";

const Page = () => {
  const { data: session } = useSession();
  const { fetchUsers, isLoading, error, users: initialUsers } = useUsers();
  const [users, setUsers] = useState<User[]>([]);

  if (!session) {
    return <div>Please login to access this page</div>;
  }

  if (session.user.role !== "admin") {
    return <div>You are not authorized to access this page</div>;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found</div>;
  }

  const updateData = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteData = (deletedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUser.id)
    );
  };

  return (
    <div className="w-full px-20">
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Found {users.length} users
      </p>
      <UsersTable
        columns={columns}
        data={users}
        meta={{ updateData, deleteData }}
      />
    </div>
  );
};

export default Page;
