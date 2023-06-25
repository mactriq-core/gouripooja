// React
import React, { ReactNode } from "react";

// MUI
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

// Theme Libs
import { getPalette } from "@/theme/getPalette";

// Redux
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Redux States
  const { mode, themeColor } = useSelector((state: any) => state.theme);

  // Theme
  const theme = createTheme({
    palette: getPalette(mode, themeColor),
    typography: {
      htmlFontSize: 16,
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            fontWeight: theme.typography.fontWeightRegular,
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "lightgray",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray",
            },
          },
        }}
      />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
