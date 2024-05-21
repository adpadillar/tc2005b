import { useEffect, useState } from "react";

type Users = { name: string; email: string; id: number }[];

async function fetchUsers() {
  const response = await fetch("http://localhost:3000/users");
  const users = (await response.json()) as unknown as Users;
  return users;
}

function App() {
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}: {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
