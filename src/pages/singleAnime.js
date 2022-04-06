import { Divider, IconButton, Stack, Typography } from "@mui/material";
import Container from "../components/Layout/Conatiner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCharacter, getSingleFilm } from "../api/anime";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Highlighter from "../components/Layout/Highlighter";
import BadgeIcon from "@mui/icons-material/Badge";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import PeopleIcon from "@mui/icons-material/People";
import Tooltip from "@mui/material/Tooltip";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareBorderIcon from "@mui/icons-material/ShareOutlined";
import Button from "@mui/material/Button";
import CharacterCard from "../components/Layout/CharacterCard";
import cogoToast from "cogo-toast";
import { addFavoriteMovie, removeFavoriteMovie } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const SingleAnime = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleFilm, setSingleFilm] = useState({});
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavoriteMovie = favoriteMovies.find((movie) => movie.id === id);
    setIsFavorite(!!isFavoriteMovie);
  }, [favoriteMovies, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchSingleFilm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchSingleFilm = async () => {
    const film = await getSingleFilm(id);
    const characters = await Promise.all(
      film.people
        .filter((c) => !(c.split("/").pop() === ""))
        .map((c) => getSingleCharacter(c))
    );
    setCharacters(characters);
    setSingleFilm(film);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    cogoToast.success("Copied to clipboard", { position: "bottom-right" });
  };

  const toggleFavorite = () => {
    if (!isFavorite) {
      dispatch(addFavoriteMovie(singleFilm));
      cogoToast.success("Added to favorites", { position: "bottom-right" });
    } else {
      dispatch(removeFavoriteMovie(singleFilm));
      cogoToast.info("Removed from favorites", { position: "bottom-right" });
    }
  };

  return (
    <Stack
      component={motion.div}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <Container>
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            marginTop: -4,
          }}
        >
          <Typography variant="h4" textAlign={"center"} color={"primary"}>
            {loading && (
              <center>
                <Skeleton variant="text" width={180} height={45} />
              </center>
            )}
            {!loading && singleFilm.title}
          </Typography>
          <Divider
            sx={{
              marginTop: 1,
            }}
          />
        </Stack>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: 2,
          }}
        >
          <Grid item xs={12} lg={4}>
            {loading && (
              <Skeleton
                animation="wave"
                sx={{
                  borderRadius: 1,
                }}
                variant="rect"
                height={266}
              />
            )}
            {!loading && (
              <img
                alt={singleFilm.title}
                src={singleFilm?.movie_banner}
                style={{
                  maxWidth: "100%",
                }}
              />
            )}
            {loading && (
              <>
                <Skeleton
                  animation="wave"
                  sx={{
                    borderRadius: 1,
                    marginTop: 2,
                  }}
                  variant="rect"
                  height={40}
                />
                <Skeleton
                  animation="wave"
                  sx={{
                    borderRadius: 1,
                    marginTop: 2,
                  }}
                  variant="rect"
                  height={40}
                />
              </>
            )}
            {!loading && (
              <>
                <Button
                  fullWidth
                  component={motion.button}
                  whileTap={{
                    scale: 0.9,
                  }}
                  sx={{
                    marginTop: 2,
                  }}
                  onClick={toggleFavorite}
                  startIcon={
                    isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                  }
                  variant={isFavorite ? "contained" : "outlined"}
                  color={isFavorite ? "secondary" : "primary"}
                >
                  {isFavorite ? "Remove From Favorites" : "Add To Favorites"}
                </Button>

                <Button
                  fullWidth
                  component={motion.button}
                  whileTap={{
                    scale: 0.9,
                  }}
                  sx={{
                    marginTop: 2,
                  }}
                  onClick={copyToClipboard}
                  startIcon={<ShareBorderIcon />}
                  variant="outlined"
                >
                  Share
                </Button>
              </>
            )}
          </Grid>
          <Grid item xs={12} lg={8}>
            {loading && (
              <Paper
                sx={{
                  padding: 3,
                }}
                color="transparent"
                elevation={3}
              >
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={160}
                  height={40}
                />
                <Divider />
                <br />
                <Skeleton animation="wave" variant="text" height={25} />
                <Skeleton animation="wave" variant="text" height={25} />
                <Skeleton animation="wave" variant="text" height={25} />
                <Skeleton animation="wave" variant="text" height={25} />
                <Stack
                  direction={"row"}
                  sx={{
                    justifyContent: "space-between",
                  }}
                  gap={4}
                >
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={160}
                    height={40}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={160}
                    height={40}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={160}
                    height={40}
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={160}
                    height={40}
                  />
                </Stack>
                <br />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={160}
                  height={40}
                />
                <Divider />
                <br />
                <Grid
                  container
                  spacing={4}
                  sx={{
                    marginTop: 1,
                  }}
                >
                  {new Array(4).fill(0).map((_, i) => (
                    <Grid item xs={12} sm={4} md={3}>
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={230}
                        sx={{
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
            {!loading && (
              <Paper
                sx={{
                  padding: 3,
                }}
                color="transparent"
                elevation={3}
              >
                <Typography variant="h5">Description</Typography>
                <Divider
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                  }}
                />
                <Typography variant="body1" textAlign={"justify"}>
                  {singleFilm.description}
                </Typography>
                <br />
                <Highlighter width={20} />
                <br />
                <Stack
                  direction={{
                    xs: "column",
                    lg: "row",
                  }}
                  alignItems={{
                    xs: "flex-start",
                    lg: "center",
                  }}
                  justifyContent={{
                    xs: "flex-start",
                    lg: "space-between",
                  }}
                  gap={{
                    xs: 1,
                    lg: 0,
                  }}
                >
                  <Tooltip title="Orignal Title">
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <BadgeIcon />
                      &nbsp;&nbsp;
                      <Typography variant="body2" color="primary">
                        {singleFilm.original_title} (
                        {singleFilm.original_title_romanised})
                      </Typography>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Directed By">
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <PhotoCameraFrontIcon />
                      &nbsp;&nbsp;
                      <Typography variant="body2" color="primary">
                        {singleFilm.director}
                      </Typography>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Produced By">
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <PeopleIcon />
                      &nbsp;&nbsp;
                      <Typography variant="body2" color="primary">
                        {singleFilm.producer}
                      </Typography>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Release">
                    <Stack
                      direction={"row"}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <DateRangeIcon />
                      &nbsp;&nbsp;
                      <Typography variant="body2" color="primary">
                        {singleFilm.release_date}
                      </Typography>
                    </Stack>
                  </Tooltip>
                </Stack>
                <br />
                <br />

                <Typography variant="h5">Characters</Typography>
                <Divider
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                  }}
                />
                <Grid
                  container
                  spacing={4}
                  sx={{
                    marginTop: 1,
                  }}
                >
                  {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </Grid>
                {characters.length === 0 && (
                  <Typography
                    sx={{
                      marginTop: 2,
                    }}
                    textAlign="center"
                    variant="h5"
                  >
                    No Characters Data
                  </Typography>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default SingleAnime;
