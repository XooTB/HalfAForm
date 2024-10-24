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
      className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-3 py-3 hover:bg-muted dark:hover:bg-dark-muted hover:cursor-pointer transition-colors duration-200"
    >
      <span className="text-muted-foreground dark:text-dark-muted-foreground">
        {icon}
      </span>
      <span className="text-sm font-medium text-primary dark:text-dark-primary">
        {name}
      </span>
    </Link>
  );
};

const DashboardMenu = () => {
  return (
    <div className="w-1/6 min-h-screen border-r border-gray-200 dark:border-gray-700 bg-card dark:bg-dark-card flex flex-col pl-6 pr-4 py-8">
      <h1 className="text-3xl font-bold pb-8 text-primary dark:text-dark-primary">
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
