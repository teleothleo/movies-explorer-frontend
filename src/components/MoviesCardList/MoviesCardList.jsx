import { useEffect, useState } from "react";
import LoadCardList from "../LoadCardList/LoadCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { apiGetMovies } from "../../utils/MainApi.js";

const MoviesCardList = ({
  showLoadCardList, howManyCardsToLoadOnClick,
  initialCardsQuantity, cardsData
}) => {

  const [currentCardsQuanitty, setCurrentCardsQuanitty] = useState(initialCardsQuantity);
  const [currentCardsData, setCurrentCardsData] = useState(null);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);
  const [savedMovies, setSavedMovies] = useState(null);
  const [userCardsData, setUserCardsData] = useState(null);

  const loadMore = () => {
    setCurrentCardsQuanitty(howManyCardsToLoadOnClick + currentCardsQuanitty);
  }

  const getSavedMovies = async () => {
    const res = await apiGetMovies();
    const resJ = await res.json();
    console.log(resJ);
    setSavedMovies(resJ);
  }

  useEffect(() => { // Disabling Loader button if there is no more Cards to load
    if (cardsData) {
      console.log(`CurrentCardsQuanitty: ${currentCardsQuanitty},
        Total CardsQuanitty: ${cardsData.length}`)
      if (currentCardsQuanitty >= cardsData.length) {
        setLoadMoreDisabled(true);
      }
    }
  }, [cardsData, currentCardsQuanitty])


  useEffect(() => { // Resetting currentCardsQuanitty if new search was made
    if (cardsData !== currentCardsData) {
      setCurrentCardsQuanitty(initialCardsQuantity);
      setCurrentCardsData(cardsData);
    }
  }, [cardsData, currentCardsData, initialCardsQuantity])

  useEffect(() => { // Setting likes for CardsData
    if (cardsData && savedMovies) {
      const newUserCardsData = cardsData.map((cardData) => {
        const savedMovie = savedMovies.find(
          (savedMovie) => savedMovie.movieId === cardData.id
        );

        if (savedMovie) { // In case the is a SavedMovie with the same ID as from BF_DB
          cardData.isLiked = true;
          cardData._id = savedMovie._id;
          return cardData;
        } else {
          cardData.isLiked = false;
          return cardData;
        }
      });

      console.log(newUserCardsData);
      setUserCardsData(newUserCardsData);
    }
  }, [cardsData, savedMovies])

  useEffect(() => { // Initial loading of Saved Movies
    if (!savedMovies) {
      getSavedMovies();
    }
  }, [savedMovies])

  return (
      <>
        <section className={"movies-card-list"}>
          {userCardsData
            // Creating an Array of size CurrentCardsQuanitty
            && Array.from({ length: currentCardsQuanitty }).map((_, index) => {
              const userCardData = userCardsData[index];

              if (!userCardData) {
                return null;
              } // There are less Cards in userCardData than InitialCardsQuantity

              return (
                <MoviesCard
                  _id={userCardData._id}
                  onToggleLike={getSavedMovies}
                  isLiked={userCardData.isLiked}
                  isSaved={false}
                  key={userCardData.id}
                  country={userCardData.country}
                  director={userCardData.director}
                  duration={userCardData.duration}
                  year={userCardData.year}
                  description={userCardData.description}
                  image={userCardData.image}
                  trailerLink={userCardData.trailerLink}
                  movieId={userCardData.id}
                  nameEN={userCardData.nameEN}
                  nameRU={userCardData.nameRU}
                />
              );
            })}

        </section>

        {showLoadCardList
          && !loadMoreDisabled
          && <LoadCardList onLoadMore={loadMore} />}
      </>
    )
}

export default MoviesCardList;
