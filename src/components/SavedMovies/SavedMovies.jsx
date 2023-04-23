import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import LoadCardList from "../LoadCardList/LoadCardList";
import Preloader from "../Preloader/Preloader";


const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList isSaved={true} />
    </main>
  );
}

export default SavedMovies;
