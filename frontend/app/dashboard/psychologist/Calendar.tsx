// Calendar.tsx

'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

const primaryColor = '#2b6369';      // Availability color
const appointmentColor = '#8bc34a';  // Appointment color (light green)

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 8; hour <= 19; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

function toDayKey(date: string) {
  return dayjs(date).format('YYYY-MM-DD');
}

// Sort slots by time
function sortSlots<T extends { start_hour: string }>(slots: T[]) {
  return slots.slice().sort((a, b) =>
    timeSlots.indexOf(a.start_hour) - timeSlots.indexOf(b.start_hour)
  );
}

interface CalendarProps {
  availabilities: { date: string; start_hour: string }[];
  appointments: { date: string; start_hour: string; patientName: string }[];
}

const Calendar: React.FC<CalendarProps> = ({ availabilities, appointments }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const today = dayjs().startOf('day');
  const weekDates = Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day'));

  // Najpierw zbuduj blocksByDate z appointmentami (one mają priorytet)
  const blocksByDate: Record<string, {
    type: 'availability' | 'appointment';
    start_hour: string;
    patientName?: string;
  }[]> = {};

  // 1. Wrzuć appointmenty
  appointments.forEach(({ date, start_hour, patientName }) => {
    const key = toDayKey(date);
    if (!blocksByDate[key]) blocksByDate[key] = [];
    blocksByDate[key].push({ type: 'appointment', start_hour, patientName });
  });

  // 2. Wrzuć dostępności, tylko jeśli w danym slocie nie ma już wizyty
  availabilities.forEach(({ date, start_hour }) => {
    const key = toDayKey(date);
    const alreadyBooked = blocksByDate[key]?.some(b => b.start_hour === start_hour && b.type === 'appointment');
    if (!alreadyBooked) {
      if (!blocksByDate[key]) blocksByDate[key] = [];
      blocksByDate[key].push({ type: 'availability', start_hour });
    }
  });

  // 3. Posortuj sloty
  for (const key of Object.keys(blocksByDate)) {
    blocksByDate[key] = sortSlots(blocksByDate[key]);
  }

  function renderRows() {
    const rendered: Record<string, Record<string, boolean>> = {}; // date -> time -> rendered
    return timeSlots.map((time, rowIdx) => (
      <tr key={time}>
        <td style={{ color: '#555', fontWeight: 500 }}>{time}</td>
        {weekDates.map((date) => {
          const dateKey = date.format('YYYY-MM-DD');
          rendered[dateKey] = rendered[dateKey] || {};
          if (rendered[dateKey][time]) return null; // already spanned by earlier block

          const dayBlocks = blocksByDate[dateKey] || [];
          const block = dayBlocks.find(b => b.start_hour === time);

          if (block) {
            // This is the start of a block
            rendered[dateKey][time] = true;
            // Mark next 3 slots as spanned
            for (let i = 1; i < 4; i++) {
              const nextTime = timeSlots[rowIdx + i];
              if (nextTime) rendered[dateKey][nextTime] = true;
            }
            return (
              <td
                key={dateKey}
                rowSpan={4}
                style={{
                  backgroundColor: block.type === 'appointment' ? appointmentColor : primaryColor,
                  color: '#fff',
                  fontWeight: 600,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  fontSize: '1.05rem',
                  borderRadius: 6,
                  boxShadow: '0 2px 8px rgba(40,80,80,0.07)',
                  cursor: 'pointer',
                  minWidth: 80,
                }}
                title={
                  block.type === 'appointment'
                    ? `Appointment${block.patientName ? ` with ${block.patientName}` : ''}`
                    : 'Available'
                }
              >
                <div>
                  {block.type === 'appointment' && (
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{block.patientName}</div>
                  )}
                  <div>
                    <span>{time}</span>
                    <span style={{ margin: '0 2px' }}>–</span>
                    <span>{timeSlots[rowIdx + 3]}</span>
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {block.type === 'appointment' ? 'Appointment' : 'Availability'}
                  </div>
                </div>
              </td>
            );
          } else if (!rendered[dateKey][time]) {
            // Empty cell, only if not spanned
            return (
              <td key={dateKey} style={{ background: '#f0f0f0', minWidth: 80, height: 28 }} />
            );
          } else {
            return null; // this slot is spanned by a previous rowSpan
          }
        })}
      </tr>
    ));
  }

  const handlePreviousWeek = () => {
    const newStartDate = startDate.subtract(7, 'day');
    if (newStartDate.endOf('week').isBefore(today, 'day')) {
      return;
    }
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    setStartDate((prev) => prev.add(7, 'day'));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        paddingTop: '40px',
        paddingBottom: '100px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        width="100%"
        maxWidth="1000px"
        bgcolor="#ffffff"
        p={4}
        borderRadius="10px"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
        border="1px solid #e0e0e0"
      >
        {/* Legend */}
        <Box display="flex" flexWrap="wrap" mb={2}>
          <Chip label="Available" sx={{ marginRight: '5px', backgroundColor: primaryColor, color: '#fff' }} />
          <Chip label="Appointment" sx={{ backgroundColor: appointmentColor, color: '#fff' }} />
        </Box>

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ color: primaryColor }}>
            Weekly Calendar
          </Typography>
          <Box>
            <IconButton
              onClick={handlePreviousWeek}
              disabled={
                startDate.startOf('week').isBefore(today, 'week') ||
                startDate.startOf('week').isSame(today, 'week')
              }
            >
              <ArrowBack />
            </IconButton>
            <IconButton onClick={handleNextWeek}>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>

        {/* Calendar Table */}
        <Box sx={{ overflowX: 'auto' }}>
          <table
            style={{
              borderCollapse: 'separate',
              borderSpacing: '10px 0',
              width: '100%',
            }}
          >
            <thead>
              <tr>
                <th style={{ width: '80px' }}></th>
                {weekDates.map((date) => (
                  <th
                    key={date.format('YYYY-MM-DD')}
                    style={{
                      textAlign: 'center',
                      color: primaryColor,
                      fontWeight: 'bold',
                      padding: '8px',
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  >
                    {date.format('ddd, MMM D')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
