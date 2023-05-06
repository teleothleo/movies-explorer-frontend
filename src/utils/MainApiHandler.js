import { apiGetMovies } from "./MainApi";

export class MainApiHandler {

  async fetchSavedMovies() {
    const res = await apiGetMovies();
    const resJ = await res.json();
    console.log("SavedMovies:,", resJ);
    return resJ;
  }

  searchMovies(movies, query) {
    const newSearchRes = movies.filter((item) => (
      item.nameRU.toLowerCase()
        .includes(query.toLowerCase())
      || item.nameEN.toLowerCase()
        .includes(query.toLowerCase())
    ));
    console.log("NewSearchRes:", newSearchRes);
    return newSearchRes;
  }

}