import BreadCrumbs from "@/components/sections/BreadCrumbs";
import DashboardMenu from "@/components/sections/DashboardMenu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
