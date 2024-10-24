import { Form, FormWithTemplate } from "@/type/form";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  form: FormWithTemplate | Form;
};

const FormDetails = ({ form }: Props) => {
  return (
    <div className="w-full px-3 h-full py-5">
      <div className="pb-5 flex items-center justify-between">
        <p className="text-xl font-semibold">Form Details</p>
        <Button variant="outline">Edit Answers</Button>
      </div>
      <div className="pb-5">
        <p className="text-lg font-semibold">Answers</p>
      </div>
      <ScrollArea className="w-full h-[350px] px-2 ">
        <div className="grid grid-cols-2 gap-2 w-full">
          {form.answers.map((answer) => (
            <Card
              key={answer.questionId}
              className="flex flex-col justify-between px-2 py-3 hover:shadow-md transition-shadow duration-300 bg-card dark:bg-dark-card"
            >
              <CardHeader className="font-semibold text-base text-primary dark:text-dark-primary p-0 py-2 px-2 pb-3">
                {answer.question}
              </CardHeader>
              <CardContent className="text-sm bg-muted dark:bg-dark-muted rounded-md px-3 py-2 text-muted-foreground dark:text-dark-muted-foreground">
                {answer.answer}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FormDetails;
