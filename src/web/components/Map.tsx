import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';
import Spot from '../SpotInterface';
import SpotComponent from './SpotPopup';
import ReactDOM from 'react-dom';

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const popUpRef = useRef<maplibregl.Popup | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const API_KEY = 'c01fnq736y5mzbv9p2s9hgnwx5x';

  // FIXME: Remove once calling the API
  const dataFile = './latest.json';

  const [spots, setSpots] = useState([]);

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current || '',
      style: `https://basemaps.linz.govt.nz/v1/tiles/topographic/EPSG:3857/style/topographic.json?api=${API_KEY}`,
      center: [173, -40.5],
      zoom: 6,
    });
    map.current.addControl(new maplibregl.NavigationControl(), 'top-left');

    const setData = async () => {
      const response = await fetch(dataFile);
      const data: Spot[] = await response.json();

      data.forEach(function (forecast: Spot) {
        const markerColor = getMarkerColor(forecast.forecasts[0].solidRating + forecast.forecasts[0].fadedRating);
        popUpRef.current = new maplibregl.Popup();
        const popUpNode = document.createElement('div');
        ReactDOM.render(<SpotComponent spotInfo={forecast.spotInfo} forecasts={forecast.forecasts} />, popUpNode);
        if (!map.current) {
          return;
        }
        new maplibregl.Marker({
          color: markerColor,
        })
          .setLngLat([forecast.spotInfo.coordinatex, forecast.spotInfo.coordinatey])
          .setPopup(popUpRef.current?.setDOMContent(popUpNode))
          .addTo(map.current);
      });
    };
    setData();
    //Map
    //if (map.current) return; //stops map from intializing more than once
  }, []);

  //
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

//FIXME: Make some improvement
function getMarkerColor(solidRating: number) {
  if (solidRating > 2) return '#008450';
  if (solidRating > 1) return '#EFB700';
  if (solidRating > 0) return '#8E9291';
  return '#B81D13';
}
