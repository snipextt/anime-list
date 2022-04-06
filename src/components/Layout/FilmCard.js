import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addFavoriteMovie, removeFavoriteMovie } from "../../store/movieSlice";
import cogoToast from "cogo-toast";
import { motion } from "framer-motion";

const FilmCard = ({
  title,
  description,
  movie_banner,
  release_date,
  rt_score,
  id,
}) => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavoriteMovie = favoriteMovies.find((movie) => movie.id === id);
    setIsFavorite(!!isFavoriteMovie);
  }, [favoriteMovies, id]);

  const toggleFavorite = () => {
    if (!isFavorite) {
      dispatch(
        addFavoriteMovie({
          id,
          title,
          description,
          movie_banner,
          release_date,
          rt_score,
        })
      );
      cogoToast.success("Added to favorites", { position: "bottom-right" });
    } else {
      dispatch(removeFavoriteMovie({ id }));
      cogoToast.info("Removed from favorites", { position: "bottom-right" });
    }
  };

  return (
    <Card sx={{ margin: "auto" }}>
      <Link to={`/anime/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={movie_banner}
          alt="green iguana"
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h6" color="primary" component="div">
          <Link to={`/anime/${id}`}>{title}</Link>
        </Typography>
        <Divider />
        <Typography
          sx={{
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
          variant="body2"
          color="text.secondary"
        >
          {description?.substring(0, 108).padEnd(113, ".")}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <CalendarTodayIcon fontSize="8" />
            &nbsp;{release_date}
            &nbsp;&nbsp;&nbsp;
            <SportsScoreIcon fontSize="8" />
            &nbsp;{rt_score}
          </span>
          <span>
            <IconButton
              onClick={toggleFavorite}
              component={motion.button}
              whileTap={{ scale: 0.7 }}
            >
              {!isFavorite && <FavoriteBorderIcon color="primary" />}
              {isFavorite && <FavoriteIcon color="primary" />}
            </IconButton>
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FilmCard;
