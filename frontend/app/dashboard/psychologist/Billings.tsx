// components/Billings.tsx

'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  AttachMoney,
  AccountBalanceWallet,
  MonetizationOn,
} from '@mui/icons-material';
import { Appointment } from './Appointments';

interface BillingsProps {
  appointments: Appointment[];
}

const primaryColor = '#2b6369';
const hoverColor = '#224f54';

const Billings: React.FC<BillingsProps> = ({ appointments }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [cashOutAmount, setCashOutAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  // Filter out denied appointments
  const relevantAppointments = appointments.filter(
    (appt) => appt.status === 'Approved' || appt.status === 'Pending'
  );

  const paidAppointments = relevantAppointments.filter(
    (appt) => appt.payment && appt.payment.isPaid
  );
  const unpaidAppointments = relevantAppointments.filter(
    (appt) => appt.payment && !appt.payment.isPaid
  );

  const totalEarned = paidAppointments.reduce(
    (sum, appt) => sum + (appt.payment?.amount || 0),
    0
  );
  const pendingAmount = unpaidAppointments.reduce(
    (sum, appt) => sum + (appt.payment?.amount || 0),
    0
  );

  const handleCashOutClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setAmountError('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const amount = parseFloat(cashOutAmount);
    if (isNaN(amount) || amount <= 0) {
      setAmountError('Please enter a valid amount.');
      return;
    }
    if (amount > totalEarned) {
      setAmountError('Amount exceeds available balance.');
      return;
    }
    // Process bank details and cash out amount here (e.g., send to API)
    setDialogOpen(false);
    setSnackbarOpen(true);
    // Reset form fields
    setBankName('');
    setAccountNumber('');
    setAccountHolder('');
    setCashOutAmount('');
    setAmountError('');
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5" sx={{ color: primaryColor, mb: 3 }}>
        Billing Overview
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          mb: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: '1 1 300px',
            padding: '20px',
            borderLeft: `5px solid ${primaryColor}`,
            backgroundColor: '#ffffff',
          }}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <AttachMoney sx={{ color: primaryColor, mr: 1 }} />
            <Typography variant="subtitle1" sx={{ color: '#555' }}>
              Total Earned
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ color: '#333' }}>
            PLN {totalEarned.toFixed(2)}
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: '1 1 300px',
            padding: '20px',
            borderLeft: `5px solid ${hoverColor}`,
            backgroundColor: '#ffffff',
          }}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <AccountBalanceWallet sx={{ color: hoverColor, mr: 1 }} />
            <Typography variant="subtitle1" sx={{ color: '#555' }}>
              Pending Payments
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ color: '#333' }}>
            PLN {pendingAmount.toFixed(2)}
          </Typography>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      

      <Box>
        <Typography variant="h6" sx={{ color: primaryColor, mb: 2 }}>
          Payment Details
        </Typography>
        <Paper elevation={1} sx={{ backgroundColor: '#ffffff' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              padding: '10px 20px',
              borderBottom: '1px solid #e0e0e0',
              fontWeight: 'bold',
              color: '#555',
            }}
          >
            <Box>Date</Box>
            <Box>Patient</Box>
            <Box>Amount</Box>
            <Box>Status</Box>
          </Box>
          {relevantAppointments.map((appt) => {
            const date = new Date(appt.date).toLocaleDateString();
            const amount = appt.payment?.amount
              ? `PLN ${appt.payment.amount.toFixed(2)}`
              : '—';
            const status = appt.payment?.isPaid ? 'Paid' : 'Unpaid';
            const statusColor = appt.payment?.isPaid ? 'green' : 'orange';

            return (
              <Box
                key={appt.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  padding: '10px 20px',
                  borderBottom: '1px solid #f0f0f0',
                  color: '#333',
                }}
              >
                <Box>{date}</Box>
                <Box>{appt.patient.name}</Box>
                <Box>{amount}</Box>
                <Box sx={{ color: statusColor, fontWeight: 500 }}>{status}</Box>
              </Box>
            );
          })}
        </Paper>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          startIcon={<MonetizationOn />}
          sx={{
            backgroundColor: primaryColor,
            '&:hover': {
              backgroundColor: hoverColor,
            },
            padding: '10px 20px',
          }}
          onClick={handleCashOutClick}
        >
          Cash Out
        </Button>
      </Box>

      {/* Bank Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <form onSubmit={handleFormSubmit}>
          <DialogTitle>Enter Bank Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Bank Name"
              type="text"
              fullWidth
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Account Number"
              type="text"
              fullWidth
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Account Holder Name"
              type="text"
              fullWidth
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Amount to Cash Out"
              type="number"
              fullWidth
              value={cashOutAmount}
              onChange={(e) => setCashOutAmount(e.target.value)}
              required
              error={!!amountError}
              helperText={amountError}
              inputProps={{ min: 0, max: totalEarned }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Available Balance: PLN {totalEarned.toFixed(2)}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: primaryColor }}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Cash out request submitted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Billings;
