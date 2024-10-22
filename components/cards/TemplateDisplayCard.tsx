import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { TemplateDisplay } from "@/type/template";

type Props = {
  template: TemplateDisplay;
};

const TemplateDisplayCard = ({ template }: Props) => {
  return (
    <Link href={`/templates/${template.id}`}>
      <Card className="w-full hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0 justify-start">
          <Image
            src={template.image || "/placeholders/template_img.png"}
            alt="template image"
            width={100}
            height={150}
            className="w-full h-[200px] object-cover border rounded-t-lg"
          />
        </CardContent>
        <CardFooter className="flex-col justify-start gap-2 pt-3 px-3">
          <h1 className="text-lg font-bold line-clamp-1">{template.name}</h1>
          <p className="text-sm text-gray-500 line-clamp-2">
            {template.description}
          </p>
          <div className="flex gap-2 justify-start w-full pt-2">
            <Badge variant="outline">tags</Badge>
            <Badge variant="outline">tags</Badge>
            <Badge variant="outline">tags</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TemplateDisplayCard;
