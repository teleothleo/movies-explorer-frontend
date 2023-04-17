import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {

  return (
    <div className="search-form">
      <div className="search-form__wrapper">
        <input className="search-form__input" placeholder="Фильм"></input>
        <button  className="search-form__btn btn-black" />
      </div>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
