"use client";
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import  Navbar  from "@/app/components/Navbar";
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, usePathname } from "next/navigation";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});
const components = {
  Header() {
    return (
      <View className="mt-6 mb-8 text-center">
        <Heading
          level={3}
          className="text-3xl font-extrabold text-gray-800 tracking-tight"
        >
          Thera<span className="text-primary-500">Link</span>
        </Heading>
        <p className="mt-2 text-sm text-gray-500">
          Zaloguj się, aby kontynuować swoją terapię
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Nie masz konta? 
            <button
              onClick={toSignUp}
              className="text-primary hover:underline bg-transparent border-none p-0 ml-1"
            >
               Zarejestruj się
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();

      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Zarejestruj się jako"
            name="custom:role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="client">Klient</Radio>
          </RadioGroupField>
        </>
      );
    },

    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Masz już konto?{" "}
            <button
              onClick={toSignIn}
              className="text-primary hover:underline bg-transparent border-none p-0"
            >
              Zaloguj się
            </button>
          </p>
        </View>
      );
    },
  },
};
const formFields = {
  signIn: {
    username: {
      placeholder: "Twój adres e-mail",
      label: "Adres e-mail",
      isRequired: true,
    },
    password: {
      placeholder: "Twoje hasło",
      label: "Hasło",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Nazwa użytkownika (unikalna)",
      label: "Nazwa użytkownika",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Twój e-mail",
      label: "E-mail",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Wymyśl hasło",
      label: "Hasło",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Potwierdź hasło",
      label: "Potwierdzenie hasła",
      isRequired: true,
    },
  },
};


const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/clients") || pathname.startsWith("/psychologists");

  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }
  return (
    <div className="h-full">
      <Navbar />
        <Authenticator
          initialState={pathname.includes("signup") ? "signUp" : "signIn"}
          components={components}
          formFields={formFields}
        >
          {() => <>{children}</>}
        </Authenticator>
    </div>
  );
};
export default Auth;
