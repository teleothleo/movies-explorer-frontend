import MoviesCard from "../MoviesCard/MoviesCard";


const MoviesCardList = ({ isSaved, cardsData }) => (
  <section className={`${isSaved
    ? "movies-card-list movies-card-list_saved"
    : "movies-card-list"}`}>
    {cardsData && cardsData.map((cardData) =>
       <MoviesCard
        isSaved={isSaved}
        key={cardData.id}
        duration={cardData.duration}
        image={cardData.image.url}
        nameEN={cardData.nameEN}
        nameRU={cardData.nameRU}
        year={cardData.year} /> 
    )}

  </section>
)

export default MoviesCardList;
