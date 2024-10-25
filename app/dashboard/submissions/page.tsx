"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useGetTemplates from "@/hooks/useGetTemplates";
import SerialCard from "@/components/cards/SerialCard";
import { TemplateDisplay } from "@/type/template";
import useFetchSubmissions from "@/hooks/useFetchSubmissions";
import SubmissionCard from "@/components/cards/SubmissionCard";
import { Form } from "@/type/form";
import FormDetails from "@/components/sections/FormDetails";
import { useSession } from "next-auth/react";
const page = () => {
  const { templates, isLoading, error, fetchTemplates } = useGetTemplates();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateDisplay | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Form | null>(
    null
  );
  const { data: session } = useSession();

  const {
    fetchSubmissions,
    submissions,
    isLoading: submissionsLoading,
  } = useFetchSubmissions();

  useEffect(() => {
    if (session?.accessToken) {
      fetchTemplates();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (selectedTemplate) {
      fetchSubmissions(selectedTemplate.id);
    }
  }, [selectedTemplate]);

  if (isLoading) {
    return <p>...Loading</p>;
  }

  if (templates.length === 0)
    return (
      <div className="w-full text-center text-base text-gray-500">
        <p>You don't have any templates!</p>
        <p>Create a new template to start getting submissions!</p>
      </div>
    );

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-5 min-h-[500px] w-full px-10">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[500px] bg-primary-foreground"
      >
        <ResizablePanel defaultSize={33} className="border px-2 py-2">
          <p className="text-xl font-semibold pb-2">Templates</p>
          <hr className="w-full" />
          <ScrollArea className="h-[500px] ">
            <div className="w-full h-full py-2">
              {templates.map((template) => (
                <SerialCard
                  key={template.id}
                  template={template}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setSelectedSubmission(null);
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={33} className="border px-2 py-2">
          <p className="text-xl font-semibold pb-2">Submissions</p>
          <hr className="w-full" />
          <ScrollArea className="h-[500px]">
            <div className="w-full h-full py-2">
              {submissions &&
                submissions.map((submission) => {
                  return (
                    <SubmissionCard
                      key={submission.id}
                      submission={submission}
                      onClick={() => setSelectedSubmission(submission)}
                    />
                  );
                })}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={34} className="border px-2 py-2">
          <p className="text-xl font-semibold pb-2">Form Details</p>
          <hr className="w-full" />
          <ScrollArea className="h-[500px] ">
            <div className="w-full h-full">
              {selectedSubmission && <FormDetails form={selectedSubmission} />}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default page;
