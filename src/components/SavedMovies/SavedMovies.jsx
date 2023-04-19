import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import LoadCardList from "../LoadCardList/LoadCardList";
import Preloader from "../Preloader/Preloader";


const SavedMovies = () => {
  return (
    <div className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList isSaved={true} />
    </div>
  );
}

export default SavedMovies;
