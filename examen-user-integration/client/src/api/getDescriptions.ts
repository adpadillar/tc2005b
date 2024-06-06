import { User } from "./getUsers";

export type Description = {
  id: number;
  description: string;
  prescription: string;
  userd_id: number;
};

export default async function getDescriptions(
  userid: string
): Promise<(Description & User)[]> {
  return fetch(`/api/description/${userid}`).then((res) => res.json());
}
