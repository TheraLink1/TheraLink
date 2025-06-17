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
import {
  useGetAuthUserQuery,
  useGetAppointmentsForClientQuery,
  useGetAvailabilitiesForPsychologistQuery
} from '@/state/api';

const DARK_TEAL = '#2b6369';

const StyledCard = styled(Card)({
  border: `1px solid ${DARK_TEAL}`,
  '&:hover': {
    boxShadow: `0 4px 12px rgba(43, 99, 105, 0.3)`,
  },
});

const StyledChip = styled(Chip)({
  borderColor: DARK_TEAL,
  color: DARK_TEAL,
});

const Title = styled(Typography)({
  color: DARK_TEAL,
  fontWeight: 600,
});

const AppointmentHistory: React.FC = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const clientCognitoId = authUser?.userInfo?.cognitoId;

  const { data: appointments = [], isLoading } = useGetAppointmentsForClientQuery(
    clientCognitoId,
    { skip: !clientCognitoId }
  );

  const [openReschedule, setOpenReschedule] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<any>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedTime, setPickedTime] = useState<string | null>(null);

  const { data: availabilities = [] } = useGetAvailabilitiesForPsychologistQuery(
    selectedAppt?.psychologist?.cognitoId ?? '',
    { skip: !selectedAppt }
  );

  const availableDates = useMemo<string[]>(() => {
    if (!availabilities || availabilities.length === 0) return [];
    const uniqueDates = Array.from(
      new Set(
        availabilities.map(avail => format(new Date(avail.date), 'yyyy-MM-dd'))
      )
    );
    return uniqueDates;
  }, [availabilities]);

  const availableTimes = useMemo<string[]>(() => {
    if (!availabilities || availabilities.length === 0 || !pickedDate) return [];
    const selectedDateKey = format(pickedDate, 'yyyy-MM-dd');
    return availabilities
      .filter(avail => format(new Date(avail.date), 'yyyy-MM-dd') === selectedDateKey)
      .map(avail => avail.startHour || avail.start_hour || avail.time); 
  }, [availabilities, pickedDate]);

  const handleOpenReschedule = (appt: any) => {
    setSelectedAppt(appt);
    setPickedDate(null);
    setPickedTime(null);
    setOpenReschedule(true);
  };
  const handleClose = () => {
    setOpenReschedule(false);
    setSelectedAppt(null);
  };

  const confirmReschedule = () => {
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Title variant="h4" gutterBottom>
          Appointment History
        </Title>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : appointments.length === 0 ? (
          <Typography>No past appointments found.</Typography>
        ) : (
          <Stack spacing={3}>
            {appointments.map((appt: any) => {
              const modifiable = appt.status === 'Pending' || appt.status === 'Approved';
              return (
                <StyledCard key={appt.id} variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6" color={DARK_TEAL}>
                        {new Date(appt.date).toLocaleString()}
                      </Typography>
                      <Divider sx={{ borderColor: DARK_TEAL }} />
                      <Typography><strong>Psychologist:</strong> {appt.psychologist?.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Link
                          href={`mailto:${appt.psychologist?.email}`}
                          style={{ color: DARK_TEAL }}
                        >
                          {appt.psychologist?.email}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Meeting Link:</strong>{' '}
                        <a href={appt.meetingLink} target="_blank" rel="noopener noreferrer">
                          {appt.meetingLink}
                        </a>
                      </Typography>
                      <Typography component="span">
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
                    gridTemplateColumns: `repeat(${Math.ceil(availableTimes.length/3) || 1}, 1fr)`,
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