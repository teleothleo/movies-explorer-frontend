
import { useEffect, useState } from "react";
import { BF_URL } from "../../utils/constants";

const MoviesCard = ({
  isSaved,
  duration,
  image,
  nameEN,
  nameRU,
  year
}) => {

  const [isLiked, setIsLiked] = useState(false);
  const [parsedDuration, setParsedDuration] = useState(duration);

  function convertMinutesToHours() {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    if (minutes === 0) {
      setParsedDuration(`${hours}ч`);
    } else {
      setParsedDuration(`${hours}ч ${minutes}м`);
    }
  }

  useEffect(() => {
    convertMinutesToHours();
  }, [duration])


  if (isSaved) {
    return (
      <article className="movies-card movies-card_saved">
        <img src={BF_URL.concat(image)} className="movies-card__image" alt="Movie screenshot" />
        <div className="movies-card__title-wrapper movies-card__title-wrapper_saved">
          <h2 className="movies-card__title">{nameRU}</h2>
          <button className="movies-card__remove" />
        </div>
        <p className="movies-card__duration movies-card__duration_saved">{parsedDuration}</p>
      </article>
    )
  } else {
    return (
      <article className="movies-card">
        <img src={BF_URL.concat(image)} className="movies-card__image" alt="Movie screenshot" />
        <div className="movies-card__title-wrapper">
          <h2 className="movies-card__title">{nameRU}</h2>
          <button onClick={() => setIsLiked(!isLiked)} className={`${isLiked
            ? "movies-card__heart movies-card__heart_active"
            : "movies-card__heart"
            }`} />
        </div>
        <p className="movies-card__duration">{parsedDuration}</p>
      </article>
    )
  }
}

export default MoviesCard;
