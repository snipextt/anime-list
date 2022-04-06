import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Finder = ({ finderOpen, handleClose }) => {
  const navigate = useNavigate();
  const allMovies = useSelector((state) => state.movies.allMovies);
  console.log(allMovies);

  const [moviesFromSearch, setMoviesFromSearch] = useState([]);
  const [search, setSearch] = useState("");
  const searchFn = useRef(null);

  useEffect(() => {
    clearTimeout(searchFn.current);
    searchFn.current = setTimeout(() => {
      if (search) {
        const filteredMovies = allMovies.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setMoviesFromSearch(filteredMovies);
      }
    }, 200);
  }, [search]);

  return (
    <Modal
      open={finderOpen}
      component={motion.div}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      onClose={handleClose}
      sx={{
        backgroundColor: "rgba(28, 28, 42, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        bgcolor={"#1C1C2A"}
        sx={{
          width: {
            xs: "90%",
            md: "70%",
            lg: "45%",
          },
          border: 1,
          borderColor: "#05D8FF",
          backgroundColor: "background.paper",
          borderRadius: "0.5rem",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Paper
          sx={{
            height: "380px",
            background: "#10101f",
            overflowY: "scroll",
          }}
        >
          {!search && (
            <Typography textAlign={"center"} paddingTop={15} variant="h5">
              Start typing to search
            </Typography>
          )}
          <List>
            {search &&
              moviesFromSearch.map((movie, i) => (
                <ListItem
                  onClick={() => {
                    handleClose();
                    navigate(`/anime/${movie.id}`);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <img
                      src={movie.movie_banner}
                      style={{
                        width: 80,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ marginLeft: "1rem" }}
                    primary={
                      <Typography variant="body1" color={"primary"}>
                        {movie.title}
                      </Typography>
                    }
                    secondary={
                      <Typography component="span" variant="body2">
                        {movie.description.substring(0, 100)}...
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Paper>
      </Box>
    </Modal>
  );
};

export default Finder;
