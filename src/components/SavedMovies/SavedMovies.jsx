import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";


const SavedMovies = () => {
  return (
    <div className="savedMovies">
      <SearchForm />
      <MoviesCardList />
      <Preloader />
    </div>
  );
}

export default SavedMovies;
