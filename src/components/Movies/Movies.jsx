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
      loadStoredBeatFilmDb(); // Load BeatFilmDb from LS if none exists in Comp.
    }
    if (!movies && !localStorage.getItem("beatFilmDb")) {
      fetchMovies(); // Fetch and Store BeatFilmDb from BeatFilmDb if none exists in LS.
    } else if (!searchRes && localStorage.getItem("searchRes")) {
      loadStoredSearchRes(); // Load LS Search results if such exist
    }
  }, [fetchMovies, movies, searchRes]);

  useEffect(() => { // Calculating windows width & handling amount of cards to load
    const windowWidth = window.innerWidth;
    if (windowWidth > 768) {
      setInitialCardsQuantity(12);
      setHowManyCardsToLoadOnClick(3);
      console.log(`InitialCardsQuantity: 12,
        width res: ${windowWidth}px`);
    } else if (windowWidth <= 768 && windowWidth > 480) {
      setInitialCardsQuantity(8);
      setHowManyCardsToLoadOnClick(2);
      console.log(`InitialCardsQuantity: 8,
        width res: ${windowWidth}px`);
    } else if (windowWidth <= 480) {
      setInitialCardsQuantity(5);
      setHowManyCardsToLoadOnClick(2);
      console.log(`InitialCardsQuantity: 5,
        width res: ${windowWidth}px`);
    } else {
      setInitialCardsQuantity(12);
      setHowManyCardsToLoadOnClick(3);
      console.log(`InitialCardsQuantity: 12,
        width res: what res??: ${windowWidth}px`);
    }
  }, []);

  return (
    <main className="movies">

      {movies && <SearchForm movies={movies} onSearchClick={findMovies} isSaved={false} />}

      {searchRes // Error: no movies found
        && searchRes.length === 0
        && !showPreloader
        && <p className="movies__err-msg">{ErrNotFound}</p>}

      {showError // Error: fetching failed
        && !showPreloader
        && <p className="movies__err-msg">{ErrBadFetch}</p>}

      {showPreloader && <Preloader />}

      {searchRes
        && !showError
        && searchRes.length <= initialCardsQuantity
        && <MoviesCardList
          showLoadCardList={false} // The card quantity is small
          howManyCardsToLoadOnClick={howManyCardsToLoadOnClick}
          initialCardsQuantity={initialCardsQuantity}
          cardsData={searchRes} />}

      {searchRes
        && !showError
        && searchRes.length >= initialCardsQuantity
        && <MoviesCardList
          showLoadCardList={true} // The card quantity is big, loader button is needed
          howManyCardsToLoadOnClick={howManyCardsToLoadOnClick}
          initialCardsQuantity={initialCardsQuantity}
          cardsData={searchRes} />}

    </main>
  );
}

export default Movies;
