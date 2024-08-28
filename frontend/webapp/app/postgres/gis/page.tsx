'use client'

import useSWR from "swr";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Place = {
  id: number;
  name: string;
  location: string;
};

const Map = dynamic(() => import('@/lib/map'), { ssr: false });

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [point, setPoint] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, error } = useSWR<Place[]>('/api/postgres/gis', fetcher);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!point) {
      setErrorMessage('Por favor, seleccione un punto en el mapa.');
      return;
    }
  
    try {
      const response = await fetch('/api/postgres/gis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          latitude: point.latitude,
          longitude: point.longitude,
        }),
      });
  
      if (response.ok) {
        setName('');
        setPoint(null);
        setErrorMessage(null);
        alert('Lugar guardado exitosamente.');
      } else {
        setErrorMessage('Error al guardar el lugar.');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor.');
    }
  };
  

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Formulario de Lugar</h1>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col">
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 rounded text-black"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Guardar Lugar
          </button>
        </form>
      </div>
      <div className="flex m-6">
        <div className="relative z-[-1] flex place-items-center w-1/2">
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
        <div className="p-6 w-1/2">
          <h1 className="text-2xl font-bold mb-4">Mapa Satelital con ArcGIS</h1>

          {loading && (
            <div className="flex justify-center items-center my-6">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75"></div>
              <p className="ml-4 text-lg">Cargando mapa...</p>
            </div>
          )}

          <div className={loading ? 'invisible' : 'visible'}>
            <Map
              point={point}
              setPoint={setPoint}
              setLoading={setLoading}
              width="w-full"
              height="h-96"
            />
          </div>

          {point && (
            <div className="m-12 p-6">
              <h2 className="text-xl font-semibold">Punto seleccionado:</h2>
              <p>Latitud: {point.latitude.toFixed(6)}</p>
              <p>Longitud: {point.longitude.toFixed(6)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
