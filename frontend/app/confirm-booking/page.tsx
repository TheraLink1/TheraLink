'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { useCreateAppointmentMutation, useGetAuthUserQuery } from '@/state/api';

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const psychologistId = searchParams.get('psychologistId');
  const [psychologist, setPsychologist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; success: boolean; message: string }>({ open: false, success: false, message: '' });

  const { data: authUser, isLoading: userLoading } = useGetAuthUserQuery();

  useEffect(() => {
    if (!psychologistId) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/psychologists/${psychologistId}`)
      .then((res) => res.json())
      .then((data) => setPsychologist(data))
      .catch(() => setPsychologist(null))
      .finally(() => setLoading(false));
  }, [psychologistId]);

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const handleConfirm = async () => {
    if (!date || !time || !psychologistId || !authUser?.userInfo?.cognitoId) {
      setSnackbar({ open: true, success: false, message: 'Nieprawidłowy użytkownik lub brak danych.' });
      return;
    }
  
    // Połącz date + time w jeden string DateTime
    const fullDateTimeString = `${date}T${time}:00`;
  
    try {
      await createAppointment({
        cognitoId: authUser?.userInfo?.cognitoId,
        psychologistId: psychologistId,
        date: fullDateTimeString, 
        patientName: authUser?.userInfo?.name || 'Pacjent',
        description,
      }).unwrap();
  
      setSnackbar({ open: true, success: true, message: 'Wizyta została zarezerwowana!' });
      setTimeout(() => router.push('/'), 2000);
    } catch (e) {
      console.log(e);
      setSnackbar({ open: true, success: false, message: 'Wystąpił błąd podczas rezerwacji.' });
    }
  };

  if (loading || userLoading) return <div>Ładowanie...</div>;

  const canConfirm =
    !!psychologist &&
    !!date &&
    !!time &&
    !!authUser?.userInfo?.cognitoId;

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
              <strong>Specjalizacja:</strong> {psychologist.Specialization}
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
          disabled={!canConfirm}
        >
          Potwierdź wizytę
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.success ? 'success' : 'error'} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ConfirmationPage;
