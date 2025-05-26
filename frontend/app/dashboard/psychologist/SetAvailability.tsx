'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import dayjs from 'dayjs';

const primaryColor = '#2b6369';
const hoverColor = '#224f54';

// Generate time slots in 15-minute intervals from 08:00 to 19:45
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

const SetAvailability: React.FC = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [availability, setAvailability] = useState<Record<string, string[]>>({});

  const [formattedAvailability, setFormattedAvailability] = useState<
    { date: string; start_hour: string }[]
  >([]);


  const today = dayjs().startOf('day');
  const weekDates = Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day'));

  const toggleTimeSlot = (date: string, time: string) => {
  const selectedDate = dayjs(date);
  if (selectedDate.isBefore(today, 'day')) {
    return; // Prevent toggling past dates
  }

  const timeIndex = timeSlots.indexOf(time);
  if (timeIndex < 0 || timeIndex + 3 >= timeSlots.length) {
    return; // Invalid time index or exceeds available slots
  }

  const newSlots = [
    timeSlots[timeIndex],
    timeSlots[timeIndex + 1],
    timeSlots[timeIndex + 2],
    timeSlots[timeIndex + 3],
  ];

  setAvailability((prev) => {
    const daySlots = prev[date] || [];
    const allSelected = newSlots.every((slot) => daySlots.includes(slot));

    if (allSelected) {
      // Attempting to remove the 60-minute block
      const updatedSlots = daySlots.filter((slot) => !newSlots.includes(slot));

      // Validate that the remaining slots form only complete 60-minute blocks
      const remainingIndices = updatedSlots
        .map((slot) => timeSlots.indexOf(slot))
        .sort((a, b) => a - b);

      let i = 0;
      while (i < remainingIndices.length) {
        // Check for a sequence of four consecutive indices
        if (
          i + 3 < remainingIndices.length &&
          remainingIndices[i + 1] === remainingIndices[i] + 1 &&
          remainingIndices[i + 2] === remainingIndices[i] + 2 &&
          remainingIndices[i + 3] === remainingIndices[i] + 3
        ) {
          i += 4; // Valid 60-minute block found
        } else {
          return prev; // Invalid block detected; abort removal
        }
      }

      return { ...prev, [date]: updatedSlots };
    } else {
      // Attempting to add a new 60-minute block
      const isOverlap = newSlots.some((slot) => daySlots.includes(slot));
      if (isOverlap || timeIndex > timeSlots.indexOf('19:00')) {
        return prev; // Prevent overlapping selections or selections after 19:00
      }

      const updatedSlots = [...new Set([...daySlots, ...newSlots])];
      return { ...prev, [date]: updatedSlots };
    }
  });
};

  const handlePreviousWeek = () => {
    const newStartDate = startDate.subtract(7, 'day');
    if (newStartDate.endOf('week').isBefore(today, 'day')) {
      return; // Prevent navigating to weeks entirely in the past
    }
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    setStartDate((prev: dayjs.Dayjs) => prev.add(7, 'day'));
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ color: primaryColor }}>
            Set Weekly Availability
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

        <Box
          sx={{
            overflowX: 'auto',
          }}
        >
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
              {timeSlots.map((time, timeIndex) => (
                <tr key={time}>
                  <td
                    style={{
                      textAlign: 'center',
                      color: '#555',
                      fontWeight: 500,
                      borderRight: '1px solid #e0e0e0',
                    }}
                  >
                    {time}
                  </td>
                  {weekDates.map((date) => {
                    const dateKey = date.format('YYYY-MM-DD');
                    const daySlots = availability[dateKey] || [];
                    const isSelected = daySlots.includes(time);
                    const isPast = date.isBefore(today, 'day');

                    const prevTime = timeSlots[timeIndex - 1];
                    const nextTime = timeSlots[timeIndex + 1];

                    const isStart =
                      isSelected && (!daySlots.includes(prevTime) || timeIndex === 0);
                    const isEnd =
                      isSelected && (!daySlots.includes(nextTime) || timeIndex === timeSlots.length - 1);

                    return (
                      <td
                        key={dateKey + time}
                        onClick={() => {
                          if (!isPast) {
                            toggleTimeSlot(dateKey, time);
                          }
                        }}
                        style={{
                          cursor: isPast ? 'not-allowed' : 'pointer',
                          backgroundColor: isSelected
                            ? primaryColor
                            : isPast
                            ? '#cccccc'
                            : '#e0e0e0',
                          height: '20px',
                          transition: 'background-color 0.3s',
                          position: 'relative',
                          color: '#fff',
                          fontSize: '12px',
                          textAlign: 'center',
                        }}
                        onMouseEnter={(e) => {
                          if (!isPast) {
                            (e.currentTarget as HTMLElement).style.backgroundColor = isSelected
                              ? hoverColor
                              : '#d5d5d5';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isPast) {
                            (e.currentTarget as HTMLElement).style.backgroundColor = isSelected
                              ? primaryColor
                              : '#e0e0e0';
                          }
                        }}
                      >
                        {isStart && <div style={{ position: 'absolute', top: '2px', left: '2px' }}>{time}</div>}
                        {isEnd && (
                          <div style={{ position: 'absolute', bottom: '2px', right: '2px' }}>
                            {timeSlots[timeIndex + 1] || '20:00'}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        <Box mt={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: primaryColor,
              '&:hover': {
                backgroundColor: hoverColor,
              },
            }}
            onClick={() => {
              const formatted = Object.entries(availability).map(([date, timeSlots]) => ({
                date,
                start_hour: timeSlots.length > 0 ? timeSlots[0] : '',
              }));
              setFormattedAvailability(formatted);
            }}
          >
            Save Availability
          </Button>

          {/* For now, saving the availability just formats it for display */}

          {formattedAvailability.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: primaryColor, mb: 2 }}>
              Selected Availability
            </Typography>
            <ul>
              {formattedAvailability.map(({ date, start_hour }) => (
                <li key={date}>
                  {date} — {start_hour}
                </li>
              ))}
            </ul>
          </Box>
        )}
        </Box>
      </Box>
    </Box>
  );
};

export default SetAvailability;
