import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  stat: number;
};

const InfoCard = (props: Props) => {
  return (
    <div className="border px-3 py-2 rounded-md w-1/4 bg-muted dark:bg-dark-muted text-primary dark:text-dark-primary">
      <div className="flex items-center gap-2 justify-between">
        <h2 className="text-xl font-semibold">{props.title}</h2>
        {props.icon}
      </div>
      <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground pb-3">
        {props.description}
      </p>
      <p className="text-2xl font-semibold">{props.stat}</p>
    </div>
  );
};

export default InfoCard;
