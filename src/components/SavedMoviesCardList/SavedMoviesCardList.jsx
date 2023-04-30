import MoviesCard from "../MoviesCard/MoviesCard";

const SavedMoviesCardList = ({ onRemove, movies }) => {

  return (
    <section className={"saved-movies-card-list"}>
      {movies
        && movies.map((savedMovie) =>
          <MoviesCard
            key={savedMovie._id}
            _id={savedMovie._id}
            onLikeOrRemove={onRemove}
            isSaved={true}
            country={savedMovie.country}
            director={savedMovie.director}
            duration={savedMovie.duration}
            year={savedMovie.year}
            description={savedMovie.description}
            image={savedMovie.image}
            trailerLink={savedMovie.trailerLink}
            movieId={savedMovie.id}
            nameEN={savedMovie.nameEN}
            nameRU={savedMovie.nameRU}
          />
        )}
    </section>
  )
}

export default SavedMoviesCardList;
