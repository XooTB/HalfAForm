"use client";

import FormView from "@/components/sections/FormView";
import { Button } from "@/components/ui/button";
import useTemplate from "@/hooks/useTemplate";
import { Answer } from "@/type/form";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnswerSchema } from "@/type/form";
import useForm from "@/hooks/useForm";
import Link from "next/link";

const page = () => {
  const { templateId } = useParams();
  const { template, isLoading, error, getTemplate } = useTemplate();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    createForm,
    isLoading: isCreatingForm,
    error: createFormError,
  } = useForm({ templateId: templateId as string });

  useEffect(() => {
    getTemplate(templateId as string);
  }, [templateId]);

  const handleAnswerChange = (answer: Answer) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (a) => a.questionId === answer.questionId
      );

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = answer;
        return updatedAnswers;
      } else {
        // Add new answer
        return [...prevAnswers, answer];
      }
    });
  };

  console.log(answers);

  const handleFormSubmit = async () => {
    setSubmitError(null);

    if (answers.length !== template?.blocks.length) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    try {
      answers.forEach((answer) => {
        AnswerSchema.parse(answer);
      });
    } catch (error) {
      setSubmitError("Please fill in all required fields");
    }

    createForm(answers);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!template) return <div>Template not found</div>;
  if (template.status === "draft")
    return (
      <div className="min-h-screen w-full flex justify-center items-center text-2xl pb-20 flex-col gap-5">
        This template is not published yet!
        <Link href="/templates">
          <Button variant="default">Checkout Templates</Button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen w-full flex justify-center items-center text-2xl pb-20">
      <div className="w-1/2 flex flex-col gap-5">
        <FormView template={template} onAnswerChange={handleAnswerChange} />
        <Button onClick={handleFormSubmit} disabled={isCreatingForm}>
          {isCreatingForm ? "Submitting..." : "Submit Answers"}
        </Button>
        {submitError && <p className="text-red-500 text-xs">{submitError}</p>}
      </div>
    </div>
  );
};

export default page;
