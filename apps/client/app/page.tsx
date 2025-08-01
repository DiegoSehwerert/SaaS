import { getUsers } from "@/actions/getUsers";

export default async function Home() {
  const users = await getUsers();

  return (
    <div>
      <h1>Welcome to the SaaS Application</h1>
      <p>This is the client-side application.</p>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
