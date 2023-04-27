import { useEffect, useState } from "react";
import LoadCardList from "../LoadCardList/LoadCardList";
import MoviesCard from "../MoviesCard/MoviesCard";


const MoviesCardList = ({
  showLoadCardList, howManyCardsToLoadOnClick,
  initialCardsQuantity, isSaved, cardsData
}) => {

  const [currentCardsQuanitty, setCurrentCardsQuanitty] = useState(initialCardsQuantity);
  const [currentCardsData, setCurrentCardsData] = useState(null);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);

  const loadMore = () => {
    console.log(howManyCardsToLoadOnClick + currentCardsQuanitty)
    setCurrentCardsQuanitty(howManyCardsToLoadOnClick + currentCardsQuanitty);
  }

  useEffect(() => {
    if (cardsData) {
      console.log(currentCardsQuanitty, " ", cardsData.length)
      if (currentCardsQuanitty >= cardsData.length) {
        setLoadMoreDisabled(true);
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
      <section className={`${isSaved
        ? "movies-card-list movies-card-list_saved"
        : "movies-card-list"}`}>
        {cardsData &&
          Array.from({ length: currentCardsQuanitty }).map((_, index) => {
            const cardData = cardsData[index];

            if (!cardData) {
              return null; // When there are less items in cardsData than cardsToShow
            }

            return (
              <MoviesCard
                isSaved={isSaved}
                key={cardData.id}
                duration={cardData.duration}
                image={cardData.image.url}
                nameEN={cardData.nameEN}
                nameRU={cardData.nameRU}
                year={cardData.year}
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
