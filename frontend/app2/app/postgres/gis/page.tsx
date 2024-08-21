'use client'

import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Place = {
  id: number;
  name: string;
  location: string;
};

export default function Home() {
  const { data, error } = useSWR<Place[]>('/api/postgres/gis', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (

      <div className="relative z-[-1] flex place-items-center">
      <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((place) => (
              <tr key={place.id}>
                <td>{place.id}</td>
                <td>{place.name}</td>
                <td>{place.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
}
