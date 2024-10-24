"use client";

import React, { useState, useEffect, useMemo } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import useUsers from "@/hooks/useUsers";
import { useSession } from "next-auth/react";

interface UserStats {
  ownFormsCount: number;
  totalPublicTemplates: number;
  totalSubmissionCount: number;
  totalTemplates: number;
}

const UserStats = () => {
  const [userStats, setUserStats] = useState<UserStats>();
  const { getUserStats } = useUsers();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      getUserStats().then((data) => {
        setUserStats(data);
      });
    }
  }, [session]);

  if (!userStats) return null;

  const updatedCards = [
    {
      title: "My Forms",
      description: "Forms Submitted by you.",
      icon: <FileText />,
      stat: userStats.ownFormsCount,
    },
    {
      title: "My Templates",
      description: "Templates created by you.",
      icon: <FileText />,
      stat: userStats.totalTemplates,
    },
    {
      title: "Public Templates",
      description: "Templates created by others.",
      icon: <FileText />,
      stat: userStats.totalPublicTemplates,
    },
    {
      title: "Total Submissions",
      description: "Total submissions to your public templates.",
      icon: <FileText />,
      stat: userStats.totalSubmissionCount,
    },
  ];

  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
      {updatedCards.map((card, index) => (
        <Card key={index} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl">{card.title}</CardTitle>
            <CardDescription className="text-xs">
              {card.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{card.stat}</CardContent>
        </Card>
      ))}
    </section>
  );
};

export default UserStats;
