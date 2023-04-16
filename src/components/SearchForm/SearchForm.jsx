import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


const SearchForm = () => {
  return (
    <div className="searchForm">
      <div className="searchForm__wrapper">
        <input className="searchForm__input" placeholder="Фильм"></input>
        <button className="searchForm__btn btn-black" />
      </div>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
