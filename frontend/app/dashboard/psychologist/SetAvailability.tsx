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

  const today = dayjs().startOf('day');
  const weekDates = Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day'));

  const toggleTimeSlot = (date: string, time: string) => {
    const selectedDate = dayjs(date);
    if (selectedDate.isBefore(today, 'day')) {
      return; // Prevent toggling past dates
    }

    const timeIndex = timeSlots.indexOf(time);
    const newSlots = [
      timeSlots[timeIndex],
      timeSlots[timeIndex + 1],
      timeSlots[timeIndex + 2],
      timeSlots[timeIndex + 3],
    ];

    // Check if the new slots overlap with existing availability
    const isOverlap = newSlots.some((slot) => {
      return availability[date]?.includes(slot);
    });

    if (isOverlap || timeIndex > timeSlots.indexOf('19:00')) {
      return; // Prevent overlapping selections or selections after 19:00
    }

    setAvailability((prev) => {
      const daySlots = prev[date] || [];
      const updatedSlots = [...new Set([...daySlots, ...newSlots])];
      return { ...prev, [date]: updatedSlots };
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
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
              {timeSlots.map((time) => (
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
                    const isSelected = availability[dateKey]?.includes(time);
                    const isPast = date.isBefore(today, 'day');

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
                          border: '1px solid #ffffff',
                          height: '20px',
                          transition: 'background-color 0.3s',
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
                      ></td>
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
              // Handle submission logic here
              console.log('Submitted availability:', availability);
            }}
          >
            Save Availability
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SetAvailability;
