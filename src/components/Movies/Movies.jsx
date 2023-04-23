import MoviesCardList from "../MoviesCardList/MoviesCardList";
import LoadCardList from "../LoadCardList/LoadCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useCallback, useEffect, useState } from "react";
import MoviesApi from "../../utils/MoviesApi";

const Movies = () => {

  const [movies, setMovies] = useState(null);
  const [searchRes, setSearchRes] = useState(null);

  const fetchMovies = useCallback(async () => {
    const moviesApi = new MoviesApi();
    const newMovies = await moviesApi.fetchMovies();
    setMovies(newMovies);
    storeBeatFilmDb(newMovies);
  }, [])

  const findMovies = (movies, queryRef) => {
    if (movies) {

      const newSearchRes = movies.filter((item) => (
        item.nameRU.toLowerCase()
          .includes(queryRef.current.value.toLowerCase())
        || item.nameEN.toLowerCase()
          .includes(queryRef.current.value.toLowerCase())
      ));

      storeSearchRes(newSearchRes);
      setSearchRes(newSearchRes);

      console.log(
        "Query: ", queryRef.current.value,
        "\nRes: ", newSearchRes,
        // "\nMoviesDB: ", movies
      )

    }
  }

  const storeSearchRes = (searchRes) => {
    localStorage.setItem("searchRes", JSON.stringify(searchRes));
  }

  const storeBeatFilmDb = (allMovies) => {
    localStorage.setItem("beatFilmDb", JSON.stringify(allMovies));
  }

  const loadStoredSearchRes = () => {
    setSearchRes(JSON.parse(localStorage.getItem("searchRes")))
  }

  const loadStoredBeatFilmDb = () => {
    setMovies(JSON.parse(localStorage.getItem("beatFilmDb")))
  }

  useEffect(() => {
    if (!movies && localStorage.getItem("beatFilmDb")) {
      loadStoredBeatFilmDb();
    }
    if (!movies && !localStorage.getItem("beatFilmDb")) {
      fetchMovies();
    }
    if (!searchRes && localStorage.getItem("searchRes")) {
      loadStoredSearchRes();
    }
  }, [fetchMovies, movies, searchRes]);

  return (
    <main className="movies">
      { movies && <SearchForm movies={movies} onSearchClick={findMovies} />}
      { searchRes && <MoviesCardList isSaved={false} cardsData={searchRes} />}
      { searchRes && <LoadCardList /> }
    </main>
  );
}

export default Movies;
