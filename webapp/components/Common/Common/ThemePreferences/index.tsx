// React
import React, { useState } from "react";

// MUI
import {
  Typography,
  Box,
  Drawer,
  Toolbar,
  Divider,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

// Icons
import { SettingsOutlined, Close, Check } from "@mui/icons-material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "@/store/theme/theme-slice";

// Constants
import { APP_BAR_HEIGHT } from "@/constants/globals";

// Types & Enums
import { ThemeSliceType } from "@/types/global-types";
import { ThemeModesEnum, ThemeColorsEnum } from "@/types/global-enums";

const ThemePreferences = () => {
  // States
  const [open, setOpen] = useState(false);

  // Vars
  const colors = [
    {
      backgroundColor: "#001c53",
      value: ThemeColorsEnum.PRIMARY,
    },
    {
      backgroundColor: "secondary.main",
      value: ThemeColorsEnum.SECONDARY,
    },
    {
      backgroundColor: "success.main",
      value: ThemeColorsEnum.SUCCESS,
    },
    {
      backgroundColor: "error.main",
      value: ThemeColorsEnum.ERROR,
    },
    {
      backgroundColor: "warning.main",
      value: ThemeColorsEnum.WARNING,
    },
    {
      backgroundColor: "info.main",
      value: ThemeColorsEnum.INFO,
    },
  ];

  // Redux Dispatch
  const dispatch = useDispatch();

  // Redux States
  const { mode, themeColor }: ThemeSliceType = useSelector(
    (state: any) => state.theme
  );

  return (
    <>
      <Box
        className="h-[2.5rem] w-[3rem] rounded-l-[24px] flex items-center justify-center fixed inset-y-[50%] right-0 translate-y-[-50%] z-5 pointer"
        sx={{
          backgroundColor: "primary.main",
          color: "common.white",
        }}
        onClick={() => setOpen(true)}
      >
        <SettingsOutlined className="animate-spin" />
      </Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        classes={{ paper: "w-[20rem]" }}
      >
        <Toolbar
          className="px-[1.25rem] flex items-center justify-between"
          style={{ minHeight: APP_BAR_HEIGHT }}
        >
          <h6 className="text-h6 font-medium">Theme Preferences</h6>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Toolbar>
        <Divider className="!m-0" />
        <div className="h-full w-full p-[1.25rem] flex flex-col gap-[1.25rem] overflow-y-auto scrollbar">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography variant="body1" color="textSecondary">
                Modes
              </Typography>
            </FormLabel>
            <RadioGroup row aria-label="modes" name="modes" defaultValue={mode}>
              <FormControlLabel
                value={ThemeModesEnum.LIGHT}
                control={<Radio />}
                label="Light"
                onClick={() => {
                  dispatch(
                    themeActions.changeTheme({
                      mode: ThemeModesEnum.LIGHT,
                      themeColor: themeColor,
                    })
                  );
                }}
              />
              <FormControlLabel
                value={ThemeModesEnum.DARK}
                control={<Radio />}
                label="Dark"
                onClick={() => {
                  dispatch(
                    themeActions.changeTheme({
                      mode: ThemeModesEnum.DARK,
                      themeColor: themeColor,
                    })
                  );
                }}
              />
            </RadioGroup>
          </FormControl>
          <Box className="flex flex-col gap-[0.5rem]">
            <Typography variant="body1" color="textSecondary">
              Colors
            </Typography>
            <div className="flex justify-between gap-[0.625rem]">
              {colors?.map((color) => (
                <Box
                  key={color?.value}
                  className="w-[2rem] h-[2rem] rounded-full pointer"
                  sx={{ backgroundColor: color.backgroundColor }}
                  onClick={() => {
                    dispatch(
                      themeActions.changeTheme({
                        mode: mode,
                        themeColor: color?.value,
                      })
                    );
                  }}
                >
                  {themeColor === color?.value && (
                    <Box className="w-full h-full flex items-center justify-center">
                      <Check
                        sx={{ color: "common.white", fontSize: "1.25rem" }}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </div>
          </Box>
        </div>
      </Drawer>
    </>
  );
};

export default ThemePreferences;
