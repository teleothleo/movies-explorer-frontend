import MoviesCardList from "../MoviesCardList/MoviesCardList";
import LoadCardList from "../LoadCardList/LoadCardList";
import SearchForm from "../SearchForm/SearchForm";


const Movies = () => {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList />
      <LoadCardList />
    </div>
  );
}

export default Movies;
