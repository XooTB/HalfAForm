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

const page = () => {
  const { templates, isLoading, error, fetchTemplates } = useGetTemplates();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateDisplay | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Form | null>(
    null
  );

  const {
    fetchSubmissions,
    submissions,
    isLoading: submissionsLoading,
  } = useFetchSubmissions();

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      fetchSubmissions(selectedTemplate.id);
    }
  }, [selectedTemplate]);

  return (
    <div className="flex gap-5 min-h-[500px] w-full px-10">
      <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
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
          <ScrollArea className="h-[500px] ">
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
