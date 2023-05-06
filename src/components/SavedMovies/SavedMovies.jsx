import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import { useCallback, useEffect, useState } from "react";
import { ErrBadFetch, ErrNotFound } from "../../utils/constants";
import { MainApiHandler } from "../../utils/MainApiHandler";
import { getCheckboxStateLS } from "../../utils/localStorageUtils";
// TODO do a findMovies logic like in Movies

const SavedMovies = () => {

  const [mainApiHandler, setMainApiHandler] = useState(null);
  const [allSavedMovies, setAllSavedMovies] = useState(null);
  const [savedShortMovies, setSavedShortMovies] = useState(null);
  const [currentSavedMovies, setCurrentSavedMovies] = useState(null);

  const [showError, setShowError] = useState(false);
  const [showOnlyShortMovies, setShowOnlyShortMovies] = useState(false);

  const getSavedMovies = useCallback(async () => {
    console.log(mainApiHandler)
    const newAllSavedMovies = await mainApiHandler.fetchSavedMovies();

    if (showOnlyShortMovies) {
      const newSavedShortMovies = newAllSavedMovies.filter(
        mov => mov.duration <= 40
      )
      setCurrentSavedMovies(newSavedShortMovies);
      setSavedShortMovies(newSavedShortMovies)
    } else {
      setCurrentSavedMovies(newAllSavedMovies);
    }

    setAllSavedMovies(newAllSavedMovies);
  }, [mainApiHandler, showOnlyShortMovies])

  const shortMoviesToggle = (state) => {
    console.log(state);
    setShowOnlyShortMovies(state);
  }

  const findMovies = (queryRef) => {
    try {
      setShowError(false);

      if (allSavedMovies && mainApiHandler && queryRef) {
        if (showOnlyShortMovies) {
          const newSearchRes = mainApiHandler.searchMovies(
            savedShortMovies, queryRef,
          );
          setCurrentSavedMovies(newSearchRes);
          console.log("Res (shorts): ", newSearchRes)
        } else {
          const newSearchRes = mainApiHandler.searchMovies(
            allSavedMovies, queryRef,
          );
          setCurrentSavedMovies(newSearchRes);
          console.log("Res: ", newSearchRes)
        }
      }

    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  }

  useEffect(() => { // Fetching saved movies if MainApiHandler is available
    if (mainApiHandler) {
      getSavedMovies()
    }
  }, [getSavedMovies, mainApiHandler, showOnlyShortMovies])

  useEffect(() => { // Initilizing MainApiHandler
    setShowOnlyShortMovies(getCheckboxStateLS(true));
    if (!mainApiHandler) {
      const newMainApiHandler = new MainApiHandler();
      setMainApiHandler(newMainApiHandler);
    }
  }, [mainApiHandler])

  return (
    <main className="saved-movies">

      {<SearchForm
        onSearchClick={findMovies}
        isSaved={true}
        onToggle={shortMoviesToggle}
      />}

      {currentSavedMovies // Error: no movies found
        && currentSavedMovies.length === 0
        && <p className="movies__err-msg">{ErrNotFound}</p>}

      {showError // Error: fetching failed
        && <p className="movies__err-msg">{ErrBadFetch}</p>}

      {currentSavedMovies
        && <SavedMoviesCardList onRemove={getSavedMovies}
          movies={currentSavedMovies} />}
    </main>
  );
}

export default SavedMovies;
