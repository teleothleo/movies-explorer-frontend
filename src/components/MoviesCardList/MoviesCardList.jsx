import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";


const MoviesCardList = () => {
  const location = useLocation();
  return (
    <div className="moviesCardList">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      {location.pathname === '/movies' && (
        <>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </>
      )}
    </div>
  );
}

export default MoviesCardList;
