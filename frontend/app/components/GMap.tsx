// components/GMap.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { Psychologist } from '../data/psychologists';

const DARK_TEAL = '#2b6369';
const WARSAW = { lat: 52.2297, lng: 21.0122 };
const containerStyle = { width: '100%', height: '100%' };

interface GMapProps {
  psychologists: Psychologist[];
  selected?: Psychologist | null;
}

export default function GMap({ psychologists, selected }: GMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || '',
    libraries: ['places'] as any,
  });

  const mapRef = useRef<google.maps.Map|null>(null);
  const onLoad = (map: google.maps.Map) => { mapRef.current = map; };

  const [positions, setPositions] = useState<google.maps.LatLngLiteral[]>([]);
  useEffect(() => {
    if (!isLoaded) return;
    const geocoder = new window.google.maps.Geocoder();
    Promise.all(
      psychologists.map(p =>
        new Promise<google.maps.LatLngLiteral>(resolve => {
          geocoder.geocode({ address: p.address }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              const loc = results[0].geometry.location;
              resolve({ lat: loc.lat(), lng: loc.lng() });
            } else {
              resolve(WARSAW);
            }
          });
        })
      )
    ).then(setPositions);
  }, [isLoaded, psychologists]);

  // Pan & zoom to selected if needed
  useEffect(() => {
    const map = mapRef.current;
    if (!map || positions.length === 0) return;
    if (selected) {
      const idx = psychologists.findIndex(p => p.id === selected.id);
      if (idx > -1) {
        const pos = positions[idx];
        map.panTo(pos);
        map.setZoom(15);
      }
    } else {
      map.panTo(WARSAW);
      map.setZoom(12);
    }
  }, [selected, positions, psychologists]);

  if (loadError) return <p>Map load error</p>;
  if (!isLoaded) return <p>Loading map…</p>;

  return (
    <GoogleMap
      onLoad={onLoad}
      mapContainerStyle={containerStyle}
      center={WARSAW}
      zoom={12}
    >
      {positions.map((pos, i) => {
        return (
          <MarkerF
            key={i}
            position={pos}
            onClick={() => {
              const url = [
                'https://www.google.com/maps/dir/?api=1',
                `origin=My+Location`, 
                `destination=${pos.lat},${pos.lng}`,
                `travelmode=driving`
              ].join('&');
              window.open(url, '_blank');
            }}
            
          />
        );
      })}
    </GoogleMap>
  );
}
