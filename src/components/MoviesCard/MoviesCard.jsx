
import dummy from "../../images/moviesCard-dummy0.png";

const MoviesCard= () => {
  return (
    <div className="moviesCard">
      <img src={dummy} className="moviesCard__image" alt="Movie screenshot"/>
      <div className="moviesCard__title-wrapper">
        <h2 className="moviesCard__title">33 слова о дизайндизайнедизайнедизайнедизайндизайнедизайнедизайнеее</h2>
        <button className="moviesCard__heart" />
      </div>
      <p className="moviesCard__duration">1ч 56м</p>
    </div>
  );
}

export default MoviesCard;
