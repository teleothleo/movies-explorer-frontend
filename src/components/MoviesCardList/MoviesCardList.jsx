import MoviesCard from "../MoviesCard/MoviesCard";


const MoviesCardList = (props) => {
  return (
    <div className={`${props.isSaved
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
    </div>
  );
}

export default MoviesCardList;
