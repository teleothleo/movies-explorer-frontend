import MoviesCard from "../MoviesCard/MoviesCard";


const MoviesCardList = (props) => {
  return (
    <section className={`${props.isSaved
      ? "movies-card-list movies-card-list_saved"
      : "movies-card-list"
      }`}>
        <MoviesCard isSaved={props.isSaved} />
        <MoviesCard isSaved={props.isSaved} />
        {/* <MoviesCard isSaved={props.isSaved} /> */}
        {/*       <MoviesCard isSaved={props.isSaved} />

      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />

 */}      {/*       <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} />
      <MoviesCard isSaved={props.isSaved} /> */}
    </section>
  );
}

export default MoviesCardList;
