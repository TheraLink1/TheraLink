import React from 'react';

interface Psychologist {
    name: string;
    specialization: string;
    adress: string;
    rate: number;
    rating: number;
}

interface CardProps {
    psychologist: Psychologist;
}

const Card: React.FC<CardProps> = ({ psychologist }) => {
    return (
        <div style={styles.card}>
            <h2 style={styles.name}>{psychologist.name}</h2>
            <p style={styles.specialization}>{psychologist.specialization}</p>
            <p style={styles.address}>{psychologist.adress}</p>
            <p style={styles.moreInfo}>Click the card for more info</p>
        </div>
    );
};

const styles = {
    card: {
        width: '60%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center' as const,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '16px auto',
        position: 'relative' as const,
    },
    name: {
        fontSize: '1.5rem',
        margin: '8px 0',
    },
    specialization: {
        fontSize: '1rem',
        color: '#555',
    },
    address: {
        fontSize: '0.9rem',
        color: '#777',
        marginBottom: '16px',
    },
    moreInfo: {
        fontSize: '0.8rem',
        color: '#2b6369',
        textDecoration: 'underline',
        position: 'absolute' as const,
        bottom: '4px',
        right: '8px',
    },
};

export default Card;
