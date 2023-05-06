import { useEffect, useState } from "react";
import { BF_URL } from "../../utils/constants";
import { convertMinutesToHours } from "../../utils/utils";
import { apiCreateMovie, apiDeleteMovie } from "../../utils/MainApi";

const MoviesCard = ({
  currentCardsQuanitty,
  _id,
  onLikeOrRemove,
  isSaved,
  isLiked,
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  movieId,
  nameRU,
  nameEN,
}) => {

  const [likedState, setLikedState] = useState(isLiked);
  const [parsedDuration, setParsedDuration] = useState(duration);

  const toggleLike = async () => {
    if (likedState) {
      const res = await apiDeleteMovie(_id);
      const resJson = await res.json();
      console.log(resJson);
    } else {
      const res = await apiCreateMovie({
        country,
        director,
        duration,
        year,
        description,
        image: BF_URL.concat(image.url),
        trailerLink,
        thumbnail: BF_URL.concat(image.formats.thumbnail.url),
        movieId,
        nameRU,
        nameEN,
      });
      const resJson = await res.json();
      console.log(resJson);
    }

    setLikedState(!likedState);
    onLikeOrRemove(currentCardsQuanitty);
  }

  const removeSavedMovie = async () => {
    const res = await apiDeleteMovie(_id);
    const resJson = await res.json();
    console.log(resJson);
    onLikeOrRemove();
  }

  const openTrailerLink = (e) => {
  if (e.target.tagName !== 'BUTTON') {
    window.open(trailerLink, '_blank', 'noopener noreferrer');
  }
};


  useEffect(() => {
    setParsedDuration(convertMinutesToHours(duration));
  }, [duration])

  if (isSaved) {
    return (
      <article onClick={openTrailerLink} className="movies-card movies-card_saved">
        <img src={image} className="movies-card__image" alt="Movie screenshot" />
        <div className="movies-card__title-wrapper movies-card__title-wrapper_saved">
          <h2 className="movies-card__title">{nameRU}</h2>
          <button onClick={(e) => removeSavedMovie(e)} className="movies-card__remove" />
        </div>
        <p className="movies-card__duration movies-card__duration_saved">{parsedDuration}</p>
      </article>
    )
  } else {
    return (
      <article onClick={openTrailerLink} className="movies-card">
        <img src={BF_URL.concat(image.url)} className="movies-card__image" alt="Movie screenshot" />
        <div className="movies-card__title-wrapper">
          <h2 className="movies-card__title">{nameRU}</h2>
          <button onClick={(e) => toggleLike(e)} className={`${likedState
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
