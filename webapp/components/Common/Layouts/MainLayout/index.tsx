"use client";

// React
import React, { useState, useEffect, ReactNode } from "react";

// Next
import Head from "next/head";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Constants
import { TOAST_DURATION, TOAST_PLACEMENT } from "@/constants/globals";

// Toast
import { Toaster } from "react-hot-toast";

// Components
import ThemePreferences from "@/components/Common/Common/ThemePreferences/index";
import ThemeProvider from "@/components/Common/Common/ThemeProvider/index";
// import Loading from "@common/Loading";
import Authenticated from "./Authenticated/index";
// import NotAuthenticated from "./NotAuthenticated";

const MainLayout = ({ children }: { children: ReactNode }) => {
  // Next Router
  const router = useRouter();
  const pathName = usePathname();

  // Conditions
  const parentPageName = pathName.split("/")[1];
  const isHomePage = parentPageName === "/";
  const isFourZeroFourPath = pathName === "/404";

  //   const isLoginPage = parentPageName === "login";
  //   const isSignupPage = parentPageName === "signup";
  //   const isForgotPasswordPage = parentPageName === "forgot-password";
  //   const isAuthPage = isLoginPage || isSignupPage || isForgotPasswordPage;

  // To Prevent Window Error
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider>
        {/* TOAST */}
        <Toaster
          position={TOAST_PLACEMENT}
          toastOptions={{ duration: TOAST_DURATION }}
        />

        {/* THEME PREFERENCES */}
        <ThemePreferences />

        {/* LOADING */}
        {/* <Loading /> */}

        {/* {NON AUTHENTICATED : PUBLIC HOME */}
        {/* {isHomePage && !isFourZeroFourPath && ( */}
        <Authenticated mounted={mounted}>{children}</Authenticated>
        {/* )} */}

        {/* 404 */}
        {!isHomePage && isFourZeroFourPath && children}
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
