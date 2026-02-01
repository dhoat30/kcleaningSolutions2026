import { createTheme } from "@mui/material/styles";
//export theme settings
// mui theme settings
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F9F871",
      dark: "#F8F770",
    },
    secondary: {
      main: "#bcb2fcff",
    },
    tertiary: {
      main: "#ffffff",
    },
    contrastThreshold: 4.5,
  },
  typography: {
    fontFamily: ["var(--font-inter)", "Segoe UI", "sans-serif"].join(","),
    h1: {
      fontSize: "5rem",
      fontWeight: 800,
      color: "var(--dark-on-surface)",
      lineHeight: "110%",
      fontFamily: ["var(--font-manrope)", "Segoe UI", "sans-serif"].join(","),

      "@media (max-width:900px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontWeight: 800,
      color: "var(--dark-on-surface)",
      lineHeight: 1,
      fontSize: "3.5rem",
      fontFamily: ["var(--font-manrope)", "Segoe UI", "sans-serif"].join(","),
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontWeight: 800,
      lineHeight: 1,
      color: "var(--dark-on-surface)",
      fontFamily: ["var(--font-manrope)", "Segoe UI", "sans-serif"].join(","),
    },
    h4: {
      fontWeight: 800,
      color: "var(--dark-on-surface)",

      "@media (max-width:900px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontWeight: 400,
      lineHeight: "130%",
      letterSpacing: "-0.02rem",
      color: "var(--dark-on-surface)",
    },

    h6: {
      fontWeight: 400,
      lineHeight: "130%",
      color: "var(--dark-on-surface)",
    },
    body1: {
      color: "var( --dark-on-surface-variant)",
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    subtitle1: {
      color: "var(--dark-on-surface)",
    },
    subtitle2: {
      color: "var(--dark-on-surface)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.2s ease-in-out",
          padding: "12px 32px",
          fontSize: "1rem",
        },
        contained: {
          "&:hover": {
            backgroundColor: "#ECEB5E", // slightly darker yellow
            transform: "translateY(-1px)",
          },
        },

        outlined: {
          borderRadius: "50px",
          textTransform: "none",
          border: "1px solid #F9F871",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        containedSecondary: {
          backgroundColor: "var(--light-primary)",
          color: "var(--light-on-primary)",
          "&:hover": {
            backgroundColor: "var(--dark-primary-container)",
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F33FF",
    },
    secondary: {
      main: "#4F33FF",
    },

    contrastThreshold: 4.5,
  },
  typography: {
    fontFamily: ["var(--font-inter)", "Segoe UI", "sans-serif"].join(","),
    h1: {
      fontSize: "5rem",
      fontWeight: 800,
      color: "var(--light-on-surface)",
      lineHeight: "110%",
      fontFamily: ["var(--font-manrope)", "Segoe UI", "sans-serif"].join(","),

      "@media (max-width:900px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontWeight: 800,
      color: "var(--light-on-surface)",
      lineHeight: 1,
      fontSize: "3.5rem",
      fontFamily: ["var(--font-manrope)", "Segoe UI", "sans-serif"].join(","),
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontWeight: 800,
      lineHeight: 1,
      color: "var(--light-on-surface)",
      fontFamily: ["var(--font-manrope)", "Segoe UI", "sans-serif"].join(","),
    },
    h4: {
      fontWeight: 800,
      color: "var(--light-on-surface)",

      "@media (max-width:900px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontWeight: 400,
      lineHeight: "130%",
      letterSpacing: "-0.02rem",
      color: "var(--light-on-surface)",
    },

    h6: {
      fontWeight: 400,
      lineHeight: "130%",
      color: "var(--light-on-surface)",
    },
    body1: {
      color: "var( --light-on-surface-variant)",
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    subtitle1: {
      color: "var(--light-on-surface)",
    },
    subtitle2: {
      color: "var(--light-on-surface)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.2s ease-in-out",
          padding: "12px 32px",
          fontSize: "1rem",
        },
        contained: {
          "&:hover": {
            backgroundColor: "#4026ebff", // slightly darker yellow
            transform: "translateY(-1px)",
          },
        },

        outlined: {
          borderRadius: "50px",
          textTransform: "none",
          border: "1px solid #4F33FF",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        containedSecondary: {
          backgroundColor: "var(--light-primary)",
          color: "var(--light-on-primary)",
          "&:hover": {
            backgroundColor: "var(--dark-primary-container)",
          },
        },
      },
    },
  },
});
