import { FileUp, LayoutDashboard, LayoutTemplate } from "lucide-react";
import React from "react";
import Link from "next/link";
type Props = {};

const MenuOptions = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/dashboard",
  },
  {
    name: "Templates",
    icon: <LayoutTemplate />,
    path: "/dashboard/templates",
  },
  {
    name: "Forms",
    icon: <FileUp />,
    path: "/dashboard/forms",
  },
];

const MenuOption = ({
  name,
  icon,
  path,
}: {
  name: string;
  icon: React.ReactNode;
  path: string;
}) => {
  return (
    <Link
      href={path}
      className="flex items-center gap-2 border-b px-1 py-2 hover:bg-gray-100 hover:cursor-pointer"
    >
      {icon}
      <span className="text-sm font-semibold">{name}</span>
    </Link>
  );
};

const DashboardMenu = (props: Props) => {
  return (
    <div className="w-1/6 border-r border-gray-200 flex flex-col pl-10">
      <h1 className="text-3xl font-bold pb-12">Dashboard</h1>
      <div className="flex flex-col ">
        {MenuOptions.map((option) => (
          <MenuOption
            key={option.name}
            name={option.name}
            icon={option.icon}
            path={option.path}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardMenu;
