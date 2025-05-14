import React from 'react';
import { Star } from '@mui/icons-material';
import { Typography, Box, Paper } from '@mui/material';

interface Psychologist {
  name: string;
  specialization: string;
  address: string;
  rate: number;
  rating: number;
  description?: string;
}

interface CardProps {
  psychologist: Psychologist;
}

const Card: React.FC<CardProps> = ({ psychologist }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '80%',
        margin: '16px auto',
        padding: 2,
        backgroundColor: '#fff',
        border: '1px solid #2b6369',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ color: '#2b6369', fontWeight: 'bold', mb: 0.5 }}>
          {psychologist.name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#2b6369', mb: 0.5 }}>
          {psychologist.specialization}
        </Typography>
        <Typography variant="body2" sx={{ color: '#2b6369', mb: 0.5 }}>
          Adres: {psychologist.address}
        </Typography>
        <Typography variant="body2" sx={{ color: '#2b6369', mb: 0.5 }}>
          Stawka: {psychologist.rate} zł
        </Typography>
        {psychologist.description && (
          <Typography variant="body2" sx={{ color: '#2b6369' }}>
            {psychologist.description}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          minWidth: 100,
          textAlign: 'right',
        }}
      >
        <Typography variant="body1" sx={{ color: '#2b6369', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {psychologist.rating} <Star sx={{ color: '#2b6369', fontSize: 18, ml: 0.5 }} />
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#2b6369',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Więcej informacji
        </Typography>
      </Box>
    </Paper>
  );
};

export default Card;
