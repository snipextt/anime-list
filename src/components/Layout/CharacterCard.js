import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MaleImage from "../../static/male.png";
import FemaleImage from "../../static/female.jpg";

const CharacterCard = ({ character }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={character.name}
            image={character.gender === "Female" ? FemaleImage : MaleImage}
            title={character.name}
          />
          <CardContent>
            <Typography gutterBottom variant="body2">
              {character.name}
            </Typography>
            <Typography
              sx={{
                alignItems: "center",
                display: "flex",
              }}
              variant="body2"
            >
              Age - {character.age}&nbsp;&nbsp;&nbsp;&nbsp;
              {character.gender === "Female" && (
                <FemaleIcon sx={{ color: "pink" }} />
              )}
              {character.gender === "Male" && <MaleIcon color="primary" />}
              {character.gender}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CharacterCard;
