import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { ErrBadFetch, ErrNotFound } from "../../utils/constants";
import { apiGetMovies } from "../../utils/MainApi";


const SavedMovies = () => {

  const [searchRes, setSearchRes] = useState();
  const [showError, setShowError] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [savedMovies, setSavedMovies] = useState(null);

  const getSavedMovies = async () => {
    const res = await apiGetMovies();
    const resJ = await res.json();
    console.log(resJ);
    setSavedMovies(resJ);
    setSearchRes(resJ);
  }

  const findMovies = (queryRef) => {
    try {
      setShowError(false);
      if (savedMovies) {

        setShowPreloader(true);
        const newSearchRes = savedMovies.filter((item) => (
          item.nameRU.toLowerCase()
            .includes(queryRef.current.value.toLowerCase())
          || item.nameEN.toLowerCase()
            .includes(queryRef.current.value.toLowerCase())
        ));

        setTimeout(() => {
          console.log("Fake loading");
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

  useEffect(() => { // Initial loading of Saved Movies
    if (!savedMovies) {
      getSavedMovies();
    }
  }, [savedMovies])


  return (
    <main className="saved-movies">

      {searchRes // Error: no movies found
        && searchRes.length === 0
        && !showPreloader
        && <p className="movies__err-msg">{ErrNotFound}</p>}

      {showError // Error: fetching failed
        && !showPreloader
        && <p className="movies__err-msg">{ErrBadFetch}</p>}

      {showPreloader && <Preloader />}
      {savedMovies
        && !showPreloader
        && <SearchForm
          onSearchClick={findMovies}
          movies={searchRes}
          isSaved={true}
        />}
      {!showPreloader
        && <SavedMoviesCardList onRemove={getSavedMovies} movies={searchRes} />}
    </main>
  );
}

export default SavedMovies;
