"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

const useContactInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const saveContactInfo = async (account: any) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/salesforce/accounts/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(account),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save contact info");
      }

      const data = await res.json();

      return data;
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const getContactInfo = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/salesforce/myaccount`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to get contact info");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContactInfo = async (accountId: string, account: any) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/salesforce/accounts/update/${accountId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(account),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update contact info");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    saveContactInfo,
    getContactInfo,
    updateContactInfo,
  };
};

export default useContactInfo;
