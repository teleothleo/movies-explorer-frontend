import { BFAPI_URL } from "./constants";

export const apiBfFetchMovies = async () => {
  return await fetch(BFAPI_URL);
}