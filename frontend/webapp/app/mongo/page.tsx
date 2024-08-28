'use client'

import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Persona = {
  _id: string;
  nombre: string;
  correo: string;
  telefono: string;
};

export default function MySQL() {
    const { data, error } = useSWR<Persona[]>('/api/mongo', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

  return (
    
      <div className="relative z-[-1] flex place-items-center">
      <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {data.map((persona) => (
              <tr key={persona._id}>
                <td>{persona._id}</td>
                <td>{persona.nombre}</td>
                <td>{persona.correo}</td>
                <td>{persona.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
}
