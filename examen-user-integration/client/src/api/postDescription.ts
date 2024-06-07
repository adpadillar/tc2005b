import { Description } from "./getDescriptions";

export default async function postDescription(
  userid: string,
  { description, prescription }: { description: string; prescription: string }
): Promise<Description> {
  return fetch(`/api/description/${userid}`, {
    method: "POST",
    body: JSON.stringify({ description, prescription }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
