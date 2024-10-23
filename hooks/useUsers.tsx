"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { User } from "@/type/user";
import { useRouter } from "next/navigation";

const useUsers = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const handleReroute = (data: User) => {
    // Check to see if the data is of the current user.
    if (data.id === session?.user.id) {
      if (data.role !== "admin" || data.status !== "active") {
        signOut();
        router.push("/login");
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser.id === user.id ? { ...prevUser, ...data } : prevUser
        )
      );

      handleReroute(data);

      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      handleReroute(data);

      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return { fetchUsers, isLoading, error, users, updateUser, deleteUser };
};

export default useUsers;
