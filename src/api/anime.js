import baseService from "./_base";

export const getFilms = async () => await baseService.get("/films");

export const getSingleFilm = async (id) =>
  await baseService.get(`/films/${id}`);

export const getSingleCharacter = async (url) => await baseService.get(url);
