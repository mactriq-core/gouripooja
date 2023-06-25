// React
import React, { useState } from "react";

// Next Auth
import { useSession, signIn } from "next-auth/react";

// MUI
import { Box, TextField, Button, Alert, InputAdornment } from "@mui/material";

// Icons
import { LocalPhoneOutlined, EmailOutlined } from "@mui/icons-material";

// Toast
import { toast } from "react-hot-toast";

// HTTP Helpers
import axios from "axios";
import { apis } from "@/constants/apis";

// Types & Enums
import { VerificationType } from "@/types/global-types";

const ConfirmAccount = () => {
  // User Session
  const { data: session }: any = useSession();
  const phone_number = session?.user?.name?.phone_number;
  const isPhoneVerified = session?.user?.name?.phone_number_verified;
  const email = session?.user?.name?.email;
  const isEmailVerified = session?.user?.name?.email_verified;

  // States
  const [emailOTP, setEmailOTP] = useState<number>();
  const [phoneOTP, setPhoneOTP] = useState<number>();
  const [isPhoneVerificationCodeSent, setIsPhoneVerificationCodeSent] =
    useState<boolean>(false);
  const [isEmailVerificationCodeSent, setIsEmailVerificationCodeSent] =
    useState<boolean>(false);
  const [isSendingPhoneVerificationCode, setIsSendingPhoneVerificationCode] =
    useState<boolean>(false);
  const [isSendingEmailVerificationCode, setIsSendingEmailVerificationCode] =
    useState<boolean>(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState<boolean>(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);

  // Handlers
  const sendVerificationCode = async (type: VerificationType) => {
    type === "phone_number"
      ? setIsSendingPhoneVerificationCode(true)
      : setIsSendingEmailVerificationCode(true);
    try {
      const response = await axios.get(
        `${apis.requestAttributeVerification.apiRoute}?verificationType=${type}`
      );
      toast.success(response.data.message);
      if (type === "phone_number") setIsPhoneVerificationCodeSent(true);
      else setIsEmailVerificationCodeSent(true);
    } catch (error: any) {
      error?.response?.data?.errors?.forEach((error: any) =>
        toast.error(error?.message || "Something went wrong")
      );
    } finally {
      type === "phone_number"
        ? setIsSendingPhoneVerificationCode(false)
        : setIsSendingEmailVerificationCode(false);
    }
  };
  const handleVerify = async (type: VerificationType, code: number) => {
    const verifyEmailBody = {
      ...session?.user?.name,
      email_verified: true,
    };
    const verifyPhoneBody = {
      ...session?.user?.name,
      phone_number_verified: true,
    };
    const body = type === "phone_number" ? verifyPhoneBody : verifyEmailBody;
    type === "phone_number"
      ? setIsVerifyingPhone(true)
      : setIsVerifyingEmail(true);
    try {
      const response = await axios.put(
        `${apis.verifyAttributeVerification.apiRoute}?verificationType=${type}&code=${code}`
      );
      const result = await signIn("credentials", {
        redirect: false,
        ...body,
      });
      if (result?.error) {
        toast.error("Something went wrong, please try again later");
      } else {
        toast.success(response?.data?.message || "Verification successful");
      }
    } catch (error: any) {
      error?.response?.data?.errors?.forEach((error: any) =>
        toast.error(error?.message || "Something went wrong")
      );
    } finally {
      type === "phone_number"
        ? setIsVerifyingPhone(false)
        : setIsVerifyingEmail(false);
    }
  };

  return (
    <Box className="flex-1 flex flex-col gap-[2.5rem]">
      <Box className="flex flex-col gap-[1.25rem]">
        <Alert severity={isEmailVerified ? "success" : "warning"}>
          {isEmailVerified
            ? "Your email is verified"
            : "Your email is not verified"}
        </Alert>
        <Box className="flex md:flex-col items-center md:items-stretch gap-[1.25rem]">
          <Box className="flex-1 flex items-center gap-[0.625rem]">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              label="Email"
              value={email}
              fullWidth
              disabled
            />
            <Button
              variant="text"
              color="primary"
              className="!min-w-max"
              disabled={isEmailVerified || isSendingEmailVerificationCode}
              onClick={() => sendVerificationCode("email")}
            >
              {isEmailVerified
                ? "Verified"
                : isSendingEmailVerificationCode
                ? "Sending..."
                : "Send OTP"}
            </Button>
          </Box>
          {!isEmailVerified && (
            <form
              className="flex-1 flex items-center gap-[0.625rem]"
              onSubmit={(e: any) => {
                e.preventDefault();
                if (`${emailOTP}`?.length !== 6) {
                  toast.error("OTP must be 6 digits");
                  return;
                }
                handleVerify("email", Number(emailOTP));
              }}
            >
              <TextField
                variant="outlined"
                label="Enter OTP"
                value={emailOTP}
                type="number"
                onChange={(e) => {
                  setEmailOTP(Number(e.target.value));
                  if (Number(e.target.value) === 0) setEmailOTP(undefined);
                }}
                fullWidth
                disabled={!isEmailVerificationCodeSent}
              />
              <Button
                variant="text"
                color="primary"
                className="!min-w-max"
                type="submit"
                disabled={!isEmailVerificationCodeSent || isVerifyingEmail}
              >
                {isVerifyingEmail ? "Verifying..." : "Verify"}
              </Button>
            </form>
          )}
        </Box>
      </Box>
      <Box className="flex flex-col gap-[1.25rem]">
        <Alert severity={isPhoneVerified ? "success" : "warning"}>
          {isPhoneVerified
            ? "Your phone number is verified"
            : "Your phone number is not verified"}
        </Alert>
        <Box className="flex md:flex-col items-center md:items-stretch gap-[1.25rem]">
          <Box className="flex-1 flex items-center gap-[0.625rem]">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneOutlined />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              label="Phone Number"
              value={phone_number}
              fullWidth
              disabled
            />
            <Button
              variant="text"
              color="primary"
              className="!min-w-max"
              disabled={isPhoneVerified || isSendingPhoneVerificationCode}
              onClick={() => sendVerificationCode("phone_number")}
            >
              {isPhoneVerified
                ? "Verified"
                : isSendingPhoneVerificationCode
                ? "Sending..."
                : "Send OTP"}
            </Button>
          </Box>
          {!isPhoneVerified && (
            <form
              className="flex-1 flex items-center gap-[0.625rem]"
              onSubmit={(e: any) => {
                e.preventDefault();
                if (`${phoneOTP}`?.length !== 6) {
                  toast.error("OTP must be 6 digits");
                  return;
                }
                handleVerify("phone_number", Number(phoneOTP));
              }}
            >
              <TextField
                variant="outlined"
                label="Enter OTP"
                value={phoneOTP}
                type="number"
                onChange={(e) => {
                  setPhoneOTP(Number(e.target.value));
                  if (Number(e.target.value) === 0) setPhoneOTP(undefined);
                }}
                fullWidth
                disabled={!isPhoneVerificationCodeSent}
              />
              <Button
                variant="text"
                color="primary"
                className="!min-w-max"
                type="submit"
                disabled={!isPhoneVerificationCodeSent || isVerifyingPhone}
              >
                {isVerifyingPhone ? "Verifying..." : "Verify"}
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmAccount;
