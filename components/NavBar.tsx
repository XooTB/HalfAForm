import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";
import Link from "next/link";

type Props = {};

const NavBar = ({}: Props) => {
  return (
    <div className="flex justify-between items-center px-32 py-5">
      <h1 className="text-2xl capitalize font-semibold">
        <Link href="/">Half A Form</Link>
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Introduction</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserProfile />
      </div>
    </div>
  );
};

export default NavBar;
