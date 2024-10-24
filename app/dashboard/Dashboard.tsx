import React from "react";
import { getServerSession } from "next-auth/next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserStats from "@/components/sections/UserStats";
import DashboardSubmissions from "@/components/sections/DashboardSubmissions";

const Dashboard = async () => {
  const session = await getServerSession();

  return (
    <div className="min-h-screen w-full px-10 flex flex-col">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary dark:text-dark-primary">
          Dashboard
        </h1>
        <Link href="/dashboard/templates/new">
          <Button>Create Template</Button>
        </Link>
      </div>
      <UserStats />
      <DashboardSubmissions />
    </div>
  );
};

export default Dashboard;
