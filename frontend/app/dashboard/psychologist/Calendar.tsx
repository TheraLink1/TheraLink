'use client';

import React, { useState, useEffect } from 'react';
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

const expandTimeBlocks = (
  entries: { date: string; start_hour: string; patientName?: string }[]
) => {
  const result: Record<string, { time: string; patientName?: string }[]> = {};
  entries.forEach(({ date, start_hour, patientName }) => {
    const startIndex = timeSlots.indexOf(start_hour);
    if (startIndex !== -1 && startIndex + 3 < timeSlots.length) {
      const block = timeSlots.slice(startIndex, startIndex + 4).map((time, idx) => ({
        time,
        patientName: idx === 1 ? patientName : undefined, // Assign patientName to the second tile
      }));
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(...block);
    }
  });
  return result;
};

interface CalendarProps {
  availabilities: { date: string; start_hour: string }[];
  appointments: { date: string; start_hour: string, patientName: string}[];
}

const Calendar: React.FC<CalendarProps> = ({ availabilities, appointments }) => {
  const [availabilitiesExpanded, setAvailabilitiesExpanded] = useState<Record<string, { time: string; patientName?: string }[]>>({});
  const [appointmentsExpanded, setAppointmentsExpanded] = useState<Record<string, { time: string; patientName?: string }[]>>({});

  useEffect(() => {
    setAvailabilitiesExpanded(expandTimeBlocks(availabilities));
    setAppointmentsExpanded(expandTimeBlocks(appointments));
  }, [availabilities, appointments]);

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
                {timeSlots.map((time, timeIndex) => (
                <tr key={time}>
                  <td>{time}</td>
                  {weekDates.map((date) => {
                    const dateKey = date.format('YYYY-MM-DD');
                    const availTimes = availabilitiesExpanded[dateKey] || [];
                    const apptTimes = appointmentsExpanded[dateKey] || [];

                    const isAvailable = availTimes.some((entry) => entry.time === time);
                    const apptEntry = apptTimes.find((entry) => entry.time === time);
                    const isAppointment = !!apptEntry;
                    const isPast = date.isBefore(today, 'day');

                    let backgroundColor = isPast ? '#cccccc' : '#e0e0e0';
                    if (isAvailable) backgroundColor = primaryColor;
                    if (isAppointment) backgroundColor = appointmentColor;

                    // Determine if this is the start or end of a 4-slot block
                    const isBlockStart = timeIndex % 4 === 0;
                    const isBlockEnd = timeIndex % 4 === 3;

                    // Determine if the current time is part of a block
                    const isInBlock = isAvailable || isAppointment;

                    // Display start time on the first tile and end time on the last tile
                    let displayContent: React.ReactNode = null;
                    if (isInBlock && isBlockStart) {
                      displayContent = (
                        <span style={{ fontWeight: 'bold' }}>
                          {time}
                        </span>
                      );
                    } else if (isInBlock && isBlockEnd && timeIndex + 1 < timeSlots.length) {
                      displayContent = (
                        <span style={{ fontWeight: 'bold' }}>
                          {timeSlots[timeIndex + 1]}
                        </span>
                      );
                    }

                    // Display patient name on the second tile of the appointment block
                    if (isAppointment && apptEntry?.patientName) {
                      const blockStartIndex = timeSlots.indexOf(apptEntry.time) - 1;
                      if (blockStartIndex >= 0 && timeSlots[blockStartIndex + 1] === time) {
                        displayContent = (
                          <span style={{ fontSize: '0.85rem' }}>
                            {apptEntry.patientName}
                          </span>
                        );
                      }
                    }

                    return (
                      <td
                        key={`${dateKey}-${time}`}
                        style={{
                          backgroundColor,
                          color: '#fff',
                          textAlign: 'center',
                          cursor: 'default',
                        }}
                        title={
                          isAvailable
                            ? `Available at ${time}`
                            : isAppointment
                            ? `Appointment at ${time}`
                            : ''
                        }
                      >
                        {displayContent}
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
