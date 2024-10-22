import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  LayoutTemplate,
  FileText,
  Inbox,
  Users,
} from "lucide-react";

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
    icon: <FileText />,
    path: "/dashboard/forms",
  },
  {
    name: "Submissions",
    icon: <Inbox />,
    path: "/dashboard/submissions",
  },
  {
    name: "Users",
    icon: <Users />,
    path: "/dashboard/users",
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
      className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer transition-colors duration-200"
    >
      <span className="text-gray-600 dark:text-gray-300">{icon}</span>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {name}
      </span>
    </Link>
  );
};

const DashboardMenu = () => {
  return (
    <div className="w-1/6 min-h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col pl-6 pr-4 py-8">
      <h1 className="text-3xl font-bold pb-8 text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <nav className="flex flex-col space-y-1">
        {MenuOptions.map((option) => (
          <MenuOption
            key={option.name}
            name={option.name}
            icon={option.icon}
            path={option.path}
          />
        ))}
      </nav>
    </div>
  );
};

export default DashboardMenu;
