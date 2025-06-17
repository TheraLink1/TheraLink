'use client'
import { useGetAuthUserQuery, useGetAllPsychologistsQuery } from '@/state/api';
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from './Card';
import DetailsPanel from './DetailsPanel';
import { AnimatePresence, motion } from 'framer-motion';
import Map from '../components/GMap';
import { redirect } from 'next/navigation';

import { Psychologist } from '../data/psychologists';
import { MapProvider } from '../components/MapProvider';

const Page: React.FC = () => {
  // Fetch auth user
  const { data: authUser } = useGetAuthUserQuery();
  if (!authUser) redirect('/signin');

  // Fetch all psychologists from backend
  const { data: psychologistsData } = useGetAllPsychologistsQuery();

  const searchParams = useSearchParams();
  const router = useRouter();

  // Read params from URL
  const keywordParam = searchParams.get('keyword') || '';
  const locationParam = searchParams.get('location') || '';

  // Inputs bind to params
  const [keyword, setKeyword] = useState(keywordParam);
  const [location, setLocation] = useState(locationParam);

  // Sync input fields when params change (on router navigation)
  useEffect(() => {
    setKeyword(keywordParam);
    setLocation(locationParam);
  }, [keywordParam, locationParam]);

  // Update URL when user changes input
  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (location) params.set('location', location);
    router.replace(`/view?${params.toString()}`);
    // replace zamiast push (żeby nie zaśmiecać historii)
    // możesz dać push jeśli chcesz możliwość cofania
  }, [keyword, location]);

  // Filtering
  const filteredPsychologists = useMemo(() => {
    if (!psychologistsData) return [];
    return psychologistsData.filter((p) => {
      const matchesKeyword =
        !keyword ||
        (p.Specialization || '').toLowerCase().includes(keyword.toLowerCase()) ||
        (p.name || '').toLowerCase().includes(keyword.toLowerCase());

      const matchesLocation =
        !location || (p.location || '').toLowerCase().includes(location.toLowerCase());

      return matchesKeyword && matchesLocation;
    });
  }, [keyword, location, psychologistsData]);

  const [selected, setSelected] = useState<Psychologist | null>(null);

  const handleCardClick = (p: Psychologist) => {
    setSelected((prev) => (prev?.id === p.id ? null : p));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '30%', backgroundColor: '#e0f7fa' }}>
        <MapProvider>
          <Map psychologists={filteredPsychologists} selected={selected} />
        </MapProvider>
      </div>
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Filtering Inputs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Specjalizacja / Imię"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Lokalizacja"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {filteredPsychologists.length > 0 ? (
          filteredPsychologists.map((ps) => (
            <div
              key={ps.id}
              onClick={() => handleCardClick(ps)}
              style={{ cursor: 'pointer', width: '100%' }}
            >
              <Card psychologist={ps} />
            </div>
          ))
        ) : (
          <p>Brak wyników dla podanych filtrów.</p>
        )}
      </div>
      {/* Details Panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '25%',
              backgroundColor: '#fff',
              padding: '20px',
              boxShadow: '-2px 0 6px rgba(0,0,0,0.1)',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <DetailsPanel psychologist={selected} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;