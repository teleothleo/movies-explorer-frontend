import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useCallback, useEffect, useState } from "react";
import MoviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import { ErrBadFetch, ErrNotFound } from "../../utils/constants";

const Movies = () => {

  const [movies, setMovies] = useState(null);
  const [searchRes, setSearchRes] = useState(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [initialCardsQuantity, setInitialCardsQuantity] = useState(12);
  const [howManyCardsToLoadOnClick, setHowManyCardsToLoadOnClick] = useState(3);


  const fetchMovies = useCallback(async () => {
    try {
      setShowError(false);
      const moviesApi = new MoviesApi();
      setShowPreloader(true);
      const newMovies = await moviesApi.fetchMovies();
      newMovies && setShowPreloader(false);
      setMovies(newMovies);
      storeBeatFilmDb(newMovies);
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  }, [])

  const findMovies = (movies, queryRef) => {
    try {
      setShowError(false);
      if (movies) {

        setShowPreloader(true);
        const newSearchRes = movies.filter((item) => (
          item.nameRU.toLowerCase()
            .includes(queryRef.current.value.toLowerCase())
          || item.nameEN.toLowerCase()
            .includes(queryRef.current.value.toLowerCase())
        ));

        setTimeout(() => {
          console.log("Fake loading");
          storeSearchRes(newSearchRes);
          setSearchRes(newSearchRes);
          setShowPreloader(false);
        }, "1000");

        console.log(
          "Query: ", queryRef.current.value,
          "\nRes: ", newSearchRes,
          // "\nMoviesDB: ", movies
        )
      }

    } catch (error) {
      console.error(error);
      setShowError(true);
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

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768) {
      setInitialCardsQuantity(12);
      setHowManyCardsToLoadOnClick(3);
      console.log(12, windowWidth);
    } else if (windowWidth <= 768 && windowWidth > 480) {
      setInitialCardsQuantity(8);
      setHowManyCardsToLoadOnClick(2);
      console.log(8, windowWidth);
    } else if (windowWidth <= 480) {
      setInitialCardsQuantity(5);
      setHowManyCardsToLoadOnClick(2);
      console.log(5, windowWidth);
    } else {
      setInitialCardsQuantity(12);
      setHowManyCardsToLoadOnClick(3);
      console.log(1212, windowWidth);
    }
  }, []);

  return (
    <main className="movies">

      {movies && <SearchForm movies={movies} onSearchClick={findMovies} />}

      {searchRes
        && searchRes.length === 0
        && !showPreloader
        && <p className="movies__err-msg">{ErrNotFound}</p>}

      {showError
        && !showPreloader
        && <p className="movies__err-msg">{ErrBadFetch}</p>}

      {showPreloader && <Preloader />}

      {searchRes
        && !showError
        && searchRes.length <= 3
        && <MoviesCardList
          showLoadCardList={false}
          howManyCardsToLoadOnClick={howManyCardsToLoadOnClick}
          initialCardsQuantity={initialCardsQuantity}
          isSaved={false}
          cardsData={searchRes} />}

      {searchRes
        && !showError
        && searchRes.length >= initialCardsQuantity
        && <MoviesCardList
          showLoadCardList={true}
          howManyCardsToLoadOnClick={howManyCardsToLoadOnClick}
          initialCardsQuantity={initialCardsQuantity}
          isSaved={false}
          cardsData={searchRes} />}

    </main>
  );
}

export default Movies;
