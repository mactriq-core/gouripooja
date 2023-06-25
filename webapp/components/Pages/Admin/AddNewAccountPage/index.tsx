import React, { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// MUI
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
  Box,
  Switch,
  Typography,
} from "@mui/material";

// Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// Constants
import { COUNTRIES } from "@/constants/globals";

// Toast
import { toast } from "react-hot-toast";

// Lib
import { imageToBase64 } from "@/lib/image-to-base64";
import { randomizeImage } from "@/lib/randomize-image";

// Redux
import { useDispatch } from "react-redux";

// Types & Enums
import { AccountType } from "@/types/global-types";
import { apis } from "@/constants/apis";

const AddNewAccountPage = () => {
  // Next Router
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  console.log(id);

  // States
  const [accountLogoSrc, setAccountLogoSrc] = useState("");
  const [signatureLogoSrc, setSignatureLogoSrc] = useState("");
  const [photographSrc, setPhotographSrc] = useState("");
  const [isError, setIsError] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // Formik Validation
  const formik = useFormik({
    initialValues: {
      // General
      accountName: "",
      accountType: "",
      languages: [],
      //Address
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      //Account Owner
      name: "",
      phone: "",
      mobile: "",
      email: "",
      // Account Info
      accountGST: "",
      accountPAN: "",
      // Account Configuration
      autoBackup: false,
    },
    validationSchema: Yup.object({
      // General
      accountName: Yup.string().required("Account Name Required"),
      accountType: Yup.string().required("Account Type Required"),
      languages: Yup.array()
        .required("Required")
        .min(1, "Atleast 1 Language required"),
      //Address
      address: Yup.string().required("Address Required"),
      city: Yup.string().required("City Required"),
      state: Yup.string().required("State Required"),
      country: Yup.string().required("Country Required"),
      pincode: Yup.string()
        .required("Pincode Required")
        .matches(/^[0-9]+$/, "Should be a number")
        .min(6, "Should be 6 digits")
        .max(6, "Should be 6 digits"),
      // Account Owner
      name: Yup.string().required("Business Owner Name"),
      phone: Yup.string()
        .required("Phone Number Required")
        .matches(/^[0-9]+$/, "Should be a number")
        .min(10, "Should be 10 digits")
        .max(10, "Should be 10 digits"),
      mobile: Yup.string()
        .required("Mobile Number Required")
        .matches(/^[0-9]+$/, "Should be a number")
        .min(10, "Should be 10 digits")
        .max(10, "Should be 10 digits"),
      email: Yup.string()
        .required("Required")
        .email("Invalid email address")
        .lowercase("Email must be in lowercase"),
      //   Account Info
      accountGST: Yup.string()
        .required("Business GST Required")
        .min(15, "Should be 15 digits")
        .max(15, "Should be 15 digits"),
      accountPAN: Yup.string()
        .required("Business PAN required")
        .min(10, "Should be 10 digits")
        .max(10, "Should be 10 digits"),
      // Account Config
      autoBackup: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      // Precheck to prevent default data upload in images
      // Add Below

      console.log(values);

      // Create Request Body
      const createBody: AccountType = {
        Meta: {
          AccountName: values.accountName,
          Logo: accountLogoSrc,
          AccountType: values.accountType as any,
          Languages: values.languages,
        },
        Address: {
          AddressLine: values.address,
          City: values.city,
          State: values.state,
          Country: values.country,
          Pincode: values.pincode,
        },
        Account: {
          Name: values.name,
          Phone: values.phone,
          Mobile: values.mobile,
          Signature: signatureLogoSrc,
        },
        AccountInfo: {
          AccountGST: values.accountGST,
          AccountPAN: values.accountPAN,
        },
        AccountConfig: {
          AutoBackup: values.autoBackup,
        },
      };

      // Edit Request Body
      const editBody: AccountType = {
        account_id: String(id),
        ...createBody,
      };

      const body = id ? editBody : createBody;

      // Get API routes
      const api = id
        ? apis.updateAccount.apiRoute
        : apis.createAccount.apiRoute;

      try {
        const response = body;
        console.log("BODY PRINTED");
        console.log(response);

        toast.success("ADDED SUCCESSFULLY");

        // Set form to initial state
        setAccountLogoSrc("");
        setPhotographSrc("");
        setSignatureLogoSrc("");

        // Reset Form
        formik.resetForm();

        // Navigate to all accounts page
        router.push("/admin/accounts/all-accounts");
      } catch (error: any) {
        // Throw errors if something goes wrong
        toast.error(error);
      } finally {
        console.log("New response recorded");
      }
    },
  });

  return (
    <>
      <form className="flex flex-1" onSubmit={formik.handleSubmit}>
        <Box
          sx={{ backgroundColor: "#fcfcfc" }}
          className="flex flex-1 flex-col gap-[1.25rem] p-[1.25rem] round shadow"
        >
          <Box className="flex flex-col gap-[1.25rem] ">
            <Typography sx={{ fontWeight: 600, lineHeight: 1 }} variant="body1">
              Add New Account Form
            </Typography>
            <Box className="flex flex-col gap-[1.25rem]">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-[1.25rem] ">
                <div className="flex flex-col gap-[0.5rem]">
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Account Logo
                  </Typography>
                  <Box className="flex flex-1 items-center gap-[1.25rem]">
                    <img
                      src={randomizeImage(accountLogoSrc)}
                      alt="account logo"
                      className="w-[7.5rem] h-[7.5rem] round object-cover bg-gray-300 border"
                    />
                    <Box className="flex flex-1 md:flex-col gap-[1.25rem]">
                      <Button
                        component="label"
                        htmlFor="account-logo"
                        variant="outlined"
                        fullWidth
                      >
                        Upload
                        <input
                          hidden
                          type="file"
                          accept="image/png, image/jpeg"
                          id="account-logo"
                          onChange={(e: any) => {
                            const file = e?.target.files[0];
                            if (file?.size > 400000) {
                              toast.error(
                                "File size should be less than 400Kb"
                              );
                              return;
                            }
                            imageToBase64(file)?.then((base64) =>
                              setAccountLogoSrc(base64)
                            );
                          }}
                        />
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          setAccountLogoSrc("");
                        }}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </div>
              </div>
              <Box className="grid grid-cols-1 md:grid-cols-2 sm:!grid-cols-1 gap-[1.25rem]">
                <TextField
                  label="Account Name"
                  {...formik.getFieldProps("accountName")}
                  error={Boolean(
                    formik.touched.accountName && formik.errors.accountName
                  )}
                  helperText={
                    formik.touched.accountName && formik.errors.accountName
                  }
                  size="small"
                />
                <FormControl
                  error={
                    formik.touched.accountType &&
                    Boolean(formik.errors.accountType)
                  }
                >
                  <InputLabel id="account-type-label" size="small">
                    Account Type
                  </InputLabel>
                  <Select
                    labelId="account-type-label"
                    {...formik.getFieldProps("accountType")}
                    label="Account Type"
                    size="small"
                  >
                    {[
                      "Manufacturing",
                      "Trading",
                      "Retail",
                      "Wholesale",
                      "Export",
                      "Others",
                    ].map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.accountType && formik.errors.accountType}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  error={
                    formik.touched.languages && Boolean(formik.errors.languages)
                  }
                >
                  <InputLabel id="languages-label" size="small">
                    Languages
                  </InputLabel>
                  <Select
                    labelId="languages-label"
                    multiple
                    {...formik.getFieldProps("languages")}
                    label="Languages"
                    size="small"
                  >
                    {["English", "Hindi", "Marathi", "Gujarati"].map(
                      (item, i) => (
                        <MenuItem key={i} value={item}>
                          {item}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  <FormHelperText>{formik.touched.languages}</FormHelperText>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-[1.25rem]">
            <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1 }}>
              Address Details
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 sm:!grid-cols-1 gap-[1.25rem]">
              <TextField
                label="Address"
                {...formik.getFieldProps("address")}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address}
                size="small"
              />
              <TextField
                label="City"
                {...formik.getFieldProps("city")}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city}
                size="small"
              />
              <TextField
                label="State"
                {...formik.getFieldProps("state")}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state}
                size="small"
              />
              <FormControl
                error={formik.touched.country && Boolean(formik.errors.country)}
              >
                <InputLabel id="country-label" size="small">
                  Country
                </InputLabel>
                <Select
                  labelId="country-label"
                  {...formik.getFieldProps("country")}
                  label="Country"
                  size="small"
                >
                  {COUNTRIES.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.country && formik.errors.country}
                </FormHelperText>
              </FormControl>
              <TextField
                label="Pincode"
                {...formik.getFieldProps("pincode")}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
                size="small"
              />
            </Box>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-[1.25rem]">
            <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1 }}>
              Owner Details
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 sm:!grid-cols-1 gap-[1.25rem]">
              <TextField
                label="Name"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                size="small"
              />
              <TextField
                label="Phone"
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                size="small"
              />
              <TextField
                label="Mobile"
                {...formik.getFieldProps("mobile")}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                size="small"
              />
              <TextField
                label="Email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                size="small"
              />
            </Box>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-[1.25rem]">
            <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1 }}>
              Account Details
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 sm:!grid-cols-1 gap-[1.25rem]">
              <TextField
                label="GST No"
                {...formik.getFieldProps("accountGST")}
                error={
                  formik.touched.accountGST && Boolean(formik.errors.accountGST)
                }
                helperText={
                  formik.touched.accountGST && formik.errors.accountGST
                }
                size="small"
              />
              <TextField
                label="PAN No"
                {...formik.getFieldProps("accountPAN")}
                error={
                  formik.touched.accountPAN && Boolean(formik.errors.accountPAN)
                }
                helperText={
                  formik.touched.accountPAN && formik.errors.accountPAN
                }
                size="small"
              />
            </Box>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-[1.25rem]">
            <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1 }}>
              Account Configurations
            </Typography>
            <Box className="grid grid-cols-1 md:grid-cols-2 sm:!grid-cols-1 gap-[1.25rem]">
              <div className="flex items-center">
                <Switch
                  {...formik.getFieldProps("autoBackup")}
                  checked={formik.values.autoBackup}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Auto Backup Data Daily
                </Typography>
              </div>
            </Box>
          </Box>
          <Divider />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="!ml-auto sm:!mx-auto"
          >
            {id ? "Update" : "Create"} Account
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddNewAccountPage;
