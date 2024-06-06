import { User } from "./getUsers";

export default async function getUser(userid: string): Promise<User> {
  return fetch(`/api/users/${userid}`).then((res) => res.json());
}
