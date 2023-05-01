import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useCallback, useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { ErrBadFetch, ErrNotFound } from "../../utils/constants";
import { MoviesApiHandler } from "../../utils/MoviesApiHandler";
import { MainApiHandler } from "../../utils/MainApiHandler";
import { adjustCardsQuantityBasedOnWindowWidth } from "../../utils/utils";
import { getCheckboxStateLS, getSearchPromptLS } from "../../utils/localStorageUtils";

const Movies = () => {

  const [mainApiHandler, setMainApiHandler] = useState(null);
  const [moviesApiHandler, setMoviesApiHandler] = useState(null);
  const [currentMovies, setCurrentMovies] = useState(null);
  const [unifiedMovies, setUnifiedMovies] = useState(null);
  const [allMovies, setAllMovies] = useState(null);

  const [searchPrompt, setSearchPrompt] = useState(null);
  const [initialCardsQuantity, setInitialCardsQuantity] = useState(12);
  const [cardsToLoadOnClickQuantity, setCardsToLoadOnClickQuantity] = useState(3);

  const [showLoaderBtn, setShowLoaderBtn] = useState(true);
  const [showOnlyShortMovies, setShowOnlyShortMovies] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showFetchError, setShowFetchError] = useState(false);
  const [showNotFoundError, setShowNotFoundError] = useState(false);

  // Finding movies from search & Creating CurrentMovies
  const findMovies = useCallback((queryRef) => {
    try {
      setShowFetchError(false);
      setShowNotFoundError(false);

      let localSearchPrompt;
      queryRef
        ? localSearchPrompt = queryRef
        : localSearchPrompt = searchPrompt;

      console.log(localSearchPrompt, showOnlyShortMovies);

      if (mainApiHandler) {
        const newSearchRes = mainApiHandler.searchMovies(
          unifiedMovies, localSearchPrompt,
        );
        if (newSearchRes.length === 0) {
          setShowNotFoundError(true);
        }
        if (showOnlyShortMovies) {
          const newSearchResShortMovies = newSearchRes.filter(
            mov => mov.duration <= 40
          );
          setCurrentMovies(newSearchResShortMovies);
        } else {
          setCurrentMovies(newSearchRes);
        }
        setSearchPrompt(localSearchPrompt);
      }

    } catch (error) {
      console.error(error);
      setShowFetchError(true);
    }
  }, [mainApiHandler, searchPrompt, showOnlyShortMovies, unifiedMovies])

  const getAllMovies = useCallback(async () => {
    if (moviesApiHandler) {
      setShowFetchError(false);
      try {
        setShowPreloader(true);
        const newMovies = await moviesApiHandler.fetchMovies();
        setShowPreloader(false);
        setAllMovies(newMovies);

      } catch (error) {
        console.error(error);
        setShowPreloader(false);
        setShowFetchError(true);
      }
    }
  }, [moviesApiHandler])

  const getSavedMovies = useCallback(async () => {
    if (mainApiHandler) {
      console.log(mainApiHandler)
      const newSavedMovies = await mainApiHandler.fetchSavedMovies();
      return newSavedMovies;
    }
  }, [mainApiHandler])

  const createUnififedMovies = useCallback(async () => {
    // console.log(moviesCollection);
    let savedMoviesCollection = await getSavedMovies();

    if (savedMoviesCollection && allMovies) {

      const newUnifiedMovies = allMovies.map((movie) => {
        const savedMovie = savedMoviesCollection.find(
          (savedMovie) => savedMovie.movieId === movie.id
        );
        // In case the SavedMovie was found
        if (savedMovie) {
          movie.isLiked = true;
          movie.isSaved = true;
          movie._id = savedMovie._id;
          return movie;
        } else {
          movie.isLiked = false;
          movie.isSaved = false;
          return movie;
        }
      })

      // console.log(newUnifiedMovies);
      setUnifiedMovies(newUnifiedMovies);
      return newUnifiedMovies;

    }
  }, [allMovies, getSavedMovies])

  // Called on Like / Unlike
  const updateCurrentMovies = useCallback(async (currentCardsQuantity) => {
    // console.log(currentMovies);
    createUnififedMovies();
    findMovies();
    setInitialCardsQuantity(currentCardsQuantity);
  }, [createUnififedMovies, findMovies])


  const shortMoviesToggle = (state) => {
    console.log("shortMoviesToggle", state)
    setShowOnlyShortMovies(state);
  }

  // Called on MoviesToggle
  useEffect(() => {
    if (unifiedMovies && searchPrompt) {
      findMovies()
    }
  }, [findMovies, searchPrompt, showOnlyShortMovies, unifiedMovies])

  // Handling LoaderBtn & Errors visibility
  useEffect(() => {
    if (currentMovies && initialCardsQuantity) {
      console.log(currentMovies.length, initialCardsQuantity);

      setShowLoaderBtn(initialCardsQuantity < currentMovies.length);

      if (currentMovies.length === 0 && searchPrompt) {
        setShowNotFoundError(true)
      } else {
        setShowNotFoundError(false);
      }
    }
  }, [initialCardsQuantity, currentMovies, showNotFoundError, searchPrompt])

  // Load last search results if SearchPrompt is saved..
  // ..and there are no CurrentMovies
  useEffect(() => {
    const newSearchPrompt = getSearchPromptLS(false);
    if (newSearchPrompt && unifiedMovies && !currentMovies && !searchPrompt) {
      findMovies(newSearchPrompt);
    }
  }, [currentMovies, findMovies, searchPrompt, unifiedMovies])

  useEffect(() => { // Creating UnifiedMovies
    if (allMovies && !unifiedMovies) {
      createUnififedMovies();
    }
  }, [allMovies, createUnififedMovies, unifiedMovies]);

  useEffect(() => { // Fetching AllMovies
    if (!allMovies && moviesApiHandler) {
      getAllMovies()
    }
  }, [getAllMovies, allMovies, moviesApiHandler])

  useEffect(() => { // Initilizing Handlers
    if (!mainApiHandler) {
      const newMainApiHandler = new MainApiHandler();
      setMainApiHandler(newMainApiHandler);
    }
    if (!moviesApiHandler) {
      const newMoviesApiHandler = new MoviesApiHandler();
      setMoviesApiHandler(newMoviesApiHandler);
    }
    console.log(getCheckboxStateLS(false));
    setShowOnlyShortMovies(getCheckboxStateLS(false));
  }, [mainApiHandler, moviesApiHandler])

  useEffect(() => { // Calculating windows width & handling amount of cards to load
    const [
      newInitialCardsQuantity,
      newCardsToLoadOnClickQuantity
    ] = adjustCardsQuantityBasedOnWindowWidth(window.innerWidth)

    setInitialCardsQuantity(newInitialCardsQuantity);
    setCardsToLoadOnClickQuantity(newCardsToLoadOnClickQuantity);
  }, []);


  return (
    <main className="movies">

      {<SearchForm onSearchClick={findMovies} onToggle={shortMoviesToggle} isSaved={false} />}

      {showNotFoundError // Error: no movies found
        && !showPreloader
        && <p className="movies__err-msg">{ErrNotFound}</p>}

      {showFetchError // Error: fetching failed
        && !showPreloader
        && <p className="movies__err-msg">{ErrBadFetch}</p>}

      {showPreloader && <Preloader />}

      {currentMovies
        && !showFetchError
        && !showNotFoundError
        && !showPreloader
        && <MoviesCardList
          cardsToLoadOnClickQuantity={cardsToLoadOnClickQuantity}
          initialCardsQuantity={initialCardsQuantity}
          cardsData={currentMovies}
          onLikeOrRemove={updateCurrentMovies}
          showLoaderBtn={showLoaderBtn}
        />}

    </main>
  );
}

export default Movies