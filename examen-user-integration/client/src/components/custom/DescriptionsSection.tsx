import getDescriptions, { Description } from "@/api/getDescriptions";
import React, { useState } from "react";
import { useQuery } from "react-query";
import DescriptionCard from "./DescriptionCard";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

interface DescriptionsSectionProps {
  children?: React.ReactNode;
  userid: string;
}

function filterDescriptions(descriptions: Description[], searchTerm: string) {
  return descriptions.filter((description) => {
    return (
      description.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      description.prescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}

const DescriptionsSection: React.FC<DescriptionsSectionProps> = ({
  userid,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const descriptions = useQuery({
    queryKey: ["descriptions", userid],
    queryFn: () => getDescriptions(userid),
  });

  if (descriptions.isLoading) {
    return (
      <div className="p-4 flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">Past descriptions</h1>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter descriptions..."
            type="text"
          />
        </div>
        <div className="grid gap-y-4">
          {new Array(2).fill(null).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md animate-pulse"
            >
              <div className="flex flex-col space-y-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-[80%] h-3" />
                <Skeleton className="w-[60%] h-3" />
                <div className="py-1"></div>
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-[80%] h-3" />
                <Skeleton className="w-[60%] h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (descriptions.isError || !descriptions.data) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="p-4 flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">Past descriptions</h1>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter descriptions..."
          type="text"
        />
      </div>

      <div className="grid gap-y-4">
        {filterDescriptions(descriptions.data, searchTerm).length === 0 && (
          <div className="w-full flex items-center justify-center p-6">
            <h2 className="text-black/40">No descriptions found</h2>
          </div>
        )}
        {filterDescriptions(descriptions.data, searchTerm).map(
          (description) => (
            <DescriptionCard key={description.id} description={description} />
          )
        )}
      </div>
    </div>
  );
};

export default DescriptionsSection;
