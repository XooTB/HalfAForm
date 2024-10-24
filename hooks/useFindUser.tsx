"use client";

import { User } from "@/type/user";
import { useState } from "react";
import { useSession } from "next-auth/react";

const useFindUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const findUser = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users/search?name=${query}&email=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const data = await res.json();

      setUsers(data);
    } catch (error) {
      setError("Error finding user");
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, findUser, error };
};

export default useFindUser;
