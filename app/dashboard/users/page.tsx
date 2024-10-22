"use client";

import React from "react";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  console.log(session.user);

  return <div>page</div>;
};

export default page;
