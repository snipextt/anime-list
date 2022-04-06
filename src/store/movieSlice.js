import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    allMovies: [],
    favoriteMovies: [],
  },
  reducers: {
    setAllMovies: (state, action) => {
      state.allMovies = action.payload;
    },
    addFavoriteMovie: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const { setAllMovies, addFavoriteMovie, removeFavoriteMovie } =
  movieSlice.actions;

export default movieSlice.reducer;
