import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useLocation } from "react-router-dom";
import LoadCardList from "../LoadCardList/LoadCardList";
import SearchForm from "../SearchForm/SearchForm";


const Movies = () => {
  const location = useLocation();
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList isSaved={false} />
      <LoadCardList />
    </main>
  );
}

export default Movies;
