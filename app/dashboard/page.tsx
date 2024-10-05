"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Dashboard from "./Dashboard";

type Props = {};

const Page = (props: Props) => {
  const { data: session } = useSession();

  return <>{session ? <Dashboard /> : <h1>User is not logged in</h1>}</>;
};

export default Page;
