export type User = {
  id: number;
  name: string;
  email: string;
  address: string | null;
  phone: string | null;
  age: number | null;
  bio: string | null;
};

export async function getUsers(): Promise<User[]> {
  return fetch("/api/users").then((res) => res.json());
}
