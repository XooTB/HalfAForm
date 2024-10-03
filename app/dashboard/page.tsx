"use client";

import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <h1>User {session.user?.name} is logged in</h1>
      ) : (
        <h1>User is not logged in</h1>
      )}
    </>
  );
};

export default Page;
