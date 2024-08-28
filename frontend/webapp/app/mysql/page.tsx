'use client'

import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Persona = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
};

export default function MySQL() {
  const { data, error, isLoading }  = useSWR<Persona[]>('/api/mysql', fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (

      <div className="relative z-[-1] flex place-items-center">
        <table className="table-auto w-full text-center">
        <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Fecha Creación</th>
              <th>Fecha Actualización</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((persona) => (
              <tr key={persona.id}>
                <td>{persona.id}</td>
                <td>{persona.nombre}</td>
                <td>{persona.correo}</td>
                <td>{persona.telefono}</td>
                <td>{new Date(persona.fecha_creacion).toLocaleString()}</td>
                <td>{new Date(persona.fecha_actualizacion).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
}
