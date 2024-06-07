import { Description } from "@/api/getDescriptions";
import React from "react";

interface DescriptionCardProps {
  children?: React.ReactNode;
  description: Description;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ description }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg grid gap-y-2">
      <div>
        <h3 className="underline">Description:</h3>
        <p className="text-sm">{description.description}</p>
      </div>
      <div>
        <h3 className="underline">Prescription:</h3>
        <p className="text-sm">{description.prescription}</p>
      </div>
    </div>
  );
};

export default DescriptionCard;
