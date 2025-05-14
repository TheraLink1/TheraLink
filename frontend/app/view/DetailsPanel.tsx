import React, { useState, useMemo } from 'react';
import { Button, List, ListItemButton, ListItemText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format } from 'date-fns';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';
import {Typography} from "@mui/material";
import { Psychologist } from '../data/psychologists';

interface DetailsPanelProps {
  psychologist: Psychologist;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ psychologist }) => {
  const { name, specialization, address, rate, rating, description } = psychologist;
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  const availableDates = useMemo(() => Object.keys(psychologist.availability), [psychologist]);

const isDateAvailable = (day: Date) => {
  return availableDates.includes(format(day, 'yyyy-MM-dd'));
};

const availableTimes = useMemo(() => {
  if (!date) return [];
  return psychologist.availability[format(date, 'yyyy-MM-dd')] || [];
}, [date, psychologist]);

  return (
    <div style={{ flex: 0.3, padding: '20px', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', overflowY: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h5" sx={{ color: '#2b6369', fontWeight: 'bold' }}>
        {name}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#555', mb: 2 }}>
        {specialization}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong style={{ color: '#2b6369' }}>Adres:</strong> {address}
      </Typography>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong style={{ color: '#2b6369' }}>Stawka godzinowa:</strong> {rate} zł
      </Typography>
      <p>
        <strong>Ocena:</strong>{' '}
        <span style={{ verticalAlign: 'middle' }}>
          {Array.from({ length: 5 }).map((_, i) => {
            const fullStars = Math.floor(rating);               // e.g. 4 for 4.3, 4.5, 4.6
            const hasHalfStar = rating - fullStars >= 0.5;      // true for 4.5, 4.6; false for 4.3
            if (i < fullStars) {
              // these are the fully filled stars
              return <Star key={i} style={{ color: '#2b6369' }} />;
            } else if (i === fullStars && hasHalfStar) {
              // exactly one half star, at the "next" index after the full stars
              return <StarHalf key={i} style={{ color: '#2b6369' }} />;
            } else {
              // all remaining stars are empty
              return <StarBorder key={i} style={{ color: '#2b6369' }} />;
            }
          })}
        </span>



      </p>

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
              ? `/confirm-booking?date=${formattedDate}&time=${time}`
              : '#'
          }
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#2b6369', color: 'white' }}
          disabled={!date || !time}
        >
          Umów spotkanie na {date && time ? `${formattedDate} o ${time}` : '...'}
        </Button>
      </div>
    </div>
  );
};

export default DetailsPanel;
