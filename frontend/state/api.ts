import { createNewUserInDatabase } from "@/lib/utils";
import { Client, Psychologist } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

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
  tagTypes: ["Psychologists", "Clients"],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
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
          
            // wyciągamy faktyczny status:
            let httpStatus: number | undefined;
            if (err.status === "PARSING_ERROR" && "originalStatus" in err) {
              httpStatus = err.originalStatus;
            } else if (typeof err.status === "number") {
              httpStatus = err.status;
            }
          
            // teraz możemy spasować na 404:
            if (httpStatus === 404) {
              userDetailsResponse = await createNewUserInDatabase(
                user,
                idToken,
                userRole,
                fetchWithBQ
              );
            } else if (httpStatus) {
              // dla pozostałych kodów np. 401, 500 możesz rzucić błąd, żeby debugować:
              throw new Error(`Fetch user failed with HTTP status ${httpStatus}`);
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
    // TODO: Pozmieniac ponizsze typy na klientow i psychologow i mamy czesciowo gotowe ustawienia
    // updateTenantSettings: build.mutation<
    //   Tenant,
    //   { cognitoId: string } & Partial<Tenant>
    // >({
    //   query: ({ cognitoId, ...updatedTenant }) => ({
    //     url: `tenants/${cognitoId}`,
    //     method: "PUT",
    //     body: updatedTenant,
    //   }),
    //   invalidatesTags: (result) => [{ type: "Tenants", id: result?.id }],
    // }),
    // updateManagerSettings: build.mutation<
    //   Manager,
    //   { cognitoId: string } & Partial<Manager>
    // >({
    //   query: ({ cognitoId, ...updatedManager }) => ({
    //     url: `managers/${cognitoId}`,
    //     method: "PUT",
    //     body: updatedManager,
    //   }),
    //   invalidatesTags: (result) => [
    //     {
    //       type: "Managers",
    //       id: result?.id,
    //     },
    //   ],
    // }),
  }),
});

export const {
  useGetAuthUserQuery,
  // useUpdateTenantSettingsMutation,
  // useUpdateManagerSettingsMutation,
} = api;
