import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const themes = [
  responsiveFontSizes(
    createTheme({
      palette: {
        mode: "dark",
        background: {
          default: "#111111",
          paper: "#10101f",
        },
        primary: {
          main: "#00d8ff",
          contrastText: "#140202",
        },
        secondary: {
          main: "#8c4fff",
          contrastText: "#ffffff",
        },
      },
      spacing: 10,
      shape: {
        borderRadius: 6,
      },
      overrides: {
        MuiSwitch: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: 8,
          },
          switchBase: {
            padding: 1,
            "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
              transform: "translateX(16px)",
              color: "#fff",
              "& + $track": {
                opacity: 1,
                border: "none",
              },
            },
          },
          thumb: {
            width: 24,
            height: 24,
          },
          track: {
            borderRadius: 13,
            border: "1px solid #bdbdbd",
            backgroundColor: "#fafafa",
            opacity: 1,
            transition:
              "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
        },
      },
      typography: {
        fontFamily: "Lato",
      },
    })
  ),
];

export default themes;
