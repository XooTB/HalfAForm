"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="border-2 border-gray-200">
              <AvatarImage
                src={
                  session.user?.image ||
                  `https://robohash.org/${session.user?.id}?set=set3`
                }
                alt={session.user?.name || "User avatar"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/user/${session.user?.id}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/templates">Templates</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/submissions">Submissions</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="hover:bg-red-500"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button
            className={`
            bg-white border text-black hover:bg-slate-100
            dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800`}
          >
            Login
          </Button>
        </Link>
      )}
    </>
  );
};

export default UserProfile;
