"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {};

const BreadCrumbs = (props: Props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="flex items-center gap-1 px-5 capitalize font-semmibold">
      {pathSegments.map((segment, index) => (
        <Link
          href={`/${pathSegments.slice(0, index + 1).join("/")}`}
          key={segment}
          className="hover:text-blue-500 font-semibold"
        >
          {segment}
          {index < pathSegments.length - 1 && " > "}
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumbs;
