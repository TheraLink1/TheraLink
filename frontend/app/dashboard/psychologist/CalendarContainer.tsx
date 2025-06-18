import React from 'react';
import Calendar from './Calendar';
import {
  useGetAuthUserQuery,
  useGetAvailabilitiesForPsychologistQuery,
  useGetAppointmentsForPsychologistQuery,
} from '@/state/api';

const CalendarContainer: React.FC = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const psychologistId = authUser?.userInfo?.cognitoId;

  // Pobierz dostępności dla psychologa po id z bazy
  const { data: availabilities = [] } = useGetAvailabilitiesForPsychologistQuery(
    psychologistId,
    { skip: !psychologistId }
  );

  // Pobierz wizyty dla psychologa po cognitoId
  const { data: appointments = [] } = useGetAppointmentsForPsychologistQuery(
    psychologistId,
    { skip: !psychologistId }
  );

  // Normalize availabilities
  const availabilitiesForCalendar = (availabilities || []).map((a: any) => ({
    date: typeof a.date === "string" ? a.date.split("T")[0] : "",
    start_hour: a.startHour || a.start_hour || "",
  }));

  // Normalize appointments (POPRWONE)
  const appointmentsForCalendar = (appointments || [])
    .filter((a: any) => a.Status === "Approved")
    .map((a: any) => ({
      date: typeof a.date === "string" ? a.date.split("T")[0] : "",
      start_hour: typeof a.date === "string" ? a.date.split("T")[1]?.slice(0,5) : "",
      patientName: a.client?.name || a.patientName || "",
    }));

  return (
    <Calendar
      availabilities={availabilitiesForCalendar}
      appointments={appointmentsForCalendar}
    />
  );
};

export default CalendarContainer;