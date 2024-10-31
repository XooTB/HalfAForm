"use client";

import FormView from "@/components/sections/FormView";
import { Button } from "@/components/ui/button";
import useTemplate from "@/hooks/useTemplate";
import { Answer } from "@/type/form";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { AnswerSchema } from "@/type/form";
import useForm from "@/hooks/useForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const { templateId } = useParams();
  const router = useRouter();
  const { template, isLoading, error, getTemplate } = useTemplate();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    createForm,
    isLoading: isCreatingForm,
    error: createFormError,
  } = useForm({ templateId: templateId as string });

  const requiredFields = useMemo(() => {
    return template?.blocks.filter((block) => block.required);
  }, [template]);

  const { data: session } = useSession();

  useEffect(() => {
    getTemplate(templateId as string);
  }, [templateId]);

  const handleAnswerChange = (answer: Answer) => {
    setAnswers((prevAnswers) => {
      const isValid = Array.isArray(answer.answer)
        ? answer.answer.length === 0
        : answer.answer === "";

      if (isValid) {
        // Remove the answer if it's empty
        return prevAnswers.filter((a) => a.questionId !== answer.questionId);
      }

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

  const validateRequiredFields = () => {
    if (!requiredFields || answers.length < requiredFields.length) {
      return "Please fill in all required fields";
    }

    const missingFields = requiredFields.filter(
      (field) => !answers.some((answer) => answer.questionId === field.id)
    );

    if (missingFields.length > 0) {
      return `Please fill in all required fields. Missing: ${missingFields
        .map((field) => field.question)
        .join(", ")}`;
    }

    return null;
  };

  const handleFormSubmit = async () => {
    setSubmitError(null);

    const validateAnswers = () => {
      try {
        answers.forEach((answer) => AnswerSchema.parse(answer));
        return null;
      } catch (error) {
        return "Please check your answers";
      }
    };

    const requiredFieldsError = validateRequiredFields();
    if (requiredFieldsError) {
      setSubmitError(requiredFieldsError);
      return;
    }

    const answersError = validateAnswers();
    if (answersError) {
      setSubmitError(answersError);
      return;
    }

    createForm(answers);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
        <p className="text-2xl">Template not found!</p>
        <Link href="/templates">
          <Button variant="default">Checkout Templates</Button>
        </Link>
      </div>
    );
  if (!template)
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
        <p className="text-2xl">Template not found! </p>
        <Link href="/templates">
          <Button variant="default">Checkout Templates</Button>
        </Link>
      </div>
    );

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
    <div className="min-h-screen w-full flex justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl pb-10 sm:pb-20 px-4 sm:px-6 md:px-8">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col gap-3 sm:gap-4 md:gap-5">
        <FormView template={template} onAnswerChange={handleAnswerChange} />
        <Button
          onClick={handleFormSubmit}
          disabled={isCreatingForm}
          className="w-full sm:w-auto"
        >
          {isCreatingForm ? "Submitting..." : "Submit Answers"}
        </Button>
        {submitError && (
          <p className="text-red-500 text-xs sm:text-sm">{submitError}</p>
        )}
        {createFormError && (
          <p className="text-red-500 text-xs sm:text-sm">{createFormError}</p>
        )}

        {session?.user.role === "admin" && (
          <div className="flex flex-col gap-2 fixed top-auto right-5 bg-primary-foreground border p-2 rounded-md shadow-md">
            <p className="text-sm font-bold">Admin Actions</p>
            <hr />
            <Link
              href={`/dashboard/templates/edit/${templateId}`}
              className="w-full flex"
            >
              <Button variant="default" className="w-full">
                Edit Template
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
