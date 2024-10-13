"use client";

import { useParams } from "next/navigation";

const page = () => {
  const { templateId } = useParams();

  return <div>page</div>;
};

export default page;
