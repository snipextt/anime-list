import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Popper from "@mui/material/Popper";
import FavoritesPopup from "./FavouritesPopup";
import Finder from "./Finder";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const [finderOpen, setFinderOpen] = useState(false);
  const handleFinderOpen = () => setFinderOpen(true);
  const handleFinderClose = () => setFinderOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleFavouritePopup = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const FavoritesOpen = Boolean(anchorEl);
  const id = finderOpen ? "simple-popper" : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={12} color="transparent">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: {
              lg: "6rem",
              sm: "0rem",
            },
            marginRight: {
              lg: "6rem",
              sm: "0rem",
            },
          }}
        >
          <Box
            onClick={() => navigate("/")}
            sx={{ flexDirection: "row", cursor: "pointer" }}
          >
            <Typography
              variant="h4"
              noWrap
              component="div"
              color={"primary"}
              sx={{ flexGrow: 1, display: "inline" }}
            >
              Anime
            </Typography>
            <Typography
              variant="h6"
              color={"secondary"}
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "inline" }}
            >
              List
            </Typography>
          </Box>
          <Box sx={{ flexDirection: "row" }}>
            <IconButton
              onClick={handleFinderOpen}
              component={motion.button}
              whileTap={{ scale: 0.7 }}
              color="secondary"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={toggleFavouritePopup}
              aria-describedby={id}
              component={motion.button}
              whileTap={{ scale: 0.7 }}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Popper id={id} open={FavoritesOpen} anchorEl={anchorEl}>
        <FavoritesPopup closePopup={toggleFavouritePopup} />
      </Popper>
      <Divider />
      <Finder finderOpen={finderOpen} handleClose={handleFinderClose} />
    </Box>
  );
};

export default Header;
