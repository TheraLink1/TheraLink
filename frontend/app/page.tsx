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
import {FloatingChat} from '@/components/FloatingChat';

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

      <Box sx={{ bgcolor: '#ffffff', py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: 'center', color: '#2b6369' }}
          >
            Opinie użytkowników
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: 'center', mb: 4, color: '#2b6369', opacity: 0.8 }}
          >
            Sprawdź, co mówią o nas inni pacjenci.
          </Typography>
          <Stack spacing={3}>
            {[
              {
                name: 'Anna K.',
                quote:
                  'TheraLink pomogło mi znaleźć świetnego specjalistę w moim mieście. Cały proces był szybki i intuicyjny!',
              },
              {
                name: 'Tomasz M.',
                quote:
                  'Cenię sobie możliwość rezerwacji wizyt online. Oszczędzam mnóstwo czasu, a aplikacja jest bardzo prosta w obsłudze.',
              },
              {
                name: 'Ewelina Z.',
                quote:
                  'Dzięki TheraLink w końcu znalazłam lekarza, który rozumie moje potrzeby. Gorąco polecam!',
              },
            ].map((testimonial, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 3,
                  borderLeft: '4px solid #00bfa5',
                  bgcolor: '#f9f9f9',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
                  “{testimonial.quote}”
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2b6369' }}>
                  – {testimonial.name}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: '#f0f0f0', py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: 'center', color: '#2b6369' }}
          >
            Najczęściej zadawane pytania
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: 'center', mb: 4, color: '#2b6369', opacity: 0.8 }}
          >
            Odpowiedzi na pytania, które mogą Ci pomóc.
          </Typography>
          <Stack spacing={3}>
            {[
              {
                question: 'Czy korzystanie z TheraLink jest darmowe?',
                answer: 'Tak, wyszukiwanie lekarzy i przeglądanie profili jest całkowicie darmowe.',
              },
              {
                question: 'Czy mogę odwołać umówioną wizytę?',
                answer:
                  'Tak, możesz anulować wizytę bezpośrednio z poziomu swojego konta, najlepiej minimum 24 godziny przed terminem.',
              },
              {
                question: 'Jakie specjalizacje są dostępne?',
                answer:
                  'Na TheraLink znajdziesz szeroki wybór specjalistów – od internistów po psychoterapeutów i dermatologów.',
              },
            ].map((faq, idx) => (
              <Paper
                key={idx}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: '#ffffff',
                  border: '1px solid #d9d9d9',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2b6369' }}>
                  {faq.question}
                </Typography>
                <Typography sx={{ mt: 1, color: '#2b6369' }}>{faq.answer}</Typography>
              </Paper>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ bgcolor: ' #ffffff', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: 'center', color: '#2b6369' }}
          >
            Nasze osiągnięcia w liczbach
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: 'center', mb: 6, color: '#2b6369', opacity: 0.8 }}
          >
            Dziękujemy za zaufanie!
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            justifyContent="center"
            alignItems="stretch" // Changed from "center" to "stretch"
          >
            {[
              { value: '25 000+', label: 'Zarejestrowanych pacjentów' },
              { value: '3 500+', label: 'Dostępnych specjalistów' },
              { value: '12 000+', label: 'Umówionych wizyt' },
            ].map((stat, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  textAlign: 'center',
                  borderRadius: 3,
                  flex: 1, // Ensures equal width
                  minHeight: 160, // Optional: sets equal height baseline
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  bgcolor: '#f0fdfc',
                  border: '2px solid #00bfa5',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#004d40', mt: 1 }}>
                  {stat.label}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Container>
      </Box>



      {/* Call to Action Section */}
      <Box sx={{ bgcolor: '#e0f7fa', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#004d40' }}>
            Gotowy, by zadbać o swoje zdrowie?
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: '#004d40', opacity: 0.9 }}>
            Dołącz do tysięcy użytkowników, którzy już korzystają z TheraLink. Zarejestruj się i umów pierwszą wizytę już teraz!
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#00796b',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#004d40' },
            }}
            onClick={() => console.log('Redirect to registration')}
          >
            Załóż konto
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
