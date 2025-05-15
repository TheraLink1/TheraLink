'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const tiles = [
  {
    title: 'Czym jest TheraLink?',
    desc: `TheraLink to nowoczesna platforma, która pomaga w łatwy sposób znaleźć specjalistów 
medycznych online lub stacjonarnie. Dzięki prostemu interfejsowi, możesz umówić wizytę w kilku krokach.`,
  },
  {
    title: 'Jak działamy?',
    desc: `Wyszukuj lekarzy według specjalizacji, lokalizacji lub nazwiska. Przeglądaj profile, 
sprawdzaj oceny i umawiaj wizyty z wybranym specjalistą – wszystko online lub stacjonarnie.`,
  },
  {
    title: 'Dlaczego akurat my?',
    desc: `TheraLink to szybka, wygodna i bezpieczna usługa umawiania wizyt. Zaufaj naszej 
bogatej bazie ekspertów i zaoszczędź czas dzięki prostym rozwiązaniom.`,
  },
];

export default function Page() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ keyword, location }).toString();
    router.push(`/view?${params}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Teal Header with Inline Search */}
      <Box sx={{ bgcolor: '#2b6369', color: '#fff', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Znajdź lekarza i umów wizytę
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.9 }}>
            Znajdź idealnego specjalistę w kilka chwil. Wybierz, co Ci odpowiada.
          </Typography>

          {/* Wider Search Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              gap: 1.5,
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Specjalizacja lub nazwisko"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              size="small"
              sx={{
                bgcolor: '#ffffff',
                borderRadius: '8px',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                width: { xs: '100%', sm: 320 },           // widened
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  '& fieldset': { borderColor: '#ccc' },
                  '&:hover fieldset': { borderColor: '#1f4f52' },
                  '&.Mui-focused fieldset': { borderColor: '#1f4f52', borderWidth: 2 },
                },
                '& .MuiInputAdornment-root svg': { color: '#1f4f52' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MedicalServicesIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Miasto lub kod pocztowy"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              size="small"
              sx={{
                bgcolor: '#ffffff',
                borderRadius: '8px',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                width: { xs: '100%', sm: 280 },           // widened
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  '& fieldset': { borderColor: '#ccc' },
                  '&:hover fieldset': { borderColor: '#1f4f52' },
                  '&.Mui-focused fieldset': { borderColor: '#1f4f52', borderWidth: 2 },
                },
                '& .MuiInputAdornment-root svg': { color: '#1f4f52' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                bgcolor: '#00bfa5',
                color: '#fff',
                borderRadius: '8px',
                px: 3,
                py: 1.5,
                minHeight: 40,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#009e8f' },
              }}
            >
              Szukaj
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Explanation Tiles */}
      <Box sx={{ bgcolor: '#f4f4f4', py: 8, flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            sx={{
              overflowX: { xs: 'auto', md: 'visible' },
              py: 2,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {tiles.map((tile, i) => (
              <Paper
                key={i}
                elevation={2}
                sx={{
                  flex: '0 0 300px',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  border: '2px solid #2b6369',
                  bgcolor: '#fff',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: '#2b6369', fontWeight: 'bold' }}
                >
                  {tile.title}
                </Typography>
                <Typography sx={{ color: '#2b6369', flexGrow: 1, lineHeight: 1.6 }}>
                  {tile.desc}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
