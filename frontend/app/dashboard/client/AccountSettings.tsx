'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useGetAuthUserQuery, useUpdateClientMutation } from '@/state/api';

const primaryColor = '#2b6369';
const hoverColor = '#224f54';

const AccountSettings: React.FC = () => {
  const { data: authData, refetch } = useGetAuthUserQuery();
  const [updateClient, { isLoading }] = useUpdateClientMutation();

  const client = authData?.userInfo;

  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; success: boolean }>({
    open: false,
    message: '',
    success: false,
  });

  useEffect(() => {
    if (client) {
      setForm({
        name: client.name || '',
        email: client.email || '',
      });
    }
  }, [client]);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSave = async () => {
    if (!client?.cognitoId) return;
    try {
      await updateClient({ cognitoId: client.cognitoId, ...form }).unwrap();
      setSnackbar({
        open: true,
        message: 'Zapisano zmiany!',
        success: true,
      });
      refetch(); 
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Nie udało się zapisać zmian.',
        success: false,
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh',
        paddingTop: '40px',
        paddingBottom: '100px',
      }}
    >
      <Box
        width="100%"
        maxWidth="500px"
        bgcolor="#ffffff"
        p={2}
        borderRadius="10px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        border="1px solid #e0e0e0"
      >
        <Typography variant="h5" mb={2} sx={{ color: primaryColor }}>
          Account Settings
        </Typography>
        <Typography variant="body2" mb={2} color="text.secondary">
          Keeping your account information up to date helps us serve you better.
        </Typography>
        <Box mb={3}>
          <Typography fontWeight="bold" mb={1} color="#555">
            Name
          </Typography>
          <TextField
            fullWidth
            value={form.name}
            onChange={handleChange('name')}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box mb={3}>
          <Typography fontWeight="bold" mb={1} color="#555">
            Email
          </Typography>
          <TextField
            fullWidth
            value={form.email}
            onChange={handleChange('email')}
            variant="outlined"
            size="small"
            type="email"
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: primaryColor,
            '&:hover': {
              backgroundColor: hoverColor,
            },
          }}
          onClick={handleSave}
          disabled={isLoading || !form.name || !form.email}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snackbar.success ? 'success' : 'error'}
            variant="filled"
            sx={{ width: '100%' }}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AccountSettings;