// React
import React, { useState } from "react";

// MUI
import {
  Button,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Box,
} from "@mui/material";

// HTTP Helpers
import axios from "axios";
import { apis } from "@/constants/apis";

// Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// Toast
import { toast } from "react-hot-toast";

// Icons
import {
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";

// Types & Enums
import type { ChangePasswordBodyType } from "@/types/global-types";

const ChangePassword = () => {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Formik
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character"
        )
        .trim(),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const body: ChangePasswordBodyType = {
        newPassword: values.password,
      };
      setIsLoading(true);
      try {
        const response = await axios.post(apis.changePassword.apiRoute, body);
        toast.success(response.data.message);
        formik.resetForm();
        setIsLoading(false);
      } catch (error: any) {
        error?.response?.data?.errors?.forEach((error: any) =>
          toast.error(error?.message || "Something went wrong")
        );
        setIsLoading(false);
      }
    },
  });

  return (
    <form
      className="flex-1 flex flex-col gap-[1.25rem]"
      onSubmit={formik.handleSubmit}
    >
      <Box className="grid grid-cols-2 md:grid-cols-1 gap-[1.25rem]">
        <FormControl
          error={formik.touched.password && Boolean(formik.errors.password)}
        >
          <InputLabel htmlFor="password">New Password</InputLabel>
          <OutlinedInput
            {...formik.getFieldProps("password")}
            id="password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            disabled={isLoading}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <RemoveRedEyeOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
        >
          <InputLabel htmlFor="confirmPassword">
            New Confirm Password
          </InputLabel>
          <OutlinedInput
            {...formik.getFieldProps("confirmPassword")}
            id="confirmPassword"
            label="New Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            disabled={isLoading}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <RemoveRedEyeOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box className="flex items-center justify-end md:justify-center mt-auto">
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Save Changes"}
        </Button>
      </Box>
    </form>
  );
};

export default ChangePassword;
