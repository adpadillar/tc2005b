import React from "react";
import { Textarea } from "../ui/textarea";
import { Form } from "@/hooks/useForm";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "react-query";
import postDescription from "@/api/postDescription";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import postChat from "@/api/postChat";

type FormKeys = "prescription" | "description";

interface CrudSectionProps {
  children?: React.ReactNode;
  form: Form<FormKeys>;
  userid: string;
}

const CrudSection: React.FC<CrudSectionProps> = ({ form, userid }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveEntry = useMutation({
    mutationKey: ["saveEntry", userid],
    mutationFn: () => {
      if (!form.values.description || !form.values.prescription)
        throw new Error("Please fill out all fields");
      return postDescription(userid, form.values);
    },
    onError: (e: Error) => {
      toast({
        title: "Failed to save entry",
        description: `Full message: ${e.message}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["descriptions", userid]);
      form.setValues({ description: "", prescription: "" });
      toast({
        title: "Saved entry",
        description: "Successfully saved entry",
      });
    },
  });

  const generateHelp = useMutation({
    mutationKey: ["generateHelp", userid],
    mutationFn: () => {
      if (!form.values.description)
        throw new Error("Please fill out the description field");

      return postChat(`You are working today as a fake AI therapist for a game. 
        The player has asked for your help for you to generate a realistic looking 
        prescription related to the description they have given you. The player has 
        given you the following description: ${form.values.description}. Return the
        prescription in the following format: Prescription:\n[Your prescription here
        as a list of bullet points]`);
    },
    onError: (e: Error) => {
      toast({
        title: "Failed to generate help",
        description: `Full message: ${e.message}`,
      });
    },
    onSuccess: (data) => {
      form.setValue("prescription", data.answer);
      toast({
        title: "Generated help",
        description: "Successfully generated help",
      });
    },
  });

  return (
    <div className="grid gap-y-8">
      <div className="grid gap-y-4">
        <h1 className="text-2xl font-semibold">Description</h1>
        <Textarea
          value={form.values.description}
          onChange={form.handleKey("description")}
          placeholder="Enter description"
          className="h-60"
        />
      </div>
      <div className="grid gap-y-4">
        <h1 className="text-2xl font-semibold">Prescription</h1>
        <Textarea
          value={form.values.prescription}
          onChange={form.handleKey("prescription")}
          placeholder="Enter prescription"
          className="h-60"
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Button
          onClick={() => saveEntry.mutate()}
          disabled={saveEntry.isLoading}
          className="w-full flex space-x-3"
        >
          <span>Save entry</span>
          {saveEntry.isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
        <Button
          onClick={() => generateHelp.mutate()}
          disabled={generateHelp.isLoading}
          className="w-full flex space-x-3"
        >
          <span>Generate help</span>
          {generateHelp.isLoading && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CrudSection;
