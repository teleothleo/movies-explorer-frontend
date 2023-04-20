import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {

  return (
    <section className="search-form">
      <form className="search-form__wrapper">
        <input className="search-form__input" placeholder="Фильм" required></input>
        <button  className="search-form__btn btn-black" />
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
