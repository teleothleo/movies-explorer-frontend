import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";


const Movies = () => {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList />
      <Preloader />
    </div>
  );
}

export default Movies;
