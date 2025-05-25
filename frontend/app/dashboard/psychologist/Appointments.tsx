import React, { useState, useMemo } from 'react';
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

export interface Appointment {
  id: number;
  date: string;
  meetingLink: string;
  status: 'Pending' | 'Denied' | 'Approved';
  patient: {
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

const mockAvailability: Record<number, Record<string, string[]>> = {
  1: {
    '2025-05-20': ['09:00', '10:00', '11:00'],
    '2025-05-21': ['14:00', '15:00'],
  },
};

interface AppointmentsProps {
  appointments: Appointment[];
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments }) => {
  const [openRescheduleDialog, setOpenRescheduleDialog] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedTime, setPickedTime] = useState<string | null>(null);

  const handleOpenRescheduleDialog = (appt: Appointment) => {
    setSelectedAppt(appt);
    setPickedDate(new Date(appt.date));
    setPickedTime(null);
    setOpenRescheduleDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenRescheduleDialog(false);
    setSelectedAppt(null);
    setPickedDate(null);
    setPickedTime(null);
  };

  const availableDates = useMemo<string[]>(() => {
    if (!selectedAppt) return [];
    return Object.keys(mockAvailability[selectedAppt.patient.id] || {});
  }, [selectedAppt]);

  const availableTimes = useMemo<string[]>(() => {
    if (!selectedAppt || !pickedDate) return [];
    const key = format(pickedDate, 'yyyy-MM-dd');
    return mockAvailability[selectedAppt.patient.id]?.[key] || [];
  }, [selectedAppt, pickedDate]);

  const handleApproveReschedule = () => {
    console.log('Approved reschedule for appointment', selectedAppt?.id, 'to', pickedDate, pickedTime);
    handleCloseDialog();
  };

  const handleDenyReschedule = () => {
    console.log('Denied reschedule for appointment', selectedAppt?.id);
    handleCloseDialog();
  };

  const handleCancelAppointment = (id: number) => {
    console.log('Cancelled appointment', id);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Title variant="h4" gutterBottom>
          Upcoming Appointments
        </Title>

        {appointments.length === 0 ? (
          <Typography>No upcoming appointments.</Typography>
        ) : (
          <Stack spacing={3}>
            {appointments.map(appt => {
              const canModify = appt.status === 'Pending';

              return (
                <StyledCard key={appt.id} variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h6" color={DARK_TEAL}>
                        {new Date(appt.date).toLocaleString()}
                      </Typography>
                      <Divider sx={{ borderColor: DARK_TEAL }} />
                      <Typography><strong>Student:</strong> {appt.patient.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <a href={`mailto:${appt.patient.email}`} style={{ color: DARK_TEAL }}>
                          {appt.patient.email}
                        </a>
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

                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {canModify && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleCancelAppointment(appt.id)}
                          >
                            Cancel Appointment
                          </Button>
                        )}
                        {(appt.status === 'Pending' || appt.status === 'Approved') && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenRescheduleDialog(appt)}
                          >
                            Reschedule Appointment
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

        <Dialog open={openRescheduleDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">
          <DialogTitle>Approve / Modify Reschedule</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Select new date:
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
                  Available times:
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.ceil(availableTimes.length / 3)}, 1fr)`,
                    gap: 1,
                    mt: 1,
                  }}
                >
                  {availableTimes.length > 0 ? (
                    availableTimes.map(t => (
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
                  ) : (
                    <Typography variant="body2">No available times</Typography>
                  )}
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleApproveReschedule}
              variant="contained"
              disabled={!pickedDate || !pickedTime}
              sx={{ backgroundColor: DARK_TEAL }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Appointments;
