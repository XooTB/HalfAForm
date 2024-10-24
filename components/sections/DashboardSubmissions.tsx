"use client";

import React, { useEffect, useState } from "react";
import useGetSubmissions from "@/hooks/useGetSubmissions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useSession } from "next-auth/react";
import { Submission } from "@/type/form";
import SubmissionCard from "../cards/SubmissionCard";
const DashboardSubmissions = () => {
  const { submissions, isLoading, error, fetchSubmissions } =
    useGetSubmissions();
  const { data: session } = useSession();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission>();

  useEffect(() => {
    if (session) {
      fetchSubmissions();
    }
  }, [session]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full flex gap-5 min-h-[450px] mt-5">
      <div className="w-3/5 border rounded-lg p-5">
        <p className="text-lg font-bold text-primary dark:text-dark-primary pb-3">
          Recent Submissions
        </p>
        <ScrollArea className="w-full h-[400px] bg-muted dark:bg-dark-muted rounded-lg">
          <div className="flex flex-col gap-3 px-3 py-2">
            {submissions.length === 0 && (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
                  No submissions yet
                </p>
              </div>
            )}
            {submissions.map((submission) => (
              <Card
                key={submission.id}
                className="w-full"
                onClick={() => setSelectedSubmission(submission)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">
                        {submission.template.name}
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">
                        {submission.user.name}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">
                      {new Date(submission.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground line-clamp-2">
                    {submission.template.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-2/5 border rounded-lg p-5">
        {selectedSubmission && (
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold text-primary dark:text-dark-primary">
              {selectedSubmission.template.name}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">
                {selectedSubmission.user.name}
              </p>
              <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">
                {new Date(selectedSubmission.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {selectedSubmission.answers.map((answer, i) => (
                <Card
                  key={answer.questionId}
                  className="flex flex-col justify-between px-2 py-3 hover:shadow-md transition-shadow duration-300 bg-card dark:bg-dark-card"
                >
                  <CardHeader className="font-semibold text-base text-primary dark:text-dark-primary p-0 py-2 px-2 pb-3">
                    {answer.question}
                  </CardHeader>
                  <CardContent className="text-sm bg-muted dark:bg-dark-muted rounded-md px-3 py-2 text-primary dark:text-dark-primary">
                    {answer.answer}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardSubmissions;
