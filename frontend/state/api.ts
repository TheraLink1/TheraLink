import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { createNewUserInDatabase } from "@/lib/utils";
import {
  Client,
  Psychologist,
  CalendarAppointment,
  Appointment,
} from "@/types/prismaTypes";

// === RTK Query API ===
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseHandler: (response) =>
      response.headers.get("content-type")?.includes("application/json")
        ? response.json()
        : response.text(),
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Psychologists", "Clients", "Availabilities", "Appointments"],
  endpoints: (build) => ({
    // 1. Pobierz zalogowanego użytkownika (automatyczne zakładanie w BD)
    getAuthUser: build.query<
      { cognitoInfo: any; userInfo: Client | Psychologist; userRole: string },
      void
    >({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {};
          const user = await getCurrentUser();
          const userRole = idToken?.payload["custom:role"] as string;
          const endpoint =
            userRole === "psychologist"
              ? `/psychologists/${user.userId}`
              : `/clients/${user.userId}`;

          let userDetailsResponse = await fetchWithBQ(endpoint);
          if (userDetailsResponse.error) {
            const err = userDetailsResponse.error;
            let httpStatus: number | undefined;
            if (err.status === "PARSING_ERROR" && "originalStatus" in err) {
              httpStatus = err.originalStatus;
            } else if (typeof err.status === "number") {
              httpStatus = err.status;
            }
            if (httpStatus === 404) {
              userDetailsResponse = await createNewUserInDatabase(
                user,
                idToken,
                userRole,
                fetchWithBQ
              );
            } else if (httpStatus) {
              throw new Error(
                `Fetch user failed with HTTP status ${httpStatus}`
              );
            }
          }
          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as Client | Psychologist,
              userRole,
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch user data" };
        }
      },
    }),
    getAllPsychologists: build.query<Psychologist[], void>({
      query: () => "/psychologists",
      providesTags: ["Psychologists"],
    }),

    // 2. Synchronizacja roli z backendem (POST /sync-role)
    syncUserRole: build.mutation<{ message: string }, void>({
      query: () => ({
        url: "/sync-role",
        method: "POST",
      }),
    }),

    // 3. Aktualizacja danych klienta
    updateClient: build.mutation<
      Client,
      { cognitoId: string } & Partial<Client>
    >({
      query: ({ cognitoId, ...updatedClient }) => ({
        url: `/clients/${cognitoId}`,
        method: "PUT",
        body: updatedClient,
      }),
      invalidatesTags: (result) => [{ type: "Clients", id: result?.id }],
    }),

    // 4. Aktualizacja danych psychologa
    updatePsychologist: build.mutation<
      Psychologist,
      { cognitoId: string } & Partial<Psychologist>
    >({
      query: ({ cognitoId, ...updatedPsychologist }) => ({
        url: `/psychologists/${cognitoId}`,
        method: "PUT",
        body: updatedPsychologist,
      }),
      invalidatesTags: (result) => [{ type: "Psychologists", id: result?.id }],
    }),

    // 5. Zarządzanie dostępnościami (availabilities)
    // Tworzenie slotu dostępności
    createAvailability: build.mutation<
      CalendarAppointment,
      { psychologistId: number } & Partial<CalendarAppointment>
    >({
      query: ({ psychologistId, ...data }) => ({
        url: `/availabilities/${psychologistId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Availabilities"],
    }),
    // Pobranie wszystkich dostępności psychologa
    getAvailabilitiesForPsychologist: build.query<
      CalendarAppointment[],
      number
    >({
      query: (psychologistId) =>
        `/availabilities/psychologist/${psychologistId}`,
      providesTags: ["Availabilities"],
    }),
    // Pobranie jednej dostępności po id
    getAvailability: build.query<CalendarAppointment, number>({
      query: (id) => `/availabilities/${id}`,
      providesTags: ["Availabilities"],
    }),
    // Edycja dostępności
    updateAvailability: build.mutation<
      CalendarAppointment,
      { id: number } & Partial<CalendarAppointment>
    >({
      query: ({ id, ...data }) => ({
        url: `/availabilities/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Availabilities"],
    }),

    // 6. Przykładowe obsługa wizyt (appointments) – dostosuj do swojego backendu jeśli chcesz:
    createAppointment: build.mutation<
      Appointment,
      { cognitoId: string } & Partial<Appointment>
    >({
      query: ({ cognitoId, ...data }) => ({
        url: `/appointments/${cognitoId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
    getAppointment: build.query<Appointment, number>({
      query: (id) => `/appointments/singleApt/${id}`,
      providesTags: ["Appointments"],
    }),
    getAppointmentsForPsychologist: build.query<Appointment[], string>({
      query: (cognitoId) => `/appointments/psychologistApts/${cognitoId}`,
      providesTags: ["Appointments"],
    }),
    getAppointmentsForClient: build.query<Appointment[], string>({
      query: (cognitoId) => `/appointments/clientApts/${cognitoId}`,
      providesTags: ["Appointments"],
    }),
    updateAppointment: build.mutation<
      Appointment,
      { appointmentId: number } & Partial<Appointment>
    >({
      query: ({ appointmentId, ...data }) => ({
        url: `/appointments/${appointmentId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

// Eksport hooków:
export const {
  useGetAllPsychologistsQuery,
  useGetAuthUserQuery,
  useSyncUserRoleMutation,
  useUpdateClientMutation,
  useUpdatePsychologistMutation,
  useCreateAvailabilityMutation,
  useGetAvailabilitiesForPsychologistQuery,
  useGetAvailabilityQuery,
  useUpdateAvailabilityMutation,
  useCreateAppointmentMutation,
  useGetAppointmentQuery,
  useGetAppointmentsForPsychologistQuery,
  useGetAppointmentsForClientQuery,
  useUpdateAppointmentMutation,
} = api;
