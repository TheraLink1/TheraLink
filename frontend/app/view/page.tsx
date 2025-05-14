'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from './Card';
import DetailsPanel from './DetailsPanel';
import { AnimatePresence, motion } from 'framer-motion';

import { Psychologist, mockPsychologists } from '../data/psychologists';

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Psychologist | null>(null);

  // Get search parameters
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';
  const location = searchParams.get('location')?.toLowerCase() || '';

  // Filter psychologists
  const filteredPsychologists = useMemo(() => {
    return mockPsychologists.filter((p) => {
      const matchesKeyword =
        keyword === '' ||
        p.specialization.toLowerCase().includes(keyword) ||
        p.name.toLowerCase().includes(keyword);
      const matchesLocation =
        location === '' || p.address.toLowerCase().includes(location);

      return matchesKeyword && matchesLocation;
    });
  }, [keyword, location]);

  const handleCardClick = (p: Psychologist) => {
    setSelected((prev) => (prev?.id === p.id ? null : p));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Map Column */}
      <div
        style={{
          width: selected ? '25%' : '35%',
          backgroundColor: '#e0f7fa',
          padding: '20px',
          boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ color: '#00796b', fontWeight: 'bold' }}>Mapa</h2>
        <div
          style={{
            flexGrow: 1,
            backgroundColor: '#b2ebf2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: '#00796b' }}>Google Maps Placeholder</p>
        </div>
      </div>

      {/* List Column */}
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
