import { useEffect, useState } from "react";
import LoaderBtn from "../LoaderBtn/LoaderBtn";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({
  showLoaderBtn, cardsToLoadOnClickQuantity,
  initialCardsQuantity, cardsData, onLikeOrRemove
}) => {

  const [currentCardsQuanitty, setCurrentCardsQuanitty] = useState(initialCardsQuantity);
  const [currentCardsData, setCurrentCardsData] = useState(null);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);

  const loadMore = () => {
    setCurrentCardsQuanitty(cardsToLoadOnClickQuantity + currentCardsQuanitty);
  }

  // Disabling Loader button if there is no more Cards to load
  useEffect(() => {
    if (cardsData) {
/*        console.log(`CurrentCardsQuanitty: ${currentCardsQuanitty},
        Total CardsQuanitty: ${cardsData.length}`) */
       if (currentCardsQuanitty >= cardsData.length) {
        setLoadMoreDisabled(true);
      } else {
        setLoadMoreDisabled(false);
      }
    }
  }, [cardsData, currentCardsQuanitty])

  // Resetting currentCardsQuanitty if new search was made
  useEffect(() => {
    if (cardsData !== currentCardsData) {
      setCurrentCardsQuanitty(initialCardsQuantity);
      setCurrentCardsData(cardsData);
    }
  }, [cardsData, currentCardsData, initialCardsQuantity])

  return (
    <>
      <section className={"movies-card-list"}>
        {cardsData
          && Array.from({ length: currentCardsQuanitty }).map((_, index) => {
            const cardData = cardsData[index];

            // There are less Cards in cardsData than InitialCardsQuantity
            if (!cardData) {
              return null;
            }

            return (
              <MoviesCard
                currentCardsQuanitty={currentCardsQuanitty}
                _id={cardData._id}
                key={cardData.id}
                onLikeOrRemove={onLikeOrRemove}
                isLiked={cardData.isLiked}
                isSaved={false}
                country={cardData.country}
                director={cardData.director}
                duration={cardData.duration}
                year={cardData.year}
                description={cardData.description}
                image={cardData.image}
                trailerLink={cardData.trailerLink}
                movieId={cardData.id}
                nameEN={cardData.nameEN}
                nameRU={cardData.nameRU}
              />
            )
          })
        }
      </section>

      {showLoaderBtn
        && !loadMoreDisabled
        && <LoaderBtn onLoadMore={loadMore} />}
    </>
  )
}

export default MoviesCardList;
