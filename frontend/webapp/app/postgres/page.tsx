'use client'

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export default function Postgres() {
  const { data, error, isLoading }  = useSWR<User[]>('/api/postgres', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
      <div className="relative z-[-1] flex place-items-center">
        <table className="table-auto w-full text-center">
        <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>{new Date(user.updated_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
