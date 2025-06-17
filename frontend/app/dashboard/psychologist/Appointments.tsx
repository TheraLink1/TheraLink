import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { format } from 'date-fns';
import {
  useGetAuthUserQuery,
  useGetAppointmentsForPsychologistQuery,
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

interface Client {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface Payment {
  amount: number;
  isPaid: boolean;
  paymentDate: string;
}

interface AppointmentFromApi {
  id: number;
  date: string;
  meetingLink: string;
  Status: 'Pending' | 'Denied' | 'Approved';
  client: Client | null;
  payment?: Payment;
}

const Appointments: React.FC = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const cognitoId = authUser?.userInfo?.cognitoId;

  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAppointmentsForPsychologistQuery(cognitoId ?? '', {
    skip: !cognitoId,
  });

  if (isLoading) {
    return <Typography>Loading appointments...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading appointments.</Typography>;
  }

  return (
    <Box>
      <Title variant="h4" gutterBottom>
        Upcoming Appointments
      </Title>

      {!appointments || appointments.length === 0 ? (
        <Typography>No upcoming appointments.</Typography>
      ) : (
        <Stack spacing={3}>
          {appointments.map((appt: AppointmentFromApi) => {
            const canModify = appt.Status === 'Pending';

            return (
              <StyledCard key={appt.id} variant="outlined">
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6" color={DARK_TEAL}>
                      {format(new Date(appt.date), 'Pp')}
                    </Typography>
                    <Divider sx={{ borderColor: DARK_TEAL }} />
                    <Typography>
                      <strong>Client:</strong> {appt.client?.name ?? 'Brak danych'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a href={`mailto:${appt.client?.email ?? ''}`} style={{ color: DARK_TEAL }}>
                        {appt.client?.email ?? '-'}
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
                      <StyledChip label={appt.Status} size="small" variant="outlined" />
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
                      <Button
                        variant="outlined"
                        color="error"
                        disabled={!canModify}
                        onClick={() => {
                          /* TODO: Implement cancel appointment */
                        }}
                      >
                        Cancel Appointment
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={!(appt.Status === 'Pending' || appt.Status === 'Approved')}
                        onClick={() => {
                          /* TODO: Implement reschedule appointment */
                        }}
                      >
                        Reschedule Appointment
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </StyledCard>
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default Appointments;