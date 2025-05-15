// AppointmentHistory.tsx
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  LocalizationProvider,
  DateCalendar,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

// eksport interfejsu
export interface Appointment {
  id: number;
  date: string;
  meetingLink: string;
  status: 'Pending' | 'Denied' | 'Approved';
  psychologist: {
    id: number;
    name: string;
    email: string;
  };
  payment?: {
    amount: number;
    isPaid: boolean;
    paymentDate: string;
  };
}

// Mock data: availability per psychologist.id
const mockAvailability: Record<number, Record<string, string[]>> = {
  // psycholog o id=1 ma dostępność 2 dni
  1: {
    '2025-05-20': ['09:00', '10:00', '11:00'],
    '2025-05-21': ['14:00', '15:00'],
  },
  // inny psycholog
  2: {
    '2025-05-19': ['08:00', '12:00'],
    '2025-05-22': ['10:00', '13:00', '16:00'],
  },
};

const DARK_TEAL = '#2b6369';

// Stylowany Card
const StyledCard = styled(Card)({
  border: `1px solid ${DARK_TEAL}`,
  '&:hover': {
    boxShadow: `0 4px 12px rgba(43, 99, 105, 0.3)`,
  },
});

// Stylowany chip
const StyledChip = styled(Chip)({
  borderColor: DARK_TEAL,
  color: DARK_TEAL,
});

// Stylowany tytuł
const Title = styled(Typography)({
  color: DARK_TEAL,
  fontWeight: 600,
});

interface AppointmentHistoryProps {
  appointments: Appointment[];
}

const AppointmentHistory: React.FC<AppointmentHistoryProps> = ({ appointments }) => {
  const [openReschedule, setOpenReschedule] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedTime, setPickedTime] = useState<string | null>(null);

  // kiedy otwieramy dialog reschedule
  const handleOpenReschedule = (appt: Appointment) => {
    setSelectedAppt(appt);
    setPickedDate(null);
    setPickedTime(null);
    setOpenReschedule(true);
  };
  const handleClose = () => {
    setOpenReschedule(false);
    setSelectedAppt(null);
  };

  // dostępne daty dla wybranego psychologa
  const availableDates = useMemo<string[]>(() => {
    if (!selectedAppt) return [];
    return Object.keys(mockAvailability[selectedAppt.psychologist.id] || {});
  }, [selectedAppt]);

  // dostępne godziny dla wybranego dnia
  const availableTimes = useMemo<string[]>(() => {
    if (!selectedAppt || !pickedDate) return [];
    const key = format(pickedDate, 'yyyy-MM-dd');
    return mockAvailability[selectedAppt.psychologist.id]?.[key] || [];
  }, [selectedAppt, pickedDate]);

  const confirmReschedule = () => {
    console.log('Rescheduling appt', selectedAppt?.id, 'to', pickedDate, pickedTime);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Title variant="h4" gutterBottom>
          Appointment History
        </Title>
        {appointments.length === 0 ? (
          <Typography>No past appointments found.</Typography>
        ) : (
          <Stack spacing={3}>
            {appointments.map(appt => {
              const modifiable = appt.status === 'Pending' || appt.status === 'Approved';
              return (
                <StyledCard key={appt.id} variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6" color={DARK_TEAL}>
                        {new Date(appt.date).toLocaleString()}
                      </Typography>
                      <Divider sx={{ borderColor: DARK_TEAL }} />
                      <Typography><strong>Psychologist:</strong> {appt.psychologist.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Link
                          href={`mailto:${appt.psychologist.email}`}
                          style={{ color: DARK_TEAL }}
                        >
                          {appt.psychologist.email}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Meeting Link:</strong>{' '}
                        <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer">
                          {appt.meetingLink}
                        </a>
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong>{' '}
                        <StyledChip label={appt.status} size="small" variant="outlined" />
                      </Typography>
                      {appt.payment && (
                        <>
                          <Typography variant="body2">
                            {appt.payment.isPaid ? 'Paid' : 'Unpaid'} – {appt.payment.amount} zł
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Payment Date: {new Date(appt.payment.paymentDate).toLocaleDateString()}
                          </Typography>
                        </>
                      )}
                      <Stack direction="row" spacing={1}>
                        {modifiable && (
                          <>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: DARK_TEAL, color: DARK_TEAL }}
                              onClick={() => handleOpenReschedule(appt)}
                            >
                              Reschedule
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: DARK_TEAL, color: DARK_TEAL }}
                              onClick={() => console.log('Cancel', appt.id)}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        {appt.status === 'Denied' && (
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: DARK_TEAL, color: DARK_TEAL }}
                            onClick={() => console.log('Contact', appt.psychologist.email)}
                          >
                            Contact Psychologist
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>
                </StyledCard>
              );
            })}
          </Stack>
        )}

        {/* Dialog Reschedule */}
        <Dialog open={openReschedule} onClose={handleClose} fullWidth maxWidth="xs">
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Wybierz nową datę:
            </Typography>
            <DateCalendar
              value={pickedDate}
              onChange={d => {
                setPickedDate(d);
                setPickedTime(null);
              }}
              shouldDisableDate={day => {
                const key = format(day, 'yyyy-MM-dd');
                return !availableDates.includes(key);
              }}
              sx={{
                '& .MuiPickersDay-root.Mui-disabled': { color: '#ccc' },
                '& .MuiPickersDay-root.Mui-selected': {
                  backgroundColor: DARK_TEAL,
                  color: '#fff',
                },
                '& .MuiTypography-root': { color: DARK_TEAL },
              }}
            />
            {pickedDate && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Dostępne godziny:
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.ceil(availableTimes.length/3)}, 1fr)`,
                    gap: 1,
                    mt: 1,
                  }}
                >
                  {availableTimes.length > 0
                    ? availableTimes.map(t => (
                        <Button
                          key={t}
                          size="small"
                          variant={t === pickedTime ? 'contained' : 'outlined'}
                          sx={{
                            borderColor: DARK_TEAL,
                            color: DARK_TEAL,
                            '&.MuiButton-contained': {
                              backgroundColor: DARK_TEAL,
                              color: '#fff',
                            },
                          }}
                          onClick={() => setPickedTime(t)}
                        >
                          {t}
                        </Button>
                      ))
                    : <Typography variant="body2">Brak godzin</Typography>}
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Anuluj</Button>
            <Button
              onClick={confirmReschedule}
              variant="contained"
              disabled={!pickedDate || !pickedTime}
              sx={{ backgroundColor: DARK_TEAL }}
            >
              Potwierdź
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default AppointmentHistory;