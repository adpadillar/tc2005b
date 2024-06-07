import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Form } from "@/hooks/useForm";
import { useMutation } from "react-query";
import postChat from "@/api/postChat";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface DatabaseSectionProps {
  children?: React.ReactNode;
  form: Form<"description" | "prescription">;
}

const DatabaseSection: React.FC<DatabaseSectionProps> = ({ form }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchDatabse = useMutation({
    mutationKey: ["searchDatabase"],
    mutationFn: () => {
      if (!searchDatabse)
        throw new Error("Please fill out the search term field");

      const fullPrompt = `I need help for a database query. My query is: ${searchTerm}
      Other relevant information may be, the user description: ${form.values.description}`;

      return postChat(fullPrompt, true);
    },
  });

  return (
    <div className="p-4 flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">Therapy Database</h1>
        <p>Ask a question and get a factual answer from the database</p>
      </div>
      <div>
        {searchDatabse.isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Button onClick={() => searchDatabse.mutate()} className="w-full">
            Search
          </Button>
        )}
      </div>
      <div>
        <Textarea
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ask a question..."
          className="w-full h-16"
        />
      </div>
      <div className="max-h-48 overflow-scroll">
        <p>{searchDatabse.isSuccess ? searchDatabse.data.answer : null}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <Button
          onClick={() =>
            form.setValue("description", searchDatabse.data?.answer ?? "")
          }
        >
          Copy to description
        </Button>
        <Button
          onClick={() =>
            form.setValue("prescription", searchDatabse.data?.answer ?? "")
          }
        >
          Copy to prescription
        </Button>
      </div>
    </div>
  );
};

export default DatabaseSection;
