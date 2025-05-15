'use client';

import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface AccountSettingsProps {
  user: {
        id: number;
        role: string;
        name: string;
        email: string;
  };
}

const primaryColor = '#2b6369';
const hoverColor = '#224f54';

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100vh', // use full viewport height
        paddingTop: '40px', // match header height if sticky
        paddingBottom: '100px', // space for fixed footer
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
            value={user.name}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box mb={2}>
          <Typography variant="h6" mb={1.5} sx={{ color: primaryColor }}>
            Change Password
          </Typography>
          <Typography variant="body2" mb={1} color="text.secondary">
            To update your password, please enter your current password along with the new one.
          </Typography>
          <Typography variant="body2" mb={1} color="text.secondary">
            You'll need to confirm the change. Check your inbox.
          </Typography>

          <TextField
            fullWidth
            type="password"
            placeholder="Current Password"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            placeholder="New Password"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: primaryColor,
              '&:hover': {
                backgroundColor: hoverColor,
              },
            }}
          >
            Update Password
          </Button>
        </Box>


        <Box>
          <Typography variant="h6" mb={2} sx={{ color: primaryColor }}>
            Update Email
          </Typography>
          <Typography variant="body2" mb={1} color="text.secondary">
            You'll need to confirm the change. Check the old email address to finish updating the email.
          </Typography>
          <TextField
            fullWidth
            type="email"
            placeholder="New Email"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: primaryColor,
              '&:hover': {
                backgroundColor: hoverColor,
              },
            }}
          >
            Update Email
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountSettings;
