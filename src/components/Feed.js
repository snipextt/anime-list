import { Typography } from "@mui/material";
import Container from "./Layout/Conatiner";
import Highlighter from "./Layout/Highlighter";
import { getFilms } from "../api/anime";
import { useState, useEffect } from "react";
import FilmCard from "./Layout/FilmCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { setAllMovies } from "../store/movieSlice";
import { useDispatch } from "react-redux";

const Feed = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchFilms = async () => {
    const data = await getFilms();
    setFilms(data);
    dispatch(setAllMovies(data));
    setLoading(false);
  };

  useEffect(() => {
    fetchFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography variant="h5">Trending movies</Typography>
      <Highlighter width={12} />
      <Box sx={{ flexGrow: 1, marginTop: 4, marginBottom: 4 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {loading &&
            new Array(12).fill(0).map((_, i) => (
              <Grid item key={i} xs={12} sm={6} lg={4} xl={3}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  height={316}
                  sx={{
                    borderRadius: 1,
                  }}
                />
              </Grid>
            ))}
          {!loading &&
            films?.map((film, i) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={i}>
                <FilmCard {...film} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Feed;
