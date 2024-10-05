"use client";

import React from "react";
import { useSession } from "next-auth/react";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1>Welcome Back! {session?.user?.name}</h1>
    </div>
  );
};

export default Dashboard;
