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
import { Badge } from "../ui/badge";

interface TemplateCard extends Template {
  id: string;
}

type Props = {
  template: TemplateCard;
};

const TemplateCard = ({ template }: Props) => {
  return (
    <Card className="hover:cursor-pointer hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0 rounded-t-md relative">
        <Image
          src={template.image}
          alt="template image"
          width={100}
          height={100}
          className="w-full h-48 object-cover rounded-t-md"
          placeholder="empty"
          loading="lazy"
        />
        <Badge className="absolute top-1 right-2" variant="secondary">
          {template.status}
        </Badge>
      </CardHeader>
      <CardContent className="px-2 py-4 justify-start">
        <CardTitle>{template.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 pt-2 pb-4">
          {template.description}
        </CardDescription>
        <CardFooter className="gap-4 justify-start w-full p-0">
          <Link href={`/templates/${template.id}`} target="_blank">
            <Button variant="outline">View</Button>
          </Link>
          <Link href={`/dashboard/templates/edit/${template.id}`}>
            <Button>Edit</Button>
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
