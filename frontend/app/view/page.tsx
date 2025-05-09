'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from './Card';
import DetailsPanel from './DetailsPanel';

interface Psychologist {
    id: number;
    name: string;
    specialization: string;
    address: string;
    rate: number;
    rating: number;
}

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const keyword = searchParams.get('keyword');
    const location = searchParams.get('location');


    const psychologists: Psychologist[] = [
        { id: 1, name: 'Dr. John Doe', specialization: 'Clinical Psychology', address: '123 Main St, Springfield', rate: 120, rating: 4.5 },
        { id: 2, name: 'Dr. Jane Smith', specialization: 'Child Psychology', address: '456 Elm St, Springfield', rate: 100, rating: 4.8 },
        { id: 3, name: 'Dr. Emily Johnson', specialization: 'Behavioral Psychology', address: '789 Oak St, Springfield', rate: 110, rating: 4.7 },
        // …you can add more here
    ];

    const [selected, setSelected] = useState<Psychologist | null>(null);

    const handleCardClick = (p: Psychologist) => {
        setSelected(prev => (prev?.id === p.id ? null : p));
    };

    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                backgroundColor: '#f9f9f9',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            {/* Search parameters display */}
            <div
                style={{
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #ddd',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h3>Search Parameters</h3>
                <p><strong>Mode:</strong> {mode || 'Not specified'}</p>
                <p><strong>Keyword:</strong> {keyword || 'Not specified'}</p>
                <p><strong>Location:</strong> {location || 'Not specified'}</p>
            </div>
            {/* Cards list */}
            <div
                style={{
                    flex: selected ? 0.7 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    transition: 'flex 0.3s ease', // Smooth transition
                }}
            >
                {psychologists.map(ps => (
                    <div
                        key={ps.id}
                        onClick={() => handleCardClick(ps)}
                        style={{ cursor: 'pointer', width: '100%' }}
                    >
                        <Card
                            psychologist={{
                                name: ps.name,
                                specialization: ps.specialization,
                                adress: ps.address,
                                rate: ps.rate,
                                rating: ps.rating,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Details panel */}
            {selected && (
                <DetailsPanel psychologist={selected} />
            )}
        </div>
    );
};

export default Page;
