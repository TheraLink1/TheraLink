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
const hoverColor = '#224f54';
const appointmentHoverColor = '#689f38'; // Darker green for appointment hover
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

interface CalendarProps {
  availabilities: Record<string, string[]>;
  appointments: Record<string, string[]>;
}

const Calendar: React.FC<CalendarProps> = ({ availabilities, appointments }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const today = dayjs().startOf('day');
  const weekDates = Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day'));

  const handlePreviousWeek = () => {
    const newStartDate = startDate.subtract(7, 'day');
    if (newStartDate.endOf('week').isBefore(today, 'day')) {
      return; // Prevent navigating fully into the past
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
        <Box display="flex" flexWrap="wrap">
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
                    const dayAvail = availabilities[dateKey] || [];
                    const dayAppts = appointments[dateKey] || [];
                    const isAvailable = dayAvail.includes(time);
                    const isAppointment = dayAppts.includes(time);
                    const isPast = date.isBefore(today, 'day');

                    const backgroundColor = isAppointment
                      ? appointmentColor
                      : isAvailable
                      ? primaryColor
                      : isPast
                      ? '#cccccc'
                      : '#e0e0e0';

                    const hoverBg = isAppointment ? appointmentHoverColor : hoverColor;

                    return (
                      <td
                        key={dateKey + time}
                        style={{
                          cursor: 'default',
                          backgroundColor,
                          height: '20px',
                          transition: 'background-color 0.3s',
                          position: 'relative',
                          color: '#fff',
                          fontSize: '12px',
                          textAlign: 'center',
                          userSelect: 'none',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = backgroundColor;
                        }}
                        title={
                          isAppointment
                            ? `Appointment at ${time}`
                            : isAvailable
                            ? `Available at ${time}`
                            : undefined
                        }
                      >
                        {(isAvailable || isAppointment) && (() => {
                          const slotsArray = isAppointment ? dayAppts : dayAvail;
                          const idx = slotsArray.indexOf(time);
                          if (
                            idx !== -1 &&
                            idx + 3 < slotsArray.length &&
                            timeSlots.indexOf(slotsArray[idx + 1]) === timeSlots.indexOf(time) + 1 &&
                            timeSlots.indexOf(slotsArray[idx + 2]) === timeSlots.indexOf(time) + 2 &&
                            timeSlots.indexOf(slotsArray[idx + 3]) === timeSlots.indexOf(time) + 3
                          ) {
                            return (
                              <>
                                <div style={{ position: 'absolute', top: '2px', left: '4px' }}>
                                  {time}
                                </div>
                                <div style={{ position: 'absolute', bottom: '2px', right: '4px', fontSize: 10 }}>
                                  {timeSlots[timeSlots.indexOf(time) + 4] || '20:00'}
                                </div>
                              </>
                            );
                          }
                          return null;
                        })()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
