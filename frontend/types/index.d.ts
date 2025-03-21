import { MotionProps as OriginalMotionProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}


declare global{

    interface NavbarProps {
        isDashboard: boolean;
      }

    interface SettingsFormProps {
        initialData: SettingsFormData;
        onSubmit: (data: SettingsFormData) => Promise<void>;
        userType: "manager" | "tenant";
      }
    interface User {
        cognitoInfo: AuthUser;
        userInfo: Psychologist | Client;
        userRole: JsonObject | JsonPrimitive | JsonArray;
      }
}