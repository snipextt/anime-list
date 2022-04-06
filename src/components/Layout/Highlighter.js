import { Box } from "@mui/material";

const Highlighter = ({ width }) => (
  <Box
    className="hue-rotate"
    sx={{
      width: {
        lg: width + "ch",
        sm: width / 1.2 + "ch",
        xs: width / 1.4 + "ch",
      },
      height: "4px",
      background: "linear-gradient(to left, #00d8ff , #8c4fff)",
      border: 0,
      borderRadius: "8px",
    }}
  />
);

export default Highlighter;
