import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useNavigate } from "react-router-dom";

const FavoritesPopup = ({ closePopup }) => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  const navigate = useNavigate();

  return (
    <ClickAwayListener onClickAway={closePopup}>
      <Paper
        sx={{
          border: 1,
          width: 280,
          borderColor: "#8C4FFF",
          background: "#10101F",
          maxHeight: 350,
          overflowY: "scroll",
        }}
      >
        <Typography variant="h6" color="primary" textAlign={"center"}>
          Favorites
        </Typography>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {favoriteMovies.map((movie, i) => (
            <>
              <ListItem
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/anime/${movie.id}`);
                  closePopup();
                }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <img
                    src={movie.movie_banner}
                    style={{
                      width: 40,
                    }}
                  />
                </ListItemAvatar>
                <Typography
                  variant="body2"
                  textAlign={"center"}
                  paddingTop={0.7}
                  color="textPrimary"
                >
                  {movie.title}
                </Typography>
              </ListItem>
              {i != favoriteMovies.length - 1 && <Divider variant="inset" />}
            </>
          ))}
          {favoriteMovies.length === 0 && (
            <Typography
              variant="body2"
              textAlign={"center"}
              color="textPrimary"
            >
              No movies in your favorites
            </Typography>
          )}
        </List>
      </Paper>
    </ClickAwayListener>
  );
};

export default FavoritesPopup;
