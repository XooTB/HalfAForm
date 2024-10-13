import { Template } from "@/type/template";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface TemplateCard extends Template {
  id: string;
}

type Props = {
  template: TemplateCard;
};

const TemplateCard = ({ template }: Props) => {
  return (
    <Card className="hover:cursor-pointer hover:shadow-lg transition-all duration-300">
      <CardContent>
        <Image
          src="/placeholders/template_img.png"
          alt="template image"
          width={100}
          height={100}
          className="w-full h-full object-cover"
          priority={true}
          placeholder="empty"
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Link href={`/templates/${template.id}`} target="_blank">
          <Button variant="outline">View</Button>
        </Link>
        <Link href={`/dashboard/templates/edit/${template.id}`}>
          <Button>Edit</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
