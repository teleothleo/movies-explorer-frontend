import MoviesApi, { apiBfFetchMovies } from "./MoviesApi";

export class MoviesApiHandler {
  constructor() {
    this.movies = null;
  }

  async fetchMovies () {
    const res = await apiBfFetchMovies();
    const resJ = await res.json();
    this.movies = resJ;
    return this.movies;
  }
}