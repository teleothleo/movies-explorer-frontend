import { BFAPI_URL } from "./constants";

export default class MovieApi {

  async fetchMovies() {
    try {
      const response = await fetch(BFAPI_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}