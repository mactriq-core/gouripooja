// React
import React, { useState, useEffect } from "react";

// MUI
import { Box, Button, TextField } from "@mui/material";

// Toast
import { toast } from "react-hot-toast";

// Libs
import { imageToBase64 } from "@/lib/image-to-base64";
import { randomizeImage } from "@/lib/randomize-image";

// Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// Next Auth
import { useSession, signIn } from "next-auth/react";

// HTTP Helpers
import axios from "axios";
import { apis } from "@/constants/apis";

// Types & Enums
import type { UpdateAttributeBodyType } from "@/types/global-types";

const Profile = () => {
  // User Session
  const { data: session }: any = useSession();

  // States
  const [imgSrc, setImgSrc] = useState<string>("/dummy-profile.png");
  const [isLoading, setIsLoading] = useState(false);

  // Formik Validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Minimum 3 characters")
        .max(15, "Maximum 15 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .lowercase()
        .trim(),
      phone_number: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number should be a number")
        .min(10, "Phone number should be 10 digits")
        .max(10, "Phone number should be 10 digits"),
    }),
    onSubmit: async (values) => {
      if (!imgSrc) {
        toast.error("Please upload a profile picture");
        return;
      }
      const isPicChanged = !(
        imgSrc?.includes("http") || imgSrc?.includes("https")
      );
      const bodyWithPicture: UpdateAttributeBodyType = {
        attributes: {
          email: values.email,
          name: values.name,
          phone_number: `+91${values.phone_number}`,
          picture: imgSrc,
        },
      };
      const bodyWithoutPicture: UpdateAttributeBodyType = {
        attributes: {
          email: values.email,
          name: values.name,
          phone_number: `+91${values.phone_number}`,
        },
      };
      const body = isPicChanged ? bodyWithPicture : bodyWithoutPicture;
      setIsLoading(true);
      try {
        const response = await axios.put(apis.updateAttributes.apiRoute, body);
        const result = await signIn("credentials", {
          redirect: false,
          ...session?.user?.name,
          phone_number_verified:
            session?.user?.name?.phone_number === `+91${values.phone_number}`
              ? session?.user?.name?.phone_number_verified
              : false,
          email_verified:
            session?.user?.name?.email === values.email
              ? session?.user?.name?.email_verified
              : false,
          email: values.email,
          name: values.name,
          phone_number: `+91${values.phone_number}`,
        });
        if (result?.error) {
          toast.error("Something went wrong, please try again later");
        } else {
          toast.success(response?.data?.message || "User updated successfully");
        }
      } catch (error: any) {
        error?.response?.data?.errors?.forEach((error: any) =>
          toast.error(error?.message || "Something went wrong")
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Update formik states
  useEffect(() => {
    if (session?.user?.name) {
      setImgSrc(session?.user?.name?.picture || "/dummy-profile.png");
      formik?.setValues({
        name: session?.user?.name?.name,
        email: session?.user?.name?.email,
        phone_number: session?.user?.name?.phone_number?.slice(3),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <form
      className="flex-1 flex flex-col gap-[2.5rem]"
      onSubmit={formik.handleSubmit}
    >
      <Box className="flex md:flex-col items-center gap-[1.25rem]">
        <img
          src={randomizeImage(imgSrc)}
          alt="Profile Picture"
          className="w-[7.5rem] h-[7.5rem] round object-cover"
        />
        <Box className="flex-1 w-full flex gap-[1.25rem]">
          <Button
            component="label"
            htmlFor="upload-image"
            variant="outlined"
            className="flex-1"
          >
            Upload
            <input
              hidden
              type="file"
              accept="image/png, image/jpeg"
              id="upload-image"
              onChange={(e: any) => {
                const file = e?.target?.files[0];
                if (file?.size > 400000) {
                  toast.error("File size must be less than 400kb");
                  return;
                }
                imageToBase64(file)?.then((base64) => setImgSrc(base64));
              }}
            />
          </Button>
          <Button
            color="error"
            variant="outlined"
            className="flex-1"
            onClick={() => setImgSrc("/dummy-profile.png")}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Box className="grid grid-cols-2 md:grid-cols-1 gap-[1.25rem]">
        <TextField
          label="Username"
          value={session?.user?.name?.username}
          disabled
        />
        <TextField
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          label="Name"
        />
        <TextField
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          label="Email"
        />
        <TextField
          {...formik.getFieldProps("phone_number")}
          error={
            formik.touched.phone_number && Boolean(formik.errors.phone_number)
          }
          helperText={formik.touched.phone_number && formik.errors.phone_number}
          label="Phone Number"
        />
      </Box>
      <Box className="flex items-center justify-end md:justify-center mt-auto">
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </form>
  );
};

export default Profile;
