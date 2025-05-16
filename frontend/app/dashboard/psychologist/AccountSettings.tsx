// components/AccountSettings.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Button,
  Rating,
} from '@mui/material';
import { styled } from '@mui/system';
import { Psychologist } from '../../data/psychologists';
import AddressAutocomplete from '../../components/AddressAutocomplete';
import {MapProvider} from '../../components/MapProvider';

const DARK_TEAL = '#2b6369';

const SettingsCard = styled(Card)({
  border: `1px solid ${DARK_TEAL}`,
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

const SectionHeader = styled(Typography)({
  color: DARK_TEAL,
  fontWeight: 600,
  marginBottom: 16,
});

interface Props {
  psychologist: Psychologist;
}

const AccountSettings: React.FC<Props> = ({ psychologist }) => {
  const [form, setForm] = useState({
    name: psychologist.name,
    specialization: psychologist.specialization,
    address: psychologist.address,
    rate: psychologist.rate,
    description: psychologist.description,
  });

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleAddressChange = (address: string) => {
    setForm({ ...form, address });
  };

  const handleSave = () => {
    console.log('Saved settings:', form);
    // Implement save functionality here
  };

  return (
    <MapProvider>
      <Box>
        <SettingsCard>
          <CardContent>
            <SectionHeader variant="h5">Account Settings</SectionHeader>
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                value={form.name}
                onChange={handleChange('name')}
                fullWidth
              />
              <TextField
                label="Specialization"
                value={form.specialization}
                onChange={handleChange('specialization')}
                fullWidth
              />
              {/* Address Field with Google Maps Autocomplete */}
              <AddressAutocomplete value={form.address} onChange={handleAddressChange} />
              <TextField
                label="Hourly Rate (PLN)"
                type="number"
                value={form.rate}
                onChange={handleChange('rate')}
                sx={{ width: 160 }}
              />
              {/* Read-only Rating Display */}
              <Box>
                <Typography variant="body2" sx={{ color: DARK_TEAL, mb: 0.5 }}>
                  Rating
                </Typography>
                <Rating
                  value={psychologist.rating}
                  precision={0.1}
                  readOnly
                  sx={{ '& .MuiRating-iconFilled': { color: DARK_TEAL } }}
                />
              </Box>
              <TextField
                label="Description"
                value={form.description}
                onChange={handleChange('description')}
                multiline
                rows={4}
                fullWidth
              />
              <Box textAlign="right">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: DARK_TEAL,
                    textTransform: 'none',
                    px: 4,
                  }}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </SettingsCard>
      </Box>
    </MapProvider>
  );
};

export default AccountSettings;
