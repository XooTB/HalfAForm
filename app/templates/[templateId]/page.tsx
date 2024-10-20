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

  const requiredFields = useMemo(() => {
    return template?.blocks.filter((block) => block.required);
  }, [template]);

  useEffect(() => {
    getTemplate(templateId as string);
  }, [templateId]);

  console.log(answers);

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
        {createFormError && (
          <p className="text-red-500 text-xs">{createFormError}</p>
        )}
      </div>
    </div>
  );
};

export default page;
