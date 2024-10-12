"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Dashboard from "./Dashboard";

type Props = {};

const Page = (props: Props) => {
  const { data: session } = useSession();

  return <Dashboard />;
};

export default Page;
