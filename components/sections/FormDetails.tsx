import { FormWithTemplate } from "@/type/form";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  form: FormWithTemplate;
};

const FormDetails = ({ form }: Props) => {
  return (
    <div className="w-full px-3 h-full py-5 ">
      <div className="pb-5 flex items-center justify-between">
        <p className="text-xl font-semibold">Form Details</p>
        <Button variant="outline">Edit Answers</Button>
      </div>
      <div className="pb-5">
        <p className="text-lg font-semibold">Answers</p>
      </div>
      <ScrollArea className="w-full h-[350px] px-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          {form.answers.map((answer) => (
            <Card key={answer.questionId}>
              <CardHeader className="font-semibold">
                {answer.question}
              </CardHeader>
              <CardContent className="text-sm">{answer.answer}</CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FormDetails;
