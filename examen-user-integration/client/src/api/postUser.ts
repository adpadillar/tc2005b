import { User } from "./getUsers";

export default async function postUser(data: {
  name: string;
  email: string;
  address: string;
  phone: string;
  age: string;
  bio: string;
}): Promise<User> {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      age: data.age ? parseInt(data.age) : undefined,
    }),
  }).then((res) => res.json());
}
