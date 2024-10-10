import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full px-20">
      <div className="w-full flex flex-col gap-5 py-5">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Templates</h1>
            <p className="text-xs text-gray-500">
              Browse, Modify or create new templates
            </p>
          </div>
          <Link href="/dashboard/templates/new">
            <Button>New Template</Button>
          </Link>
        </div>
        <div className="w-full min-h-32 flex justify-center items-center border rounded-md">
          <p>No templates found</p>
        </div>
      </div>
    </div>
  );
};

export default page;
