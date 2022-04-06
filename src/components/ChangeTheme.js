import { Paper, Typography } from "@mui/material";

const ChangeTheme = ({ theme, setTheme, currentTheme }) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 20,
        left: "calc(100% - 180px)",
        flexDirection: "column",
        display: "flex",
        border: "1px solid white",
      }}
    >
      <Typography
        sx={{
          margin: "0.5rem",
        }}
        variant="body2"
        textAlign={"center"}
      >
        Change Theme
      </Typography>
      <Paper
        sx={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        {theme.map((color, i) => (
          <div
            key={i}
            onClick={() => setTheme(i)}
            style={{
              cursor: "pointer",
              width: "30px",
              borderRadius: "50%",
              border: `1px solid ${
                i === currentTheme ? "white" : "transparent"
              }`,
              height: "30px",
              background: color,
              margin: "6px",
            }}
          ></div>
        ))}
      </Paper>
    </Paper>
  );
};

export default ChangeTheme;
