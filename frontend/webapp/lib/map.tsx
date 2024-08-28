import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

interface MapProps {
  point: { latitude: number; longitude: number } | null;
  setPoint: React.Dispatch<React.SetStateAction<{ latitude: number; longitude: number } | null>>;
  setLoading: (loading: boolean) => void;
  width?: string;
  height?: string;
}

const Map: React.FC<MapProps> = ({ point, setPoint, setLoading, width = 'w-full', height = 'h-96' }) => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new WebMap({
        basemap: 'satellite',
      });

      const view = new MapView({
        container: mapDiv.current,
        map: webmap,
        center: [-78.467838, -0.180653], // Coordenadas de Quito, Ecuador
        zoom: 13,
      });

      // Capa para gráficos
      const graphicsLayer = new GraphicsLayer();
      view.map.add(graphicsLayer);

      // Función para dibujar el punto en el mapa
      const drawPoint = () => {
        graphicsLayer.removeAll(); // Limpiar la capa antes de agregar un nuevo punto
        if (point) {
          const pointSymbol = new SimpleMarkerSymbol({
            color: 'red',
            size: '8px',
            outline: {
              color: 'white',
              width: 1,
            },
          });

          const pointGraphic = new Graphic({
            geometry: new Point({
              latitude: point.latitude,
              longitude: point.longitude,
            }),
            symbol: pointSymbol,
          });

          graphicsLayer.add(pointGraphic);
        }
      };

      view.when(() => {
        setLoading(false);
        drawPoint(); // Dibuja el punto cuando el mapa está listo
      });

      view.on('click', (event) => {
        const { latitude, longitude } = event.mapPoint;
        setPoint({ latitude, longitude });
      });

      return () => {
        view.destroy();
      };
    }
  }, [point, setPoint, setLoading]);

  return <div ref={mapDiv} className={`${width} ${height}`} />;
};

export default Map;
