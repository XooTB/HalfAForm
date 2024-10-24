"use client";

import React, { useEffect, useState } from "react";
import useGetForms from "@/hooks/useGetForms";
import InfoCard from "@/components/cards/InfoCard";
import { FileText } from "lucide-react";
import FormCard from "@/components/cards/FormCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormWithTemplate } from "@/type/form";
import FormDetails from "@/components/sections/FormDetails";
import { useSession } from "next-auth/react";

const page = () => {
  const { isLoading, error, getForms, forms } = useGetForms();
  const [currentForm, setCurrentForm] = useState<FormWithTemplate | null>(
    forms[0]
  );
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      getForms();
    }
  }, [session]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (forms.length === 0) return <div>No forms found</div>;

  return (
    <div className="w-full px-5">
      <div className="py-1 pb-5 rounded-md flex items-center justify-between w-full gap-4">
        <InfoCard
          title="My Forms"
          description="Forms Submitted by you."
          icon={<FileText />}
          stat={forms.length}
        />
        <InfoCard
          title="My Templates"
          description="Templates created by you."
          icon={<FileText />}
          stat={forms.length}
        />
        <InfoCard
          title="Public Templates"
          description="Templates created by others."
          icon={<FileText />}
          stat={forms.length}
        />
        <InfoCard
          title="Total Submissions"
          description="Total submissions to your public templates."
          icon={<FileText />}
          stat={forms.length}
        />
      </div>
      <hr className="w-full" />
      <div className="py-2 w-full gap-4">
        <div className="w-full pb-2">
          <h1 className="text-xl font-semibold text-primary dark:text-dark-primary">
            My Forms
          </h1>
        </div>
        <div className="w-full flex gap-4">
          <ScrollArea className="h-[500px] w-2/4 px-3 border rounded-md py-2">
            {forms.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                onClick={() => setCurrentForm(form)}
              />
            ))}
          </ScrollArea>
          <div className="w-2/4 border rounded-md flex flex-col items-center justify-center">
            {!currentForm && <p className="text-center">No form selected</p>}
            {currentForm && <FormDetails form={currentForm} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
