'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockPsychologists } from '../data/psychologists';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const psychologistId = searchParams.get('psychologist_id');

  const psychologist = mockPsychologists.find(
    (p) => p.id === Number(psychologistId)
  );

  const [description, setDescription] = useState('');

  const handleConfirm = () => {
    // Handle the confirmation logic here, such as sending data to the server
    console.log('Appointment confirmed with details:', {
      date,
      time,
      psychologistId,
      description,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" sx={{ color: '#2b6369', fontWeight: 'bold', mb: 2 }}>
          Potwierdzenie wizyty
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Data:</strong> {date}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Godzina:</strong> {time}
        </Typography>

        {psychologist ? (
          <>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Psycholog:</strong> {psychologist.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Specjalizacja:</strong> {psychologist.specialization}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" sx={{ mb: 2, color: 'red' }}>
            Nie znaleziono psychologa o podanym identyfikatorze.
          </Typography>
        )}

        <TextField
          label="Opisz swój problem"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#2b6369', color: '#fff' }}
          onClick={handleConfirm}
        >
          Potwierdź wizytę
        </Button>
      </Paper>
    </Box>
  );
};

export default ConfirmationPage;
