import { AuthUser } from "aws-amplify/auth";
import { Client, Psychologist } from "./prismaTypes";

declare global {
  interface User {
    cognitoInfo: AuthUser;
    userInfo: Client | Psychologist;
    userRole: JsonObject | JsonPrimitive | JsonArray;
  }
}
