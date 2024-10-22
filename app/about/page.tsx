import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">About Former</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What is Former?</CardTitle>
          <CardDescription>
            Your go-to platform for building and answering cool forms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Former is a powerful web application designed to revolutionize the
            way you create and interact with forms. Whether you're a business
            professional, educator, or researcher, Former provides the tools you
            need to build engaging and effective forms with ease.
          </p>
          <p>
            Our intuitive interface and robust features allow you to craft forms
            that not only collect data but also provide an enjoyable experience
            for your respondents.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>For Form Creators</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Drag-and-drop form builder</li>
              <li>Wide range of question types</li>
              <li>Customizable themes and layouts</li>
              <li>Advanced logic and branching</li>
              <li>Real-time collaboration</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Respondents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Smooth, responsive interface</li>
              <li>Progress saving</li>
              <li>Mobile-friendly design</li>
              <li>Accessibility features</li>
              <li>Quick and easy submission process</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/get-started">Get Started with Former</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
