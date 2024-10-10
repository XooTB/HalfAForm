"use client";

import BreadCrumbs from "@/components/sections/BreadCrumbs";
import DashboardMenu from "@/components/sections/DashboardMenu";
import type { Metadata } from "next";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  if (!session) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl font-bold">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="w-full flex">
      <DashboardMenu />
      <div className="w-5/6 flex flex-col items-center">
        <div className="h-20 w-full flex items-center">
          <BreadCrumbs />
        </div>
        {children}
      </div>
    </div>
  );
}
