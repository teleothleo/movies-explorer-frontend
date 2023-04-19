
import { useState } from "react";
import dummy from "../../images/movies-card-dummy0.png";

const MoviesCard = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  if (props.isSaved) {
    return (
      <div className="movies-card movies-card_saved">
        <img src={dummy} className="movies-card__image" alt="Movie screenshot" />
        <div className="movies-card__title-wrapper movies-card__title-wrapper_saved">
          <h2 className="movies-card__title">33 слова о дизайндизайнедизайнедизайнедизайндизайнедизайнедизайнеее</h2>
          <button className="movies-card__remove" />
        </div>
        <p className="movies-card__duration movies-card__duration_saved">1ч 56м</p>
      </div>
    )
  } else {
    return (
      <div className="movies-card">
        <img src={dummy} className="movies-card__image" alt="Movie screenshot" />
        <div className="movies-card__title-wrapper">
          <h2 className="movies-card__title">33 слова о дизайндизайнедизайнедизайнедизайндизайнедизайнедизайнеее</h2>
          <button onClick={() => setIsLiked(!isLiked)} className={`${isLiked
            ? "movies-card__heart movies-card__heart_active"
            : "movies-card__heart"
            }`} />
        </div>
        <p className="movies-card__duration">1ч 56м</p>
      </div>
    )
  }
}

export default MoviesCard;
