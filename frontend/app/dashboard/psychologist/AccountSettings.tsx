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
import AddressAutocomplete from '../../components/AddressAutocomplete';
import {MapProvider} from '../../components/MapProvider';
import { useGetAuthUserQuery, useUpdatePsychologistMutation } from '@/state/api';
import { Psychologist } from '@/types/prismaTypes';

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
  const { data: authUser } = useGetAuthUserQuery();
  const [form, setForm] = useState({
    name: psychologist.name || "",
    Specialization: psychologist.Specialization || "",
    location: psychologist.location || "",
    hourlyRate: psychologist.hourlyRate ?? 0,
    Description: psychologist.Description || "",
  });


  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleAddressChange = (address: string) => {
    setForm({ ...form, location: address });
  };

  const [updatePsychologist, { isLoading, isSuccess,isError, error }] = useUpdatePsychologistMutation();

const handleSave = async () => {
  const payload = {
    cognitoId: authUser?.userInfo.cognitoId,
    name: form.name,
    Specialization: form.Specialization,
    location: form.location,
    hourlyRate: Number(form.hourlyRate),
    Description: form.Description,
  };
  try {
    await updatePsychologist(payload).unwrap();
    // Sukces – można dać powiadomienie
  } catch (err) {
    console.log(err);
  }
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
                value={form.Specialization}
                onChange={handleChange('Specialization')}
                fullWidth
              />
              {/* Address Field with Google Maps Autocomplete */}
              <AddressAutocomplete value={form.location} onChange={handleAddressChange} />
              <TextField
                label="Hourly Rate (PLN)"
                type="number"
                value={form.hourlyRate}
                onChange={handleChange('hourlyRate')}
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
                value={form.Description}
                onChange={handleChange('Description')}
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
                  disabled={isLoading}
                >
                  Save Changes
                </Button>
                {isSuccess && (
                  <Typography sx={{ mt: 1, color: 'green' }}>
                    Settings saved successfully.
                  </Typography>
                )}
                {isError && (
                  <Typography sx={{ mt: 1, color: 'red' }}>
                    Error saving settings. Please try again.
                  </Typography>
                )}
              </Box>
            </Stack>
          </CardContent>
        </SettingsCard>
      </Box>
    </MapProvider>
  );
};

export default AccountSettings;
