// Billings.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/ReceiptLong';

export interface PaymentRecord {
  id: number;
  date: string;
  amount: number;
  status: 'Paid' | 'Not payed';
}

export interface CardInfo {
  brand: string;
  last4: string;
  expiry: string;   // MM/YY
  cardholder: string;
}

const DARK_TEAL = '#2b6369';

// Section headings
const SectionTitle = styled(Typography)({
  color: DARK_TEAL,
  fontWeight: 600,
  marginBottom: 16,
});

// ATM‐style card with proper aspect ratio
const ATMCard = styled(Card)({
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  color: '#fff',
  backgroundImage: `linear-gradient(135deg, ${DARK_TEAL} 0%, #1f4f52 100%)`,
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  aspectRatio: '1.586 / 1',
  width: '100%',
  maxWidth: 340,
  margin: '0 auto',
  padding: '24px',
});

// Status chip colors
const statusColorMap: Record<PaymentRecord['status'], string> = {
  Paid: DARK_TEAL,
  'Not payed': '#ff9800',
};

interface BillingsProps {
  userName: string;
  cardInfo: CardInfo;
  payments: PaymentRecord[];
}

const Billings: React.FC<BillingsProps> = ({ userName, cardInfo, payments }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CardInfo>(cardInfo);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (field: keyof CardInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });
  const handleSave = () => {
    console.log('Saved card info:', form);
    handleClose();
  };

  return (
    <Box>
      <SectionTitle variant="h4">Billings</SectionTitle>

      {/* ATM-style card */}
      <ATMCard>
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 40,
            height: 30,
            backgroundColor: '#ccc',
            borderRadius: '4px',
          }}
        />

        <Typography variant="h6" sx={{ letterSpacing: 2, mt: 4, mb: 2 }}>
          ****  ****  ****  {cardInfo.last4}
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              CARDHOLDER
            </Typography>
            <Typography variant="body2">
              {cardInfo.cardholder.toUpperCase()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              EXPIRES
            </Typography>
            <Typography variant="body2">{cardInfo.expiry}</Typography>
          </Box>
        </Stack>

        <Box
          component="span"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            fontSize: '1.2rem',
            opacity: 0.8,
          }}
        >
          {cardInfo.brand}
        </Box>
      </ATMCard>

      {/* Update Card button */}
      <Box textAlign="right" mt={2} mb={4}>
        <Button
          variant="outlined"
          sx={{ borderColor: DARK_TEAL, color: DARK_TEAL }}
          startIcon={<CreditCardIcon />}
          onClick={handleOpen}
        >
          Update Card
        </Button>
      </Box>

      {/* Dialog for updating card */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Card Information</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="Brand"
              value={form.brand}
              onChange={handleChange('brand')}
              fullWidth
            />
            <TextField
              label="Last4"
              value={form.last4}
              onChange={handleChange('last4')}
              inputProps={{ maxLength: 4 }}
              fullWidth
            />
            <TextField
              label="Expiry (MM/YY)"
              value={form.expiry}
              onChange={handleChange('expiry')}
              placeholder="MM/YY"
              fullWidth
            />
            <TextField
              label="Cardholder"
              value={form.cardholder}
              onChange={handleChange('cardholder')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: DARK_TEAL }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment History */}
      <SectionTitle variant="h5">Payment History</SectionTitle>
      <Stack spacing={2}>
        {payments.map((p) => (
          <Card key={p.id} variant="outlined" sx={{ borderColor: DARK_TEAL }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                {/* Icon */}
                <PaymentIcon sx={{ color: DARK_TEAL, fontSize: 28 }} />

                {/* Date & Amount */}
                <Box flex={1}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(p.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">{p.amount} zł</Typography>
                </Box>

                {/* Status chip */}
                <Chip
                  label={p.status}
                  variant="outlined"
                  sx={{
                    borderColor: statusColorMap[p.status],
                    color: statusColorMap[p.status],
                  }}
                  size="small"
                />

                {/* Action button on the far right */}
                <Box sx={{ flexShrink: 0, ml: 2 }}>
                  {p.status === 'Not payed' ? (
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: DARK_TEAL,
                        width: 120,
                        textTransform: 'none',
                      }}
                    >
                      Pay
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: DARK_TEAL,
                        color: DARK_TEAL,
                        width: 120,
                        textTransform: 'none',
                      }}
                    >
                      Generate PDF
                    </Button>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Billings;