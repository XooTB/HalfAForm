import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import BreadCrumbs from "@/components/sections/BreadCrumbs";
import DashboardMenu from "@/components/sections/DashboardMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Former",
  description: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
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
