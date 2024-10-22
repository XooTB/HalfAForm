import React from "react";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  stat: number;
};

const InfoCard = (props: Props) => {
  return (
    <div className="border px-3 py-2 rounded-md w-1/4">
      <div className="flex items-center gap-2 justify-between">
        <h2 className="text-xl font-semibold">{props.title}</h2>
        {props.icon}
      </div>
      <p className="text-xs text-gray-500 pb-3">{props.description}</p>
      <p className="text-2xl font-semibold">{props.stat}</p>
    </div>
  );
};

export default InfoCard;
