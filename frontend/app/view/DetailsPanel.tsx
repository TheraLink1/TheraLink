'use client'
import React, { useState, useMemo } from 'react';
import { Button, Typography } from '@mui/material';
import { format } from 'date-fns';

import { Psychologist } from '@/types/prismaTypes';
import { useGetAvailabilitiesForPsychologistQuery } from '@/state/api';
import { StarBorder } from '@mui/icons-material';
import { Star, StarHalf } from 'lucide-react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface DetailsPanelProps {
  psychologist: Psychologist;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ psychologist }) => {
  if (!psychologist) console.log("error");

  const { name, Specialization, location, hourlyRate, rating, Description } = psychologist;
  const { data: availabilitiesData, isLoading } = useGetAvailabilitiesForPsychologistQuery(psychologist.cognitoId);

  const availability = useMemo(() => {
    const map: Record<string, string[]> = {};
    if (!availabilitiesData) return map;
    for (const slot of availabilitiesData) {
      const dateStr = slot.date.slice(0, 10); // yyyy-mm-dd
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push(slot.startHour);
    }
    return map;
  }, [availabilitiesData]);

  const availableDates = Object.keys(availability);
  const [date, setDate] = useState<Date | null>(availableDates[0] ? new Date(availableDates[0]) : null);
  const [time, setTime] = useState<string | null>(null);

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  const isDateAvailable = (day: Date) => {
    return availableDates.includes(format(day, 'yyyy-MM-dd'));
  };

  const availableTimes = date ? availability[format(date, 'yyyy-MM-dd')] || [] : [];

  if (isLoading) {
    return (
      <div style={{ flex: 0.3, padding: '20px', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', overflowY: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <Typography variant="h6" sx={{ color: '#2b6369' }}>Ładowanie dostępności...</Typography>
      </div>
    );
  }

  return (
    <div style={{ flex: 0.3, padding: '20px', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', overflowY: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h5" sx={{ color: '#2b6369', fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#555', mb: 2 }}>
        {Specialization}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong style={{ color: '#2b6369' }}>Adres:</strong> {location}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong style={{ color: '#2b6369' }}>Stawka godzinowa:</strong> {hourlyRate} zł
      </Typography>
      <p>
        <strong>Ocena:</strong>{' '}
        <span style={{ verticalAlign: 'middle' }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const ratingValue = rating ?? 0;
            const fullStars = Math.floor(ratingValue);
            const hasHalfStar = ratingValue - fullStars >= 0.5;
            if (i < fullStars) {
              return <Star key={i} style={{ color: '#2b6369' }} />;
            } else if (i === fullStars && hasHalfStar) {
              return <StarHalf key={i} style={{ color: '#2b6369' }} />;
            } else {
              return <StarBorder key={i} style={{ color: '#2b6369' }} />;
            }
          })}
        </span>
      </p>

      <Typography variant="body2" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
        {Description}
      </Typography>

      <div style={{ marginTop: '20px' }}>
        <h3>Wybierz datę wizyty:</h3>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              setTime(null);
            }}
            shouldDisableDate={(day) => !isDateAvailable(day)}
            sx={{
              '& .MuiPickersDay-root': { color: '#2b6369' },
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: '#2b6369',
                color: '#fff',
              },
              '& .MuiPickersDay-root.Mui-disabled': { color: '#aaa' },
              '& .MuiPickersCalendarHeader-label': { color: '#2b6369' },
              '& .MuiPickersArrowSwitcher-button': { color: '#2b6369' },
            }}
          />
        </LocalizationProvider>
        {date && (
          <>
            <h4>Dostępne godziny:</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.ceil(availableTimes.length / 3)}, 1fr)`,
                gap: '8px',
                marginTop: '10px',
              }}
            >
              {availableTimes.map((t) => (
                <Button
                  key={t}
                  variant={t === time ? 'contained' : 'outlined'}
                  onClick={() => setTime(t)}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    padding: '6px 12px',
                    color: '#2b6369',
                    borderColor: '#2b6369',
                    '&.Mui-selected, &.MuiButton-contained': {
                      backgroundColor: '#2b6369',
                      color: '#fff',
                    },
                  }}
                >
                  {t}
                </Button>
              ))}
            </div>
            {availableTimes.length === 0 && <p>Brak dostępnych godzin na ten dzień.</p>}
          </>
        )}
        <h5 style={{ fontSize: '0.8rem', color: 'grey' }}>
          Wszystkie spotkania trwają 60 minut.
        </h5>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Button
          component="a"
          href={
            date && time
              ? `/confirm-booking?psychologistId=${psychologist.cognitoId}&date=${formattedDate}&time=${time}`
              : '#'
          }
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#2b6369',
            color: '#fff',
            textTransform: 'none',
            px: 4,
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#224f54' },
          }}
          disabled={!date || !time}
        >
          {date && time
            ? `Umów spotkanie na ${formattedDate} o ${time}`
            : 'Wybierz datę i godzinę'}
        </Button>
      </div>
    </div>
  );
};

export default DetailsPanel;
