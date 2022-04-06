import { Box } from "@mui/material";

const Container = ({ children }) => (
  <Box
    sx={{
      marginLeft: {
        lg: "6rem",
        sm: "0rem",
      },
      marginRight: {
        lg: "6rem",
        sm: "0rem",
      },
      paddingLeft: {
        sm: "30px",
        xs: "20px",
      },
      paddingRight: {
        sm: "30px",
        xs: "20px",
      },
      marginTop: 6,
      marginBottom: 5,
    }}
  >
    {children}
  </Box>
);

export default Container;
